type GetAnswerButtonClassesFunction = {
	getAnswerButtonClasses: (
	  hasBeenAnswered: boolean,
	  isCorrectAnswer: boolean,
	  isUserAnswer: boolean
	) => string;
  };
  
   export const getAnswerButtonClasses: GetAnswerButtonClassesFunction['getAnswerButtonClasses'] = (
	hasBeenAnswered,
	isCorrectAnswer,
	isUserAnswer
  ) => {
	let classes = 'w-full text-left p-3 rounded-md border';
	
	if (hasBeenAnswered) {
	  if (isCorrectAnswer) {
		classes += ' bg-green-600 text-white border-green-600';
	  } else if (isUserAnswer) {
		classes += ' bg-red-600 text-white border-red-600';
	  } else {
		classes += ' bg-white text-gray-800 border-gray-300 opacity-70 cursor-not-allowed';
	  }
	} else {
	  classes += ' bg-white text-gray-800 hover:bg-gray-100 border-gray-300 cursor-pointer';
	}
	
	return classes;
  };
  
