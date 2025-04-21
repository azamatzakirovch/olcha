import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Admin from './admin/Admin.tsx'
import User from './user/User.tsx'
import SignIn from './sign-in-sign-up/sign-in/SignIn.tsx'
import CreateAccount from './sign-in-sign-up/create-account/CreateAccount.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<SignIn />} />                // 👈 Default route
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/create-account" element={<CreateAccount />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/user" element={<User />} />
          </Routes>
      </BrowserRouter>
    </StrictMode>
)