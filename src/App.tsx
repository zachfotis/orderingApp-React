import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FirebaseProvider from './context/FirebaseContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Welcome from './pages/Welcome';
import DeliveryProvider from './context/DeliveryContext';
import Home from './pages/Home';

function App() {
  return (
    <FirebaseProvider>
      <DeliveryProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
        <ToastContainer autoClose={2000} closeOnClick />
      </DeliveryProvider>
    </FirebaseProvider>
  );
}

export default App;
