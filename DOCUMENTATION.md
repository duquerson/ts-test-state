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
    *   `/public/mockups/dataQ.json`: The local JSON file containing quiz questions.
    *   `/public/fonts/`: Contains font files.
*   `src/`: Contains the main application code.
    *   `/src/components/`: Reusable components.
        *   `/src/components/quiz/`: React components related to the quiz.
            *   `/src/components/quiz/ErrorBoundary.tsx`: Component for catching and displaying errors within the quiz.
            *   `/src/components/quiz/QuizIndex.tsx`: Likely the main entry point for the quiz section, sets up React Query and Error Boundary.
            *   `/src/components/quiz/QuizPageComponent.tsx`: The core component rendering the quiz based on its state (loading, error, main quiz layout).
        *   `/src/components/quiz/ui/`: UI components used within the quiz.
            *   `/src/components/quiz/ui/AnswersQuestion.tsx`: Component for displaying answer options and handling answer selection.
            *   `/src/components/quiz/ui/Button.tsx`: Reusable button component.
            *   `/src/components/quiz/ui/IsQuizEmpty.tsx`: Component to display when the quiz is empty.
            *   `/src/components/quiz/ui/IsQuizError.tsx`: Component to display error messages.
            *   `/src/components/quiz/ui/IsQuizLoading.tsx`: Component to display a loading indicator.
            *   `/src/components/quiz/ui/Question.tsx`: Component for displaying a single question.
            *   `/src/components/quiz/ui/QuizLayout.tsx`: Layout component for the quiz, structuring the question and navigation.
            *   `/src/components/quiz/ui/QuizProgress.tsx`: Component to show quiz progress.
        *   `/src/components/ui/`: General UI components.
            *   `/src/components/ui/Home.astro`: The home page component (Astro component).
    *   `/src/config/`: Configuration files.
        *   `/src/config/constants.ts`: File containing various constants used throughout the application.
    *   `/src/hooks/`: React hooks.
        *   `/src/hooks/useQuiz.ts`: Custom hook encapsulating quiz logic and state management.
    *   `/src/layouts/`: Astro layout components.

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
        *   `/src/pages/index.astro`: The home page.
        *   `/src/pages/quiz.astro`: The quiz page.
    *   `/src/schemas/`: Data validation schemas.
        *   `/src/schemas/question.schema.ts`: Schema for validating question data.
    *   `/src/services/`: Contains data fetching logic.
        *   `/src/services/quiz.service.ts`: Functions for fetching quiz data.
        *   `/src/services/quiz.service.test.ts`: Tests for the quiz service.
    *   `/src/store/`: Zustand store for managing application state.
        *   `/src/store/quiz.store.ts`: Defines the Zustand store, its state, and actions.
    *   `/src/styles/`: Contains CSS files.
        *   `/src/styles/global.css`: Global styles for the application.
    *   `/src/types/`: TypeScript type definitions.
        *   `/src/types/api.d.ts`: Type definitions for API responses.
        *   `/src/types/quiz.d.ts`: Type definitions related to the quiz.
    *   `/src/utils/`: Utility functions.
        *   `/src/utils/errorHelpers.ts`: Helper functions for error handling.
        *   `/src/utils/errorHelpers.test.ts`: Tests for error helper functions.

## Arquitectura del Proyecto y Flujo de Datos

El proyecto utiliza una combinación de **Astro** y **React** para construir una aplicación web moderna.

        *   `index.astro`: The home page.
        *   `quiz.astro`: The quiz page.
    *   `src/schemas/`: Data validation schemas.
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
*   **Astro (`/src/pages/`, `/src/layouts/`):** Se utiliza principalmente para el enrutamiento basado en archivos y para definir los layouts de las páginas (`/src/layouts/BaseLayout.astro`). Las páginas (`/src/pages/index.astro`, `/src/pages/quiz.astro`) definen las rutas y renderizan componentes, incluyendo componentes de React con hidratación del lado del cliente (`client:load` en `/src/pages/quiz.astro`).
*   **React (`/src/components/`):** Se utiliza para construir los componentes interactivos de la interfaz de usuario, especialmente la sección del quiz. Los componentes de React se colocan en el directorio `/src/components/`.

La estructura del proyecto se organiza en directorios clave:

*   `/public/`: Contiene activos estáticos que se sirven directamente (imágenes, fuentes, archivos JSON de mockups).
    *   `/public/mockups/dataQ.json`: El archivo JSON local que sirve como fuente de datos para las preguntas del quiz en este ejemplo.
