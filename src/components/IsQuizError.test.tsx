import { render, screen, fireEvent } from '@testing-library/react'
import { expect, vi } from 'vitest'

import { IsQuizError } from './IsQuizError'

describe('IsQuizError', () => {
	it('should render a retry button and call onRetry when clicked', () => {
		const mockOnRetry = vi.fn()
		render(<IsQuizError message="Error with retry" onRetry={mockOnRetry} />)

		// Cambié el name para que coincida con el texto real del botón: "Try Again"
		const retryButton = screen.getByRole('button', { name: /try again/i })
		expect(retryButton).toBeDefined()

		fireEvent.click(retryButton)
		expect(mockOnRetry).toHaveBeenCalled()
	})
})
