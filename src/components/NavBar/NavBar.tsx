import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { RouteNames } from '../../types/routeNames';
import Search from '../Search';

const NavBar: React.FC = () => {
  return (

    <Navbar expand="lg" className="mb-3">
      <Container className="px-5">
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavLink
              to={RouteNames.HOME}
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              Home
            </NavLink>
            <NavLink
              to={RouteNames.FAVORITES}
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              Favorites
            </NavLink>
          </Nav>
          <Search />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;