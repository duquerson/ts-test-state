
import axios from "axios";
import type { QuestionType } from "../types/store";
import type { FetchError } from "../types/api";
import {QuestionsArraySchema} from '../schemas/question.schema'

const NUM_QUESTIONS_TO_FETCH = 10;
const API_ENDPOINTS = {
	QUIZ_DATA: '/mockups/dataQ.json'
  } as const;

export const getQuizQuestions = (): Promise<QuestionType[]> => {
	return axios.get(API_ENDPOINTS.QUIZ_DATA)
	  .then((response) => {
		if (!response.data) {
		  throw {
			message: "Empty response from server",
			statusCode: 500,
		  } satisfies FetchError;
		}
  
		const parseResult = QuestionsArraySchema.safeParse(response.data);
  
		if (!parseResult.success) {
		  throw {
			message: "Invalid data structure",
			statusCode: 400,
			cause: parseResult.error.flatten(),
		  } satisfies FetchError;
		}
  
		return parseResult.data
		  .sort(() => Math.random() - 0.5)
		  .slice(0, NUM_QUESTIONS_TO_FETCH);
	  })
	  .catch((err: any) => {
		const error: FetchError = {
		  message: err.message || "Unknown error",
		  statusCode: err.statusCode || err.response?.status,
		  cause: err.cause || err,
		};
		console.error("Error fetching questions:", error);
		throw error;
	  });
  };
// export const getQuizQuestions = async (): Promise<QuestionType[]> => {
// 	try {
// 	  const response = await axios.get(API_ENDPOINTS.QUIZ_DATA);
	  
// 	  if (!response.data) {
// 		throw {
// 		  message: "Empty response from server",
// 		  statusCode: 500,
// 		} satisfies FetchError;
// 	  }
  
// 	  const parseResult = QuestionsArraySchema.safeParse(response.data);
	  
// 	  if (!parseResult.success) {
// 		throw {
// 		  message: "Invalid data structure",
// 		  statusCode: 400,
// 		  cause: parseResult.error.flatten(),
// 		} satisfies FetchError;
// 	  }
  
// 	  return parseResult.data
// 		.sort(() => Math.random() - 0.5)
// 		.slice(0, NUM_QUESTIONS_TO_FETCH);
		
// 	} catch (err: any) {
// 	  const error: FetchError = {
// 		message: err.message || "Unknown error",
// 		statusCode: err.statusCode || err.response?.status,
// 		cause: err.cause || err,
// 	  };
// 	  console.error("Error fetching questions:", error);
// 	  throw error;
// 	}
//   };