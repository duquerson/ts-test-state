import { useQuery } from "@tanstack/react-query";
import { questions } from "../services/fetchData";
import { Question } from "./Question";
import { useStore } from "../store/store";


export const CardQuizz: React.FC = () => {
  //state server
	const { 
    data: quizzData, 
    isLoading: isQuizzLoading, 
    isError: isQuizzError,
	refetch 
  } = useQuery({
    queryKey: ['QUIZZ_QUESTIONS'],
    queryFn: questions,
    staleTime: 60 * 1000
  });
  //state ui
  const {indexQuestion} = useStore();

  if (isQuizzLoading) return <p>Loading quiz questions...</p>;
  if (isQuizzError) return <p>Error fetching quiz questions.</p>;
  if (!quizzData || quizzData.length === 0) {
	return <p>No quiz questions available.</p>;
	}
  const currentQuestion= quizzData[indexQuestion];
  
  return (
    <section className="w-full max-w-2xl p-8 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-xl">
      <Question currentQuestion={currentQuestion} />
    </section>
  );
};
