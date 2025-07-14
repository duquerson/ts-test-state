import { create } from 'zustand'

type StoreState = {
	count: number
	increaseCount: () => void
	decreaseCount: () => void
	resetCount: () => void
}

export const useStore = create<StoreState>((set) => ({ // return always object
	count: 0,
	increaseCount: () => { set((state) => ({ count: state.count + 1 })) },
	resetCount: () => { set({ count: 0 }) },
	decreaseCount: () => { set((state) => ({ count: state.count - 1 })) }
}))
