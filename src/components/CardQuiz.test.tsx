import { useQuery } from '@tanstack/react-query'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { expect, vi } from 'vitest'

import { useStore } from '../store/quiz.store'

import { CardQuiz } from './CardQuiz'

vi.mock('../store/store', () => ({
	useStore: vi.fn()
}))

vi.mock('@tanstack/react-query', () => ({
	useQuery: vi.fn()
}))

vi.mock('./IsQuizLoanding', () => ({
	default: () => <div data-testid="loading" />
}))

vi.mock('./IsQuizEmpty', () => ({
	IsQuizEmpty: ({ message }: { message: string }) => (
		<div data-testid="empty">{message}</div>
	)
}))

vi.mock('./IsQuizError', () => ({
	IsQuizError: ({ message, onRetry }: { message: string, onRetry: () => void }) => (
		<div data-testid="error">
			<span>{message}</span>
			<button onClick={onRetry}>Retry</button>
		</div>
	)
}))

vi.mock('./Question', () => ({
	Question: ({ currentQuestion }: { currentQuestion: any }) => (
		<div data-testid="question">{currentQuestion?.question}</div>
	)
}))

describe('CardQuiz component', () => {
	const mockRefetch = vi.fn()
	const mockDecrease = vi.fn()
	const mockIncrease = vi.fn()
	const mockReset = vi.fn()

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders loading state', () => {
		(useQuery as any).mockReturnValue({
			data: undefined,
			isLoading: true,
			isError: false,
			error: null,
			refetch: mockRefetch
		});

		// mock useStore con valores default
		(useStore as any).mockReturnValue({
			indexQuestion: 0,
			decreaseQuestion: mockDecrease,
			increaseQuestion: mockIncrease,
			resetQuizUI: mockReset
		})

		render(<CardQuiz />)
		expect(screen.getByTestId('loading')).toBeInTheDocument()
	})

	it('renders error state and retries', () => {
		const error = { message: 'Error!', statusCode: 500 };
		(useQuery as any).mockReturnValue({
			data: undefined,
			isLoading: false,
			isError: true,
			error,
			refetch: mockRefetch
		});

		(useStore as any).mockReturnValue({
			indexQuestion: 0,
			decreaseQuestion: mockDecrease,
			increaseQuestion: mockIncrease,
			resetQuizUI: mockReset
		})

		render(<CardQuiz />)
		expect(screen.getByTestId('error')).toBeInTheDocument()
		expect(screen.getByText(/server encountered an error/i)).toBeInTheDocument()

		fireEvent.click(screen.getByText(/Retry/i))
		expect(mockRefetch).toHaveBeenCalled()
	})

	it('renders empty state if no questions', () => {
		(useQuery as any).mockReturnValue({
			data: [],
			isLoading: false,
			isError: false,
			error: null,
			refetch: mockRefetch
		});

		(useStore as any).mockReturnValue({
			indexQuestion: 0,
			decreaseQuestion: mockDecrease,
			increaseQuestion: mockIncrease,
			resetQuizUI: mockReset
		})

		render(<CardQuiz />)
		expect(screen.getByTestId('empty')).toBeInTheDocument()
		expect(screen.getByText(/no quiz questions available/i)).toBeInTheDocument()
	})

	it('renders current question and navigation buttons', () => {
		const quizData = [
			{ question: 'Question 1', answer: ['a', 'b'], correctAnswer: 'a' },
			{ question: 'Question 2', answer: ['c', 'd'], correctAnswer: 'c' },
			{ question: 'Question 3', answer: ['e', 'f'], correctAnswer: 'e' }
		];

		(useQuery as any).mockReturnValue({
			data: quizData,
			isLoading: false,
			isError: false,
			error: null,
			refetch: mockRefetch
		});

		// indexQuestion en medio para habilitar botones
		(useStore as any).mockReturnValue({
			indexQuestion: 1,
			decreaseQuestion: mockDecrease,
			increaseQuestion: mockIncrease,
			resetQuizUI: mockReset
		})

		render(<CardQuiz />)

		const backButton = screen.getByText(/Back/i)
		const resetButton = screen.getByText(/Reset Quiz/i)
		const nextButton = screen.getByText(/Next/i)

		expect(backButton).toBeEnabled()
		expect(resetButton).toBeEnabled()
		expect(nextButton).toBeEnabled()

		fireEvent.click(backButton)
		expect(mockDecrease).toHaveBeenCalled()

		fireEvent.click(resetButton)
		expect(mockRefetch).toHaveBeenCalled()
		expect(mockReset).toHaveBeenCalled()

		fireEvent.click(nextButton)
		expect(mockIncrease).toHaveBeenCalled()

		expect(screen.getByTestId('question')).toHaveTextContent('Question 2')
	})
})