*   `/src/`: Contiene todo el código fuente de la aplicación.
    *   `/src/components/`: Componentes reutilizables de Astro y React.
    *   `/src/config/`: Archivos de configuración y constantes.
    *   `/src/hooks/`: React Hooks personalizados que encapsulan lógica.
    *   `/src/layouts/`: Layouts de Astro.
    *   `/src/pages/`: Rutas/páginas de Astro.
    *   `/src/schemas/`: Esquemas de validación de datos (usando Zod).
    *   `/src/services/`: Lógica para interactuar con fuentes de datos (APIs, archivos locales).
    *   `/src/store/`: Stores de estado global (usando Zustand).
    *   `/src/styles/`: Archivos de estilos CSS.
    *   `/src/types/`: Definiciones de tipos de TypeScript.
    *   `/src/utils/`: Funciones de utilidad.

### Flujo de Datos del Quiz

El flujo de datos para cargar y gestionar el quiz sigue estos pasos:

1.  **Obtención de Datos:** El servicio `/src/services/quiz.service.ts` se encarga de realizar la petición HTTP (usando Axios) para obtener los datos de las preguntas desde `/public/mockups/dataQ.json`.
2.  **Validación de Datos:** Una vez obtenidos los datos, `/src/services/quiz.service.ts` utiliza los esquemas definidos en `/src/schemas/question.schema.ts` (con Zod) para validar que la estructura de los datos sea la esperada. Si la validación falla, se lanza un error.
3.  **Gestión de la Petición y Caché:** El hook personalizado `/src/hooks/useQuiz.ts` utiliza la biblioteca `react-query` para llamar a `/src/services/quiz.service.ts`. `react-query` maneja automáticamente el estado de la petición (cargando, error, éxito), la caché de los datos y los reintentos en caso de fallo.
4.  **Gestión del Estado de UI del Quiz:** `/src/hooks/useQuiz.ts` interactúa con el store de Zustand definido en `/src/store/quiz.store.ts`. Este store (`useQuizUIStore`) mantiene el estado de la interfaz de usuario del quiz, como el índice de la pregunta actual, las respuestas seleccionadas por el usuario y si el quiz ha finalizado.
5.  **Presentación de la Página:** El componente principal del quiz, `/src/components/quiz/QuizPageComponent.tsx`, consume el hook `/src/hooks/useQuiz.ts` para obtener los datos del quiz, el estado actual (cargando, error) y los handlers para interactuar con el quiz.
6.  **Renderizado del Layout y Componentes de UI:** Si no hay errores y los datos están cargados, `/src/components/quiz/QuizPageComponent.tsx` renderiza el componente `/src/components/quiz/ui/QuizLayout.tsx`. Este layout recibe los datos de la pregunta actual y los handlers del hook `useQuiz` y se encarga de renderizar la pregunta actual (`/src/components/quiz/ui/Question.tsx`) y sus opciones de respuesta (`/src/components/quiz/ui/AnswersQuestion.tsx`), o los resultados finales si el quiz ha terminado.

Aquí se presenta un diagrama de flujo simplificado del proceso:



El flujo de datos para cargar y gestionar el quiz sigue estos pasos:

1.  **Obtención de Datos:** El servicio `/src/services/quiz.service.ts` se encarga de realizar la petición HTTP (usando Axios) para obtener los datos de las preguntas desde `/public/mockups/dataQ.json`.
2.  **Validación de Datos:** Una vez obtenidos los datos, `/src/services/quiz.service.ts` utiliza los esquemas definidos en `/src/schemas/question.schema.ts` (con Zod) para validar que la estructura de los datos sea la esperada. Si la validación falla, se lanza un error.
3.  **Gestión de la Petición y Caché:** El hook personalizado `/src/hooks/useQuiz.ts` utiliza la biblioteca `react-query` para llamar a `/src/services/quiz.service.ts`. `react-query` maneja automáticamente el estado de la petición (cargando, error, éxito), la caché de los datos y los reintentos en caso de fallo.
4.  **Gestión del Estado de UI del Quiz:** `/src/hooks/useQuiz.ts` interactúa con el store de Zustand definido en `/src/store/quiz.store.ts`. Este store (`useQuizUIStore`) mantiene el estado de la interfaz de usuario del quiz, como el índice de la pregunta actual, las respuestas seleccionadas por el usuario y si el quiz ha finalizado.
5.  **Presentación de la Página:** El componente principal del quiz, `/src/components/quiz/QuizPageComponent.tsx`, consume el hook `/src/hooks/useQuiz.ts` para obtener los datos del quiz, el estado actual (cargando, error) y los handlers para interactuar con el quiz.
6.  **Renderizado del Layout y Componentes de UI:** Si no hay errores y los datos están cargados, `/src/components/quiz/QuizPageComponent.tsx` renderiza el componente `/src/components/quiz/ui/QuizLayout.tsx`. Este layout recibe los datos de la pregunta actual y los handlers del hook `useQuiz` y se encarga de renderizar la pregunta actual (`/src/components/quiz/ui/Question.tsx`) y sus opciones de respuesta (`/src/components/quiz/ui/AnswersQuestion.tsx`), o los resultados finales si el quiz ha terminado.



