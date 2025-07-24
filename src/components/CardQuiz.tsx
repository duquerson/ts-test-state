import { useQuery } from "@tanstack/react-query";
import { questions } from "../services/fetchData";
import { Question } from "./Question";
import { useStore } from "../store/store";

export const CardQuiz: React.FC = () => {
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
  
  const {indexQuestion, decreaseQuestion, increaseQuestion, resetQuizUI} = useStore();

  // Alturas más flexibles
  const baseContainer = "max-w-4xl w-full mx-auto min-h-[600px] transition-opacity duration-500 ease-in-out";
  const cardContainer = "min-h-full p-4 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-xl flex flex-col";
  const buttonsDirections = "px-6 py-3 rounded-lg cursor-pointer font-medium transition-all duration-300 ease-in-out transform";
  const disableClass = "disabled:opacity-50 disabled:cursor-not-allowed";
  
  if (isQuizLoading) {
    return (
      <section className={baseContainer}>
        <div className={cardContainer}>
          <div className="flex-1 flex items-center justify-center py-8">
            <div className="text-white text-xl animate-pulse">Cargando preguntas...</div>
          </div>
          <div className="grid grid-cols-3 gap-2 items-center min-h-[60px] mt-4"></div>
          <footer className="text-center min-h-[40px] flex items-center justify-center mt-2"></footer>
        </div>
      </section>
    );
  }

  if (isQuizError) {
    return (
      <section className={baseContainer}>
        <div className={cardContainer}>
          <div className="flex-1 flex items-center justify-center py-8">
            <h2 className="text-center text-white font-extrabold text-2xl">404 not found</h2>
          </div>
          <div className="grid grid-cols-3 gap-2 items-center min-h-[60px] mt-4"></div>
          <footer className="text-center min-h-[40px] flex items-center justify-center mt-2"></footer>
        </div>
      </section>
    );
  }

  if (!quizData || quizData.length === 0) {
    return (
      <section className={baseContainer}>
        <div className={cardContainer}>
          <div className="flex-1 flex items-center justify-center py-8">
            <p className="text-white text-xl">No quiz questions available.</p>
          </div>
          <div className="grid grid-cols-3 gap-2 items-center min-h-[60px] mt-4"></div>
          <footer className="text-center min-h-[40px] flex items-center justify-center mt-2"></footer>
        </div>
      </section>
    );
  }

  const currentQuestion = quizData[indexQuestion];
  
  return (
    <section className={baseContainer}>
      <div className={cardContainer}>
        
        <div className="flex-1 py-4"> 
          <Question currentQuestion={currentQuestion} />
        </div>
        
        <div className="grid grid-cols-3 gap-2 items-center min-h-[60px] mt-4">
          <button
            onClick={decreaseQuestion}
            disabled={indexQuestion === 0}
            className={`
              ${buttonsDirections}
              ${indexQuestion === 0
                ? 'invisible scale-95' 
                : 'visible scale-100 hover:scale-105 bg-[#3178C6] hover:bg-[#235A97] text-white shadow-lg hover:shadow-xl'
              }
              ${disableClass}
              justify-self-start
            `}
          >
            Back
          </button>

          <button 
            onClick={() => { refetch(); resetQuizUI(); }} 
            disabled={indexQuestion === 0} 
            className={`
              ${buttonsDirections}
              ${indexQuestion === 0 
                ? 'invisible scale-95' 
                : 'visible scale-100 hover:scale-105 bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl'
              }
              ${disableClass}
              justify-self-center
            `}
          > 
            Reset Quiz
          </button>

          <button 
            onClick={increaseQuestion} 
            disabled={indexQuestion === quizData.length - 1} 
            className={`
              ${buttonsDirections}
              ${indexQuestion === quizData.length - 1 
                ? 'invisible scale-95' 
                : 'visible scale-100 hover:scale-105 hover:shadow-lg bg-[#3178C6] hover:bg-[#235A97] text-white shadow-lg'
              }
              ${disableClass}
              justify-self-end
            `}
          >
            Next
          </button>
        </div>
        
        <footer className="text-center min-h-[40px] flex items-center justify-center mt-2">
          <h3 className="text-lg text-white font-bold tracking-widest transition-opacity duration-300 ease-in-out">
            {indexQuestion + 1} / {quizData.length}
          </h3>
        </footer>
      </div>
    </section>
  );
};