import { AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/layout/Navbar';
import DeliveryProvider from './context/DeliveryContext';
import FirebaseProvider from './context/FirebaseContext';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import Orders from './pages/Orders';
import Store from './pages/Store';
import Welcome from './pages/Welcome';

function App() {
  return (
    <FirebaseProvider>
      <DeliveryProvider>
        <Router>
          <Navbar />
          <AnimatedRoutes />
        </Router>
        <ToastContainer autoClose={2000} closeOnClick />
      </DeliveryProvider>
    </FirebaseProvider>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    // This code makes it so that the page transitions are animated using the
    // Framer Motion library. The animation is only played when the page changes,
    // and the animation is played in parallel with the page transition.

    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/store/:id" element={<Store />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
