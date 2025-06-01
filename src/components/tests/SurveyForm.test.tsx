import { render, screen, fireEvent, act } from "@testing-library/react";
import SurveyForm from "../surveys/SurveyForm";
import { QUESTIONS } from "../../constants/surveyQuestions";

jest.useFakeTimers();

describe("SurveyForm with timer mocking", () => {
  const mockSubmit = jest.fn();

  it("선택지 버튼 클릭 시 답변이 제출된다 (단계 변경은 부모에서 처리)", () => {
    render(
      <SurveyForm
        onSubmit={mockSubmit}
        currentStep={0}
        progress={0}
      />
    );
    fireEvent.click(screen.getByText(QUESTIONS[0].options[0]));
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(mockSubmit).toHaveBeenCalledWith({ Body: 0 });
  });

  it("마지막 질문에서 선택 후 onSubmit이 호출된다 (현재 구조에서는 항상 답변이 제출됨)", () => {
    render(
      <SurveyForm
        onSubmit={mockSubmit}
        currentStep={QUESTIONS.length - 1}
        progress={100}
      />
    );
    fireEvent.click(screen.getByText(QUESTIONS[QUESTIONS.length - 1].options[0]));
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(mockSubmit).toHaveBeenCalledWith({
      [QUESTIONS[QUESTIONS.length - 1].key]: 0,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
    mockSubmit.mockClear();
  });
});
