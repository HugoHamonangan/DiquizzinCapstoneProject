import React, { useState } from 'react';
import Inputs from '../components/Inputs';
import google from '../img/google.png';
import { useAppSelector } from '../states/hooks/hooks';
import { translate } from '../utils/helperFunction';
import { Link } from 'react-router-dom';
import { signIn } from '../firebase/auth';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  const language = useAppSelector((state) => state.language);

  // const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in:', { email, password });

    if (!isSigningIn) {
      setIsSigningIn(true);
    }

    try {
      const response = await signIn(email, password);
      if (response) {
        console.log('Navigating to /dashboard');
        setTimeout(() => {
          location.href = '/dashboard';
        }, 3000);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(`Login failed: ${error.message}`);
        setIsSigningIn(false);
      }
    }
  };

  return (
    <>
      <div className="mt-[11rem] flex justify-center pb-14">
        <div className=" w-full max-w-[30rem]">
          <h1 className="font-extrabold text-3xl text-center mb-7">
            {translate(language, 'Login Page', 'Halaman Masuk')}
          </h1>
          <form
            onSubmit={handleLogin}
            className="rounded px-8 pt-6  max-w-[40rem] mx-auto"
          >
            <div className="mb-4">
              <Inputs
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                setter={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <Inputs
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                setter={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-5 justify-between">
              <Link
                to={'/register'}
                className="hover:text-blue-500 cursor-pointer w-fit mx-auto text-gray-700"
              >
                {translate(
                  language,
                  "Don't Have Any Account Yet? Login",
                  'Belum Punya Akun? Masuk'
                )}
              </Link>
              <button
                disabled={isSigningIn}
                className={`${
                  isSigningIn ? 'bg-gray-300' : 'bg-[#0C356A] '
                } hover:bg-blue-700 transition-all text-white font-bold py-3 px-4 rounded-lg focus:outline-none`}
                type="submit"
              >
                {translate(language, 'Login', 'Masuk')}
              </button>
            </div>
            <div className="px-4 py-2 mt-14 border-b-2 flex items-center justify-between cursor-pointer hover:bg-slate-200 rounded-lg">
              <p>Or Login With Google</p>
              <img src={google} alt={google} className="w-[3rem]" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
