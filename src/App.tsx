import FirebaseProvider from './context/FirebaseContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Welcome from './pages/Welcome';

function App() {
  return (
    <FirebaseProvider>
      <Welcome />
      <ToastContainer autoClose={2000} closeOnClick />
    </FirebaseProvider>
  );
}

export default App;
