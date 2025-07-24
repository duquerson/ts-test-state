import { describe, it, expect } from 'vitest';
import { useStore } from './store';

// Reset the store before each test to ensure a clean state
const { getState, setState } = useStore;

describe('Zustand Store', () => {
  it('should initialize with the correct initial state', () => {
    const state = getState();
    expect(state.indexQuestion).toBe(0);
    expect(state.answeredQuestions).toEqual({});
  });

  it('should increase the question index', () => {
    // Set an initial state
    setState({ indexQuestion: 0, answeredQuestions: {} });

    // Call the increaseQuestion action
    getState().increaseQuestion();

    // Expect the indexQuestion to be incremented
    expect(getState().indexQuestion).toBe(1);
  });

  it('should not decrease the question index below 0', () => {
    // Set an initial state at index 0
    setState({ indexQuestion: 0, answeredQuestions: {} });

    // Call the decreaseQuestion action
    getState().decreaseQuestion();

    // Expect the indexQuestion to remain at 0
    expect(getState().indexQuestion).toBe(0);
  });

  it('should decrease the question index', () => {
    // Set an initial state at index greater than 0
    setState({ indexQuestion: 5, answeredQuestions: {} });

    // Call the decreaseQuestion action
    getState().decreaseQuestion();

    // Expect the indexQuestion to be decremented
    expect(getState().indexQuestion).toBe(4);
  });

  it('should answer a question', () => {
    // Set an initial state
    setState({ indexQuestion: 0, answeredQuestions: {} });

    const questionId = 1;
    const answerId = 2;

    // Call the answerQuestion action
    getState().answerQuestion(questionId, answerId);

    // Expect the answeredQuestions to contain the new answer
    expect(getState().answeredQuestions).toEqual({ 1: 2 });
  });

  it('should update an already answered question', () => {
    // Set an initial state with an answered question
    setState({ indexQuestion: 0, answeredQuestions: { 1: 2 } });

    const questionId = 1;
    const newAnswerId = 3;

    // Call the answerQuestion action with a new answer
    getState().answerQuestion(questionId, newAnswerId);

    // Expect the answeredQuestions to contain the updated answer
    expect(getState().answeredQuestions).toEqual({ 1: 3 });
  });

  it('should reset the quiz UI', () => {
    // Set a state with non-initial values
    setState({ indexQuestion: 5, answeredQuestions: { 1: 2, 3: 4 } });

    // Call the resetQuizUI action
    getState().resetQuizUI();

    // Expect the state to be reset to initial values
    expect(getState().indexQuestion).toBe(0);
    expect(getState().answeredQuestions).toEqual({});
  });
});
