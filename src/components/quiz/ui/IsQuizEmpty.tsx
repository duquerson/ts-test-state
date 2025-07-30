import type { JSX } from 'react'

interface Props {
	message?: string
}

export const IsQuizEmpty = ({
	message = 'No quiz questions available.'
}: Props): JSX.Element => {
	return (
		<main className="flex-1 flex items-center justify-center py-8">
			<header className="text-white text-xl">
				<h2 className="text-center">{message}</h2>
			</header>
		</main>
	)
}
