import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

describe("Navbar", () => {
  afterEach(() => {
    vi.resetModules(); // reset mocked modules after each test
  });

  test("renders Navbar for logged-in user", async () => {
    vi.doMock("../../contexts/AuthContext", () => ({
      useAuth: () => ({
        user: { email: "testuser@example.com" },
        signOut: vi.fn(),
      }),
    }));

    const Navbar = (await import("../../components/Navbar")).default;

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText(/GeoTrend/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /map/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /for you/i })).toBeInTheDocument();
    expect(
      screen.getByText(
        (content, element) =>
          element?.tagName === "A" && content.includes("Account")
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign out/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/welcome, testuser/i)).toBeInTheDocument();
  });

  test("renders Navbar for logged-out user", async () => {
    vi.doMock("../../contexts/AuthContext", () => ({
      useAuth: () => ({
        user: null,
        signOut: vi.fn(),
      }),
    }));

    const Navbar = (await import("../../components/Navbar")).default;

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText(/GeoTrend/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /map/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /for you/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument();
  });
});
