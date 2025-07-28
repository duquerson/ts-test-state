import { render, screen } from '@testing-library/react'
import { expect, vi } from 'vitest'

import { Question } from './Question'

// Mock directo dentro de vi.mock para evitar hoisting errors
vi.mock('./AnswersQuestion', () => ({
	AnswersQuestion: () => <div data-testid="mocked-answers" />
}))

describe('Question component', () => {
	const baseProps = {
		currentQuestion: {
			question: '¿Cuál es la capital de Francia?',
			answer: ['París', 'Madrid', 'Londres'],
			correctAnswer: 'París'
		}
	}

	it('renders the question text', () => {
		render(<Question {...baseProps} />)
		expect(screen.getByText(baseProps.currentQuestion.question)).toBeInTheDocument()
	})

	it('renders code block when currentQuestion has code', () => {
		const propsWithCode = {
			currentQuestion: {
				...baseProps.currentQuestion,
				code: 'console.log("Hola mundo");'
			}
		}

		render(<Question {...propsWithCode} />)
		expect(screen.getByText('console.log("Hola mundo");')).toBeInTheDocument()
		expect(screen.getByRole('code')).toBeDefined()
	})

	it('does not render code block when currentQuestion has no code', () => {
		render(<Question {...baseProps} />)
		expect(screen.queryByRole('code')).not.toBeInTheDocument()
	})
})
