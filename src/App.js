import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import { Container, Row, Col } from 'react-bootstrap';
import { UserContext } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './context/UserContext';
import { pdfjs } from 'react-pdf';
import Footer from "./components/Footer";
import Sidebar from './components/Sidebar';
import UserSidebar from './components/UserSidebar';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      <UserProvider>
        <CartProvider>
          <div className='app-container'>
            <Header />
            <div className="content-wrapper">
              <div className="sidebar-container">
                {user && user.role === 'ROLE_ADMIN' && <Sidebar />}
                {user && user.role === 'ROLE_USER' && <UserSidebar />}
              </div>
              <div className="main-content">
                <AppRoutes />
              </div>
            </div>
            <Footer />
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
        </CartProvider>
      </UserProvider>
    </>
  );
}

export default App;