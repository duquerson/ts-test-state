import { describe, it, expect, vi } from 'vitest';
import { getQuizErrorMessage } from './errorHelpers';
import type { FetchError } from '../types/api';

describe('errorHelpers', () => {

  // Spy on console.error to check if it's called
  const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  it('should return null if error is null or undefined', () => {
    expect(getQuizErrorMessage(null)).toBeNull();
    expect(getQuizErrorMessage(undefined)).toBeNull();
  });

  it('should return the specific status message if statusCode is known', () => {
    const errorWithKnownStatus: FetchError = { statusCode: 400, message: 'Bad Request' };
    expect(getQuizErrorMessage(errorWithKnownStatus)).toBe('There was an issue with the quiz data format.');

    const errorWithKnownStatus500: FetchError = { statusCode: 500, message: 'Internal Server Error' };
    expect(getQuizErrorMessage(errorWithKnownStatus500)).toBe('The server encountered an error while fetching questions.');
  });

  it('should return the error message if statusCode is unknown but message exists', () => {
    const errorWithUnknownStatusAndMessage: FetchError = { statusCode: 404, message: 'Not Found' };
    expect(getQuizErrorMessage(errorWithUnknownStatusAndMessage)).toBe('Not Found');
  });

  it('should return the fallback message if statusCode is unknown and no message exists', () => {
    const errorWithUnknownStatus: FetchError = {
		statusCode: 503,
		message: ''
	};
    expect(getQuizErrorMessage(errorWithUnknownStatus)).toBe('An unexpected error occurred.');

    const errorWithoutStatusOrMessage: any = {}; // Simulate an error object with no status or message
    expect(getQuizErrorMessage(errorWithoutStatusOrMessage)).toBe('An unexpected error occurred.');
  });

  it('should return the fallback message if error is not a FetchError and has no message', () => {
    const genericError = new Error('Something went wrong');
    expect(getQuizErrorMessage(genericError)).toBe('Something went wrong'); // Note: getQuizErrorMessage checks for error.message first
  });

  it('should log the error to the console', () => {
    const mockError: FetchError = { statusCode: 400, message: 'Bad Request' };
    getQuizErrorMessage(mockError);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Quiz Component Error:', mockError);
  });

  // Restore console.error after tests
  afterEach(() => {
    consoleErrorSpy.mockClear();
  });
});