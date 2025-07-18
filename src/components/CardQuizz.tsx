import { useQuery,} from "@tanstack/react-query"
import { questions } from "../services/fetchData"



export const CardQuizz: React.FC = () => {
	
	const { data: quizzData, isLoading: isQuizzLoading, isError: isQuizzError } = useQuery({ queryKey: ['QUIZZ_QUESTIONS'], queryFn: questions, staleTime: 60*1000 })
	
	if (isQuizzLoading) return <p>Loading quizz questions...</p>
	if(isQuizzError) return <p>Error fetching quizz questions.</p>
	
	return (
		<>
			<section className="w-xl h-96 backdrop-blur backdrop-saturate-200 bg-white/20 border border-white/10 rounded-xl flex flex-col justify-center items-center">
			
			</section>
			
		</>
	)
}
