import { Nav, Navbar, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NavBar(){

    const navigate = useNavigate();

    return(
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand onClick={() => navigate("/")}>Post Anything! &#10088;CRUD Sample&#10089;</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="justify-content-end flex-grow-1" >
                    <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
                    <Nav.Link onClick={() => navigate("create/posts")}>Posts</Nav.Link>
                    <Nav.Link onClick={() => navigate("create")}>Create Post</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;