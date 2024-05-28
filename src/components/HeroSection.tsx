import computer from '../img/computer.png';
import heroHuman from '../img/heroHuman.png';
import { useAppSelector } from '../states/hooks/hooks';
import { translate } from '../utils/helperFunction';

const HeroSection = () => {
  const language = useAppSelector((state) => state.language);

  return (
    <section className="container mx-auto px-10 md:px-0 flex flex-col lg:flex-row gap-10 items-center justify-between ">
      <div className="flex flex-col gap-5 w-full">
        <h1 className="font-extrabold text-3xl md:text-[2.6em] leading-[3.8rem] md:w-[43rem]">
          {translate(
            language,
            "Let's Play and Open Your Insights",
            'Main dan Buka Pengetahuan Kamu '
          )}
          ,{' '}
          <span className="relative font-extrabold bg-[#b6eafa]">
            {translate(language, 'Discover New Things', 'Temukan Hal-hal Baru')}
            <img
              src={heroHuman}
              alt="heroHuman"
              className="w-[7.5rem] absolute z-10 -right-[4.6rem] -top-[4.3rem] hidden md:block"
            />
          </span>
          <span className="relative font-extrabold bg-[#b6eafa]">
            {' '}
            {translate(language, 'With Diquizzin', 'Bersama Diquizzin')}
          </span>
        </h1>

        <p className="pr-[4rem] max-w-[40rem] leading-8">
          {translate(
            language,
            "Learning by playing is one of the enjoyable moments, and you found the great platform to do that, so let's play !!!",
            'Belajar sambil bermain adalah salah satu momen yang menyenangkan, dan Anda menemukan platform yang hebat untuk melakukannya, jadi ayo bermain !!!'
          )}
        </p>
        <div className="flex gap-4">
          <button className="py-3 px-4 bg-[#0C356A] text-white rounded-lg">
            {translate(language, 'Get Started', 'Ayo Mulai')}
          </button>
          <button className="py-3 px-4 border border-[#0C356A] rounded-lg">
            {translate(language, 'Learn More', 'Selengkapnya')}
          </button>
        </div>
      </div>
      <img
        src={computer}
        alt="computer"
        className="object-cover w-full lg:w-[20rem] xl:w-[35rem]"
      />
    </section>
  );
};

export default HeroSection;
