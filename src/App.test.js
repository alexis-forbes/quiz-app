import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import App from "./App";
import Play from "./components/quiz/Play";

describe("Play component", () => {
  test("Title", () => {
    render(<Play />);
    expect(screen.queryByText(/quiz mode/i)).toBeInTheDocument();
  });

  test("Verify if questions are retrieved on load", async () => {
    // Render the App
    const { getByText } = render(<Play />);
    const questions = await waitFor(() => getByText("1 of 10"));
    expect(questions).toBeInTheDocument();
  });

  test("Verify if plus ten", async () => {
    // Render the App
    const { getByText } = render(<Play />);
    const plusTen = await waitFor(() => getByText("0:15"), { timeout: 18000 });
    expect(plusTen).toBeInTheDocument();
  });

  test("Verify if not plus ten --> must error", async () => {
    // Render the App
    const { getByText } = render(<Play />);
    const plusTen = await waitFor(() => getByText("0:25"));
    expect(plusTen).toBeInTheDocument();
  });

  test("Verify if plus ten", async () => {
    // Render the App
    const { getByText } = render(<Play />);
    fireEvent.click(screen.getByTestId(/plusTenButton/i));
    const plusTen = await waitFor(() => getByText("0:25"));
    expect(plusTen).toBeInTheDocument();
  });

  test("Verify if answer first question", async () => {
    // Render the App
    const { getByText } = render(<Play />);
    fireEvent.click(screen.getByTestId(/firstOptionButton/i));
    const question2 = await waitFor(() => getByText("2 of 10"));
    expect(question2).toBeInTheDocument();
  });
});
