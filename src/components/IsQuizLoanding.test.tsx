import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import IsQuizLoanding from './IsQuizLoanding';
import React from 'react';

describe('IsQuizLoanding', () => {
  it('should render the loading message', () => {
    render(React.createElement(IsQuizLoanding, null));
    // Assuming IsQuizLoanding renders the text "Cargando preguntas..."
    expect(screen.getByText('Cargando preguntas...')).toBeDefined();
  });
});
