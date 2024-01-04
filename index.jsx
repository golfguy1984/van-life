import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans from "./pages/Vans";
import VansDetail from "./pages/VansDetail";
import Host from "./Host/Host";
import HostDashboard from "./Host/HostDashboard";
import HostIncome from "./Host/HostIncome";
import HostVans from "./Host/HostVans";
import HostReviews from "./Host/HostReviews";
import HostVansDetail from "./Host/HostVansDetail";
import HostVansInfo from "./Host/HostVansInfo";
import HostVansPricing from "./Host/HostVansPricing";
import HostVansPhotos from "./Host/HostVansPhotos";
import MainLayout from "./layout_routes/MainLayout";
import HostVansAdd from "./Host/HostVansAdd";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthRequired from "./layout_routes/AuthRequired";
import CheckoutForm from "./CheckoutForm";
import PaymentModal from "./PaymentModal";
import Checkout from "./Checkout";
import Confirmation from "./pages/Confirmation";

// import "./server"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/vans" element={<Vans />} />
          <Route path="vans/:id" element={<VansDetail />} />
          <Route path="/vans/:id/checkout" element={<Checkout />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />

          <Route element={<AuthRequired />}>
            <Route path="/host" element={<Host />}>
              <Route index element={<HostDashboard />} />
              <Route path="income" element={<HostIncome />} />
              <Route path="reviews" element={<HostReviews />} />
              <Route path="vans" element={<HostVans />} />
              {/* <Route path="vans/add" element={<HostVansAdd />} /> */}
              <Route path="vans/:id" element={<HostVansDetail />}>
                <Route index element={<HostVansInfo />} />
                <Route path="pricing" element={<HostVansPricing />} />
                <Route path="photos" element={<HostVansPhotos />} />
              </Route>
            </Route>
          </Route>
          <Route path="/confirmation/:token" element={<Confirmation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
