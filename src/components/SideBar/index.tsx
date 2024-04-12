import { Container, Stack } from "react-bootstrap";
import "./style.css";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <Stack direction="vertical" gap={2}>
        <Container className="sidebar">
          <Container className="brand">Shopping Abreu e Lima</Container>
          <Container className="link">
            <Link to={`/`}>Lojas</Link>
          </Container>
          <Container className="link">
            <Link to={`/`}>Categorias</Link>
          </Container>
        </Container>
      </Stack>
    </>
  );
};

export default SideBar;
