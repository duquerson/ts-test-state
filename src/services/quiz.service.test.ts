import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { getQuizQuestions } from './quiz.service'; 

// Mock axios
vi.mock('axios');

describe('getQuizQuestions', () => {
  it('should fetch data successfully', async () => {
    const mockData = [
      { 
        id: 1, 
        question: 'Q1', 
        code: null,
        answer: [
          { id: 0, text: 'Respuesta 1' },
          { id: 1, text: 'Respuesta 2' }
        ], 
        correctAnswer: 0 
      },
      { 
        id: 2, 
        question: 'Q2', 
        code: null,
        answer: [
          { id: 0, text: 'Respuesta A' },
          { id: 1, text: 'Respuesta B' }
        ], 
        correctAnswer: 1 
      },
      { 
        id: 3, 
        question: 'Q3', 
        code: 'console.log("test");',
        answer: [
          { id: 0, text: 'Imprime test' },
          { id: 1, text: 'Crea variable' }
        ], 
        correctAnswer: 0 
      },
      { 
        id: 4, 
        question: 'Q4', 
        code: null,
        answer: [
          { id: 0, text: 'Opción 1' },
          { id: 1, text: 'Opción 2' }
        ], 
        correctAnswer: 0 
      },
      { 
        id: 5, 
        question: 'Q5', 
        code: null,
        answer: [
          { id: 0, text: 'Verdadero' },
          { id: 1, text: 'Falso' }
        ], 
        correctAnswer: 1 
      },
      { 
        id: 6, 
        question: 'Q6', 
        code: null,
        answer: [
          { id: 0, text: 'Si' },
          { id: 1, text: 'No' }
        ], 
        correctAnswer: 0 
      },
      { 
        id: 7, 
        question: 'Q7', 
        code: null,
        answer: [
          { id: 0, text: 'Correcto' },
          { id: 1, text: 'Incorrecto' }
        ], 
        correctAnswer: 0 
      },
      { 
        id: 8, 
        question: 'Q8', 
        code: null,
        answer: [
          { id: 0, text: 'Azul' },
          { id: 1, text: 'Rojo' }
        ], 
        correctAnswer: 1 
      },
      { 
        id: 9, 
        question: 'Q9', 
        code: null,
        answer: [
          { id: 0, text: 'Día' },
          { id: 1, text: 'Noche' }
        ], 
        correctAnswer: 0 
      },
      { 
        id: 10, 
        question: 'Q10', 
        code: null,
        answer: [
          { id: 0, text: 'Sí' },
          { id: 1, text: 'No' }
        ], 
        correctAnswer: 1 
      },
      { 
        id: 11, 
        question: 'Q11', 
        code: null,
        answer: [
          { id: 0, text: 'Uno' },
          { id: 1, text: 'Dos' }
        ], 
        correctAnswer: 0 
      },
      { 
        id: 12, 
        question: 'Q12', 
        code: null,
        answer: [
          { id: 0, text: 'Primera' },
          { id: 1, text: 'Segunda' }
        ], 
        correctAnswer: 1 
      },
    ];
    
    const axiosGetSpy = vi.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockData });

    const data = await getQuizQuestions();

    // Expect axios.get to have been called with the correct URL
    expect(axiosGetSpy).toHaveBeenCalledWith('/mockups/dataQ.json');
    // Expect the returned data to be an array of 10 questions
    expect(data.length).toBe(10);
    // Expect the returned data to be a subset of the mockData
    expect(mockData).toEqual(expect.arrayContaining(data));
  });

  it('should handle empty response data', async () => {
    const axiosGetSpy = vi.spyOn(axios, 'get').mockResolvedValueOnce({ data: null });

    // Expect the function to throw an error with the message 'Empty response from server'
    await expect(getQuizQuestions()).rejects.toThrow('Empty response from server'); // Corrected assertion
    expect(axiosGetSpy).toHaveBeenCalledWith('/mockups/dataQ.json');
  });

  it('should handle fetch errors', async () => {
    const errorMessage = 'Network Error';
    const axiosGetSpy = vi.spyOn(axios, 'get').mockRejectedValueOnce(new Error(errorMessage));

    // Expect the function to throw the error
    await expect(getQuizQuestions()).rejects.toThrow(errorMessage);
    expect(axiosGetSpy).toHaveBeenCalledWith('/mockups/dataQ.json');
  });
});