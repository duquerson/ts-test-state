import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {IsQuizError} from './IsQuizError';
import React from 'react';

describe('IsQuizError', () => {
  it('should render the error message', () => {
    const errorMessage = 'Something went wrong!';
    render(React.createElement(IsQuizError, { message: errorMessage }));
    expect(screen.getByText(errorMessage)).toBeDefined();
  });

  it('should render a default message if no message prop is provided', () => {
	render(React.createElement(IsQuizError, null));
	expect(screen.getByText(/unexpected error/i)).toBeDefined();
  });
});
