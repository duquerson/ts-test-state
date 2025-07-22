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
    <section className="w-full max-w-4xl mx-auto transition-all duration-500 ease-in-out ">
      <div className="min-h-[600px] p-4 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-xl transition-all duration-500 ease-in-out">
	  	<div className="flex flex-col justify-center items-center min-h-[500px]"> 
		  <div className="w-full max-w-2xl transition-all duration-300 ease-in-out">
            <Question currentQuestion={currentQuestion} />
          </div>
      	</div>
	  
	  	<div className="grid grid-cols-3 gap-2 pt-3 items-center">
          <div className="flex justify-start">
            <button 
              onClick={decreaseQuestion} 
              disabled={indexQuestion === 0} 
              className={`
                px-6 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out transform cursor-pointer
                ${indexQuestion === 0 
                  ? 'opacity-0 invisible scale-95' 
                  : 'opacity-100 visible scale-100 hover:scale-105 bg-[#3178C6] hover:bg-[#235A97] text-white shadow-lg hover:shadow-xl'
                }
              `}
            >
              Back
            </button>
          </div>

          <div className="flex justify-center">
            <button 
              onClick={() => { refetch(); resetQuizUI(); }} 
              disabled={indexQuestion === 0} 
              className={`
                px-6 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out transform cursor-pointer
                ${indexQuestion === 0 
                  ? 'opacity-0 invisible scale-95' 
                  : 'opacity-100 visible scale-100 hover:scale-105 bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl'
                }
              `}
            > 
              Reset Quiz
            </button>
          </div>

          <div className="flex justify-end">
            <button 
              onClick={increaseQuestion} 
              disabled={indexQuestion === quizData.length - 1} 
              className={`
                px-6 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out transform cursor-pointer
                ${indexQuestion === quizData.length - 1 
                  ? 'opacity-0 invisible scale-95' 
                  : 'opacity-100 visible scale-100 hover:scale-105 bg-[#3178C6] hover:bg-[#235A97] text-white shadow-lg hover:shadow-xl'
                }
              `}
            >
              Next
            </button>
          </div>
        </div>
		
		<footer className="pt-2 text-center">
          <h3 className="text-lg text-white font-bold tracking-widest transition-all duration-300 ease-in-out">
            {indexQuestion + 1} / {quizData.length}
          </h3>
        </footer>
	  </div>
    </section>
  );
};
