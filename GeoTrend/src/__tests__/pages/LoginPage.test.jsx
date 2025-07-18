import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

vi.mock("../../contexts/AuthContext", () => ({
  useAuth: () => ({
    signIn: vi.fn(),
    signUp: vi.fn(),
  }),
}));

import LoginPage from "../../pages/LoginPage";

test("renders login form with email and password fields", () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );

  expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
});

test("toggles to sign up mode and shows confirm password", () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );

  const toggleButton = screen.getByRole("button", {
    name: /don't have an account\? sign up/i,
  });

  fireEvent.click(toggleButton);

  expect(
    screen.getByRole("button", { name: /create account/i })
  ).toBeInTheDocument();
  expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
});
