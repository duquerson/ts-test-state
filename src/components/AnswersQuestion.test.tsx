import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { AnswersQuestion } from './AnswersQuestion';
import React from 'react';
import { useStore } from '../store/quiz.store';
import { getAnswerButtonClasses } from '../utils/classQuestion';

// Mock useStore
vi.mock('../store/store');

// Mock getAnswerButtonClasses
vi.mock('../utils/classQuestion', () => ({
  getAnswerButtonClasses: vi.fn((hasBeenAnswered, isCorrectAnswer, isUserAnswer) => {
    if (!hasBeenAnswered) return 'default-class';
    if (isUserAnswer && isCorrectAnswer) return 'correct-user-class';
    if (isUserAnswer && !isCorrectAnswer) return 'incorrect-user-class';
    if (!isUserAnswer && isCorrectAnswer) return 'correct-other-class';
    return 'default-answered-class';
  }),
}));

describe('AnswersQuestion', () => {
  const mockAnswers = [
    { id: 0, text: 'Answer A' },
    { id: 1, text: 'Answer B' },
    { id: 2, text: 'Answer C' },
  ];
  const correctAnswer = 1;
  const mockAnswerQuestion = vi.fn();

  beforeEach(() => {
    vi.mocked(useStore).mockReturnValue({
      answeredQuestions: {},
      indexQuestion: 0,
      answerQuestion: mockAnswerQuestion,
      questions: [],
      resetQuizUI: vi.fn(),
      increaseQuestion: vi.fn(),
      decreaseQuestion: vi.fn(),
    });
    mockAnswerQuestion.mockClear();
    vi.mocked(getAnswerButtonClasses).mockClear();
    cleanup();
  });

  // Para que los botones tengan data-testid, tu componente AnswersQuestion debe usar algo así:
  // <button data-testid={`answer-button-${answer.id}`}>{answer.text}</button>
  // Si no, debes modificarlo para facilitar testeo sin ambigüedad.

  it('renders answer options as buttons', () => {
    render(<AnswersQuestion answer={mockAnswers} correctAnswer={correctAnswer} />);
    const answerButtons = screen.getAllByRole('button');
    expect(answerButtons.length).toBe(mockAnswers.length);
    mockAnswers.forEach((answer) => {
      expect(screen.getByText(answer.text)).toBeDefined();
    });
  });

  it('calls answerQuestion with correct arguments on button click', () => {
    render(<AnswersQuestion answer={mockAnswers} correctAnswer={correctAnswer} />);
    const btn = screen.getByText('Answer B');
    fireEvent.click(btn);
    expect(mockAnswerQuestion).toHaveBeenCalledWith(0, 1);
    expect(mockAnswerQuestion).toHaveBeenCalledTimes(1);
  });

  it('disables buttons after answer is selected', () => {
    vi.mocked(useStore).mockReturnValue({
      answeredQuestions: { 0: 0 },
      indexQuestion: 0,
      answerQuestion: mockAnswerQuestion,
      questions: [],
      resetQuizUI: vi.fn(),
      increaseQuestion: vi.fn(),
      decreaseQuestion: vi.fn(),
    });

    render(<AnswersQuestion answer={mockAnswers} correctAnswer={correctAnswer} />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });

  it('applies correct classes when user selects correct answer', () => {
    vi.mocked(useStore).mockReturnValue({
      answeredQuestions: { 0: 1 }, // user selected id 1, correct answer
      indexQuestion: 0,
      answerQuestion: mockAnswerQuestion,
      questions: [],
      resetQuizUI: vi.fn(),
      increaseQuestion: vi.fn(),
      decreaseQuestion: vi.fn(),
    });

    render(<AnswersQuestion answer={mockAnswers} correctAnswer={correctAnswer} />);

    expect(screen.getByTestId('answer-button-0')).toHaveClass('default-answered-class');
    expect(screen.getByTestId('answer-button-1')).toHaveClass('correct-user-class');
    expect(screen.getByTestId('answer-button-2')).toHaveClass('default-answered-class');
  });

  it('applies correct classes when user selects incorrect answer', () => {
    vi.mocked(useStore).mockReturnValue({
      answeredQuestions: { 0: 0 }, // user selected id 0, correct answer is 1
      indexQuestion: 0,
      answerQuestion: mockAnswerQuestion,
      questions: [],
      resetQuizUI: vi.fn(),
      increaseQuestion: vi.fn(),
      decreaseQuestion: vi.fn(),
    });

    render(<AnswersQuestion answer={mockAnswers} correctAnswer={correctAnswer} />);

    expect(screen.getByTestId('answer-button-0')).toHaveClass('incorrect-user-class');
    expect(screen.getByTestId('answer-button-1')).toHaveClass('correct-other-class');
    expect(screen.getByTestId('answer-button-2')).toHaveClass('default-answered-class');
  });
});
