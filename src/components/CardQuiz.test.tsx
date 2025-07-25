import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { CardQuiz } from './CardQuiz';
import { useStore } from '../store/store';

import { beforeEach, describe, expect, it, vi } from 'vitest';
import React from 'react';

// Define the spy before the mock call
const mockGetQuizQuestions = vi.fn();

// Mock the service, using the spy in the factory
vi.mock('../services/quiz.service', () => ({
  getQuizQuestions: mockGetQuizQuestions, // Use the predefined spy here
}));

// Mock the child components to simplify testing CardQuiz
vi.mock('./IsQuizLoanding', () => ({
  default: () => React.createElement('div', { 'data-testid': 'loading' }, 'Cargando preguntas...'),
}));

vi.mock('./IsQuizEmpty', () => ({
  default: ({ message }: { message: string }) => React.createElement('div', { 'data-testid': 'empty' }, message),
}));

vi.mock('./IsQuizError', () => ({
  default: ({ message, onRetry }: { message: string; onRetry?: () => void }) => (
    React.createElement('div', { 'data-testid': 'error' },
      React.createElement('div', null, message),
      onRetry && React.createElement('button', { onClick: onRetry }, 'Retry')
    )
  ),
}));

vi.mock('./Question', () => ({
  Question: ({ currentQuestion }: any) => React.createElement('div', { 'data-testid': 'question' }, currentQuestion.question),
}));


// Util: render with React Query client
const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(React.createElement(QueryClientProvider, { client: queryClient }, ui));
};

