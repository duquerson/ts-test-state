import { useQuery } from '@tanstack/react-query'

import { ANSWER_CLASSES } from '../config/constants'
import { getQuizQuestions } from '../services/quiz.service'
import { useQuizStore } from '../store/quiz.store'
import type { FetchError } from '../types/api'
import type { QuestionType, returnUseQuiz } from '../types/quiz'

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
		staleTime: 60 * 1000
	})

	// Estado del quiz desde el store
	const {
		currentQuestionIndex,
		userAnswers,
		goToNextQuestion,
		goToPreviousQuestion,
		resetQuiz,
		saveAnswer
	} = useQuizStore()

	const currentQuestion = allQuestions[currentQuestionIndex] || null

	// Respuesta actual del usuario
	const currentAnswer = userAnswers[currentQuestionIndex]

	// Verificar si ya respondió esta pregunta
	const isAnswered = currentAnswer !== undefined

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
	// Verificar si es la última pregunta
	const isLastQuestion = Array.isArray(allQuestions) &&
	currentQuestionIndex === allQuestions.length - 1

	// Verificar si es la primera pregunta
	const isFirstQuestion = currentQuestionIndex === 0
	// total Questions
	const totalQuestions = allQuestions.length - 1
	// Calcular progreso
	/* const progress = allQuestions.length > 0
		? ((currentQuestionIndex + 1) / allQuestions.length) * 100
		: 0 */

	// Calcular estadísticas
	/* const answeredQuestions = Object.keys(userAnswers).length
	const correctAnswers = Object.entries(userAnswers).filter(
		([index, answer]) => allQuestions[Number(index)]?.correctAnswer === answer
	).length */

	return {
		// Data del quiz
		data: {
			currentQuestion,
			userAnswers,
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
			quizError
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
