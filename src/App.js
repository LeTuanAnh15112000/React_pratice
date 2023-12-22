import './App.scss';
import Header from './components/Header';
import { ModalAddUser, DataTable } from './components/Content/';
import Footer from './components/Footer';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
function App() {
  const [isShowModal, setIsShowModal] = useState(false);
  const handleClose = () => {
    setIsShowModal(false);
  };
  return (
    <div className="app-container">
      <Header />
      <Container>
        <div className="my-4 add-new">
          <span>
            <b>List Users:</b>
          </span>
          <button
            className="btn btn-success"
            onClick={() => {
              setIsShowModal(true);
            }}
          >
            Add new user
          </button>
        </div>
      </Container>
      <DataTable />
      <ModalAddUser show={isShowModal} handleClose={handleClose} />
      <Footer />
    </div>
  );
}

export default App;
