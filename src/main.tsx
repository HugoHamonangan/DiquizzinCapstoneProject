import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import './cssHelper/style.css';
import store from './states/store.ts';
import { Provider } from 'react-redux';
import AuthContextProvider from './context/AuthContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
