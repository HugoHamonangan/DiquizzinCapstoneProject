import AboutUsSection from '../components/AboutUsSection';
import HeroSection from '../components/HeroSection';
import TeamSection from '../components/TeamSection';
import HowToPlaySection from '../components/HowToPlaySection';
import QuestionSection from '../components/QuestionSection';
import FooterSection from '../components/FooterSection';

const LandingPage = () => {
  return (
    <>
      
      <main className="mt-[11rem]">
        <HeroSection />
        <AboutUsSection />
        <TeamSection />
        <HowToPlaySection />
        <QuestionSection />
        <FooterSection />
      </main>
    </>
  );
};

export default LandingPage;
