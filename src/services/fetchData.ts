
import axios from "axios";
import type { QuestionType } from "../types/store";
export const questions = () => {
  return axios.get('../data/dataQ.json')
    .then((response) => {
      if(!response.data){
		throw Error('empty')
	  }

	  const data = response.data as QuestionType[]
   
	  return data.sort(()=>Math.random()-0.5).slice(0,10);
    })
    .catch((error) => {
      console.error("Error fetching questions:", error.message);
      throw error; 
    });
};
