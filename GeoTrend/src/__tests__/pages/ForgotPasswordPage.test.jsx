import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

vi.mock("../../contexts/AuthContext", () => ({
  useAuth: () => ({
    resetPassword: vi.fn().mockResolvedValue({ error: null }),
  }),
}));

import ForgotPasswordPage from "../../pages/ForgotPasswordPage";

test("renders Forgot Password form and submits it", async () => {
  render(
    <MemoryRouter>
      <ForgotPasswordPage />
    </MemoryRouter>
  );

  // Check form fields
  expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /send reset link/i })
  ).toBeInTheDocument();

  // Fill and submit form
  await userEvent.type(
    screen.getByLabelText(/email address/i),
    "user@example.com"
  );
  await userEvent.click(
    screen.getByRole("button", { name: /send reset link/i })
  );

  // Wait for success message
  expect(
    await screen.findByText(/check your email for password reset instructions/i)
  ).toBeInTheDocument();
});
