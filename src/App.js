import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import {Container} from 'react-bootstrap';
import {useContext} from 'react';
import {UserContext} from './context/UserContext';
import { CartProvider } from './context/CartContext';
import AppRoutes from './routes/AppRoutes';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './context/UserContext';
import {pdfjs} from 'react-pdf';
import Footer from "./components/Footer";
import {BrowserRouter as Router} from 'react-router-dom';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


function App() {
    const {user} = useContext(UserContext);
    console.log('>>>User:', user);

    return (
        <>
      <UserProvider>
        <CartProvider>
            <div className='app-container'>
                <Container>
                    <Header/>
                    <div className='routes-container'>
                        <AppRoutes></AppRoutes>
                    </div>
                    <Footer/>
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
            </CartProvider>
      </UserProvider>
        </>
    );
}

export default App;