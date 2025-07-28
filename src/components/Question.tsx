import React from 'react'

import type { QuestionType } from '../types/quiz'

import { AnswersQuestion } from './AnswersQuestion'

type QuestionProps = {
	currentQuestion: QuestionType
}

export const Question: React.FC<QuestionProps> = ({ currentQuestion }) => {
	const { question: questionText, code, answer, correctAnswer } = currentQuestion

	return (
		<article className="w-full h-full flex flex-col space-y-6">
			<header className="flex items-center justify-center">
				<h2 className="text-2xl font-bold text-white text-center transition-opacity duration-300 ease-in-out leading-tight">
					{questionText}
				</h2>
			</header>
			{code != null && code !== '' && (
				<section className="w-full">
					<pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-auto text-sm font-mono whitespace-pre-wrap shadow-lg border border-gray-700 transition-colors duration-300 hover:shadow-xl max-h-32 min-h-[80px]">
						<code data-testid="question-code">{code}</code>
					</pre>
				</section>
			)}
			<AnswersQuestion answer={answer} correctAnswer={correctAnswer} />
		</article>
	)
}