describe('CardQuiz Component', () => {
  const mockRefetch = vi.fn();
  const mockDecreaseQuestion = vi.fn();
  const mockIncreaseQuestion = vi.fn();
  const mockResetQuizUI = vi.fn();

  // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock for useStore
    (useStore as any).mockReturnValue({
      indexQuestion: 0,
      answeredQuestions: {},
      decreaseQuestion: mockDecreaseQuestion,
      increaseQuestion: mockIncreaseQuestion,
      resetQuizUI: mockResetQuizUI,
    });
    // Reset the mock implementation for getQuizQuestions and useQuery
    mockGetQuizQuestions.mockResolvedValue([
        { id: 1, question: 'Q1', code: null, answer: [], correctAnswer: 0 },
        { id: 2, question: 'Q2', code: null, answer: [], correctAnswer: 1 },
    ]);

     (useQuery as any).mockReturnValue({
        data: [{
        id: 1,
        question: 'Q1',
        answer: [],
        correctAnswer: 0
      }, {
        id: 2,
        question: 'Q2',
        answer: [],
        correctAnswer: 0
      }],
        isLoading: false,
        isError: false,
        error: null,
        refetch: mockRefetch,
     });
  });

  it('renders loading state', () => {
    // Mock useQuery to return a pending promise for loading state
     (useQuery as any).mockReturnValue({
        isLoading: true,
        isError: false,
        data: undefined,
        error: null,
        refetch: mockRefetch,
     });

    renderWithClient(React.createElement(CardQuiz, null));
    expect(screen.getByText('Cargando preguntas...')).toBeInTheDocument();
  });

  it('renders error state with retry button', async () => {
     const mockError = {
      statusCode: 500,
      message: 'Internal Error',
    };
    // Mock useQuery to show error state
    (useQuery as any).mockReturnValue({
        isLoading: false,
        isError: true,
        data: undefined,
        error: mockError,
        refetch: mockRefetch,
    });


    renderWithClient(React.createElement(CardQuiz, null));
    // Check for error message and retry button from your mocked component
    expect(await screen.findByText('Internal Error')).toBeInTheDocument();
    const retryButton = await screen.findByRole('button', { name: /retry/i });
    expect(retryButton).toBeInTheDocument();
    fireEvent.click(retryButton);
    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });


   it('renders empty state', async () => {
     // Mock useQuery to show empty state
      (useQuery as any).mockReturnValue({
        isLoading: false,
        isError: false,
        data: [],
        error: null,
        refetch: mockRefetch,
     });

    renderWithClient(React.createElement(CardQuiz, null));
    // Check for empty message from your mocked component
    expect(await screen.findByText('No quiz questions available at the moment.')).toBeInTheDocument();
  });


  it('renders quiz and handles navigation buttons', async () => {
     // Use default useQuery mock return for successful data load (2 questions)
    (useQuery as any).mockReturnValue({
      data: [{
        id: 1,
        question: 'Q1',
        answer: [],
        correctAnswer: 0
      }, {
        id: 2,
        question: 'Q2',
        answer: [],
        correctAnswer: 0
      }],
      isLoading: false, isError: false, error: null, refetch: mockRefetch,
    });
     (useStore as any).mockReturnValue({
        indexQuestion: 0,
        answeredQuestions: {},
        decreaseQuestion: mockDecreaseQuestion,
        increaseQuestion: mockIncreaseQuestion,
        resetQuizUI: mockResetQuizUI,
    });


    renderWithClient(React.createElement(CardQuiz, null));

    // Render first question (assuming your mocked Question component renders the question text)
    expect(await screen.findByText('Q1')).toBeInTheDocument(); // Changed assertion to match mock data

    const nextBtn = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextBtn);
    expect(mockIncreaseQuestion).toHaveBeenCalledTimes(1);


    // Reset mock counts for the next interaction test
    vi.clearAllMocks();
     // Re-mock useStore with updated index for the next test step
     (useStore as any).mockReturnValue({
        indexQuestion: 1,
        answeredQuestions: {},
        decreaseQuestion: mockDecreaseQuestion, // Need to mock again after clearAllMocks
        increaseQuestion: mockIncreaseQuestion, // Need to mock again after clearAllMocks
        resetQuizUI: mockResetQuizUI, // Need to mock again after clearAllMocks
    });
     // Ensure useQuery mock still resolves with data for subsequent renders if needed
      (useQuery as any).mockReturnValue({
        data: [{
        id: 1,
        question: 'Q1',
        answer: [],
        correctAnswer: 0
      }, {
        id: 2,
        question: 'Q2',
        answer: [],
        correctAnswer: 0
      }],
        isLoading: false,
        isError: false,
        error: null,
        refetch: mockRefetch,
     });


    renderWithClient(React.createElement(CardQuiz, null)); // Re-render with updated store state

    // Check if the second question is rendered after incrementing the index (mocked Question renders question text)
    // You might need to adjust this assertion based on how your Question mock works
    expect(await screen.findByText('Q2')).toBeInTheDocument(); // Changed assertion to match mock data

    const prevBtn = screen.getByRole('button', { name: /back/i });
    fireEvent.click(prevBtn);
    expect(mockDecreaseQuestion).toHaveBeenCalledTimes(1);

  });


  it('resets quiz with "Reset Quiz" button', async () => {
     // Mock useStore to simulate being in the middle of the quiz
     (useStore as any).mockReturnValue({
        indexQuestion: 5,
        answeredQuestions: {1:0, 2:1},
        decreaseQuestion: mockDecreaseQuestion,
        increaseQuestion: mockIncreaseQuestion,
        resetQuizUI: mockResetQuizUI,
    });
    // Use default useQuery mock return which has data
    (useQuery as any).mockReturnValue({
      data: [{
        id: 1,
        question: 'Q1',
        answer: [],
        correctAnswer: 0
      }],
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
    });


    renderWithClient(React.createElement(CardQuiz, null));
    const resetButton = screen.getByRole('button', { name: /reset quiz/i });
    fireEvent.click(resetButton);

    expect(mockRefetch).toHaveBeenCalledTimes(1);
    expect(mockResetQuizUI).toHaveBeenCalledTimes(1);
    expect(mockDecreaseQuestion).not.toHaveBeenCalled();
    expect(mockIncreaseQuestion).not.toHaveBeenCalled();
  });


    it('Next button should be disabled on the last question', () => {
        // Mock useStore state for the last question
         (useStore as any).mockReturnValue({
            indexQuestion: 1,
            answeredQuestions: {},
            decreaseQuestion: mockDecreaseQuestion,
            increaseQuestion: mockIncreaseQuestion,
            resetQuizUI: mockResetQuizUI,
        });
        // Use default useQuery mock return which has 2 questions
         (useQuery as any).mockReturnValue({
            data: [{
        id: 1,
        question: 'Q1',
        answer: [],
        correctAnswer: 0
      }, {
        id: 2,
        question: 'Q2',
        answer: [],
        correctAnswer: 0
      }],
            isLoading: false,
            isError: false,
            error: null,
            refetch: mockRefetch,
        });


        renderWithClient(React.createElement(CardQuiz, null));
        const nextButton = screen.getByRole('button', { name: /next/i });
        expect(nextButton).toBeDisabled();
         // Check for the 'invisible' class if your component hides it
         expect(nextButton).toHaveClass('invisible');
    });

    it('Back button should be disabled on the first question', () => {
         // Mock useStore state for the first question
         (useStore as any).mockReturnValue({
            indexQuestion: 0,
             answeredQuestions: {},
             decreaseQuestion: mockDecreaseQuestion,
            increaseQuestion: mockIncreaseQuestion,
            resetQuizUI: mockResetQuizUI,
        });
        // Use default useQuery mock return which has 2 questions
         (useQuery as any).mockReturnValue({
            data: [{
        id: 1,
        question: 'Q1',
        answer: [],
        correctAnswer: 0
      }, {
        id: 2,
        question: 'Q2',
        answer: [],
        correctAnswer: 0
      }],
            isLoading: false,
            isError: false,
            error: null,
            refetch: mockRefetch,
        });

        renderWithClient(React.createElement(CardQuiz, null));
        const backButton = screen.getByRole('button', { name: /back/i });
        expect(backButton).toBeDisabled();
         // Check for the 'invisible' class if your component hides it
         expect(backButton).toHaveClass('invisible');
    });

});