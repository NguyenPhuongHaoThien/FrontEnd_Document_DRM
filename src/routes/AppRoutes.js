import {Routes, Route} from 'react-router-dom';
import TableUsers from '../components/TableUsers';
import BookReaderPdf from '../components/BookReaderPdf';
import LoginForm from '../components/LoginForm';
import PrivateRoute from './PrivateRoute';
import NotFound from './NotFound';
import RegisterForm from '../components/RegisterForm';

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<TableUsers />} />
                {/* <Route path="/read/:id/pdf" element={<BookReader />} /> */}
                <Route path="/login" element={<LoginForm />} />
                {/* <PrivateRoute path = "/read/:id/pdf">
                    <BookReader/>
                </PrivateRoute>      */}

                <Route
                    path="/read/:id/pdf"
                    element={
                        <PrivateRoute>
                            <BookReaderPdf />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element ={<NotFound/>}/>
                <Route path="/register" element={<RegisterForm/>} />
            </Routes>

        </>
    );
}

export default AppRoutes;