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
import ReadingHistory from '../components/ReadingHistory';
import Cart from '../components/Cart';

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/intro" element={<IntroPage />} />
                <Route path="/home/category" element={<TableUsers />} />
                <Route path="/home/documents-free" element={<FreeDocumentsTable />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/document/:id" element={<DocumentDetail />} />
                <Route
                    path="/reading-history"
                    element={
                        <PrivateRoute>
                          <ReadingHistory />
                        </PrivateRoute>
                    }
                />



                <Route
                    path="/home"
                    element={
                        <PrivateRoute roles={['ROLE_ADMIN', 'ROLE_USER']}>
                            <TableUsers />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/"
                    element={
                        <PrivateRoute roles={['ROLE_ADMIN', 'ROLE_USER']}>
                            <TableUsers />
                        </PrivateRoute>
                    }
                />


                <Route
                    path="/read/:id/pdf"
                    element={
                        <PrivateRoute>
                            <BookReaderPdf />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <PrivateRoute  >
                            <AdminPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/document"
                    element={
                        <PrivateRoute roles={['ROLE_ADMIN']}>
                            <DocumentTable />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/document/create"
                    element={
                        <PrivateRoute roles={['ROLE_ADMIN']}>
                            <DocumentForm />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/document/update"
                    element={
                        <PrivateRoute roles={['ROLE_ADMIN']}>
                            <DocumentForm />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/user"
                    element={
                        <PrivateRoute roles={['ROLE_ADMIN']}>
                            <UserTable />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <PrivateRoute roles={['ROLE_ADMIN', 'ROLE_USER']}>
                            <Cart />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/order"
                    element={
                        <PrivateRoute roles={['ROLE_ADMIN']}>
                            <OrderTable />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/order/create"
                    element={
                        <PrivateRoute roles={['ROLE_ADMIN']}>
                            <OrderAdminForm />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/order/update"
                    element={
                        <PrivateRoute roles={['ROLE_ADMIN']}>
                            <OrderAdminForm />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/category"
                    element={
                        <PrivateRoute roles={['ROLE_ADMIN']}>
                            <CategoryTable />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/category/create"
                    element={
                        <PrivateRoute roles={['ROLE_ADMIN']}>
                            <CategoryForm />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/category/update"
                    element={
                        <PrivateRoute roles={['ROLE_ADMIN']}>
                            <CategoryForm />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/author"
                    element={
                        <PrivateRoute roles={['ROLE_ADMIN']}>
                            <AuthorTable />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/author/create"
                    element={
                        <PrivateRoute roles={['ROLE_ADMIN']}>
                            <AuthorForm />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/author/update"
                    element={
                        <PrivateRoute roles={['ROLE_ADMIN']}>
                            <AuthorForm />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/publisher"
                    element={
                        <PrivateRoute roles={['ROLE_ADMIN']}>
                            <PublisherTable />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/publisher/create"
                    element={
                        <PrivateRoute roles={['ROLE_ADMIN']}>
                            <PublisherForm />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <PrivateRoute roles={['ROLE_ADMIN']}>
                            <RegisterForm />
                        </PrivateRoute>
                    }
                />

                <Route path="*" element={<NotFound />} />
                <Route path="/verifyOTP" element={<LoginForm />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/verifyResetPasswordTokenApi" element={<ResetPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route
                    path="/user/:id"
                    element={
                        <PrivateRoute roles={['ROLE_ADMIN', 'ROLE_USER']}>
                            <MyProfile />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/user/history"
                    element={
                        <PrivateRoute roles={['ROLE_ADMIN', 'ROLE_USER']}>
                            <HistoryOrder />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </>
    );
};

export default AppRoutes;