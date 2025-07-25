import { BASE_CONTAINER, CARD_CONTAINER } from "../const/CONST";

type Props = {
  message?: string;
  onRetry?: () => void;
  retryText?: string;
}

export const IsQuizError: React.FC<Props> = ({
  message = 'An unexpected error occurred.',
  onRetry,
  retryText = "Try Again"
}) => {
  return (
    <section className={BASE_CONTAINER}>
      <div className={CARD_CONTAINER}>
        <head className="flex-1 flex items-center justify-center py-8">
          {/* Mensaje de error */}
          <h2 className="text-center text-white font-extrabold text-2xl">
            {message}
          </h2>
        </head>

        <article className="grid grid-cols-3 gap-2 items-center min-h-[60px] mt-4">
          
          {onRetry && (
            <div className="col-start-2 flex justify-center">
              <button
                onClick={onRetry}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                {retryText}
              </button>
            </div>
          )}
        </article>

        <footer className="text-center min-h-[40px] flex items-center justify-center mt-2"></footer>
      </div>
    </section>
  );
};