import { Button, Card, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

const AddCategorieView = () => {
  return (
    <>
      <Row className="mb-3">
        <Col>
          <h2>Cadastrar nova loja</h2>
        </Col>
        <Col className="text-end">
          <Link to="/" className="btn btn-primary">
            Ver lojas
          </Link>
        </Col>
      </Row>
      <Card>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" placeholder="Nome da loja" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="whatsapp">
              <Form.Label>Whatsapp</Form.Label>
              <Form.Control
                type="text"
                placeholder="Número do Whatsapp da loja"
              />
            </Form.Group>

            <Row className="mb-3">
              <Col>
                {" "}
                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Endereço</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Número da rua, ex: Rua 23"
                  />
                </Form.Group>
              </Col>
              <Col>
                {" "}
                <Form.Group className="mb-3" controlId="city">
                  <Form.Label>Bairro</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nome do bairro, ex: Caetés I"
                  />
                </Form.Group>
              </Col>
              <Col>
                {" "}
                <Form.Group className="mb-3" controlId="referenceAddress">
                  <Form.Label>Ponto de referência</Form.Label>
                  <Form.Control type="text" placeholder="Ponto de referência" />
                </Form.Group>
              </Col>
            </Row>

            <div className="text-end">
              {" "}
              <Button variant="success" type="submit">
                Criar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default AddCategorieView;
