import type { JSX } from 'react'

import type { QuestionType } from '../../../types/quiz'

import { Button } from './Button'
import { Question } from './Question'
import { QuizProgress } from './QuizProgress'

type propsQuiz = {
	data: {
		currentQuestion: QuestionType | null
		currentQuestionIndex: number
		isFirstQuestion: boolean
		isLastQuestion: boolean
		totalQuestions: number
		isAnswered: boolean
		correctAnswersCount: number
		incorrectAnswersCount: number
		showResults: boolean
		allQuestionsAnswered: boolean
	}
	handlers: {
		handleAnswerSelect: (questionId: number, answer: number) => void
		handleReset: () => void
		handleRetry: () => void
		goToNextQuestion: () => void
		goToPreviousQuestion: () => void
		getAnswerClass: (optionValue: number) => string
		handleshowResults: () => void
	}
}

export const QuizLayout = ({ data, handlers }: propsQuiz): JSX.Element => {
	const {
		currentQuestion,
		isAnswered,
		isLastQuestion,
		showResults,
		correctAnswersCount,
		incorrectAnswersCount,
		totalQuestions
	} = data
	const { handleAnswerSelect, getAnswerClass, handleshowResults } = handlers

	const BASE_CONTAINER = 'max-w-4xl w-full mx-auto min-h-[600px] transition-opacity duration-500 ease-in-out'
	const CARD_CONTAINER = 'h-full p-4 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-xl flex flex-col'

	return (
		<main className={BASE_CONTAINER}>
			<article className={CARD_CONTAINER}>
				<header className="flex-1 py-4">

					{showResults
						? (
							<section className="flex flex-col items-center justify-center h-full transition-all duration-800 ease-in-out ">
								<div className='mb-4 text-center'>
									<h2 className="text-4xl font-bold  tracking-widest mb-4 cu text-white text-center transition-opacity duration-300 ease-in-out leading-tight">Resultados del Quiz</h2>
									<p className="text-lg mt-4 font-semibold tracking-wider text-green-400">Preguntas Correctas: {correctAnswersCount}</p>
									<p className="text-lg text-red-400 font-semibold tracking-wider">Preguntas Incorrectas: {incorrectAnswersCount}</p>
									<p className="text-lg text-blue-400 font-semibold tracking-wider">Total de Preguntas: {totalQuestions}</p>
								</div>

								<Button
									text="Reiniciar Quiz"
									onClick={handlers.handleReset}
									variant="reset"
									position="center"
								/>
							</section>
						)
						: (

							currentQuestion != null && (
								<Question question={currentQuestion} isAnswered={isAnswered} getAnswerClass={getAnswerClass} handleAnswerSelect={handleAnswerSelect} />
							)
						)}
				</header>
				{!showResults && (
					<nav
						className="grid grid-cols-3 gap-2 items-center min-h-[60px] mt-4"
						aria-label="Controles del cuestionario"
					>
						<Button
							text="Back"
							onClick={handlers.goToPreviousQuestion}
							variant="back"
							disabled={data.isFirstQuestion}
							position="start"
						/>
						<Button
							text="Reset Quiz"
							onClick={handlers.handleReset}
							variant="reset"
							disabled={data.currentQuestionIndex === 0}
							position="center"
						/>
						{isLastQuestion
							? (
								<Button
									text="Resultados"
									onClick={handleshowResults}
									variant="result"
									position="end"
									disabled={!data.allQuestionsAnswered}
								/>
							)
							: (
								<Button
									text="Next"
									onClick={handlers.goToNextQuestion}
									variant="next"
									position="end"
									disabled={data.isLastQuestion}
								/>
							)}

					</nav>
				)}
				{!showResults && (
					<QuizProgress current={data.currentQuestionIndex + 1} total={data.totalQuestions} />
				)}
			</article>
		</main>
	)
}
