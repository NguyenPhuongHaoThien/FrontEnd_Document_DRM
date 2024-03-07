import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import { Container } from 'react-bootstrap'; 
import { useContext} from 'react';
import { UserContext } from './context/UserContext';
import AppRoutes from './routes/AppRoutes';

import TableUsers from './components/TableUsers';
import BookReader from './components/BookReaderPdf';
import LoginForm from './components/LoginForm'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


function App() {
  const {user}= useContext(UserContext);
  console.log('>>>User:', user);

  return (
    <>
    <div className='app-container'>
      <Container>
        <Header />
        <AppRoutes></AppRoutes>

      </Container>
    </div>

     <ToastContainer 
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    /> 
    </>


  );
}

export default App;