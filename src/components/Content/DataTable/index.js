import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import { fetchAllUser } from '../../services/UserServices';
import ReactPaginate from 'react-paginate';

function DataTable() {
  const [listUsers, setListUsers] = useState([]);
  // const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    //call api
    //dry
    getUser(1);
  }, []);

  const getUser = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      // setTotalUsers(res.total);
      setTotalPages(res.total_pages);
      setListUsers(res.data);
    }
  };

  const handlePageClick = (event) => {
    getUser(+event.selected + 1);
  };

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Avata</th>
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
    </Container>
  );
}

export default DataTable;
