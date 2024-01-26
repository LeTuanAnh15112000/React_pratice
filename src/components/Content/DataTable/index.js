import { Table, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { fetchAllUser } from '../../services/UserServices';
import ReactPaginate from 'react-paginate';
import ModalAddUser from '../ModalAddUser';
import ModalEditUser from '../ModalEditUser';
import ModalDelete from '../ModalDelete';
import _, { debounce } from 'lodash';
import './DataTable.scss';
import { CSVLink, CSVDownload } from 'react-csv';

function DataTable() {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [dataEditUser, setDataEditUser] = useState({});
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataUserDelete, setDataUserDelete] = useState({});

  const [sortBy, setSortBy] = useState('asc');
  const [sortField, setSortField] = useState('id');

  const [searchUser, setSearchUser] = useState('');

  const [dataExport, setDataExport] = useState([]);

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

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    let cloneListUser = _.cloneDeep(listUsers);
    cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
    setListUsers(cloneListUser);
  };

  const handleSearch = debounce((event) => {
    let term = event.target.value;
    console.log(term);
    if (term) {
      let cloneListUser = _.cloneDeep(listUsers);
      let resultData = cloneListUser.filter((item) => item.email.includes(term));
      setListUsers(resultData);
    } else {
      getUser(1);
    }
  }, 500);

  const getUsersExport = (event, done) => {
    let result = [];
    if (listUsers && listUsers.length > 0) {
      result.push(['Id', 'Email', 'First-name', 'Last-name']);
      listUsers.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      });
      setDataExport(result);
      done();
    }
  };

  return (
    <Container>
      <div className="my-4 add-new">
        <span className="h_title">
          <b>List Users:</b>
        </span>
        <div className="group-btns">
          <label htmlFor="import" className="btn btn-warning">
            <i className="fa-solid fa-file-import"></i>Import
            <input type="file" id="import" hidden></input>
          </label>
          <CSVLink
            filename={'my-file.csv'}
            className="btn btn-primary export"
            data={dataExport}
            asyncOnClick={true} // thay vì mặc định sẽ export data nhưng asyncOnClick thì sẽ ko export data ngay mà get data bằng cách gọi hàm onClick thực hiện xong làm data đầu vào
            onClick={getUsersExport}
          >
            <i className="fa-solid fa-download"></i>Export
          </CSVLink>
          <button
            className="btn btn-success"
            onClick={() => {
              setIsShowModal(true);
            }}
          >
            <i className="fa-solid fa-circle-plus"></i>Add new user
          </button>
        </div>
      </div>
      <div className="col-3 mb-3">
        <input
          className="form-control"
          placeholder="Search user by Email ..."
          value={searchUser}
          onChange={(event) => {
            setSearchUser(event.target.value);
            handleSearch(event);
          }}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="sort-header">
                ID
                <span>
                  <i
                    className="fa-solid fa-arrow-down"
                    onClick={() => {
                      handleSort('desc', 'id');
                    }}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up"
                    onClick={() => {
                      handleSort('asc', 'id');
                    }}
                  ></i>
                </span>
              </div>
            </th>
            <th>Email</th>
            <th>
              <div className="sort-header">
                First Name
                <span>
                  <i
                    className="fa-solid fa-arrow-down"
                    onClick={() => {
                      handleSort('desc', 'first_name');
                    }}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up"
                    onClick={() => {
                      handleSort('asc', 'first_name');
                    }}
                  ></i>
                </span>
              </div>
            </th>
            <th>Last Name</th>
            <th>Avatar</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
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
