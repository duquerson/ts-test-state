import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, it, expect } from 'vitest'

import { IsQuizEmpty } from './IsQuizEmpty'

describe('IsQuizEmpty', () => {
	it('should render the empty message', () => {
		const emptyMessage = 'No questions available.'
		render(React.createElement(IsQuizEmpty, { message: emptyMessage }))
		expect(screen.getByText(emptyMessage)).toBeDefined()
	})

	it('should render a default message if no message prop is provided', () => {
		render(React.createElement(IsQuizEmpty, null))
		const matches = screen.getAllByText(/available/i)
		expect(matches.length).toBe(1)
	})
})
