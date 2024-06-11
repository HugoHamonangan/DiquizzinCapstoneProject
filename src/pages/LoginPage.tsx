import React, { useState } from 'react';
import Inputs from '../components/Inputs';
import google from '../img/google.png';
import { useAppSelector } from '../states/hooks/hooks';
import { translate } from '../utils/helperFunction';
import { Link, useNavigate } from 'react-router-dom';
import { signIn, signInWithGoogle } from '../firebase/auth';
import { showAlert } from '../utils/sweetAlert';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [eye, setEye] = useState(false);

  const language = useAppSelector((state) => state.language);

  const navigate = useNavigate();

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
          navigate('/dashboard');
        }, 3000);
      }
    } catch (error) {
      if (error instanceof Error) {
        await showAlert(
          `${translate(language, 'Login Failed', 'Gagal Masuk')}`,
          `${translate(language, 'User not found or wrong password', 'pengguna nihil atau password salah')}`,
          'error'
        );
        setIsSigningIn(false);
      }
    }
  };

  const handleGoogleSignin = async () => {
    try {
      const response = await signInWithGoogle();
      if (response) {
        console.log('Navigating to /dashboard');
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      }
    } catch (error) {
      if (error instanceof Error) {
        await showAlert('Login failed', error.message, 'error');
      }
    }
  };

  const toggleEye = () => {
    setEye(!eye);
  };

  return (
    <div className="mt-[11rem] flex justify-center pb-14">
      <div className="w-full max-w-[30rem]">
        <h1 className="font-extrabold text-3xl text-center mb-7">
          {translate(language, 'Login Page', 'Halaman Masuk')}
        </h1>
        <form
          onSubmit={handleLogin}
          className="rounded px-8 pt-6 max-w-[40rem] mx-auto"
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
          <div className="mb-6 relative flex items-center">
            <Inputs
              id="password"
              type={eye ? 'password' : 'text'}
              placeholder="Password"
              value={password}
              setter={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute right-3 top-3 cursor-pointer"
              onClick={toggleEye}
            >
              <div className="relative">
                <p>&#128065;</p>
                <div
                  className={`absolute top-0 font-extrabold ${
                    eye ? 'block' : 'hidden'
                  }`}
                >
                  {')('}
                </div>
              </div>
            </div>
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
                isSigningIn ? 'bg-gray-300' : 'bg-[#0C356A]'
              } hover:bg-blue-700 transition-all text-white font-bold py-3 px-4 rounded-lg focus:outline-none`}
              type="submit"
            >
              {translate(language, 'Login', 'Masuk')}
            </button>
          </div>
          <div
            className="px-4 py-2 mt-14 border-b-2 flex items-center justify-between cursor-pointer hover:bg-slate-200 rounded-lg"
            onClick={handleGoogleSignin}
          >
            <p>Or Sign in With Google</p>
            <img src={google} alt="Google" className="w-[3rem]" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
