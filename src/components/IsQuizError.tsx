import { BASE_CONTAINER, CARD_CONTAINER } from "../const/CONST";


export const IsQuizError: React.FC = () => {
  return (
    <section className={BASE_CONTAINER}>
      <div className={CARD_CONTAINER}>
        <div className="flex-1 flex items-center justify-center py-8">
          <h2 className="text-center text-white font-extrabold text-2xl">404 not found</h2>
        </div>
        <div className="grid grid-cols-3 gap-2 items-center min-h-[60px] mt-4"></div>
        <footer className="text-center min-h-[40px] flex items-center justify-center mt-2"></footer>
      </div>
    </section>
  );
};

export default IsQuizError;