// Navbar.tsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../states/hooks/hooks';
import { setEnglish, setIndonesian } from '../states/store';
import { translate } from '../utils/helperFunction';
import { scrollToSection } from '../utils/scrollToSection';
import logo from '../img/logo.png';
import translationIcon from '../img/translationIcon.png';
import indonesiaIcon from '../img/indonesiaIcon.png';
import britishIcon from '../img/britishIcon.png';
import { FaBars, FaXmark } from 'react-icons/fa6';
import { UserAuth } from '../context/AuthContext';
import { logout } from '../firebase/auth';

const Navbar: React.FC = () => {
  const [toggleNav, setToggleNav] = useState(false);
  const [toggleTranslation, setToggleTranslation] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const language = useAppSelector((state) => state.language);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = UserAuth();

  function setToggleNavTrue() {
    setToggleNav(true);
  }

  function setToggleNavFalse() {
    setToggleNav(false);
  }

  function isToggleTranslation() {
    setToggleTranslation(!toggleTranslation);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigation = (path: string, sectionId?: string) => {
    setToggleNavFalse();
    navigate(path);
    if (sectionId) {
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 50);
    }

    if (location.pathname !== path && sectionId) {
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    }
  };

  useEffect(() => {
    if (location.hash) {
      scrollToSection(location.hash.substring(1));
    }
  }, [location]);

  const toDashboard = () => {
    navigate('/dashboard');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header
        className={`${
          scrolled ? 'shadow-lg bg-[#fbf9f1]' : 'shadow-none bg-none'
        } fixed bg-[#fbf9f1] z-20 top-0 left-0 w-full px-10 md:px-0`}
      >
        <nav className="flex items-center justify-between container mx-auto ">
          <img
            src={logo}
            alt="Diquizzin logo's"
            className={`${scrolled ? 'w-[7rem]' : 'w-[12rem]'} transition-all`}
          />
          <ul className="hidden lg:flex items-center ">
            <li>
              <button
                className="p-3 cursor-pointer hover:bg-[#2e2e2e18] rounded-xl transition relative"
                onClick={isToggleTranslation}
              >
                <img
                  src={translationIcon}
                  alt="translationIcon"
                  className="w-[2.3rem] "
                />
                <div
                  className={` ${
                    toggleTranslation ? 'scale-0' : 'scale-100'
                  } absolute w-[11rem] left-0 top-[4rem] flex flex-col items-start gap-2 bg-[#0C356A] text-white p-4 rounded-lg overflow-hidden funky-animation`}
                >
                  <button
                    className="p-2 hover:bg-[#a7a7a7da] rounded-lg w-full text-left flex items-center gap-2"
                    onClick={() => dispatch(setIndonesian())}
                  >
                    <img
                      src={indonesiaIcon}
                      alt="indonesiaIcon"
                      className="w-[1.5rem]"
                    />
                    Indonesian
                  </button>
                  <button
                    className="p-2 hover:bg-[#a7a7a7da] rounded-lg w-full text-left flex items-center gap-2"
                    onClick={() => dispatch(setEnglish())}
                  >
                    <img
                      src={britishIcon}
                      alt="britishIcon"
                      className="w-[1.5rem]"
                    />
                    English
                  </button>
                </div>
              </button>
            </li>
            <li>
              <Link
                className="p-3 hover:bg-[#2e2e2e18] rounded-xl transition"
                to={'/'}
                onClick={scrollToTop}
              >
                {translate(language, 'Home', 'Beranda')}
              </Link>
            </li>
            <li>
              <button
                className="p-3 hover:bg-[#2e2e2e18] rounded-xl transition"
                onClick={() => handleNavigation('/', 'about')}
              >
                {translate(language, 'About Us', 'Tentang Kami')}
              </button>
            </li>
            <li>
              <button
                className="p-3 hover:bg-[#2e2e2e18] rounded-xl transition"
                onClick={() => handleNavigation('/', 'how-to-play')}
              >
                {translate(language, 'How To Play', 'Cara Bermain')}
              </button>
            </li>
            <li>
              <Link
                className="p-3 hover:bg-[#2e2e2e18] rounded-xl transition"
                to={'/leaderboard'}
                onClick={setToggleNavFalse}
              >
                {translate(language, 'Leaderboards', 'Papan Skor')}
              </Link>
            </li>
          </ul>
          <ul className="hidden lg:flex gap-3 items-center">
            {user ? (
              <>
                <li>
                  <button
                    className="py-3 px-4 mt-1 bg-[#0C356A] hover:bg-blue-700 transition text-white rounded-lg"
                    onClick={toDashboard}
                  >
                    {translate(language, 'Dashboard', 'Dasbor')}
                  </button>
                </li>
                <li>
                  <button
                    className="py-3 px-4 bg-red-600 hover:bg-red-700 transition text-white rounded-lg"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    className="py-3 px-4 bg-[#0C356A] hover:bg-blue-700 opacity-[71%] transition text-white rounded-lg"
                    to={'/register'}
                  >
                    {translate(language, 'Register', 'Daftar')}
                  </Link>
                </li>
                <li>
                  <Link
                    className="py-3 px-4 bg-[#0C356A] hover:bg-blue-700 transition text-white rounded-lg"
                    to={'/login'}
                  >
                    {translate(language, 'Login', 'Masuk')}
                  </Link>
                </li>
              </>
            )}
          </ul>
          <button
            onClick={setToggleNavTrue}
            className="block lg:hidden text-3xl hover:bg-[#2e2e2e18] transition p-3 rounded-lg"
          >
            <FaBars />
          </button>
        </nav>
        <nav
          className={` ${
            toggleNav ? 'scale-100' : 'scale-0'
          } fixed top-0 left-0 w-full h-screen bg-white flex md:scale-0 items-center justify-center text-center flex-col funky-animation`}
        >
          <button
            className="items-self-end text-3xl fixed top-10 right-10"
            onClick={setToggleNavFalse}
          >
            <FaXmark />
          </button>
          <ul className="flex flex-col gap-7 w-[70%] max-w-3xl">
            <li>
              <button
                className="p-3 cursor-pointer hover:bg-[#2e2e2e18] rounded-xl transition relative"
                onClick={isToggleTranslation}
              >
                <img
                  src={translationIcon}
                  alt="translationIcon"
                  className="w-[2.3rem] "
                />
                <div
                  className={` ${
                    toggleTranslation ? 'hidden' : 'block'
                  }  w-[11rem] left-0 top-[4rem] flex flex-col items-start gap-2 bg-[#0C356A] text-white p-4 rounded-lg overflow-hidden funky-animation`}
                >
                  <button
                    className="p-2 hover:bg-[#a7a7a7da] rounded-lg w-full text-left flex items-center gap-2"
                    onClick={() => dispatch(setIndonesian())}
                  >
                    <img
                      src={indonesiaIcon}
                      alt="indonesiaIcon"
                      className="w-[1.5rem]"
                    />
                    Indonesian
                  </button>
                  <button
                    className="p-2 hover:bg-[#a7a7a7da] rounded-lg w-full text-left flex items-center gap-2"
                    onClick={() => dispatch(setEnglish())}
                  >
                    <img
                      src={britishIcon}
                      alt="britishIcon"
                      className="w-[1.5rem]"
                    />
                    English
                  </button>
                </div>
              </button>
            </li>
            <li>
              <Link
                className="p-2 hover:bg-[#2e2e2e18] rounded-xl transition"
                to={'/'}
                onClick={setToggleNavFalse}
              >
                {translate(language, 'Home', 'Beranda')}
              </Link>
            </li>
            <li>
              <button
                className="p-2 hover:bg-[#2e2e2e18] rounded-xl transition"
                onClick={() => handleNavigation('/', 'about')}
              >
                {translate(language, 'About Us', 'Tentang Kami')}
              </button>
            </li>
            <li>
              <button
                className="p-2 hover:bg-[#2e2e2e18] rounded-xl transition"
                onClick={() => handleNavigation('/', 'how-to-play')}
              >
                {translate(language, 'How To Play', 'Cara Bermain')}
              </button>
            </li>
            <li>
              <Link
                className="p-3 hover:bg-[#2e2e2e18] rounded-xl transition"
                to={'/leaderboard'}
                onClick={setToggleNavFalse}
              >
                {translate(language, 'Leaderboards', 'Papan Skor')}
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <button
                    className="py-3 px-4 mt-2 bg-[#0C356A] hover:bg-blue-700 transition text-white rounded-lg w-full block"
                    onClick={toDashboard}
                  >
                    {translate(language, 'Dashboard', 'Dasbor')}
                  </button>
                </li>
                <li>
                  <button
                    className="py-3 px-4 mt-2 bg-red-600 hover:bg-red-700 transition text-white rounded-lg w-full block"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    className="py-3 px-4 mt-2 bg-[#0C356A] opacity-[71%] transition text-white rounded-lg w-full block"
                    to={'/register'}
                    onClick={setToggleNavFalse}
                  >
                    {translate(language, 'Register', 'Daftar')}
                  </Link>
                </li>
                <li>
                  <Link
                    className="py-3 px-4 bg-[#0C356A] text-white rounded-lg w-full block"
                    to={'/login'}
                    onClick={setToggleNavFalse}
                  >
                    {translate(language, 'Login', 'Masuk')}
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
