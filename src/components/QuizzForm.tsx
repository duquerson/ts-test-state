import { useStore } from '../store/store.ts'

export const QuizzForm: React.FC = () => {
	const {count, totalCount} = useStore();
	return (
		<>
			<section className="w-xl h-96 backdrop-blur backdrop-saturate-200 bg-white/20 border border-white/10 rounded-xl flex flex-col justify-center items-center">
			<h1>form</h1>
			</section>
			<span className="mt-2 ml-3 font-bold tracking-wider">{count} / {totalCount}</span>
		</>
	)
}
