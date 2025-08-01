import type { z } from 'zod'

import type { QuestionSchema, AnswerSchema } from '../schemas/question.schema'

type AnswerType = z.infer<typeof AnswerSchema>
type QuestionType = z.infer<typeof QuestionSchema>

export type { QuestionType, AnswerType }

export type QuizUIState = {
	currentQuestionIndex: number 	// Índice de la pregunta actual
	answers: {
		byQuestionId: Record<number, number> // Mapa de respuestas por ID de pregunta
	}
}
export type QuizUIActions = {
	// Acciones para respuestas
	saveAnswer: (answerId: number) => void
	clearAnswer: () => void

	// Acciones de navegación
	setCurrentQuestionIndex: (index: number) => void
	goToNextQuestion: (totalQuestions: number) => void
	goToPreviousQuestion: () => void

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
		stats?: QuizStats
	}
	state: {
		isQuizLoading: boolean
		isQuizError: boolean
		errorMessage: string | null
	}
	handlers: {
		handleAnswerSelect: (answerId: number) => void
		handleReset: () => void
		handleRetry: () => void
		goToNextQuestion: (allQuestions: number) => void
		goToPreviousQuestion: () => void
		getAnswerClass: (answerId: number) => string
	}
}
