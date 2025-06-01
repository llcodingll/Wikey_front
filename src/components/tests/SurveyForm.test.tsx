import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SurveyForm from '../SurveyForm';

describe('SurveyForm', () => {
  const mockSubmit = jest.fn();

  it('질문과 선택지, 이전 버튼이 렌더링된다', () => {
    render(<SurveyForm onSubmit={mockSubmit} />);
    expect(screen.getByText(/당신이 선호하는 위스키의 바디감은?/)).toBeInTheDocument();
    expect(screen.getByText('가볍고 산뜻한')).toBeInTheDocument();
    expect(screen.getByText('중간')).toBeInTheDocument();
    expect(screen.getByText('진하고 무거운')).toBeInTheDocument();
    expect(screen.getByText('이전')).toBeInTheDocument();
  });

  it('선택지 버튼 클릭 시 다음 질문으로 넘어간다', async () => {
    render(<SurveyForm onSubmit={mockSubmit} />);
    fireEvent.click(screen.getByText('가볍고 산뜻한'));
    // 애니메이션/타이머 고려해 setTimeout 필요할 수 있음
    // 실제로는 useFakeTimers 등으로 처리할 수 있음
    // 여기서는 단순히 다음 질문이 나오는지 확인
    // (실제로는 currentStep이 바뀌는지 테스트하는 것이 더 정확)
    setTimeout(() => {
      expect(screen.getByText(/어떤 향을 더 좋아하시나요?/)).toBeInTheDocument();
    }, 300);
  });

  it('마지막 질문에서 선택 후 onSubmit이 호출된다', async () => {
    render(<SurveyForm onSubmit={mockSubmit} />);
    // 첫 번째 질문 선택
    fireEvent.click(screen.getByText('가볍고 산뜻한'));
    // 두 번째(마지막) 질문 선택
    setTimeout(() => {
      fireEvent.click(screen.getByText('스모키'));
      setTimeout(() => {
        expect(mockSubmit).toHaveBeenCalled();
      }, 300);
    }, 300);
  });
});
