import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Vans from './pages/Vans';
import VansDetail from './pages/VansDetail'
import Host from './Host/Host'
import HostDashboard from './Host/HostDashboard'
import HostIncome from './Host/HostIncome'
import HostVans from './Host/HostVans'
import HostReviews from './Host/HostReviews'
import HostVansDetail from './Host/HostVansDetail'
import MainLayout from './layout_routes/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/vans" element={<Vans />} />
          <Route path="vans/:id" element={<VansDetail />} />

          <Route path="/host" element={<Host />}>
            <Route index element={<HostDashboard />} />
            <Route path="income" element={<HostIncome />} /> 
            <Route path="reviews" element={<HostReviews />} /> 
            <Route path="vans" element={<HostVans />}>
              <Route path="vans/:id" element={<HostVansDetail />} />
            </Route> 
          </Route>
        </Route>  
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);