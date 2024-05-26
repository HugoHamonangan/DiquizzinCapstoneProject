import arrow from '../img/arrowwiggling.png';
import wa from '../img/whatsapp.png';
import { useAppSelector } from '../states/hooks/hooks';
import { translate } from '../utils/helperFunction';
import ScrollReveal from './ScrollReveal';
const QuestionSection = () => {
  const language = useAppSelector((state) => state.language);
  return (
    <section className="container mx-auto px-10 md:px-0 pt-[7rem]">
      <ScrollReveal>
        <h1 className="font-extrabold text-3xl text-center leading-10 md:w-3/4 mx-auto">
          {translate(
            language,
            'If you have any questions, feel free to ask, follow this wiggling arrow..',
            'Jika Anda memiliki pertanyaan, jangan ragu untuk bertanya, ikuti panah bergelombang ini..'
          )}
        </h1>
        <img
          src={arrow}
          alt="Wiggling arrow"
          className="mx-auto w-[27rem] mt-4"
        />
        <div className="p-7 rounded-lg w-fit mx-auto shadow-card hover:bg-[#3aaa35] cursor-pointer transition-all">
          <img src={wa} alt="WhatsApp icon" className="mx-auto" />
        </div>
      </ScrollReveal>
    </section>
  );
};

export default QuestionSection;
