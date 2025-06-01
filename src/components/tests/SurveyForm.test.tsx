import { render, screen, fireEvent, act } from "@testing-library/react";
import SurveyForm from "../surveys/SurveyForm";

jest.useFakeTimers();

describe("SurveyForm with timer mocking", () => {
  const mockSubmit = jest.fn();

  it("선택지 버튼 클릭 시 다음 질문으로 넘어간다", () => {
    render(<SurveyForm onSubmit={mockSubmit} />);
    fireEvent.click(screen.getByText("가볍고 산뜻한"));
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(screen.getByText(/어떤 향을 더 좋아하시나요?/)).toBeInTheDocument();
  });

  it("마지막 질문에서 선택 후 onSubmit이 호출된다", () => {
    render(<SurveyForm onSubmit={mockSubmit} />);
    fireEvent.click(screen.getByText("가볍고 산뜻한"));
    act(() => {
      jest.advanceTimersByTime(300);
    });
    fireEvent.click(screen.getByText("스모키"));
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(mockSubmit).toHaveBeenCalled();
  });

  afterEach(() => {
    jest.useRealTimers();
  });
});
