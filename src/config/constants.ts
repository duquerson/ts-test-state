// button-ui
// Mapa de colores por tipo de botón
const BUTTON_COLORS = {
	back: { bg: 'bg-[#3178C6]', hover: 'hover:bg-[#235A97]' },
	reset: { bg: 'bg-orange-500', hover: 'hover:bg-orange-600' },
	next: { bg: 'bg-[#3178C6]', hover: 'hover:bg-[#235A97]' },
	result: { bg: 'bg-orange-500', hover: 'hover:bg-orange-600' }
}

// Todas las clases organizadas
const BUTTON_CLASSES = {
	base: 'px-6 py-3 rounded-lg cursor-pointer font-medium transition-all duration-300 ease-in-out transform text-white shadow-lg hover:shadow-xl',
	disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
	positions: {
		start: 'justify-self-start',
		center: 'justify-self-center',
		end: 'justify-self-end'
	},
	state: {
		visible: 'visible scale-100 hover:scale-105',
		hidden: 'invisible scale-95'
	}
}

const ANSWER_CLASSES = {
	isCorrect: 'bg-green-600 text-white border-green-600',
	isSelected: 'bg-red-600 text-white border-red-600',
	isAnswered: 'bg-white text-gray-800 border-gray-300 opacity-70 cursor-not-allowed',
	default: 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'
} as const

export { BUTTON_CLASSES, BUTTON_COLORS, ANSWER_CLASSES }
