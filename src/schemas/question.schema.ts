import { z } from 'zod'

export const AnswerSchema = z.object({
	id: z.number(),
	text: z.string().min(1, 'El texto de la respuesta no puede estar vacío')
})

export const QuestionSchema = z.object({
	id: z.number(),
	question: z.string().min(1, 'La pregunta no puede estar vacía'),
	code: z.string().nullable(), // Permite string o null
	answer: z.array(AnswerSchema).min(2, 'Debe haber al menos 2 respuestas'),
	correctAnswer: z.number().min(0, 'El ID de respuesta correcta debe ser válido')
})
