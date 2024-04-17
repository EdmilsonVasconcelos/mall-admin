import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_API } from "../utils/BaseApi";
import QuestionModal from "../components/Modal/Question";
import { Card, Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Pencil, Trash } from "react-bootstrap-icons";
import { Categorie } from "../types/categories";

const ListCategoriesView = () => {
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [shopId, setShopId] = useState<number>(0);
  const [nameRegister, setNameRegister] = useState<string>("");
  const [question, setQuestion] = useState<boolean>(false);

  const handleCloseModal = () => setShowModal(false);

  const fetch = async () => {
    const response = await axios
      .get(`${BASE_API}/category`)
      .then((res) => {
        return res.data;
      })
      .catch((res) => {
        if (res.response.status === 404) {
          setCategories([]);
        }
      });

    setCategories(response);
  };

  useEffect(() => {
    fetch();
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
    await axios.delete(`${BASE_API}/category/${shopId}`).then(() => {
      setShowModal(false);
      fetch();
    });
  };

  return (
    <>
      <QuestionModal
        show={showModal}
        handleClose={handleCloseModal}
        nameRegister={`categoria ${nameRegister}`}
        setQuestion={setQuestion}
      />

      <Row className="mb-3">
        <Col>
          <h2>Lista de categorias</h2>
        </Col>
        <Col className="text-end">
          <Link to="/adiciona-categoria" className="btn btn-primary">
            Adicionar categoria
          </Link>
        </Col>
      </Row>
      <Card>
        {categories?.length && (
          <Card.Body>
            <Table striped>
              <thead>
                <tr className="text-center">
                  <th>Nome da categoria</th>
                  <th className="center">Ação</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((shop) => (
                  <tr key={shop.id} className="text-center">
                    <td>{shop.name}</td>
                    <td>
                      <Row>
                        <Col>
                          {shop.id && (
                            <Link
                              className="btn btn-warning text-white"
                              to={`/edita-categoria/${btoa(
                                shop?.id?.toString()
                              )}`}
                              title={`Editar categoria ${shop.name}`}
                            >
                              <Pencil />
                            </Link>
                          )}
                        </Col>
                        <Col>
                          {shop.id && (
                            <button
                              className="btn btn-danger text-white"
                              title={`Deletar categoria ${shop.name}`}
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

        {!categories?.length && (
          <div className="text-center p-5">
            <h2>Sem categorias cadastradas até o momento.</h2>
            <Link to="/adiciona-categoria" className="btn btn-success mt-5">
              Adicionar categoria
            </Link>
          </div>
        )}
      </Card>
    </>
  );
};

export default ListCategoriesView;
