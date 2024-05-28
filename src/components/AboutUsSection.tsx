import React from 'react';
import aboutUsImage from '../img/aboutUsImage.png';
import { useAppSelector } from '../states/hooks/hooks';
import { translate } from '../utils/helperFunction';
import ScrollReveal from './ScrollReveal';

const AboutUsSection: React.FC = () => {
  const language = useAppSelector((state) => state.language);

  return (
    <section
      id="about"
      className="container mx-auto px-10 md:px-0 flex gap-16 flex-col-reverse lg:flex-row justify-start items-center pt-[7rem] md:pt-[5rem]"
    >
      <ScrollReveal className="w-full max-w-[33rem]">
        <img
          src={aboutUsImage}
          alt="aboutUsImage"
          className="w-full max-w-[33rem] object-cover"
        />
      </ScrollReveal>
      <ScrollReveal className="flex flex-col gap-3">
        <h3 className="font-bold text-xl text-[#0C356A]">
          {translate(language, 'About Us', 'Tentang Kami')}
        </h3>
        <p className="leading-9">
          {translate(
            language,
            `We are making this website to help people increasing their insights
            through enjoyable way, which is playing quiz, you will get a bunch of
            new insights after playing this game and also we have leaderboards
            system, the first ranked player will be rewarded by real gifts.`,
            'Kami membuat website ini untuk membantu masyarkat agar menambah wawasan mereka dengan cara yang seru, ya dengan bermain quiz, kamu akan mendapatkan banyak sekaliwawasan baru setelah main game dan kami juga punya sistem leaderboards, peringkat pertama akan mendapatkan hadiah dari kami.'
          )}
        </p>
        <button className="py-3 px-4 bg-[#0C356A] text-white rounded-lg w-fit mt-3">
          {translate(
            language,
            'Learn More About Gifts',
            'Selengkapnya Tentang Hadiah'
          )}
        </button>
      </ScrollReveal>
    </section>
  );
};

export default AboutUsSection;
