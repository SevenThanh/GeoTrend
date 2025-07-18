import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

vi.mock("../../contexts/AuthContext", () => ({
  useAuth: () => ({
    user: {
      email: "testuser@example.com",
      user_metadata: {
        username: "testuser",
        display_name: "Test User",
        bio: "This is my bio",
        location: "New York",
        timezone: "America/New_York",
      },
    },
    signOut: vi.fn(),
    loading: false,
  }),
}));

// 👇 If you're mocking supabase:
vi.mock("../../config/supabase", () => ({
  supabase: {
    auth: {
      updateUser: vi.fn().mockResolvedValue({ error: null }),
    },
  },
}));

import AccountPage from "../../pages/AccountPage";

test("renders user info and enters edit mode", () => {
  render(
    <MemoryRouter>
      <AccountPage />
    </MemoryRouter>
  );

  // Check default user info
  expect(screen.getByText(/testuser@example.com/i)).toBeInTheDocument();
  expect(screen.getByText(/@testuser/i)).toBeInTheDocument();
  expect(screen.getByText(/this is my bio/i)).toBeInTheDocument();
  expect(screen.getByText(/location: new york/i)).toBeInTheDocument();
  expect(screen.getByText(/timezone: america\/new_york/i)).toBeInTheDocument();

  // Click "Edit Profile"
  fireEvent.click(screen.getByRole("button", { name: /edit profile/i }));

  // Now in edit mode — check for form fields
  expect(screen.getByPlaceholderText(/display name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/bio/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/location/i)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /save changes/i })
  ).toBeInTheDocument();
});
