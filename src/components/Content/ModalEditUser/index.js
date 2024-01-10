import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putUpdateUser } from '../../services/UserServices';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

function ModalEditUser(props) {
  const { show, handleClose, dataEditUser, handleEditFromModal } = props;
  const [name, setName] = useState('');
  const [job, setJob] = useState('');

  const handleEditConfirm = async () => {
    let userId = dataEditUser.id;
    let res = await putUpdateUser(userId, name, job);
    if (res && res.updatedAt) {
      setName('');
      handleClose(false);
      handleEditFromModal({
        first_name: res.name,
        id: userId,
      });
      toast.success('A user is edited successed!');
    } else {
      toast.error('An error!');
    }
  };

  useEffect(() => {
    if (show) {
      setName(dataEditUser.first_name);
    }
  }, [dataEditUser]);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit a users</Modal.Title>
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
          <Button variant="primary" onClick={handleEditConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalEditUser;
