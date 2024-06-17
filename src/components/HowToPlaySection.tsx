import { useAppSelector } from '../states/hooks/hooks';
import { translate } from '../utils/helperFunction';
import ScrollReveal from './ScrollReveal';

const HowToPlaySection = () => {
  const language = useAppSelector((state) => state.language);
  return (
    <section
      id="how-to-play"
      className="bg-[#0C356A] mt-[5rem] pt-[3rem] w-full"
    >
      <ScrollReveal className="container mx-auto px-10 md:px-0 flex flex-col lg:flex-row items-center py-[5rem] gap-11">
        <div className="flex flex-col text-white gap-3">
          <h3 className="font-extrabold text-lg">
            {translate(language, 'How To Play', 'Cara Bermain')}
          </h3>
          <p className="xl:pr-[3rem] leading-8 text-white">
            {translate(
              language,
              "If you're unsure where to start with this quiz, we have a helpful video tutorial for you. Just click on the video beside this text to watch and learn how to play. Enjoy the quiz!",
              'Jika Anda bingung harus mulai dari mana untuk memainkan kuis ini, kami memiliki video tutorial yang dapat membantu Anda. Klik video di samping teks ini untuk menonton dan mempelajari cara bermain. Selamat menikmati kuisnya!'
            )}
          </p>
        </div>
        <iframe
          width="400"
          height="315"
          className="w-full"
          src="https://www.youtube.com/embed/EKRN1keUKUM?si=rs6Xq_FxB_QtV4Ev"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </ScrollReveal>
    </section>
  );
};

export default HowToPlaySection;
