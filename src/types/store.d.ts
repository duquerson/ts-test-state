export type QuestionType = {
	id: number,
	question: string,
	code: string | null,
	answer: {
		id: number
		text: string,
	}[],
	correctAnswer: number
}