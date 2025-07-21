import { create } from 'zustand';
const TOTAL_QUESTIONS = 40;

type StoreState = {
	indexQuestion: number
	asnwerQuestion?: {
		index: number
	}
	increaseQuestion: () => void
	decreaseQuestion: () => void
}

export const useStore = create<StoreState>((set) => ({ // return always object
	indexQuestion: 0,
	increaseQuestion: () => { set((state) => ({ indexQuestion: state.indexQuestion + 1 })) },
	decreaseQuestion: () => { set((state) => ({ indexQuestion: state.indexQuestion - 1 })) }
}))
