import {
	QueryClient,
	QueryClientProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { QuizPage } from './QuizPageComponent'
const queryClient = new QueryClient()

export const IntroQuiz: React.FC = () => {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<QuizPage />
				<ReactQueryDevtools />
			</QueryClientProvider>

		</>
	)
}
