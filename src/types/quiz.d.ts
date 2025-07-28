import type { z } from 'zod'

import type { QuestionSchema, AnswerSchema } from '../schemas/question.schema'

// ✅ Generamos todos los tipos desde los schemas
type AnswerType = z.infer<typeof AnswerSchema>
type QuestionType = z.infer<typeof QuestionSchema>

export type { QuestionType, AnswerType }
