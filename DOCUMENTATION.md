# Project Documentation: Testing State Quiz

This document provides an overview of the Testing State Quiz project, its architecture, and key components.

## Project Overview

The Testing State Quiz is a web application designed to test users' knowledge through a series of questions. It utilizes modern web technologies to provide a dynamic and interactive quiz experience.

## Technology Stack

The project is built using the following technologies:

*   **Astro:** A web framework for building fast, content-focused websites.
*   **React:** A JavaScript library for building user interfaces. Used for creating interactive components within Astro pages.
*   **TypeScript:** A superset of JavaScript that adds static typing, improving code maintainability and reducing errors.
*   **Zustand:** A small, fast, and scalable state-management solution for React.
*   **Tailwind CSS:** A utility-first CSS framework for styling the application.
*   **Axios:** A promise-based HTTP client for making API requests.
*   **ESLint:** A linter to enforce code style and identify potential issues.
*   **Vitest:** A fast unit testing framework.
*   **@testing-library/react:** A library for testing React components.

## Project Structure

The project follows a standard directory structure:

*   `public/`: Contains static assets like fonts, images, and mock data.
    *   `public/mockups/dataQ.json`: The local JSON file containing quiz questions.
    *   `public/fonts/`: Contains font files.
*   `src/`: Contains the main application code.
    *   `src/components/`: Reusable components.
        *   `src/components/quiz/`: React components related to the quiz.
            *   `AnswersQuestion.tsx`: Component for displaying answer options and handling answer selection.
            *   `CardQuiz.tsx`: The main component that orchestrates the quiz flow, fetches data, and manages state. (Note: Based on file structure, this file might have been removed or refactored into `QuizIndex.tsx` or `QuizPageComponent.tsx`)
            *   `IsQuizError.tsx`: Component to display error messages.
            *   `IsQuizLoading.tsx`: Component to display a loading indicator.
            *   `Question.tsx`: Component for displaying a single question.
            *   `ErrorBoundary.tsx`: Component for catching and displaying errors within the quiz.
            *   `QuizIndex.tsx`: Likely the main entry point for the quiz section.
            *   `QuizPageComponent.tsx`: Might be a wrapper component for the quiz page.
            *   `src/components/quiz/ui/`: UI components used within the quiz.
                *   `AnswersQuestion.tsx`: (Duplicate, likely the correct location)
                *   `Button.tsx`: Reusable button component.
                *   `IsQuizEmpty.tsx`: Component to display when the quiz is empty.
                *   `IsQuizError.tsx`: (Duplicate, likely the correct location)
                *   `IsQuizLoading.tsx`: (Duplicate, likely the correct location)
                *   `Question.tsx`: (Duplicate, likely the correct location)
                *   `QuizLayout.tsx`: Layout component for the quiz.
                *   `QuizProgress.tsx`: Component to show quiz progress.
        *   `src/components/ui/`: General UI components.
            *   `Home.astro`: The home page component (Astro component).
    *   `src/config/`: Configuration files.
        *   `constants.ts`: File containing various constants used throughout the application.
    *   `src/hooks/`: React hooks.
        *   `useQuiz.ts`: Custom hook for quiz logic.
    *   `src/layouts/`: Astro layout components.
        *   `BaseLayout.astro`: The main layout for pages.
    *   `src/pages/`: Astro pages (routes).
        *   `index.astro`: The home page.
        *   `quiz.astro`: The quiz page.
    *   `src/schemas/`: Data validation schemas.
        *   `question.schema.ts`: Schema for validating question data.
    *   `src/services/`: Contains data fetching logic.
        *   `quiz.service.ts`: Functions for fetching quiz data.
        *   `quiz.service.test.ts`: Tests for the quiz service.
    *   `src/store/`: Zustand store for managing application state.
        *   `quiz.store.ts`: Defines the Zustand store, its state, and actions.
        *   `quiz.store.test.ts`: Tests for the quiz store.
    *   `src/styles/`: Contains CSS files.
        *   `global.css`: Global styles for the application.
    *   `src/types/`: TypeScript type definitions.
        *   `api.d.ts`: Type definitions for API responses.
        *   `quiz.d.ts`: Type definitions related to the quiz.
    *   `src/utils/`: Utility functions.
        *   `errorHelpers.ts`: Helper functions for error handling.
        *   `errorHelpers.test.ts`: Tests for error helper functions.

