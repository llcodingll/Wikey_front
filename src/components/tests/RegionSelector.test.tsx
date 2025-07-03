import { render, screen, fireEvent } from '@testing-library/react';
import RegionSelector from '../surveys/RegionSelector';

describe('RegionSelector', () => {
  const mockOnChange = jest.fn();
  const mockOnNext = jest.fn();

  it('지역 체크박스를 클릭하면 onChange가 호출된다', () => {
    render(<RegionSelector value={[]} onChange={mockOnChange} onNext={mockOnNext} />);
    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);
    expect(mockOnChange).toHaveBeenCalledWith(['Highland']);
  });

  it('지역을 선택하지 않으면 다음 버튼이 비활성화된다', () => {
    render(<RegionSelector value={[]} onChange={mockOnChange} onNext={mockOnNext} />);
    const button = screen.getByText('다음');
    expect(button).toBeDisabled();
  });

  it('지역을 선택하면 다음 버튼이 활성화되고, 클릭 시 onNext가 호출된다', () => {
    render(<RegionSelector value={[]} onChange={mockOnChange} onNext={mockOnNext} />);
    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);
    const button = screen.getByText('다음');
    expect(button).not.toBeDisabled();
    fireEvent.click(button);
    expect(mockOnNext).toHaveBeenCalled();
  });
});
