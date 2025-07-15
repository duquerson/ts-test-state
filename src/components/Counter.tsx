import { useStore } from '../store/store.ts'


type CounterProps = {
	children?: React.ReactNode
}

export const Counter: React.FC<CounterProps> = ({ children }) => {
	const { count, increaseCount, decreaseCount } = useStore()
	return (
		<>
			<div className="w-2xs h-40 flex justify-center p-3 items-center">
				<button onClick={decreaseCount}>-</button>
				<pre>{count}</pre>
				<button onClick={increaseCount}>+</button>
			</div>
			<div className="font-normal ">{children}</div>
		</>
	)
}
