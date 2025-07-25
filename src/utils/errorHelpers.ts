import type { FetchError } from "../types/api";

const statusMessages: Record<number, string> = {
  400: "There was an issue with the quiz data format.",
  500: "The server encountered an error while fetching questions.",
};

export const getQuizErrorMessage= (error?: FetchError | null): string | null => {
  if (!error) return null;

  const fallbackMessage = "An unexpected error occurred.";

  const errorMessage =
    (error.statusCode && statusMessages[error.statusCode]) ||
    error.message ||
    fallbackMessage;

  console.error("Quiz Component Error:", error);

  return errorMessage;
}