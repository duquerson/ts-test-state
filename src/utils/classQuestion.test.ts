import { describe, it, expect } from 'vitest';
import { getAnswerButtonClasses } from './classQuestion';

describe('getAnswerButtonClasses', () => {
  const baseClasses = 'w-full text-left p-3 rounded-md border';

  // Test cases for when the question has NOT been answered
  it('should return correct classes when not answered', () => {
    const classes = getAnswerButtonClasses(false, false, false);
    expect(classes).toBe(`${baseClasses} bg-white text-gray-800 hover:bg-gray-100 border-gray-300 cursor-pointer`);
  });

  // Note: When not answered, isCorrectAnswer and isUserAnswer don't affect the classes based on the current logic,
  // but we can still test these combinations for completeness, although the output will be the same as the first case.
  it('should return correct classes when not answered (correct option)', () => {
    const classes = getAnswerButtonClasses(false, true, false);
     expect(classes).toBe(`${baseClasses} bg-white text-gray-800 hover:bg-gray-100 border-gray-300 cursor-pointer`);
  });

   it('should return correct classes when not answered (user option)', () => {
    const classes = getAnswerButtonClasses(false, false, true);
     expect(classes).toBe(`${baseClasses} bg-white text-gray-800 hover:bg-gray-100 border-gray-300 cursor-pointer`);
  });


  // Test cases for when the question HAS been answered

  it('should return correct classes when answered and is the correct answer', () => {
    const classes = getAnswerButtonClasses(true, true, false); // It's the correct answer, but not necessarily the user's
    expect(classes).toBe(`${baseClasses} bg-green-600 text-white border-green-600`);
  });

  it("should return correct classes when answered and is the user's answer (and incorrect)", () => {
    const classes = getAnswerButtonClasses(true, false, true); // User chose it, and it's incorrect
    expect(classes).toBe(`${baseClasses} bg-red-600 text-white border-red-600`);
  });

  it("should return correct classes when answered and is neither the correct answer nor the user's answer", () => {
    const classes = getAnswerButtonClasses(true, false, false); // Answered, not correct, not user's
    expect(classes).toBe(`${baseClasses} bg-white text-gray-800 border-gray-300 opacity-70 cursor-not-allowed`);
  });

    // Edge case: Answered, is correct, and is user's answer
    it("should return correct classes when answered, is correct, and is user's answer", () => {
        // According to the logic, if it's the correct answer, that condition is met first,
        // regardless of whether it's also the user's answer.
        const classes = getAnswerButtonClasses(true, true, true);
        expect(classes).toBe(`${baseClasses} bg-green-600 text-white border-green-600`);
    });
});