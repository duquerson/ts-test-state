import type React from "react";
import type { QuestionType } from "../types/store";
import {useStore} from '../store/store'
type QuestionProps ={
	currentQuestion: QuestionType;
}

export const Question: React.FC<QuestionProps> = ({ currentQuestion }) => {
	const { question: questionText, code, answer, correctAnswer } = currentQuestion;
	const  {answeredQuestions,indexQuestion,answerQuestion} = useStore();
	const  hasBeenAnswered =  indexQuestion in answeredQuestions;
	const  userAnswerIndex = answeredQuestions[indexQuestion]; 
	return (
		<article className="w-full space-y-6 transition-all duration-500 ease-in-out">
		
		  <div className="animate-fade-in">
			<h2 className="text-2xl font-bold text-white text-center transition-all duration-500 ease-in-out">
			  {questionText}
			</h2>
		  </div>
	
		  {code && (
			<div className="transition-all duration-500 ease-in-out transform animate-slide-in-down">
			  <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap shadow-lg border border-gray-700 transition-all duration-300 hover:shadow-xl">
				<code>{code}</code>
			  </pre>
			</div>
		  )}
	
		  <ul className="space-y-3 w-full">
			{answer.map((option, index) => {
			  const isCorrectAnswer = index === correctAnswer;
			  const isUserAnswer = index === userAnswerIndex;
			  
			  let baseClasses = "w-full p-4 text-left text-md rounded-lg border  cursor-pointer transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50";
			  let buttonClass = "";
			  if (hasBeenAnswered) {
				if (isCorrectAnswer) {
				  buttonClass = 'bg-green-600 text-white border-green-600 shadow-lg scale-105 animate-pulse';
				} else if (isUserAnswer) {
				  buttonClass = 'bg-red-600 text-white border-red-600 shadow-lg scale-105 animate-bounce';
				} else {
				  buttonClass = 'bg-white/20 text-gray-300 border-gray-400 opacity-60 cursor-not-allowed';
				}
			  } else {
				buttonClass = 'bg-white/5 border-white/20 text-blue-100 hover:bg-white/10 hover:border-white/30 hover:scale-105 hover:shadow-lg active:scale-95';
			  }
	
			  return (
				<li 
				  key={index} 
				  className={`transition-all duration-300 ease-in-out transform animate-slide-in-up delay-${index * 100}`}
				>
				  <button
					disabled={hasBeenAnswered}
					onClick={() => answerQuestion(indexQuestion, index)}
					className={`${baseClasses} ${buttonClass}`}
				  >
					{option}
				  </button>
				</li>
			  );
			})}
		  </ul>
		</article>
	  );
};