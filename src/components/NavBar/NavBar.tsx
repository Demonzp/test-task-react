import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RouteNames } from '../../types/routeNames';
import Search from '../Search';

const NavBar: React.FC = () => {
  return (
    <Navbar>
      <Container>
        <Navbar.Collapse>
          <Nav className="me-auto">
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
            <Search />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;