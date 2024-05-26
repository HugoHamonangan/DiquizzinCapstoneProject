import logo from '../img/logo.png';
import instagramIcon from '../img/InstagramIcon.png';
import youtubeIcon from '../img/YouTubeIcon.png';
import githubIcon from '../img/GitHubIcon.png';
import facebookIcon from '../img/FacebookIcon.png';
import { translate } from '../utils/helperFunction';
import { useAppSelector } from '../states/hooks/hooks';

const FooterSection = () => {
  const language = useAppSelector((state) => state.language);
  return (
    <footer className="bg-white px-10 md:px-0  mt-[5rem] pt-[5rem] ">
      <div className="container mx-auto flex justify-around flex-col md:flex-row">
        <div className="flex-col flex">
          <img src={logo} alt={logo} className="w-[13rem]" />
          <p className="md:w-[25rem] leading-8">
            Learning by playing is one of the enjoyful moment, and you find the
            platform to do that. Play Diquizzin.
          </p>
          <div className="flex gap-2 mt-4">
            <a
              // href={`https://www.instagram.com/${instagramUser}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="w-[2.4rem] hover:scale-125 transition-all"
                src={instagramIcon}
                alt="Instagram"
              />
            </a>
            <a
              // href={`https://www.youtube.com/${youtubeUser}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="w-[2.4rem] hover:scale-125 transition-all"
                src={youtubeIcon}
                alt="YouTube"
              />
            </a>
            <a
              // href={`https://www.github.com/${githubUser}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="w-[2.4rem] hover:scale-125 transition-all    "
                src={githubIcon}
                alt="GitHub"
              />
            </a>
            <a
              // href={`https://www.facebook.com/${facebookUser}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="w-[2.4rem] hover:scale-125 transition-all"
                src={facebookIcon}
                alt="Facebook"
              />
            </a>
          </div>
        </div>
        <div className="flex flex-col mt-16">
          <h3 className="font-bold text-xl">Useful Links</h3>
          <ul className="flex flex-col gap-4 mt-4">
            <li>
              <a
                className="p-3 hover:bg-[#2e2e2e18] rounded-xl transition"
                href={'/#'}
              >
                {translate(language, 'Home', 'Beranda')}
              </a>
            </li>
            <li>
              <a
                className="p-3 hover:bg-[#2e2e2e18] rounded-xl transition"
                href={'/#about'}
              >
                {translate(language, 'About Us', 'Tentang Kami')}
              </a>
            </li>
            <li>
              <a
                className="p-3 hover:bg-[#2e2e2e18] rounded-xl transition"
                href={'/#how-to-play'}
              >
                {translate(language, 'How To Play', 'Cara Bermain')}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="mt-14 text-center pb-5">
        ©Copyright 2024 Diquizzin | All Rights Reserved
      </p>
    </footer>
  );
};

export default FooterSection;
