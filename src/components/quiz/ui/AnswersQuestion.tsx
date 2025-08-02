import type { JSX } from 'react'
import type { QuestionType } from '../../../types/quiz'

type AnswersProps = {
	questionId: number
	answers: QuestionType['answer']
	isAnswered: boolean
	handleAnswerSelect: (questionId: number, answer: number) => void
	getAnswerClass: (optionValue: number) => string
}

export const AnswersQuestion = ({ answers, handleAnswerSelect, getAnswerClass, isAnswered, questionId }: AnswersProps): JSX.Element => {
	
	return (
		<section className="flex-1 flex items-start">
			<ul className="space-y-3 w-full">
				{answers.map((answer, id) => {
					
					return (
						<li key={answer.id} className={`transition-all duration-300 ease-in-out transform animate-slide-in-up delay-${id * 100}`}>
							<button
								disabled={isAnswered}
								onClick={()=>handleAnswerSelect(questionId, answer.id)}
								className={`w-full p-4 text-left text-md rounded-lg border  cursor-pointer transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 hover:scale-105 hover:border-blue-500 ${getAnswerClass(answer.id)}`}
							>
								{answer.text}
							</button>
						</li>
					)
				})}
			</ul>
		</section>
	)
}
