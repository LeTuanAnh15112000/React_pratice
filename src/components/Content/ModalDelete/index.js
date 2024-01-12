import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../services/UserServices';
import { toast } from 'react-toastify';

function ModalDelete(props) {
  const { show, handleClose, dataUserDelete, handleDeleteUserFromModal } = props;
  const handleDeleteUser = async () => {
    let userId = dataUserDelete.id;
    let res = await deleteUser(userId);
    if (res && +res.statusCode === 204) {
      handleClose(false);
      handleDeleteUserFromModal(userId);
      toast.success('A user is deleted successed!');
    } else {
      toast.error('An error!');
    }
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Delete a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="import_users">
            This action can't be undone! <br />
            Do you want to delete this user, <br /> <b>email = "{dataUserDelete.email}"</b>?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleDeleteUser()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalDelete;
