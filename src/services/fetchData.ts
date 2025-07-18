
import axios from "axios";

export const questions = () => {
  return axios.get('../data/dataQ.json')
    .then((response) => {
      if(!response.data){
		throw Error('empty')
	  }
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching questions:", error.message);
      throw error; 
    });
};
