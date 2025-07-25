import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CardQuiz } from '../CardQuiz';
import { useStore } from '../../store/store';
import * as quizService from '../../services/quiz.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mocks
vi.mock('../../services/quiz.service', () => ({
  getQuizQuestions: vi.fn(),
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
});

// Util: render with React Query client
const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe('CardQuiz Component', () => {
  it('renders loading state', () => {
    vi.spyOn(quizService, 'getQuizQuestions').mockReturnValue(new Promise(() => {}));
    renderWithClient(<CardQuiz />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state with retry button', async () => {
    const refetchMock = vi.fn();
    vi.spyOn(quizService, 'getQuizQuestions').mockRejectedValue({
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
    vi.spyOn(quizService, 'getQuizQuestions').mockResolvedValue([]);

    renderWithClient(<CardQuiz />);
    expect(await screen.findByText(/no quiz questions available/i)).toBeInTheDocument();
  });

  it('renders quiz and handles navigation buttons', async () => {
    vi.spyOn(quizService, 'getQuizQuestions').mockResolvedValue([
      { id: 1, question: 'Question 1', code: null, answer: [], correctAnswer: 0 },
      { id: 2, question: 'Question 2', code: null, answer: [], correctAnswer: 1 },
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
    vi.spyOn(quizService, 'getQuizQuestions').mockResolvedValue([
      { id: 1, question: 'Question 1', code: null, answer: [], correctAnswer: 0 },
    ]);

    renderWithClient(<CardQuiz />);
    expect(await screen.findByText('Question 1')).toBeInTheDocument();

    const resetBtn = screen.getByRole('button', { name: /reset quiz/i });
    fireEvent.click(resetBtn);

    // After reset, it should re-render same question (since data doesn't change)
    expect(await screen.findByText('Question 1')).toBeInTheDocument();
  });
});
