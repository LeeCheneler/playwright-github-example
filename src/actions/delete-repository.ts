import { Page, expect } from "@playwright/test";
import { config } from "../utils/config";

export interface DeleteRepositoryOptions {
  name: string;
}

export const deleteRepository = async (
  page: Page,
  options: DeleteRepositoryOptions
) => {
  // enter delete repository journey

  await page.goto(`/${config.username}/${options.name}`);
  await page.getByRole("link", { name: "Settings" }).click();
  await page.getByRole("button", { name: "Delete this repository" }).click();

  // complete delete repository journey
  await page
    .getByRole("button", { name: "I want to delete this repository" })
    .click();
  await page
    .getByRole("button", { name: "I have read and understand these effects" })
    .click();
  await page
    .getByRole("textbox", {
      name: `To confirm, type "${config.username}/${options.name}" in the box below`,
    })
    .fill(`${config.username}/${options.name}`);
  await page
    .getByRole("dialog", {
      name: `Delete ${config.username}/${options.name}`,
    })
    .getByRole("button", { name: "Delete this repository" })
    .click();

  // confirm its been deleted
  await page.waitForURL(`/${config.username}?tab=repositories`);
  await page
    .getByText(
      `Your repository "${config.username}/${options.name}" was successfully deleted.`
    )
    .waitFor();
};
