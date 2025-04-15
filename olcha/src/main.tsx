import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './come/sign-in/signin';
import User from './user/user';
import CreateAccount from "./come/create-account/createaccount.tsx"
import AdminPage from "./admin/admin.tsx"

ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
        <title>Olcha Market</title>
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/createaccount" element={<CreateAccount />} />
                    <Route path="/admin" element={<AdminPage />} />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    </>
);
