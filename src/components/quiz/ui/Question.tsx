import type { JSX } from 'react'
import type { QuestionType } from '../../../types/quiz'
import { AnswersQuestion } from './AnswersQuestion'

type propsQuiz = {
	question: QuestionType
	isAnswered: boolean
	handleAnswerSelect: (quetiosnId: number, answer: number) => void
	getAnswerClass: (optionValue: number) => string
}

export const Question = ({ question, isAnswered, handleAnswerSelect, getAnswerClass }: propsQuiz): JSX.Element => {
	return (
		<article className="w-full h-full flex flex-col space-y-6">
			<header className="flex items-center justify-center">
				<h2 className="text-2xl font-bold text-white text-center transition-opacity duration-300 ease-in-out leading-tight">
					{question.question}
				</h2>
			</header>
			<section className="w-full h-32">
			{question.code != null && question.code !== '' && (
					<pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-auto text-sm font-mono whitespace-pre-wrap shadow-lg border border-gray-700 transition-colors duration-300 hover:shadow-xl max-h-32 min-h-[80px]">
						<code data-testid="question-code">{question.code}</code>
					</pre>
			)}
			</section>
			<AnswersQuestion questionId={question.id} answers={question.answer} handleAnswerSelect={handleAnswerSelect} getAnswerClass={getAnswerClass} isAnswered={isAnswered} />
		</article>
	)
}
