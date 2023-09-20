import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Login from "./Login";

describe("Login", () => {
  it("should render the login form properly", () => {
    render(<Login />);
    const emailElement = screen.getByPlaceholderText(/Your Email/);
    const passwordElement = screen.getByPlaceholderText(/Your Password/);
    const loginBtnElement = screen.getByText(/Login/);
    const loginWithGoogleBtnElement = screen.getByText(/Login With Google/);

    expect(emailElement).toBeInTheDocument();
    expect(passwordElement).toBeInTheDocument();
    expect(loginBtnElement).toBeInTheDocument();
    expect(loginWithGoogleBtnElement).toBeInTheDocument();
    expect(loginBtnElement).toBeDisabled();
  });

  it("should make the login button enabled when fields are not empty", () => {
    render(<Login />);
    const emailElement = screen.getByPlaceholderText(/Your Email/);
    const passwordElement = screen.getByPlaceholderText(/Your Password/);
    const loginBtnElement = screen.getByText(/Login/);

    fireEvent.change(emailElement, { value: "test@test.com" });
    fireEvent.change(passwordElement, { value: "12345" });

    expect(loginBtnElement).not.toBeDisabled();
  });
});
