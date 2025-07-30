import type { JSX } from 'react'

import type { QuestionType } from '../../../types/quiz'

type AnswersProps = {
	answers: QuestionType['answer']
	isAnswered: boolean
	handleAnswerSelect: (answer: number) => void
	getAnswerClass: (optionValue: number) => string
}

export const AnswersQuestion = ({ answers, handleAnswerSelect, getAnswerClass, isAnswered }: AnswersProps): JSX.Element => {
	return (
		<section className="flex-1 flex items-start">
			<ul className="space-y-3 w-full">
				{answers.map((answer) => {
					return (
						<li key={answer.id} className="transition-opacity duration-300 ease-in-out">
							<button
								disabled={isAnswered}
								onClick={() => { handleAnswerSelect(answer.id) }}
								className={getAnswerClass(answer.id)}
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
