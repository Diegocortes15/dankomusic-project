import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import { LocaleSwitcher } from "@/components/nav/LocaleSwitcher";

const pushMock = vi.fn();
const pathnameMock = vi.fn(() => "/es#music");

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
  usePathname: () => pathnameMock(),
}));

const messages = {
  nav: { switchLocale: "Switch language" },
};

function renderWithLocale(locale: "es" | "en") {
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleSwitcher />
    </NextIntlClientProvider>,
  );
}

describe("LocaleSwitcher", () => {
  beforeEach(() => {
    pushMock.mockReset();
  });

  it("marks the current locale as active and the other as inactive", () => {
    renderWithLocale("es");
    const es = screen.getByRole("button", { name: "ES" });
    const en = screen.getByRole("button", { name: "EN" });
    expect(es).toHaveAttribute("aria-current", "true");
    expect(en).not.toHaveAttribute("aria-current");
  });

  it("switches locale by replacing the locale segment in the path", async () => {
    renderWithLocale("es");
    await userEvent.click(screen.getByRole("button", { name: "EN" }));
    expect(pushMock).toHaveBeenCalledWith("/en#music");
  });

  it("does nothing when clicking the active locale", async () => {
    renderWithLocale("es");
    await userEvent.click(screen.getByRole("button", { name: "ES" }));
    expect(pushMock).not.toHaveBeenCalled();
  });
});
