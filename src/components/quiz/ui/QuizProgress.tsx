import type { JSX } from 'react'

type Props = {
	current: number
	total: number
}

export const QuizProgress = ({ current, total }: Props): JSX.Element => {
	return (
		<footer className="text-center min-h-[40px] flex items-center justify-center mt-2">
			<h3 className="text-lg text-white font-bold tracking-widest transition-opacity duration-300 ease-in-out">
				{current } / {total}
			</h3>
		</footer>
	)
}
