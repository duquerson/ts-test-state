import { create } from 'zustand'
const TOTAL_QUESTIONS = 40;

type StoreState = {
	count: number
	totalCount: number
	increaseCount: () => void
	decreaseCount: () => void
}

export const useStore = create<StoreState>((set) => ({ // return always object
	count: 0,
	totalCount: TOTAL_QUESTIONS,
	increaseCount: () => { set((state) => ({ count: state.count + 1 })) },
	decreaseCount: () => { set((state) => ({ count: state.count - 1 })) }
}))
