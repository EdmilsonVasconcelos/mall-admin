import { Card, Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Shop } from "../types/shop";
import axios from "axios";
import { BASE_API } from "../utils/BaseApi";
import { Pencil, Trash } from "react-bootstrap-icons";
import QuestionModal from "../components/Modal/Question";

const ListShopsView = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [shopId, setShopId] = useState<number>(0);
  const [nameRegister, setNameRegister] = useState<string>("");
  const [question, setQuestion] = useState<boolean>(false);

  const handleCloseModal = () => setShowModal(false);

  const fetchShops = async () => {
    const response = await axios
      .get(`${BASE_API}/shop`)
      .then((res) => {
        return res.data;
      })
      .catch((res) => {
        if (res.response.status === 404) {
          setShops([]);
        }
      });

    setShops(response);
  };

  useEffect(() => {
    fetchShops();
  }, []);

  useEffect(() => {
    if (question) {
      deleteRegister();
      setQuestion(false);
    }
  }, [question]);

  const handleDelete = async (shopId: number, nameShop: string) => {
    setShopId(shopId);
    setNameRegister(nameShop);
    setShowModal(true);
  };

  const deleteRegister = async () => {
    await axios.delete(`${BASE_API}/shop/${shopId}`).then(() => {
      setShowModal(false);
      fetchShops();
    });
  };

  return (
    <>
      <QuestionModal
        show={showModal}
        handleClose={handleCloseModal}
        nameRegister={nameRegister}
        setQuestion={setQuestion}
      />

      <Row className="mb-3">
        <Col>
          <h2>Lista de lojas</h2>
        </Col>
        <Col className="text-end">
          <Link to="adiciona-loja" className="btn btn-primary">
            Adicionar loja
          </Link>
        </Col>
      </Row>
      <Card>
        {shops?.length && (
          <Card.Body>
            <Table striped>
              <thead>
                <tr className="text-center">
                  <th>Nome da loja</th>
                  <th>Whatsapp</th>
                  <th>Ativa</th>
                  <th>Endereço</th>
                  <th className="center">Ação</th>
                </tr>
              </thead>
              <tbody>
                {shops?.map((shop) => (
                  <tr key={shop.id} className="text-center">
                    <td>{shop.name}</td>
                    <td>{shop.phoneNumber}</td>
                    <td>{shop.isActive ? "Sim" : "Não"}</td>
                    <td>
                      {shop.addresses.map((address) => (
                        <p
                          key={address.id}
                        >{`${address.street}, ${address.number}, ${address.neighborhood} - ${address.city}`}</p>
                      ))}
                    </td>
                    <td>
                      <Row>
                        <Col>
                          {shop.id && (
                            <Link
                              className="btn btn-warning text-white"
                              to={`edita-loja/${btoa(shop?.id?.toString())}`}
                              title={`Editar loja ${shop.name}`}
                            >
                              <Pencil />
                            </Link>
                          )}
                        </Col>
                        <Col>
                          {shop.id && (
                            <button
                              className="btn btn-danger text-white"
                              title={`Deletar loja ${shop.name}`}
                              onClick={() =>
                                handleDelete(shop?.id ? shop.id : 0, shop.name)
                              }
                            >
                              <Trash />
                            </button>
                          )}
                        </Col>
                      </Row>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        )}

        {!shops?.length && (
          <div className="text-center p-5">
            <h2>Sem lojas cadastradas até o momento.</h2>
            <Link to="adiciona-loja" className="btn btn-success mt-5">
              Adicionar loja
            </Link>
          </div>
        )}
      </Card>
    </>
  );
};

export default ListShopsView;
