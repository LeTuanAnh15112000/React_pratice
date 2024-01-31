import './App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home, Users, Login } from './components/pages';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <div className="app-container">
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
        <Footer />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