El flujo de datos para cargar y gestionar el quiz sigue estos pasos:

1.  **Obtención de Datos:** El servicio `/src/services/quiz.service.ts` se encarga de realizar la petición HTTP (usando Axios) para obtener los datos de las preguntas desde `/public/mockups/dataQ.json`.
2.  **Validación de Datos:** Una vez obtenidos los datos, `/src/services/quiz.service.ts` utiliza los esquemas definidos en `/src/schemas/question.schema.ts` (con Zod) para validar que la estructura de los datos sea la esperada. Si la validación falla, se lanza un error.
3.  **Gestión de la Petición y Caché:** El hook personalizado `/src/hooks/useQuiz.ts` utiliza la biblioteca `react-query` para llamar a `/src/services/quiz.service.ts`. `react-query` maneja automáticamente el estado de la petición (cargando, error, éxito), la caché de los datos y los reintentos en caso de fallo.
4.  **Gestión del Estado de UI del Quiz:** `/src/hooks/useQuiz.ts` interactúa con el store de Zustand definido en `/src/store/quiz.store.ts`. Este store (`useQuizUIStore`) mantiene el estado de la interfaz de usuario del quiz, como el índice de la pregunta actual, las respuestas seleccionadas por el usuario y si el quiz ha finalizado.
5.  **Presentación de la Página:** El componente principal del quiz, `/src/components/quiz/QuizPageComponent.tsx`, consume el hook `/src/hooks/useQuiz.ts` para obtener los datos del quiz, el estado actual (cargando, error) y los handlers para interactuar con el quiz.
6.  **Renderizado del Layout y Componentes de UI:** Si no hay errores y los datos están cargados, `/src/components/quiz/QuizPageComponent.tsx` renderiza el componente `/src/components/quiz/ui/QuizLayout.tsx`. Este layout recibe los datos de la pregunta actual y los handlers del hook `useQuiz` y se encarga de renderizar la pregunta actual (`/src/components/quiz/ui/Question.tsx`) y sus opciones de respuesta (`/src/components/quiz/ui/AnswersQuestion.tsx`), o los resultados finales si el quiz ha terminado.


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

## Componentes Clave

Esta sección describe el propósito y rol de algunos de los componentes clave de React en el proyecto:

*   **`/src/components/quiz/QuizPageComponent.tsx`**: Este es el componente principal que orquesta la lógica y la visualización del quiz. Consume el hook `useQuiz` para obtener los datos, el estado (cargando, error) y los manejadores de eventos. Basado en el estado, renderiza un indicador de carga, un mensaje de error, o el layout principal del quiz.

*   **`/src/components/quiz/ui/QuizLayout.tsx`**: Componente de presentación que maneja el diseño principal del quiz. Recibe los datos y los manejadores del hook `useQuiz` a través de props. Es responsable de renderizar condicionalmente la pregunta actual con sus opciones o los resultados finales del quiz. También contiene los botones de navegación (Anterior, Reiniciar, Siguiente).

*   **`/src/components/quiz/ui/Question.tsx`**: Componente de presentación que muestra el contenido de una sola pregunta. Renderiza el texto de la pregunta y, opcionalmente, un bloque de código asociado. Delega la visualización de las opciones de respuesta al componente `AnswersQuestion`.

*   **`/src/components/quiz/ui/AnswersQuestion.tsx`**: Componente de presentación que renderiza la lista de opciones de respuesta para una pregunta dada. Mapea sobre el array de respuestas y crea botones interactivos para cada opción. Maneja el evento de selección de respuesta y aplica clases CSS basadas en si la pregunta ha sido respondida y si la respuesta seleccionada es correcta o no.

Estos componentes trabajan en conjunto, siguiendo un patrón de contenedor (en el hook y `QuizPageComponent`) y presentación (en los componentes `ui`), para construir la interfaz de usuario del quiz.

## Gestión de Estado y Datos

## Validación de Datos y Manejo de Errores

## Componentes Clave



