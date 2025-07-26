import { useQuery } from "@tanstack/react-query";
import { getQuizQuestions } from "../services/quiz.service";
import { Question } from "./Question";
import { useStore } from "../store/quiz.store";
import { BASE_CONTAINER, BUTTON_DIRECTIONS, CARD_CONTAINER, DISABLE_CLASS } from "../const/CONST";
import IsQuizLoanding from './IsQuizLoanding'
import {IsQuizEmpty} from "./IsQuizEmpty"; 
import {IsQuizError} from "./IsQuizError";
import { getQuizErrorMessage } from "../utils/errorHelpers";
import type { QuestionType } from "../types/quiz.store";
import type {FetchError} from "../types/api" 

export const CardQuiz: React.FC = () => {
  const { 
    data: quizData, 
    isLoading: isQuizLoading, 
    isError: isQuizError,
	error: quizError,
    refetch 
  } = useQuery<QuestionType[], FetchError>({
    queryKey: ['QUIZ_QUESTIONS'],
    queryFn: getQuizQuestions,
    staleTime: 60 * 1000
  });
  
  const {indexQuestion, decreaseQuestion, increaseQuestion, resetQuizUI} = useStore();

  if (isQuizLoading) {
    return (
      <IsQuizLoanding />
    );
  }
  if (isQuizError) {
	const errorMessage = getQuizErrorMessage(quizError);
	if (errorMessage) {
	  return <IsQuizError message={errorMessage} onRetry={refetch}
	  retryText="Reload Quiz" />;
	}
	return null;
  }

  if (!quizData || quizData.length === 0) {
    return (
      <IsQuizEmpty message="No quiz questions available at the moment." />
    );
  }

  const currentQuestion = quizData[indexQuestion];
  
  return (
    <section className={BASE_CONTAINER}>
      <div className={CARD_CONTAINER}>
        
        <div className="flex-1 py-4"> 
          <Question currentQuestion={currentQuestion} />
        </div>
        
        <div className="grid grid-cols-3 gap-2 items-center min-h-[60px] mt-4">
          <button
            onClick={decreaseQuestion}
            disabled={indexQuestion === 0}
            className={`
              ${BUTTON_DIRECTIONS}
              ${indexQuestion === 0
                ? 'invisible scale-95' 
                : 'visible scale-100 hover:scale-105 bg-[#3178C6] hover:bg-[#235A97] text-white shadow-lg hover:shadow-xl'
              }
              ${DISABLE_CLASS}
              justify-self-start
            `}
          >
            Back
          </button>

          <button 
            onClick={() => { refetch(); resetQuizUI(); }} 
            disabled={indexQuestion === 0} 
            className={`
              ${BUTTON_DIRECTIONS}
              ${indexQuestion === 0 
                ? 'invisible scale-95' 
                : 'visible scale-100 hover:scale-105 bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl'
              }
              ${DISABLE_CLASS}
              justify-self-center
            `}
          > 
            Reset Quiz
          </button>

          <button 
            onClick={increaseQuestion} 
            disabled={indexQuestion === quizData.length - 1} 
            className={`
              ${BUTTON_DIRECTIONS}
              ${indexQuestion === quizData.length - 1 
                ? 'invisible scale-95' 
                : 'visible scale-100 hover:scale-105 hover:shadow-lg bg-[#3178C6] hover:bg-[#235A97] text-white shadow-lg'
              }
              ${DISABLE_CLASS}
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