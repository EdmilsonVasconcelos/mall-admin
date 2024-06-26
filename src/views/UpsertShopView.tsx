import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link, useParams } from "react-router-dom";
import AlertMessage from "../components/Alert";
import { Shop } from "../types/shop";
import { Address } from "../types/address";
import { BASE_API, CELL_PHONE_REGEX } from "../utils/BaseApi";
import axios from "axios";

const UpsertShopView = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [messageAlert, setMessageAlert] = useState<string>("");
  const [variantAlert, setVariantAlert] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`${BASE_API}/shop/${atob(id)}`).then((response) => {
        const shop = response.data as Shop;
        setName(shop.name);
        setWhatsapp(shop.phoneNumber);
        setStreet(shop.addresses[0].street);
        setNumber(shop.addresses[0].number);
        setNeighborhood(shop.addresses[0].neighborhood);
        setCity(shop.addresses[0].city);
      });
    }
  }, [id]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !whatsapp || !street || !city || !number) {
      setMessageAlert("Preencha os campos");
      setVariantAlert("danger");
      setShowAlert(true);
      return;
    }

    if (!CELL_PHONE_REGEX.test(whatsapp)) {
      setMessageAlert("O campo whatsapp deve conter exatamente 11 números");
      setVariantAlert("danger");
      setShowAlert(true);
      return;
    }

    const newShop: Shop = {
      name,
      phoneNumber: whatsapp,
      addresses: [{ street, number, neighborhood, city } as Address],
      isActive: false,
    };

    if (id) {
      update(newShop);
    } else {
      add(newShop);
    }
  };

  const add = async (shop: Shop) => {
    await axios
      .post(`${BASE_API}/shop`, shop)
      .then((response) => {
        setShowAlert(true);
        setMessageAlert("Loja cadastrada com sucesso");
        setVariantAlert("success");
        clearFields();
      })
      .catch((error) => {
        console.log(error);
        setMessageAlert("Erro ao cadastrar loja");
        setShowAlert(true);
        setVariantAlert("danger");
      });
  };

  const update = async (shop: Shop) => {
    if (id) {
      await axios
        .patch(`${BASE_API}/shop/${atob(id)}`, shop)
        .then((response) => {
          setShowAlert(true);
          setMessageAlert("Loja editada com sucesso com sucesso");
          setVariantAlert("success");
          clearFields();
        })
        .catch((error) => {
          console.log(error);
          setMessageAlert("Erro ao cadastrar loja");
          setShowAlert(true);
          setVariantAlert("danger");
        });
    }
  };

  const clearFields = () => {
    setName("");
    setWhatsapp("");
    setStreet("");
    setCity("");
    setNeighborhood("");
    setNumber("");
  };

  return (
    <>
      <Row className="mb-3">
        <Col>{id ? <h2>Editar loja</h2> : <h2>Cadastrar nova loja</h2>}</Col>
        <Col className="text-end">
          <Link to="/" className="btn btn-primary">
            Ver lojas
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
                placeholder="Nome da loja"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="whatsapp">
              <Form.Label>Whatsapp</Form.Label>
              <Form.Control
                type="text"
                placeholder="Número do Whatsapp da loja"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />
            </Form.Group>

            <Row className="mb-3">
              <Col>
                {" "}
                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Rua</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nome da rua, ex: Rua do Sol"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                {" "}
                <Form.Group className="mb-3" controlId="city">
                  <Form.Label>Número</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Número que fica localizado o estabelecimento"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                {" "}
                <Form.Group className="mb-3" controlId="referenceNeighborhood">
                  <Form.Label>Bairro</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nome do bairro, ex: Caetés I"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                {" "}
                <Form.Group className="mb-3" controlId="referenceAddress">
                  <Form.Label>Cidade</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nome da cidade, ex: Recife"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

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

export default UpsertShopView;
