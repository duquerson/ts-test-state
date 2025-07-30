import { create } from 'zustand'

type QuizState = {
	currentQuestionIndex: number
	userAnswers: Record<number, number | null | undefined>
	resetQuiz: () => void
	goToNextQuestion: () => void
	goToPreviousQuestion: () => void
	saveAnswer: (selectedAnswerId: number) => void
}

export const useQuizStore = create<QuizState>((set, get) => ({
	currentQuestionIndex: 0,
	userAnswers: {},

	resetQuiz: () => {
		set({ currentQuestionIndex: 0, userAnswers: {} })
	},

	goToNextQuestion: () => {
		set((state) => ({ currentQuestionIndex: state.currentQuestionIndex + 1 }))
	},

	goToPreviousQuestion: () => {
		set((state) => ({
			currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0)
		}))
	},

	saveAnswer: (selectedAnswerId) => {
		const { currentQuestionIndex } = get()
		set((state) => ({
			userAnswers: {
				...state.userAnswers,
				[currentQuestionIndex]: selectedAnswerId
			}
		}))
	}
}))
