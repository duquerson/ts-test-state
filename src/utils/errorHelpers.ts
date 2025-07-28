import type { FetchError } from '../types/api'

const statusMessages: Record<number, string> = {
	400: 'There was an issue with the quiz data format.',
	500: 'The server encountered an error while fetching questions.'
}

export const getQuizErrorMessage = (error?: FetchError | null): string | null => {
	if (error == null) return null

	const fallbackMessage = 'An unexpected error occurred.'

	const statusCodeMessage = error.statusCode != null ? statusMessages[error.statusCode] : undefined

	const errorMessage = statusCodeMessage ?? error.message ?? fallbackMessage

	console.error('Quiz Component Error:', error)

	return errorMessage
}
