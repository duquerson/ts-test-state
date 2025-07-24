import { useStore } from '../store/store';
import { getAnswerButtonClasses } from '../utils/classQuestion';
type AnswersQuestionProps = {
	answer: string[];
	correctAnswer: number;
  }
export const AnswersQuestion = ({answer, correctAnswer}:AnswersQuestionProps)=>{
	const { answeredQuestions, indexQuestion, answerQuestion } = useStore();
	const hasBeenAnswered = indexQuestion in answeredQuestions;
  	const userAnswerIndex = answeredQuestions[indexQuestion]; 

	return (
	<section className="flex-1 flex items-start">
	<ul className="space-y-3 w-full">
	  {answer.map((option, index) => {
		const isCorrectAnswer = index === correctAnswer;
		const isUserAnswer = index === userAnswerIndex;
		
		return (
		  <li key={index} className="transition-opacity duration-300 ease-in-out">
			<button
			  disabled={hasBeenAnswered}
			  onClick={() => answerQuestion(indexQuestion, index)}
			  className={getAnswerButtonClasses(hasBeenAnswered, isCorrectAnswer, isUserAnswer)}
			>
			  {option}
			</button>
		  </li>
		);
	  })}
	</ul>
  	</section>
)}