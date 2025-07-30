import type { JSX } from 'react'

import { useQuiz } from '../../hooks/useQuiz'
import type { FetchError } from '../../types/api'
import { getQuizErrorMessage } from '../../utils/errorHelpers'

import { IsQuizError } from './ui/IsQuizError'
import IsQuizLoanding from './ui/IsQuizLoanding'
import { QuizLayout } from './ui/QuizLayout'

export const QuizPage = (): JSX.Element => {
	// custom hooks state app
	const { data, state, handlers } = useQuiz()

	if (state.isQuizLoading) {
		return (
			<IsQuizLoanding />
		)
	}

	if (state.isQuizError) {
		const errorMessage = getQuizErrorMessage(state.quizError as FetchError | null | undefined)

		if (typeof errorMessage === 'string' && errorMessage.trim() !== '') {
			return <IsQuizError
				message={errorMessage}
				onRetry={handlers.handleRetry}
				retryText="Reload Quiz"
			/>
		}
		return <></>
	}

	return (
		<QuizLayout data={data} handlers={handlers} />
	)
}
