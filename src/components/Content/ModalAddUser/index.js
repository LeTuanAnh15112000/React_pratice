import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser } from '../../services/UserServices';
import { useState } from 'react';
import { toast } from 'react-toastify';

function ModalAddUser(props) {
  const { show, handleClose, handleUpdateTable } = props;
  const [name, setName] = useState('');
  const [job, setJob] = useState('');

  const handleSaveUser = async () => {
    let res = await postCreateUser(name, job);
    if (res && res.id) {
      // succses
      handleClose(false);
      setName('');
      setJob('');
      toast.success('A user is created successed!');
      handleUpdateTable({
        id: res.id,
        email: 'email@gmail.com',
        first_name: name,
        last_name: 'first name',
        avatar: 'https://picsum.photos/128',
      });
    } else {
      // error
      toast.error('An error!');
    }
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="import_users">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Job</label>
              <input
                type="text"
                className="form-control"
                value={job}
                onChange={(event) => setJob(event.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalAddUser;
