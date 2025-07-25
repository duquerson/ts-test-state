import { render, screen, fireEvent } from '@testing-library/react';
import { AnswersQuestion } from './AnswersQuestion';
import { useStore } from '../store/store';
import { beforeEach, expect, vi } from 'vitest';

// Mock useStore
vi.mock('../store/store', () => ({
  useStore: vi.fn(),
}));

// Mock getAnswerButtonClasses to return a simple class string
vi.mock('../utils/classQuestion', () => ({
  getAnswerButtonClasses: vi.fn(() => 'mocked-class'),
}));

describe('AnswersQuestion', () => {
  const mockAnswerQuestion = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useStore as any).mockReturnValue({
      indexQuestion: 0,
      answeredQuestions: {},
      answerQuestion: mockAnswerQuestion,
    });
  });

  const mockAnswers = [
    { id: 1, text: 'Answer A' },
    { id: 2, text: 'Answer B' },
    { id: 3, text: 'Answer C' },
  ];

  it('renders all answer buttons', () => {
    render(<AnswersQuestion answer={mockAnswers} correctAnswer={2} />);
    mockAnswers.forEach((a) => {
      expect(screen.getByText(a.text)).toBeInTheDocument();
    });
  });

  it('calls answerQuestion on click if not answered yet', () => {
    render(<AnswersQuestion answer={mockAnswers} correctAnswer={2} />);
    const button = screen.getByText('Answer A');
    fireEvent.click(button);
    expect(mockAnswerQuestion).toHaveBeenCalledWith(0, 1);
  });

  it('disables buttons if already answered', () => {
    (useStore as any).mockReturnValue({
      indexQuestion: 0,
      answeredQuestions: { 0: 1 },
      answerQuestion: mockAnswerQuestion,
    });

    render(<AnswersQuestion answer={mockAnswers} correctAnswer={2} />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });
});
