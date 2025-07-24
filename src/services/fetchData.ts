
import axios from "axios";
import type { QuestionType } from "../types/store";

const NUM_QUESTIONS_TO_FETCH = 10;
export const getQuizquestions = () => {
  return axios.get('/mockups/dataQ.json')
    .then((response) => {
      if(!response.data){
		throw Error('empty')
	  }

	  const data = response.data as QuestionType[]
   
	  return data.sort(()=>Math.random()-0.5).slice(0,NUM_QUESTIONS_TO_FETCH);
    })
    .catch((error) => {
      console.error("Error fetching questions:", error.message);
      throw error; 
    });
};
