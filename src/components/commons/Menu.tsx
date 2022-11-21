import { Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

interface Props {
  onSearchChange: React.ChangeEventHandler<HTMLInputElement>;
  onLinkClick: Function;
  search: string;
}

function Menu({ search, onSearchChange, onLinkClick }: Props) {
  return (
    <Navbar sticky="top"  bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand onClick={() => onLinkClick('movies-in-theaters')}>Movies On the Tip</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => onLinkClick('movies-in-theaters')}>Movies in theaters</Nav.Link>
            <Nav.Link onClick={() => onLinkClick('movies-coming')}>Coming Soon</Nav.Link>
            <Nav.Link onClick={() => onLinkClick('top-rated-india')}>Top Rated Indian</Nav.Link>
            <Nav.Link onClick={() => onLinkClick('top-rated-movies')}>Top Rated Movies</Nav.Link>
            <Nav.Link onClick={() => onLinkClick('favourit')}>Favorites</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
                value={search}
                onChange={onSearchChange}
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
            />
        </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
