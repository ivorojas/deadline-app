import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from "./hooks/AuthContext";
//import App from './App.tsx'
import Home from './components/Home'
import Login from './components/Login'
//import Dashboard from './components/Dashboard'
import Dashboard2 from './components/Dashboard2'
import Dashboardnew from './components/DashboardNew'
import { BrowserRouter, Routes, Route } from "react-router";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
 <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboardnew />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
