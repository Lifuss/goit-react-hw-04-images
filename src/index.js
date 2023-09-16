import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <App />
    <ToastContainer
      position={'top-right'}
      autoClose={3000}
      hideProgressBar={false}
      closeOnClick={true}
      pauseOnHover={true}
      draggable={true}
      progress={undefined}
      theme={'light'}
    />
  </>
);
