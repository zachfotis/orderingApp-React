import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FirebaseProvider from './context/FirebaseContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Welcome from './pages/Welcome';
import NewAddress from './components/NewAddress';
import DeliveryProvider from './context/DeliveryContext';

function App() {
  return (
    <FirebaseProvider>
      <DeliveryProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/new-address" element={<NewAddress />} />
          </Routes>
        </Router>
        <ToastContainer autoClose={2000} closeOnClick />
      </DeliveryProvider>
    </FirebaseProvider>
  );
}

export default App;
