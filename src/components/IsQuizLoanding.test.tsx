import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, it, expect } from 'vitest'

import IsQuizLoanding from './IsQuizLoanding'

describe('IsQuizLoanding', () => {
	it('should render the loading message', () => {
		render(React.createElement(IsQuizLoanding, null))
		// Assuming IsQuizLoanding renders the text "Cargando preguntas..."
		expect(screen.getByText('Cargando preguntas...')).toBeDefined()
	})
})
