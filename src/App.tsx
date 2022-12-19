import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import FirebaseProvider from './context/FirebaseContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Welcome from './pages/Welcome';
import DeliveryProvider from './context/DeliveryContext';
import Home from './pages/Home';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <FirebaseProvider>
      <DeliveryProvider>
        <Router>
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
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
