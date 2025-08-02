import type { JSX } from 'react'

import { Button } from './Button'

type Props = {
	message?: string | null | undefined
	onRetry: () => void
	retryText?: string
}

export const IsQuizError = ({
	message = 'An unexpected error occurred.',
	onRetry,
	retryText = 'Try Again'
}: Props): JSX.Element => {
	const BASE_CONTAINER = 'w-full max-w-3xl mx-auto px-4'
	const CARD_CONTAINER = 'bg-slate-800 rounded-2xl p-4 shadow-md'
	return (
		<main className={BASE_CONTAINER}>
			<article className={CARD_CONTAINER}>
				<header className="flex-1 py-4">
					<h2 className="text-center text-white font-extrabold text-2xl">
						{message}
					</h2>
				</header>
				<nav
					className="grid justify-center items-center min-h-[60px] mt-4"
					aria-label="Controles del quiz"
				>
					<Button text={retryText} onClick={onRetry} variant='reset' position='center'/>
				</nav>
			</article>
		</main>
	)
}
