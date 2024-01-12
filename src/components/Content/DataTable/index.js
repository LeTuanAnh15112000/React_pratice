import { Table, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { fetchAllUser } from '../../services/UserServices';
import ReactPaginate from 'react-paginate';
import ModalAddUser from '../ModalAddUser';
import ModalEditUser from '../ModalEditUser';
import ModalDelete from '../ModalDelete';
import _ from 'lodash';
function DataTable() {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [dataEditUser, setDataEditUser] = useState({});
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataUserDelete, setDataUserDelete] = useState({});

  const handleClose = () => {
    setIsShowModal(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
  };

  const handleUpdateTable = (user) => {
    setListUsers((prev) => {
      return [user, ...prev];
    });
  };

  const handleEditFromModal = (data) => {
    // cách trên mạng
    // sử dụng thư viện lodash
    // let cloneListUser = _.cloneDeep(listUsers);
    // let index = listUsers.findIndex((item) => item.id === data.id);
    // cloneListUser[index].first_name = data.first_name;
    // console.log(cloneListUser);
    // console.log(listUsers);
    // cách này tự làm
    let userEdit = listUsers.find((user) => {
      return user.id === data.id;
    });
    userEdit.first_name = data.first_name;
    let cloneListUser = _.cloneDeep(listUsers);
    setListUsers(cloneListUser);
  };

  useEffect(() => {
    //call api
    //dry
    getUser(1);
  }, []);

  const getUser = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setTotalUsers(res.total);
      setTotalPages(res.total_pages);
      setListUsers(res.data);
    }
  };

  const handlePageClick = (event) => {
    getUser(+event.selected + 1);
  };

  const handleEditUser = (user) => {
    setDataEditUser(() => user);
    setIsShowModalEdit(true);
  };

  const handleDeleteUser = (user) => {
    setIsShowModalDelete(true);
    setDataUserDelete(user);
  };

  const handleDeleteUserFromModal = (id) => {
    let userDelete = listUsers.filter((user) => {
      return user.id !== id;
    });
    let cloneListUser = _.cloneDeep(userDelete);
    setListUsers(cloneListUser);
  };

  return (
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Avata</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 1 &&
            listUsers.map((data) => {
              return (
                <tr key={`users-${data.id}`}>
                  <td>{data.id}</td>
                  <td>{data.email}</td>
                  <td>{data.first_name}</td>
                  <td>{data.last_name}</td>
                  <td>
                    <img src={data.avatar} alt="Avatar" />
                  </td>
                  <td>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => {
                        handleEditUser(data);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleDeleteUser(data);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <div className="center">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
      <ModalAddUser show={isShowModal} handleClose={handleClose} handleUpdateTable={handleUpdateTable} />
      <ModalEditUser
        show={isShowModalEdit}
        handleClose={handleClose}
        dataEditUser={dataEditUser}
        handleEditFromModal={handleEditFromModal}
      />
      <ModalDelete
        show={isShowModalDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
      />
    </Container>
  );
}

export default DataTable;
