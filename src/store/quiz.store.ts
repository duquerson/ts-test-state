import { create } from 'zustand'
import type { StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'

import type { QuizUIState, QuizUIActions } from '../types/quiz'

type QuizUIStore = QuizUIState & QuizUIActions

const initialState: QuizUIState = {
	currentQuestionIndex: 0,
	showResults: false,
	answers: {
		byQuestionId: {}
	}
}

const QuizStore: StateCreator<QuizUIStore> = (set, get) => ({
	...initialState,

	saveAnswer: (questionId, answerId) => {
		set((state) => ({
			answers: {
				...state.answers,
				byQuestionId: {
					...state.answers.byQuestionId,
					[questionId]: answerId
				}
			}
		}))
	},

	clearAnswer: (questionId) => {
		set((state) => {
			const { [questionId]: removed, ...rest } = state.answers.byQuestionId
			return {
				answers: {
					...state.answers,
					byQuestionId: rest
				}
			}
		})
	},

	setCurrentQuestionIndex: (index) => {
		set({ currentQuestionIndex: index })
	},

	goToNextQuestion: (totalQuestions) => {
		const { currentQuestionIndex } = get()
		if (currentQuestionIndex < totalQuestions - 1) {
			set({ currentQuestionIndex: currentQuestionIndex + 1 })
		}
	},

	goToPreviousQuestion: () => {
		const { currentQuestionIndex } = get()
		if (currentQuestionIndex > 0) {
			set({ currentQuestionIndex: currentQuestionIndex - 1 })
		}
	},

	resetQuiz: () => {
		set(initialState)
	},
	setShowResults: () => {
		set({ showResults: true })
	}
})

// for the devtools
const quizDevtools = devtools(QuizStore,
	{
		name: 'quiz-ui-store'
	})
export const useQuizUIStore = create<QuizUIStore>()(
	quizDevtools
)
