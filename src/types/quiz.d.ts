import type { z } from 'zod'

import type { QuestionSchema, AnswerSchema } from '../schemas/question.schema'

type AnswerType = z.infer<typeof AnswerSchema>
type QuestionType = z.infer<typeof QuestionSchema>

export type { QuestionType, AnswerType }

export type QuizUIState = {
	showResults: boolean 	// Indica si se deben mostrar los resultados
	currentQuestionIndex: number 	// Índice de la pregunta actual
	answers: {
		byQuestionId: Record<number, number> // Mapa de respuestas por ID de pregunta
	}
}
export type QuizUIActions = {
	// Acciones para respuestas
	saveAnswer: (questionId: number, answerId: number) => void
	clearAnswer: (questionId: number) => void

	// Acciones de navegación
	setCurrentQuestionIndex: (index: number) => void
	goToNextQuestion: (totalQuestions: number) => void
	goToPreviousQuestion: () => void
	// showResults
	setShowResults: () => void
	// Reset del quiz
	resetQuiz: () => void
}

export type QueryQuestions = {
	byId: Record<number, QuestionType> // Mapa de preguntas por ID
	allIds: number[] // Lista de IDs de preguntas
}

export type QuizStats = {
	answeredCount: number
	correctCount: number
	incorrectCount: number
}
export type returnUseQuiz = {
	data: {
		currentQuestion: QuestionType | null
		currentQuestionIndex: number
		isLastQuestion: boolean
		isFirstQuestion: boolean
		totalQuestions: number
		isAnswered: boolean
		correctAnswersCount: number
		incorrectAnswersCount: number
		allQuestionsAnswered: boolean
		showResults: boolean
	}
	state: {
		isQuizLoading: boolean
		isQuizError: boolean
		errorMessage: string | null
	}
	handlers: {
		handleAnswerSelect: (questionId: number, answerId: number) => void
		handleReset: () => void
		handleRetry: () => void
		handleshowResults: () => void
		goToNextQuestion: () => void
		goToPreviousQuestion: () => void
		getAnswerClass: (answerId: number) => string
	}
}
