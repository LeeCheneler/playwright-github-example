import { test, expect } from "@playwright/test";
import { v4 } from "uuid";
import { createRepository } from "../actions/create-repository";
import { deleteRepository } from "../actions/delete-repository";

const repositoryName = v4();

test.beforeEach(async ({ page }) => {
  await createRepository(page, { name: repositoryName });
});

test.afterEach(async ({ page }) => {
  await deleteRepository(page, { name: repositoryName });
});

test("should create an issue", async ({ page }) => {
  // enter create issue journey

  await page.getByRole("link", { name: /Issues/ }).click();
  await page.getByRole("link", { name: "New issue" }).click();

  // complete create issue journey
  await page
    .getByRole("textbox", { name: "Add a title" })
    .fill("This is a new issue");

  await page.getByRole("button", { name: "Submit new issue" }).click();

  // confirm the issue is created
  await page.getByRole("heading", { name: /This is a new issue/i }).waitFor();
});
