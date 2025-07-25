import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Question } from './Question';
import React from 'react';
import { AnswersQuestion } from './AnswersQuestion';

// Mock the AnswersQuestion component
vi.mock('./AnswersQuestion', () => ({
  AnswersQuestion: vi.fn(() => React.createElement('div', { 'data-testid': 'mock-answers-question' })),
}));

describe('Question', () => {
  it('should render the question text and AnswersQuestion component', () => {
    const mockQuestion = {
      id: 1,
      question: 'What is the capital of Spain?',
      answer: [{ id: 0, text: 'Paris' }, { id: 1, text: 'Madrid' }],
      correctAnswer: 1,
    };

    render(React.createElement(Question, { currentQuestion: mockQuestion }));

    // Check if the question text is rendered
    expect(screen.getByText('What is the capital of Spain?')).toBeDefined();

    // Check if the mocked AnswersQuestion component is rendered
    expect(screen.getByTestId('mock-answers-question')).toBeDefined();

    // Optional: Verify that AnswersQuestion was called with the correct props
    expect(AnswersQuestion).toHaveBeenCalledWith(
        {
            answer: mockQuestion.answer,
            correctAnswer: mockQuestion.correctAnswer
        },
        {} // React's second argument for createElement, usually empty for functional components
    );
  });
});
