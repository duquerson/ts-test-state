import type { JSX } from 'react'
import { useQuiz } from '../../hooks/useQuiz'
import { IsQuizError } from './ui/IsQuizError'
import IsQuizLoanding from './ui/IsQuizLoading'
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
		return <IsQuizError
			message={state.errorMessage}
			onRetry={handlers.handleRetry}
			retryText="Reload Quiz" />
	}

	return (
		<QuizLayout data={data} handlers={handlers} />
	)
}
