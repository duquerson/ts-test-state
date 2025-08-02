import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'

import { ANSWER_CLASSES } from '../config/constants'
import { getQuizQuestions } from '../services/quiz.service'
import { useQuizUIStore } from '../store/quiz.store'
import type { FetchError } from '../types/api'
import type { QuestionType, returnUseQuiz } from '../types/quiz'
import { getQuizErrorMessage } from '../utils/errorHelpers'

const QUIZ_QUERY_CONFIG = {
	queryKey: ['quizTypescript'] as const,
	staleTime: 60 * 1000, // 1 minuto
	retry: 2,
	retryDelay: 1000
} as const

export const useQuiz = (): returnUseQuiz => {
	// Query para obtener las preguntas
	const {
		data: allQuestions = [],
		isLoading: isQuizLoading,
		isError: isQuizError,
		error: quizError,
		refetch
	} = useQuery<QuestionType[], FetchError>({
		...QUIZ_QUERY_CONFIG,
		queryFn: getQuizQuestions
	})

	// Estado del quiz desde el store
	const {
		currentQuestionIndex,
		answers,
		saveAnswer,
		resetQuiz,
		goToNextQuestion,
		goToPreviousQuestion
	} = useQuizUIStore()

	const totalQuestions = useMemo(() => allQuestions.length, [allQuestions])

	const currentQuestion = useMemo(
		() => allQuestions[currentQuestionIndex] || null,
		[allQuestions, currentQuestionIndex]
	)

	const currentAnswer = useMemo(() => {
		if (!currentQuestion) return undefined
		return answers.byQuestionId[currentQuestion.id]
	}, [answers, currentQuestion])

	const isAnswered = useMemo(() => {
		if (!currentQuestion) return false
		return answers.byQuestionId[currentQuestion.id] !== undefined
	}, [answers, currentQuestion])

	const isFirstQuestion = currentQuestionIndex === 0
	const isLastQuestion = currentQuestionIndex === totalQuestions - 1
	const errorMessage = isQuizError ? getQuizErrorMessage(quizError) : ''

	// Función para determinar la clase CSS de una respuesta
	// useCallback para evitar recrear la función en cada render
	const getAnswerClass = useCallback((optionValue: number): string => {
		if (!currentQuestion || !isAnswered) {
			return ANSWER_CLASSES.default
		}

		// Determinar el tipo de respuesta
		const isCorrectAnswer = optionValue === currentQuestion.correctAnswer
		const isUserSelection = optionValue === currentAnswer

		if (isCorrectAnswer) {
			return ANSWER_CLASSES.isCorrect
		}

		if (isUserSelection) {
			return ANSWER_CLASSES.isSelected
		}

		return ANSWER_CLASSES.isAnswered
	}, [currentQuestion, isAnswered, currentAnswer])

	// Handlers con useCallback para optimización de rendimiento
	const handleAnswerSelect = useCallback((questionId: number, answer: number): void => {
		if (!isAnswered) {
			saveAnswer(questionId, answer)
		}
	}, [isAnswered, saveAnswer])

	const handleRetry = useCallback((): void => {
		void refetch()
	}, [refetch])

	const handleReset = useCallback((): void => {
		resetQuiz()
		void refetch()
	}, [resetQuiz, refetch])

	// Wrapper para goToNextQuestion que incluye validación
	const optimizedGoToNextQuestion = useCallback((): void => {
		if (!isLastQuestion) {
			goToNextQuestion(totalQuestions)
		}
	}, [isLastQuestion, goToNextQuestion, totalQuestions])

	const optimizedGoToPreviousQuestion = useCallback((): void => {
		if (!isFirstQuestion) {
			goToPreviousQuestion()
		}
	}, [isFirstQuestion, goToPreviousQuestion])

	return {
		// Data del quiz
		data: {
			currentQuestion,
			currentQuestionIndex,
			isLastQuestion,
			isFirstQuestion,
			totalQuestions,
			isAnswered
		},
		// Estados
		state: {
			isQuizLoading,
			isQuizError,
			errorMessage
		},
		// Funciones
		handlers: {
			handleAnswerSelect,
			handleReset,
			handleRetry,
			goToNextQuestion: optimizedGoToNextQuestion,
			goToPreviousQuestion: optimizedGoToPreviousQuestion,
			getAnswerClass
		}
	}
}
