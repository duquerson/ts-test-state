import { create } from 'zustand';


type StoreState = {
	indexQuestion: number
	answeredQuestions: {[key: number]: number | null}
	resetQuizUI: ()=> void
	increaseQuestion: () => void
	decreaseQuestion: () => void
	answerQuestion:(ID: number, Index: number)=>void
}

export const useStore = create<StoreState>((set) => ({ // return always object
	indexQuestion: 0,
	answeredQuestions: {},
	resetQuizUI: () => set({ indexQuestion: 0, answeredQuestions: {} }),
	increaseQuestion: () => { set((state) => ({ indexQuestion: state.indexQuestion + 1 })) },
	decreaseQuestion: () => { set((state) => ({ indexQuestion: Math.max(state.indexQuestion - 1 ,0)})) },
	answerQuestion: (Id, Index) => set((state) => ({ 
		answeredQuestions: { 
		  ...state.answeredQuestions, 
		  [Id]: Index,   
		},
	  })),
}))
