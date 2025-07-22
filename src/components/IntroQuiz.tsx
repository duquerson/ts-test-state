import {CardQuiz} from './CardQuiz'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient();

export const IntroQuiz: React.FC  = ()=>{
	return (
	<>
		<QueryClientProvider client={queryClient}>
			<CardQuiz />
			<ReactQueryDevtools />
		</QueryClientProvider>
		
	</>
	)}