import type { JSX } from 'react'

import { BUTTON_COLORS, BUTTON_CLASSES } from '../../../config/constants'

type ButtonProps = {
	text: string
	onClick: () => void
	disabled?: boolean
	position?: 'start' | 'center' | 'end'
	variant: 'back' | 'reset' | 'next' | 'result'
}

export const Button = ({
	text,
	onClick,
	disabled = false,
	position = 'start',
	variant
}: ButtonProps): JSX.Element => {
	const colors = BUTTON_COLORS[variant] ?? {
		bg: 'bg-[#3178C6]',
		hover: 'hover:bg-[#235A97]'
	}
	const positionClass = BUTTON_CLASSES.positions[position] ?? ''
	const stateClass = disabled ? BUTTON_CLASSES.state.hidden : BUTTON_CLASSES.state.visible

	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`
        ${BUTTON_CLASSES.base}
        ${BUTTON_CLASSES.disabled}
        ${colors.bg}
        ${colors.hover}
        ${positionClass}
        ${stateClass}
      `}
		>
			{text}
		</button>
	)
}
