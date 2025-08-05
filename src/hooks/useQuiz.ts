import { useQuery } from '@tanstack/react-query'
import confetti from 'canvas-confetti'
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
		showResults,
		saveAnswer,
		resetQuiz,
		goToNextQuestion,
		goToPreviousQuestion,
		setShowResults
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

	const answeredQuestionsCount = useMemo(() => {
		return Object.keys(answers.byQuestionId).length
	}, [answers])

	const allQuestionsAnswered = useMemo(() => {
		return answeredQuestionsCount === totalQuestions && totalQuestions > 0
	}, [answeredQuestionsCount, totalQuestions])

	const { correctAnswersCount, incorrectAnswersCount } = useMemo(() => {
		let correct = 0
		let incorrect = 0

		for (const questionId in answers.byQuestionId) {
			const userAnswerId = answers.byQuestionId[questionId]
			const question = allQuestions.find(q => q.id === Number(questionId))

			if (question) {
				if (userAnswerId === question.correctAnswer) {
					correct++
				} else {
					incorrect++
				}
			}
		}

		return { correctAnswersCount: correct, incorrectAnswersCount: incorrect }
	}, [answers, allQuestions])

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
		if (currentQuestion.correctAnswer === answer) {
			confetti({
				particleCount: 80,
				spread: 100,
				origin: { y: 0.6 },
				ticks: 100,
				decay: 0.85

			})
		}
	}, [isAnswered, saveAnswer, currentQuestion])

	const handleshowResults = useCallback((): void => {
		// store dispatch
		setShowResults()
	}, [showResults])

	const handleRetry = useCallback((): void => {
		refetch().catch(error => {
			console.error('Error refetching quiz:', error)
		})
	}, [refetch])

	const handleReset = useCallback((): void => {
		resetQuiz()

		// Función async interna
		const performReset = async (): Promise<void> => {
			try {
				await refetch()
			} catch (error) {
				console.error('Error refetching quiz after reset:', error)
			}
		}

		// Ejecutar pero ignorar la promesa
		void performReset()
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
			isAnswered,
			correctAnswersCount,
			incorrectAnswersCount,
			allQuestionsAnswered,
			showResults
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
			handleshowResults,
			goToNextQuestion: optimizedGoToNextQuestion,
			goToPreviousQuestion: optimizedGoToPreviousQuestion,
			getAnswerClass
		}
	}
}
