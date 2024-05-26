import placeholder from '../img/placeholder.png';
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
          <p className="xl:pr-[1rem] leading-8">
            {translate(
              language,
              'Please read or watch this tutorial first if you are confused about where to start playing this Quiz. We have text and video tutorials, make sure to read or watch them. You can click this read tutorial below and also you can click the video next to this text. Enjoy !!',
              'Silakan baca atau tonton tutorial ini terlebih dahulu jika Anda bingung harus mulai dari mana bermain Kuis ini. Kami memiliki tutorial teks dan video, pastikan untuk membacanya atau menontonnya. Anda dapat mengklik tutorial baca ini di bawah dan juga dapat mengklik video di samping teks ini. Nikmati !!'
            )}
          </p>
          <button className="py-3 px-4 text-[#0C356A] bg-white rounded-lg w-fit mt-4">
            {translate(language, 'Read The Tutorial', 'Baca Tutorial')}
          </button>
        </div>
        <img
          src={placeholder}
          alt="Tutorial Placeholder"
          className="object-cover w-full lg:w-3/4"
        />
      </ScrollReveal>
    </section>
  );
};

export default HowToPlaySection;
