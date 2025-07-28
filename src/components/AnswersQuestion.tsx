import type { JSX } from 'react'
import { useStore } from '../store/quiz.store'
import type { AnswerType, QuestionType } from '../types/quiz'
import { getAnswerButtonClasses } from '../utils/classQuestion'

type AnswersQuestionProps = {
	answer: QuestionType['answer']
	correctAnswer: number
}

// ✅ Agregamos el tipo de retorno JSX.Element
export const AnswersQuestion = ({ answer, correctAnswer }: AnswersQuestionProps): JSX.Element => {
	const { answeredQuestions, indexQuestion, answerQuestion } = useStore()
	const hasBeenAnswered = indexQuestion in answeredQuestions
	const userAnswerId = answeredQuestions[indexQuestion]

	return (
		<section className="flex-1 flex items-start">
			<ul className="space-y-3 w-full">

				{answer.map((option: AnswerType) => {
					// Determina si esta opción es la respuesta correcta
					// Compara el ID de la opción actual con el ID de la respuesta correcta
					const isCorrectAnswer = option.id === correctAnswer
					// Determina si esta opción fue la que seleccionó el usuario
					// Compara el ID de la opción actual con el ID que el usuario eligió (guardado en answeredQuestions)
					// Si la pregunta no ha sido respondida, userAnswerId será undefined y esta comparación será false
					const isUserAnswer = option.id === userAnswerId

					return (
						<li key={option.id} className="transition-opacity duration-300 ease-in-out">
							<button
								disabled={hasBeenAnswered}
								onClick={() => { answerQuestion(indexQuestion, option.id) }}
								className={getAnswerButtonClasses(hasBeenAnswered, isCorrectAnswer, isUserAnswer)}
							>
								{option.text}
							</button>
						</li>
					)
				})}
			</ul>
		</section>
	)
}
