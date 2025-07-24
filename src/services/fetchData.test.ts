import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { getQuizquestions } from './fetchData';

// Mock axios
vi.mock('axios');

describe('getQuizquestions', () => {
  it('should fetch data successfully', async () => {
    const mockData = [
      { id: 1, question: 'Q1', answer: [], correctAnswer: 0 },
      { id: 2, question: 'Q2', answer: [], correctAnswer: 0 },
      { id: 3, question: 'Q3', answer: [], correctAnswer: 0 },
      { id: 4, question: 'Q4', answer: [], correctAnswer: 0 },
      { id: 5, question: 'Q5', answer: [], correctAnswer: 0 },
      { id: 6, question: 'Q6', answer: [], correctAnswer: 0 },
      { id: 7, question: 'Q7', answer: [], correctAnswer: 0 },
      { id: 8, question: 'Q8', answer: [], correctAnswer: 0 },
      { id: 9, question: 'Q9', answer: [], correctAnswer: 0 },
      { id: 10, question: 'Q10', answer: [], correctAnswer: 0 },
      { id: 11, question: 'Q11', answer: [], correctAnswer: 0 },
      { id: 12, question: 'Q12', answer: [], correctAnswer: 0 },
      // Add more mock data to ensure slicing works
    ];
    const axiosGetSpy = vi.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockData });

    const data = await getQuizquestions();

    // Expect axios.get to have been called with the correct URL
    expect(axiosGetSpy).toHaveBeenCalledWith('/mockups/dataQ.json');
    // Expect the returned data to be an array of 10 questions
    expect(data.length).toBe(10);
    // Expect the returned data to be a subset of the mockData
    expect(mockData).toEqual(expect.arrayContaining(data));
  });

  it('should handle empty response data', async () => {
    const axiosGetSpy = vi.spyOn(axios, 'get').mockResolvedValueOnce({ data: null });

    // Expect the function to throw an error with the message 'empty'
    await expect(getQuizquestions()).rejects.toThrow('empty');
    expect(axiosGetSpy).toHaveBeenCalledWith('/mockups/dataQ.json');
  });

  it('should handle fetch errors', async () => {
    const errorMessage = 'Network Error';
    const axiosGetSpy = vi.spyOn(axios, 'get').mockRejectedValueOnce(new Error(errorMessage));

    // Expect the function to throw the error
    await expect(getQuizquestions()).rejects.toThrow(errorMessage);
    expect(axiosGetSpy).toHaveBeenCalledWith('/mockups/dataQ.json');
  });
});