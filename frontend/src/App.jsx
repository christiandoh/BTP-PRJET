import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Login from './admin/Login'
import Dashboard from './admin/Dashboard'
import AdminRoute from './admin/AdminRoute'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projets" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard/*" element={<AdminRoute><Dashboard /></AdminRoute>} />
      </Routes>
      <Footer />
    </>
  )
}