## Key Components and Logic

*   **`src/pages/quiz.astro`:** This Astro page likely renders the main quiz component (`QuizIndex.tsx` or `QuizPageComponent.tsx`).
*   **`src/components/quiz/QuizIndex.tsx` or `src/components/quiz/QuizPageComponent.tsx`:** These components are likely responsible for orchestrating the quiz flow, fetching data using the `useQuiz` hook, and rendering the appropriate UI components based on the quiz state (loading, error, displaying questions, etc.). The previous `CardQuiz.tsx` functionality is likely integrated into these components.
*   **`src/hooks/useQuiz.ts`:** This custom hook encapsulates the quiz logic, including fetching data using `quiz.service.ts`, managing the state using `quiz.store.ts`, and handling the progression through questions.
*   **`src/store/quiz.store.ts`:** The Zustand store (`useQuizStore`) holds the application's state related to the quiz, including the current question index, the user's answers, and potentially loading/error states. It provides actions to modify this state.
*   **`src/services/quiz.service.ts`:** This file contains the logic for fetching quiz questions, likely from the local JSON file (`public/mockups/dataQ.json`) using Axios.
*   **`src/components/quiz/ui/Question.tsx` and `src/components/quiz/ui/AnswersQuestion.tsx`:** These components are responsible for rendering individual questions and their answer options, and handling user interactions when selecting answers.
*   **`src/components/quiz/ErrorBoundary.tsx`:** This component provides error handling specifically for the quiz section, preventing the entire application from crashing if an error occurs within the quiz.

## State Management

The project uses Zustand for state management, specifically for the quiz state, managed by the `useQuizStore` hook in `src/store/quiz.store.ts`. The state includes:

*   `questionIndex`: The index of the currently displayed question.
*   `answers`: An object mapping question IDs to the selected answer ID.
*   `status`: The current status of the quiz (e.g., 'loading', 'success', 'error').
*   `error`: Any error object if the status is 'error'.
*   `questions`: The array of fetched quiz questions.

The store provides actions to update the state, such as `setQuestions`, `setQuestionIndex`, `setAnswers`, and `setStatus`.

## Data Fetching

Data fetching is handled in `src/services/quiz.service.ts` using Axios. The `useQuiz` hook in `src/hooks/useQuiz.ts` utilizes this service to fetch the quiz data.

## Styling

Tailwind CSS is used for styling, providing a utility-first approach to building the user interface.

## Testing

The project includes unit tests using Vitest and `@testing-library/react`.

*   `src/store/quiz.store.test.ts`: Tests for the Zustand store's state and actions.
*   `src/services/quiz.service.test.ts`: Tests for the data fetching logic, including successful fetches and error handling.
*   Tests for components like `src/components/quiz/QuizIndex.tsx` or `src/components/quiz/QuizPageComponent.tsx` would be beneficial to ensure they render correctly in different states and handle user interactions.

## Potential Improvements

*   Implement more robust error handling and display user-friendly error messages (partially addressed with `ErrorBoundary.tsx` but can be further improved).
*   Add a feature to track user scores and provide a summary at the end of the quiz.
*   Implement a timer for each question or the entire quiz.
*   Fetch quiz data from a remote API instead of a local JSON file.
*   Add different question types (e.g., multiple-choice with multiple correct answers, true/false).
*   Improve the user interface with more advanced styling and animations.
*   Add comprehensive unit tests for all components and utility functions.
