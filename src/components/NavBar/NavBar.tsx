import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RouteNames } from '../../types/routeNames';
import Search from '../Search';

const NavBar: React.FC = () => {
  return (

    <Navbar expand="lg">
      <Container className="px-5">
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link
              to={RouteNames.HOME}
              className="nav-link"
            >
              Home
            </Link>
            <Link
              to={RouteNames.FAVORITES}
              className="nav-link"
            >
              Favorites
            </Link>
          </Nav>
          <Search />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;