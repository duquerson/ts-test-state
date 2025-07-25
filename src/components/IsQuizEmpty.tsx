import React from 'react';

interface IsQuizEmptyProps {
  message?: string;
}

export const IsQuizEmpty: React.FC<IsQuizEmptyProps> = ({ message = "No quiz questions available." }) => {
  return (
    <div className="flex-1 flex items-center justify-center py-8">
      <div className="text-white text-xl">
        {message}
      </div>
    </div>
  );
};

