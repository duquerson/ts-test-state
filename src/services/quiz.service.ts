import axios from 'axios'
import { z } from 'zod'

import { QuestionSchema } from '../schemas/question.schema'
import type { QuestionType } from '../types/quiz'

const NUM_QUESTIONS_TO_FETCH = 10
const API_ENDPOINTS = {
	QUIZ_DATA: '/mockups/dataQ.json'
} as const

// Crear una clase de error personalizada que extienda Error
class QuizFetchError extends Error {
	public statusCode?: number
	public cause?: unknown

	constructor (message: string, statusCode?: number, cause?: unknown) {
		super(message)
		this.name = 'QuizFetchError'
		this.statusCode = statusCode
		this.cause = cause
	}
}

export const getQuizQuestions = async (): Promise<QuestionType[]> => {
	return await axios.get(API_ENDPOINTS.QUIZ_DATA)
		.then((response) => {
			if (response.data == null || response.data === '') {
				throw new QuizFetchError('Empty response from server', 500)
			}

			const parseResult = z.array(QuestionSchema).safeParse(response.data)

			if (!parseResult.success) {
				throw new QuizFetchError(
					'Invalid data structure',
					400,
					parseResult.error.flatten()
				)
			}

			return parseResult.data
				.sort(() => Math.random() - 0.5)
				.slice(0, NUM_QUESTIONS_TO_FETCH)
		})
		.catch((err: unknown) => {
			let errorMessage = 'Unknown error'
			let statusCode: number | undefined
			let errorCause: unknown = err

			// Si ya es nuestro error personalizado, re-lanzarlo
			if (err instanceof QuizFetchError) {
				console.error('Error fetching questions:', err)
				throw err
			}

			// Check if err is an Error instance
			if (err instanceof Error) {
				errorMessage = err.message

				if (axios.isAxiosError(err)) {
					statusCode = err.response?.status
					errorCause = err.response?.data ?? err
				} else {
					errorCause = err
				}
			} else if (typeof err === 'object' && err != null) {
				// Handle potential object errors with a message property
				const errObj = err as Record<string, unknown>

				if (typeof errObj.message === 'string') {
					errorMessage = errObj.message
				}

				if (typeof errObj.statusCode === 'number') {
					statusCode = errObj.statusCode
				}

				errorCause = err
			}

			const fetchError = new QuizFetchError(errorMessage, statusCode, errorCause)
			console.error('Error fetching questions:', fetchError)
			throw fetchError
		})
}
