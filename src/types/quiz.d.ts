import type { z } from 'zod'

import type { QuestionSchema, AnswerSchema } from '../schemas/question.schema'

// ✅ Generamos todos los tipos desde los schemas
type AnswerType = z.infer<typeof AnswerSchema>
type QuestionType = z.infer<typeof QuestionSchema>

export type { QuestionType, AnswerType }
export type returnUseQuiz = {
	data: {
		currentQuestion: QuestionType | null
		userAnswers: Record<number, number | null | undefined>
		currentQuestionIndex: number
		isLastQuestion: boolean
		isFirstQuestion: boolean
		totalQuestions: number
		isAnswered: boolean
	}
	state: {
		isQuizLoading: boolean
		isQuizError: boolean
		quizError: FetchError | null
	}
	handlers: {
		handleAnswerSelect: (answer: number) => void
		handleReset: () => void
		handleRetry: () => void
		goToNextQuestion: () => void
		goToPreviousQuestion: () => void
		getAnswerClass: (optionValue: number) => string
	}
}
