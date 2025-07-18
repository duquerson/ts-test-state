import {CardQuizz} from './CardQuizz'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient();

export const IntroQuiz = ()=>{
	return (
	<>
		<QueryClientProvider client={queryClient}>
			<CardQuizz />
			<ReactQueryDevtools />
		</QueryClientProvider>
	</>
	)}