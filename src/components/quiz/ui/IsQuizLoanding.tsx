

export const IsQuizLoading: React.FC = () => {
	const BASE_CONTAINER = 'w-full max-w-3xl mx-auto px-4'
	const CARD_CONTAINER = 'bg-slate-800 rounded-2xl p-4 shadow-md'
	return (
		<section className={BASE_CONTAINER}>
			<div className={CARD_CONTAINER}>
				<div className="flex-1 flex items-center justify-center py-8">
					<div className="text-white text-xl animate-pulse">Cargando preguntas...</div>
				</div>
				<div className="grid grid-cols-3 gap-2 items-center min-h-[60px] mt-4"></div>
				<footer className="text-center min-h-[40px] flex items-center justify-center mt-2"></footer>
			</div>
		</section>
	)
}

export default IsQuizLoading
