import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { ANSWER_CLASSES } from '../config/constants'
import { getQuizQuestions } from '../services/quiz.service'
import { useQuizUIStore } from '../store/quiz.store'
import type { FetchError } from '../types/api'
import type { QuestionType, returnUseQuiz } from '../types/quiz'
import { getQuizErrorMessage } from '../utils/errorHelpers'

export const useQuiz = (): returnUseQuiz => {
	// Query para obtener las preguntas
	const {
		data: allQuestions = [],
		isLoading: isQuizLoading,
		isError: isQuizError,
		error: quizError,
		refetch
	} = useQuery<QuestionType[], FetchError>({
		queryKey: ['quizTypescript'],
		queryFn: getQuizQuestions,
		staleTime: 60 * 1000,
		retry: 2,
		retryDelay: 1000
	})

	// Estado del quiz desde el store
	const {
		currentQuestionIndex,
		answers,
		saveAnswer,
		resetQuiz,
		goToNextQuestion, // recibe parametro totalQuestions
		goToPreviousQuestion
	} = useQuizUIStore()

	// Obtener mensaje de error formateado
	const errorMessage = isQuizError ? getQuizErrorMessage(quizError) : ''

	// Pregunta actual
	const currentQuestion = useMemo(
		() => allQuestions[currentQuestionIndex],
		[allQuestions, currentQuestionIndex]
	)
	// Respuesta actual
	const currentAnswer = useMemo(
		() => answers.byQuestionId[currentQuestionIndex],
		[answers, currentQuestionIndex]
	)
	// Determinar si la pregunta actual ya ha sido respondida
	const isAnswered = useMemo(
		() => answers.byQuestionId[currentQuestionIndex] !== undefined,
		[answers, currentQuestionIndex]
	)
	// Determinar el total de preguntas
	const totalQuestions = useMemo(
		() => allQuestions.length,
		[allQuestions]
	)

	const isFirstQuestion = currentQuestionIndex === 0
	const isLastQuestion = currentQuestionIndex === totalQuestions - 1

	// Función para determinar la clase CSS de una respuesta
	const getAnswerClass = (optionValue: number): string => {
		// Si no hay pregunta actual, usar clase por defecto
		if (!currentQuestion) return ANSWER_CLASSES.default

		// Si no ha respondido aún, usar clase por defecto
		if (!isAnswered) return ANSWER_CLASSES.default

		// Si ya respondió, mostrar resultado
		if (optionValue === currentQuestion.correctAnswer) {
			// Esta es la respuesta correcta
			return ANSWER_CLASSES.isCorrect
		} else if (optionValue === currentAnswer) {
			// Esta es la respuesta que eligió el usuario (incorrecta)
			return ANSWER_CLASSES.isSelected
		} else {
			// Las demás opciones se muestran deshabilitadas
			return ANSWER_CLASSES.isAnswered
		}
	}

	const handleAnswerSelect = (answer: number): void => {
		// Solo permitir responder si no ha respondido aún
		if (!isAnswered && currentQuestion) {
			saveAnswer(answer)
		}
	}

	const handleRetry = (): void => {
		void refetch()
	}

	const handleReset = (): void => {
		void refetch()
		resetQuiz()
	}

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
			goToNextQuestion,
			goToPreviousQuestion,
			getAnswerClass
		}
	}
}
