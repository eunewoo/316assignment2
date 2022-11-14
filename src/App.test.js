import { render, screen } from "@testing-library/react";
import App from "./App";

test("제목이 있음?", () => {
    render(<App />);
    const linkElement = screen.getByText(/CourseMan/i);
    expect(linkElement).toBeInTheDocument();
});
