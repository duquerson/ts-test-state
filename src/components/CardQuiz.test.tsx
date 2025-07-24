import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CardQuiz } from './CardQuiz'; // Import the component
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useStore } from '../store/store';

// Mock the hooks
vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}));

vi.mock('../store/store', () => ({
  useStore: vi.fn(),
}));

describe('CardQuiz', () => {
  it('should render loading state initially', () => {
    // Mock the useQuery hook to return loading state
    (useQuery as any).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      refetch: vi.fn(),
    });

    // Mock the useStore hook (provide minimal required state and actions)
    (useStore as any).mockReturnValue({
      indexQuestion: 0,
      answeredQuestions: {}, // Provide answeredQuestions
      decreaseQuestion: vi.fn(),
      increaseQuestion: vi.fn(),
      resetQuizUI: vi.fn(),
    });

    render(React.createElement(CardQuiz, null)); // Render without props

    // Check if the loading component is rendered with the correct text
    expect(screen.getByText('Cargando preguntas...')).toBeDefined();
  });

  it('should render error state if fetching fails', () => {
    // Mock useQuery to return an error state
    (useQuery as any).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      refetch: vi.fn(),
    });

    // Mock useStore
    (useStore as any).mockReturnValue({
      indexQuestion: 0,
      answeredQuestions: {}, // Provide answeredQuestions
      decreaseQuestion: vi.fn(),
      increaseQuestion: vi.fn(),
      resetQuizUI: vi.fn(),
    });

    render(React.createElement(CardQuiz, null)); // Render without props

    // Check if the error component is rendered with the correct text
    expect(screen.getByText('404 not found')).toBeDefined();
  });

  it('should render the quiz questions when data is loaded', () => {
    // Mock useQuery to return loaded data
    const mockQuizData = [
      {
        id: 1,
        question: 'What is the capital of France?',
        answer: ['London', 'Berlin', 'Paris', 'Madrid'],
        correctAnswer: 2,
      },
      // Add more mock questions as needed
    ];
    (useQuery as any).mockReturnValue({
      data: mockQuizData,
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    });

    // Mock useStore
    (useStore as any).mockReturnValue({
      indexQuestion: 0,
      answeredQuestions: {}, // Provide answeredQuestions
      decreaseQuestion: vi.fn(),
      increaseQuestion: vi.fn(),
      resetQuizUI: vi.fn(),
    });

    render(React.createElement(CardQuiz, null)); // Render without props

    // Check if the first question is rendered
    expect(screen.getByText('What is the capital of France?')).toBeDefined();
    // Check if answer options are rendered (you might need to adjust this based on how AnswerQuestion renders)
    // You might need to mock the AnswerQuestion component or provide more detailed mock data
    // to accurately test the rendering of answer options.
    // For now, let's just check for the question text.
  });

  // Add more test cases to cover button interactions, navigation, etc.
});
