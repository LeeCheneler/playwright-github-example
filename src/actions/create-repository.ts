import { Page } from "@playwright/test";
import { config } from "../utils/config";

export interface CreateRepositoryOptions {
  name: string;
}

export const createRepository = async (
  page: Page,
  options: CreateRepositoryOptions
) => {
  // enter create repository journey

  await page.goto("/");
  await page.getByRole("button", { name: "Create something new" }).click();
  await page
    .getByRole("menu", { name: "Create something new" })
    .getByRole("menuitem", { name: "New repository" })
    .click();
  await page
    .getByRole("heading", { name: "Create a new repository" })
    .waitFor({ timeout: 3000 });

  // complete create repository journey

  await page.getByRole("textbox", { name: "Repository" }).fill(options.name);
  await page.getByText(`${options.name} is available`).waitFor();
  await page.getByRole("button", { name: "Create repository" }).click();

  // confirm we've landed on the repository page

  await page.waitForURL(`/${config.username}/${options.name}`);
};
