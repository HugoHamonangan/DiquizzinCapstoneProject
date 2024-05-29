import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="h-screen bg-red-500 fixed left-0 top-0 w-full flex items-center justify-center">
      <h2 className="font-bold text-2xl text-white text-center">
        Page is not found <br />
        <hr /> Halaman tidak ditemukan
      </h2>
    </div>
  );
};

export default NotFoundPage;
