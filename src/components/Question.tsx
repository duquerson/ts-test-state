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
    <article className="">
    	<h2 className="text-3xl  font-bold text-white text-center mb-8">{questionText}</h2>
		<pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap text-balance">
  			<code>{code}</code>
		</pre>
    	<ul className="space-y-4 mb-4 mt-2">
        	{answer.map((option, index) =>{
				const isCorrectAnswer = index === correctAnswer;
				const isUserAnswer = index === userAnswerIndex;
				let buttonClass = "bg-white/5 border-white/20 text-blue-100 hover:bg-white/10 hover:border-white/30";
				if (hasBeenAnswered) {
					if (isCorrectAnswer) {
					  buttonClass = 'bg-green-600 text-white border-green-600'; // Verde si es la respuesta correcta
					} else if (isUserAnswer) {
					  buttonClass = 'bg-red-600 text-white border-red-600'; // Rojo si es la respuesta del usuario es incorrecta
					} else {
					   buttonClass = 'bg-white text-gray-800 border-gray-300 opacity-70 cursor-not-allowed'; // Opciones no seleccionadas después de responder
					}
				  } else if (isUserAnswer) {
					 // Si la pregunta no ha sido respondida pero el usuario ya la seleccionó (aunque con el disabled esto no pasará, es bueno tener la lógica)
					 buttonClass = 'bg-blue-600 text-white border-blue-600'; // Estilo de selección antes de la validación
				  }
				return (<li key={index}>
					<button  disabled={hasBeenAnswered} onClick={() => answerQuestion(indexQuestion, index)}className={`w-full p-4 text-left rounded-lg border transition-all duration-300 ${buttonClass} ${hasBeenAnswered ? 'cursor-not-allowed' : 'cursor-pointer'}`}>{option}</button>
				  </li>
				)
			}) 
		}
	</ul>
    </article>
  );
};