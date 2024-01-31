import Container from 'react-bootstrap/Container';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from '../../assets/images/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Header() {
  const navigate = useNavigate();
  const handelLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    toast.success('Log out success!');
  };
  return (
    <Navbar bg="light" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img src={logo} width={50} alt="Tuananh-App" />
          <span className="logo_title">Tuananh-App</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/users">
              Manager users
            </NavLink>
          </Nav>
          <Nav>
            <NavDropdown title="Setting">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
              <span
                style={{ padding: '0.5rem 0.5rem', cursor: 'pointer', display: 'block' }}
                onClick={() => handelLogout()}
              >
                Logout
              </span>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
