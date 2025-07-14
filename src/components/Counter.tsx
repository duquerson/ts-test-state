import { useStore } from '../store/store.ts'
import './Counter.css'

type CounterProps = {
	children?: React.ReactNode
}

export const Counter: React.FC<CounterProps> = ({ children }) => {
	const { count, increaseCount, decreaseCount } = useStore()
	return (
		<>
			<div className="counter">
				<button onClick={decreaseCount}>-</button>
				<pre>{count}</pre>
				<button onClick={increaseCount}>+</button>
			</div>
			<div className="counter-message">{children}</div>
		</>
	)
}
