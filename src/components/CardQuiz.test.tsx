import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CardQuiz } from './CardQuiz';
import { useStore } from '../store/store';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';


// Mocks - Corregir el path y crear el mock correctamente
const mockGetQuizQuestions = vi.fn();

vi.mock('../services/quiz.service', () => ({
  getQuizQuestions: mockGetQuizQuestions,
}));

vi.mock('../IsQuizLoanding', () => ({
  default: () => <div>Loading...</div>,
}));

vi.mock('../IsQuizEmpty', () => ({
  IsQuizEmpty: ({ message }: { message: string }) => <div>{message}</div>,
}));

vi.mock('../IsQuizError', () => ({
  IsQuizError: ({ message, onRetry }: { message: string; onRetry?: () => void }) => (
    <div>
      <div>{message}</div>
      {onRetry && <button onClick={onRetry}>Retry</button>}
    </div>
  ),
}));

vi.mock('../Question', () => ({
  Question: ({ currentQuestion }: any) => <div>{currentQuestion.question}</div>,
}));

// Reset Zustand store before each test
beforeEach(() => {
  const { getState } = useStore;
  getState().resetQuizUI?.();
  // Limpiar los mocks antes de cada test
  vi.clearAllMocks();
});

// Util: render with React Query client
const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Desactivar reintentos para tests más rápidos
      },
    },
  });
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe('CardQuiz Component', () => {
  it('renders loading state', () => {
    mockGetQuizQuestions.mockReturnValue(new Promise(() => {}));
    renderWithClient(<CardQuiz />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state with retry button', async () => {
    mockGetQuizQuestions.mockRejectedValue({
      statusCode: 500,
      message: 'Internal Error',
    });

    renderWithClient(<CardQuiz />);
    expect(await screen.findByText(/server encountered an error/i)).toBeInTheDocument();

    const retryButton = await screen.findByText('Retry');
    expect(retryButton).toBeInTheDocument();
    fireEvent.click(retryButton);
    // No assertion for now since `refetch` is from TanStack's hook
  });

  it('renders empty state', async () => {
    mockGetQuizQuestions.mockResolvedValue([]);

    renderWithClient(<CardQuiz />);
    expect(await screen.findByText(/no quiz questions available/i)).toBeInTheDocument();
  });

  it('renders quiz and handles navigation buttons', async () => {
    mockGetQuizQuestions.mockResolvedValue([
      { 
        id: 1, 
        question: 'Question 1', 
        code: null, 
        answer: [
          { id: 0, text: 'Answer 1' },
          { id: 1, text: 'Answer 2' }
        ], 
        correctAnswer: 0 
      },
      { 
        id: 2, 
        question: 'Question 2', 
        code: null, 
        answer: [
          { id: 0, text: 'Answer A' },
          { id: 1, text: 'Answer B' }
        ], 
        correctAnswer: 1 
      },
    ]);

    renderWithClient(<CardQuiz />);

    // Render first question
    expect(await screen.findByText('Question 1')).toBeInTheDocument();

    const nextBtn = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextBtn);
    expect(await screen.findByText('Question 2')).toBeInTheDocument();

    const prevBtn = screen.getByRole('button', { name: /previous/i });
    fireEvent.click(prevBtn);
    expect(await screen.findByText('Question 1')).toBeInTheDocument();
  });

  it('resets quiz with "Reset Quiz" button', async () => {
    mockGetQuizQuestions.mockResolvedValue([
      { 
        id: 1, 
        question: 'Question 1', 
        code: null, 
        answer: [
          { id: 0, text: 'Answer 1' },
          { id: 1, text: 'Answer 2' }
        ], 
        correctAnswer: 0 
      },
    ]);

    renderWithClient(<CardQuiz />);
    expect(await screen.findByText('Question 1')).toBeInTheDocument();

    const resetBtn = screen.getByRole('button', { name: /reset quiz/i });
    fireEvent.click(resetBtn);

    // After reset, it should re-render same question (since data doesn't change)
    expect(await screen.findByText('Question 1')).toBeInTheDocument();
  });
});