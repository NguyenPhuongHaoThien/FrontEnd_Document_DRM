import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TableUsers from '../components/TableUsers';
import DocumentTable from '../components/DocumentTable';
import DocumentForm from '../components/DocumentForm';
import UserTable from '../components/UserTable';
import BookReaderPdf from '../components/BookReaderPdf';
import LoginForm from '../components/LoginForm';
import PrivateRoute from './PrivateRoute';
import NotFound from './NotFound';
import RegisterForm from '../components/RegisterForm';
import AdminPage from '../components/AdminPage';
import MyProfile from '../components/MyProfile';
import OrderTable from '../components/OrderTable';
import DocumentDetail from '../components/DocumentDetail';
import OrderAdminForm from '../components/OrderAdminForm';  
import CategoryTable from '../components/CategoryTable';
import CategoryForm from '../components/CategoryForm';
import AuthorTable from '../components/AuthorTable';
import AuthorForm from '../components/AuthorForm';
import PublisherTable from '../components/PublisherTable';
import PublisherForm from '../components/PublisherForm';
import FreeDocumentsTable from '../components/FreeDocumentsTable';
import ForgotPassword from '../components/ForgotPassword';
import ResetPassword from '../components/ResetPassword';
import IntroPage from '../components/IntroPage';
import HistoryOrder from '../components/HistoryOrder';




import Cart from '../components/Cart';

const AppRoutes = () => {
    return (
        <>
            <Routes>
                 <Route path="/intro" element={<IntroPage />} />  
                <Route path="/" element={<TableUsers />} />
                <Route path="/home/category" element={<TableUsers />} />
                <Route path="/home/documents-free" element={<FreeDocumentsTable />} />
                <Route path="/user/history" element={<HistoryOrder />} />
                
                {/* <Route path="/read/:id/pdf" element={<BookReader />} /> */}
                <Route path="/login" element={<LoginForm />} />
                <Route path="/user/:id" element={<MyProfile />} />
                <Route path="/document/:id" element={<DocumentDetail />} />


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
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/document" element={<DocumentTable />} />
                <Route path="/admin/document/create" element={<DocumentForm />} />
                <Route path="/admin/document/update" element={<DocumentForm />} />
                <Route path="/admin/user" element={<UserTable />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/admin/order" element={<OrderTable />} />
                <Route path="/admin/order/create" element={<OrderAdminForm />} />
                <Route path="/admin/order/update" element={<OrderAdminForm />} />
                <Route path="/admin/category" element={<CategoryTable />} />
                <Route path="/admin/category/create" element={<CategoryForm />} />
                <Route path="/admin/category/update" element={<CategoryForm />} />
                <Route path="/admin/author" element={<AuthorTable />} />
                <Route path="/admin/author/create" element={<AuthorForm />} />
                <Route path="/admin/author/update" element={<AuthorForm />} />
                <Route path="/admin/publisher" element={<PublisherTable />} />
                <Route path="/admin/publisher/create" element={<PublisherForm />} />
                <Route path="/admin/publisher/update" element={<PublisherForm />} />

                

                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element ={<NotFound/>}/>
                <Route path="/register" element={<RegisterForm/>} />
                <Route path="/verifyOTP" element={<LoginForm/>} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/verifyResetPasswordTokenApi" element={<ResetPassword />} />
                 <Route path="/reset-password" element={<ResetPassword />} />

    
            </Routes>

        </>
    );
}

export default AppRoutes;