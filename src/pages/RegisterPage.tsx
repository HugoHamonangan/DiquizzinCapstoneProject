import React, { useState } from 'react';
import Inputs from '../components/Inputs';
import google from '../img/google.png';
import { useAppSelector } from '../states/hooks/hooks';
import { translate } from '../utils/helperFunction';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../firebase/auth';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const language = useAppSelector((state) => state.language);

  const navigate = useNavigate();

  const userData = {
    name,
    email,
    score: 0,
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registering:', { name, email, password });

    if (!isRegistering) {
      setIsRegistering(true);
    }

    try {
      const response = await signUp(email, password, userData);
      location.href = '/dashboard';
      alert('Registration successful!'); // Menampilkan notifikasi

      // Navigasi hanya jika pendaftaran berhasil
      // setTimeout(() => {
      //   navigate('/dashboard');
      // }, 5000);
    } catch (error) {
      alert(`Registration failed: ${error.message}`);
      setIsRegistering(false);
    }
  };

  return (
    <>
      <div className="mt-[11rem] flex justify-center pb-14">
        <div className=" w-full max-w-[30rem]">
          <h1 className="font-extrabold text-3xl text-center mb-7">{translate(language, 'Register Page', 'Halaman Daftar')}</h1>
          <form onSubmit={handleRegister} className="rounded px-8 pt-6  max-w-[40rem] mx-auto">
            <div className="mb-4">
              <Inputs id="nama" type="text" placeholder={translate(language, 'Your Name', 'Nama Anda')} value={name} setter={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-4">
              <Inputs id="email" type="email" placeholder="Email" value={email} setter={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-6">
              <Inputs id="password" type="password" placeholder="Password" value={password} setter={(e) => setPassword(e.target.value)} />
            </div>
            <div className="flex flex-col gap-5 justify-between">
              <Link to={'/login'} className="hover:text-blue-500 cursor-pointer w-fit mx-auto text-gray-700">
                {translate(language, 'Already have an account? Login', 'Sudah punya akun? Masuk')}
              </Link>
              <button disabled={isRegistering} className={`${isRegistering ? 'bg-gray-300' : 'bg-[#0C356A] '} hover:bg-blue-700 transition-all text-white font-bold py-3 px-4 rounded-lg focus:outline-none`} type="submit">
                {translate(language, 'Register', 'Daftar')}
              </button>
            </div>
            <div className="px-4 py-2 mt-14 border-b-2 flex items-center justify-between cursor-pointer hover:bg-slate-200 rounded-lg">
              <p>Or Register With Google</p>
              <img src={google} alt={google} className="w-[3rem]" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;