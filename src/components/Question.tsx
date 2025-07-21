import type React from "react";
import type { QuestionType } from "../types/store";

type QuestionProps ={
	currentQuestion: QuestionType;
}

export const Question: React.FC<QuestionProps> = ({ currentQuestion }) => {
  const { question: questionText, code, answer } = currentQuestion;
  
  return (
    <article className="">
    	<h2 className="text-3xl  font-bold text-white text-center mb-8">{questionText}</h2>
		<pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap text-balance">
  			<code>{code}</code>
		</pre>
    	<ul className="space-y-4 mb-4 mt-2">
        	{answer.map((option, index) => (
          	<li key={index}>
            	<button className="w-full p-4 cursor-pointer text-left rounded-lg border transition-all duration-300 bg-white/5 border-white/20 text-blue-100 hover:bg-white/10 hover:border-white/30">{option}</button>
          	</li>
        	))}
      	</ul>
    </article>
  );
};