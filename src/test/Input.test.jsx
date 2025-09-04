import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import SignIn from "../components/pages/Auth/SignIn";
import SignUp from "../components/pages/Auth/SignUp";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

// Mock ContextProvider
jest.mock("../contexts/ContextProvider", () => ({
  useStateContext: () => ({
    theme: {},
    setShowToast: jest.fn(),
    setStatus: jest.fn(),
    setIsSignIn: jest.fn(),
  }),
}));

// Mock localStorage
const localStorageMock = (function () {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key]),
    setItem: jest.fn((key, value) => (store[key] = value)),
    clear: jest.fn(() => (store = {})),
    removeItem: jest.fn((key) => delete store[key]),
  };
})();
Object.defineProperty(global, "localStorage", { value: localStorageMock });

describe("SignIn Page", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("Required fields are editable", async () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={createTheme()}>
          <SignIn />
        </ThemeProvider>
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    await userEvent.type(usernameInput, "test_user");
    await userEvent.type(passwordInput, "validpassword");

    expect(usernameInput).toHaveValue("test_user");
    expect(passwordInput).toHaveValue("validpassword");
  });

  test("Should show error when password is less than 8 characters", async () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={createTheme()}>
          <SignIn />
        </ThemeProvider>
      </MemoryRouter>
    );

    const passwordInput = screen.getByLabelText(/Password/i);
    const signInButton = screen.getByRole("button", { name: /đăng nhập/i });

    await userEvent.type(passwordInput, "short");
    await userEvent.click(signInButton);

    const passwordError = await screen.findByText(
      /Mật khẩu phải có ít nhất 8 ký tự/i
    );
    expect(passwordError).toBeInTheDocument();
  });

  test("Should show error for empty fields", async () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={createTheme()}>
          <SignIn />
        </ThemeProvider>
      </MemoryRouter>
    );

    const signInButton = screen.getByRole("button", { name: /đăng nhập/i });
    await userEvent.click(signInButton);
  });
});
describe("SignUp Page", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("Required fields are editable", async () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={createTheme()}>
          <SignUp />
        </ThemeProvider>
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText(/Username/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/^Password$/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirm Pass/i);

    await userEvent.type(usernameInput, "test_user");
    await userEvent.type(emailInput, "test@test.com");
    await userEvent.type(passwordInput, "Password123");
    await userEvent.type(confirmPasswordInput, "Password123");

    expect(usernameInput).toHaveValue("test_user");
    expect(emailInput).toHaveValue("test@test.com");
    expect(passwordInput).toHaveValue("Password123");
    expect(confirmPasswordInput).toHaveValue("Password123");
  });

  test("The minimum password length must be 8 characters", async () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={createTheme()}>
          <SignUp />
        </ThemeProvider>
      </MemoryRouter>
    );

    const passwordInput = screen.getByLabelText(/Password/i);
    const signUpButton = screen.getByRole("button", { name: /Đăng ký/i });

    await userEvent.type(passwordInput, "short");
    await userEvent.click(signUpButton);

    const passwordError = await screen.findByText(
      /Mật khẩu phải có ít nhất 8 ký tự/i
    );
    expect(passwordError).toBeInTheDocument();
  });

  test("Email validation", async () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={createTheme()}>
          <SignUp />
        </ThemeProvider>
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const signUpButton = screen.getByRole("button", { name: /Đăng ký/i });

    await userEvent.type(emailInput, "invalid-email");
    await userEvent.click(signUpButton);

    const emailError = await screen.findByText(/Định dạng email không hợp lệ/i);
    expect(emailError).toBeInTheDocument();
  });

  test("Confirm password validation", async () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={createTheme()}>
          <SignUp />
        </ThemeProvider>
      </MemoryRouter>
    );

    const passwordInput = screen.getByLabelText(/^Password$/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirm Pass/i);
    const signUpButton = screen.getByRole("button", { name: /Đăng ký/i });

    await userEvent.type(passwordInput, "Password123");
    await userEvent.type(confirmPasswordInput, "Different123");
    await userEvent.click(signUpButton);

    const confirmPasswordError = await screen.findByText(
      /Mật khẩu không khớp/i
    );
    expect(confirmPasswordError).toBeInTheDocument();
  });

  test("Check email existence validation", async () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={createTheme()}>
          <SignUp />
        </ThemeProvider>
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const signUpButton = screen.getByRole("button", { name: /Đăng ký/i });

    await userEvent.type(emailInput, "existing@example.com");
    await userEvent.click(signUpButton);

    const emailExistsError = await screen.findByText(/Email đã được sử dụng/i);
    expect(emailExistsError).toBeInTheDocument();
  });
});
