import { test as setup, expect } from "@playwright/test";
import { config } from "../../utils/config";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  // enter sign in journery
  await page.goto("/");
  await page.getByRole("link", { name: "Sign in" }).click();

  // complete sign in journey
  await page
    .getByRole("textbox", { name: "Username or email address" })
    .fill(config.email);
  await page.getByRole("textbox", { name: "Password" }).fill(config.password);
  await page.getByRole("button", { name: "Sign in" }).click();

  // confirm signed in
  await expect(page.getByRole("link", { name: "Dashboard" })).toBeVisible();

  await page.context().storageState({ path: authFile });
});
