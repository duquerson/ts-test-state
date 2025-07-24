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

## Project Structure

The project follows a standard directory structure:

*   `public/`: Contains static assets like fonts, images, and mock data.
    *   `public/mockups/dataQ.json`: The local JSON file containing quiz questions.
*   `src/`: Contains the main application code.
    *   `src/components/`: Reusable React components.
        *   `AnswersQuestion.tsx`: Component for displaying answer options and handling answer selection.
        *   `CardQuiz.tsx`: The main component that orchestrates the quiz flow, fetches data, and manages state.
        *   `Home.astro`: The home page component (Astro component).
        *   `IntroQuiz.tsx`: Component for the quiz introduction.
        *   `IsQuizError.tsx`: Component to display error messages.
        *   `IsQuizLoanding.tsx`: Component to display a loading indicator.
        *   `Question.tsx`: Component for displaying a single question.
    *   `src/const/`: Contains application constants.
        *   `CONST.ts`: File containing various constants used throughout the application.
    *   `src/layouts/`: Astro layout components.
        *   `Layout.astro`: The main layout for pages.
    *   `src/pages/`: Astro pages (routes).
        *   `index.astro`: The home page.
        *   `quizz.astro`: The quiz page.
    *   `src/services/`: Contains data fetching logic.
        *   `fetchData.ts`: Functions for fetching quiz data (currently from a local JSON file).
    *   `src/store/`: Zustand store for managing application state.
        *   `store.ts`: Defines the Zustand store, its state, and actions.
    *   `src/styles/`: Contains CSS files.
        *   `global.css`: Global styles for the application.
    *   `src/types/`: TypeScript type definitions.
        *   `store.d.ts`: Type definitions related to the store.
    *   `src/utils/`: Utility functions.
        *   `classQuestion.ts`: Utility related to questions (potentially a class or functions).

## Key Components and Logic

*   **`CardQuiz.tsx`:** This is the central component for the quiz. It uses `@tanstack/react-query` to manage data fetching from `fetchData.ts` and interacts with the Zustand store (`useStore`) to manage the current question index and user's answers. It conditionally renders loading, error, or question components based on the data fetching state.
*   **`useStore` (in `src/store/store.ts`):** The Zustand store holds the application's state, including the current question index, the user's answers, and potentially loading/error states. It provides actions to modify this state, such as `increaseQuestion`, `decreaseQuestion`, `answerQuestion`, and `resetQuizUI`.
*   **`fetchData.ts`:** This file contains the logic for fetching quiz questions. Currently, it fetches from a local JSON file using Axios, shuffles the questions, and slices the result to a fixed number of questions.
*   **`Question.tsx` and `AnswersQuestion.tsx`:** These components are responsible for rendering individual questions and their answer options, and handling user interactions when selecting answers.

## State Management

The project uses Zustand for state management. The `useStore` hook provides access to the store's state and actions. The state includes:

*   `indexQuestion`: The index of the currently displayed question.
*   `answeredQuestions`: An object mapping question IDs to the selected answer ID.
*   Other potential state properties for loading, error handling, score, etc.

The store provides actions to update the state in a predictable manner.

## Data Fetching

Data fetching is handled in `src/services/fetchData.ts` using Axios and `@tanstack/react-query`. `react-query` helps manage the caching, loading, and error states of the fetched data.

## Styling

Tailwind CSS is used for styling, providing a utility-first approach to building the user interface.

## Testing

The project includes unit tests using Vitest and `@testing-library/react`.

*   `src/store/store.test.ts`: Tests for the Zustand store's state and actions.
*   `src/services/fetchData.test.ts`: Tests for the data fetching logic, including successful fetches and error handling.
*   `src/components/CardQuiz.test.tsx`: Tests for the `CardQuiz` component, including rendering different states (loading, error, data loaded) and potentially user interactions.

## Potential Improvements (from README.md)

*   Implement more robust error handling and display user-friendly error messages.
*   Add a feature to track user scores and provide a summary at the end of the quiz.
*   Implement a timer for each question or the entire quiz.
*   Fetch quiz data from a remote API instead of a local JSON file.
*   Add different question types (e.g., multiple-choice with multiple correct answers, true/false).
*   Improve the user interface with more advanced styling and animations.
*   Add unit tests for components, state management, and utility functions.
