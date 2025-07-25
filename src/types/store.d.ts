import {QuestionSchema} from '../schemas/question.schema'

export type QuestionType = z.infer<typeof QuestionSchema>;