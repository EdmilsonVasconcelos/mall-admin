import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link, useParams } from "react-router-dom";
import AlertMessage from "../components/Alert";
import { Shop } from "../types/shop";
import { BASE_API } from "../utils/BaseApi";
import axios from "axios";

const UpsertCategoryView = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [messageAlert, setMessageAlert] = useState<string>("");
  const [variantAlert, setVariantAlert] = useState<string>("");
  const [name, setName] = useState<string>("");

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`${BASE_API}/category/${atob(id)}`).then((response) => {
        const shop = response.data as Shop;
        setName(shop.name);
      });
    }
  }, [id]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      setMessageAlert("Preencha os campos");
      setVariantAlert("danger");
      setShowAlert(true);
      return;
    }

    if (id) {
      update(name);
    } else {
      add(name);
    }
  };

  const add = async (name: string) => {
    await axios
      .post(`${BASE_API}/category`, { name })
      .then(() => {
        setShowAlert(true);
        setMessageAlert("Categoria cadastrada com sucesso");
        setVariantAlert("success");
        setName("");
      })
      .catch((error) => {
        console.log(error);
        setMessageAlert("Erro ao cadastrar categoria");
        setShowAlert(true);
        setVariantAlert("danger");
      });
  };

  const update = async (name: string) => {
    if (id) {
      await axios
        .patch(`${BASE_API}/category/${atob(id)}`, { name })
        .then((response) => {
          setShowAlert(true);
          setMessageAlert("Categoria editada com sucesso com sucesso");
          setVariantAlert("success");
          setName("");
        })
        .catch((error) => {
          console.log(error);
          setMessageAlert("Erro ao cadastrar categoria");
          setShowAlert(true);
          setVariantAlert("danger");
        });
    }
  };

  return (
    <>
      <Row className="mb-3">
        <Col>
          {id ? <h2>Editar categoria</h2> : <h2>Cadastrar nova categoria</h2>}
        </Col>
        <Col className="text-end">
          <Link to="/lista-categorias" className="btn btn-primary">
            Ver categorias
          </Link>
        </Col>
      </Row>
      <Card>
        <Card.Body>
          {showAlert && (
            <AlertMessage
              setShow={setShowAlert}
              message={messageAlert}
              variant={variantAlert}
            />
          )}

          <Form onSubmit={handleAdd}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome da categoria"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <div className="text-end">
              {" "}
              <Button variant="success" type="submit">
                {id ? "Editar" : "Criar"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default UpsertCategoryView;
