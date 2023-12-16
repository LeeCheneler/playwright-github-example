import { test as setup, expect } from "@playwright/test";
import { config } from "../../utils/config";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Sign in" }).click();

  await page
    .getByRole("textbox", { name: "Username or email address" })
    .first()
    .fill(config.email);

  await page
    .getByRole("textbox", { name: "Password" })
    .first()
    .fill(config.password);

  await page.getByRole("button", { name: "Sign in" }).first().click();

  await expect(page.getByRole("link", { name: "Dashboard" })).toBeVisible();

  await page.context().storageState({ path: authFile });
});
