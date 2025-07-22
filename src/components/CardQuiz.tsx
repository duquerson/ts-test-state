import { useQuery } from "@tanstack/react-query";
import { questions } from "../services/fetchData";
import { Question } from "./Question";
import { useStore } from "../store/store";


export const CardQuiz: React.FC = () => {
  //state server
	const { 
    data: quizData, 
    isLoading: isQuizLoading, 
    isError: isQuizError,
	refetch 
  } = useQuery({
    queryKey: ['QUIZ_QUESTIONS'],
    queryFn: questions,
    staleTime: 60 * 1000
  });
  //state ui
  const {indexQuestion, decreaseQuestion, increaseQuestion, resetQuizUI} = useStore();

  if (isQuizLoading) return <p>Loading quiz questions...</p>;
  if (isQuizError) return <p>Error fetching quiz questions.</p>;
  if (!quizData || quizData.length === 0) {
	return <p>No quiz questions available.</p>;
	}
  const currentQuestion= quizData[indexQuestion];
  
  return (
    <section className="w-full max-w-2xl p-8 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-xl">
      <Question currentQuestion={currentQuestion} />
	  <div className="flex justify-between">
		<button onClick={decreaseQuestion} disabled={indexQuestion === 0 } className={`${indexQuestion === 0 ? 'invisible': 'visible'} bg-[#3178C6] hover:bg-[#235A97]  text-white px-6 py-2 cursor-pointer rounded-lg`}>back</button>
		<button onClick={()=>{refetch();resetQuizUI();}} disabled={indexQuestion === 0} className={`${indexQuestion === 0 ? 'invisible': 'visible'} bg-[#3178C6] hover:bg-[#235A97] text-white px-6 py-2 cursor-pointer rounded-lg`}> reset quiz</button>
		<button onClick={increaseQuestion} disabled={indexQuestion === quizData.length - 1} className={`${indexQuestion === quizData.length - 1 ? 'invisible': 'visible'} bg-[#3178C6] hover:bg-[#235A97] text-white px-6 py-2 cursor-pointer rounded-lg`}>Next</button>
	  </div>
		<footer className=" pt-2 ">
			<h3 className="text-md text-white font-bold tracking-widest text-center"> {indexQuestion + 1} / {quizData.length}</h3>
		</footer>
    </section>
  );
};
