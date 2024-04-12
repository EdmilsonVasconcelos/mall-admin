import { Card, Col, Row, Table } from "react-bootstrap";
import "./style.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Shop } from "../types/shop";
import axios from "axios";
import { BASE_API } from "../utils/BaseApi";

const ListCategoriesView = () => {
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    const fetchShops = async () => {
      const response = await axios.get(`${BASE_API}/shop`).then((res) => {
        return res.data;
      });

      setShops(response);
    };
    fetchShops();
  }, []);

  return (
    <>
      <Row className="mb-3">
        <Col>
          <h2>Lista de lojas</h2>
        </Col>
        <Col className="text-end">
          <Link to="adiciona-categoria" className="btn btn-primary">
            Adicionar loja
          </Link>
        </Col>
      </Row>
      <Card>
        <Card.Body>
          <Table striped>
            <thead>
              <tr>
                <th>Nome da loja</th>
                <th className="center">Ação</th>
              </tr>
            </thead>
            <tbody>
              {shops?.map((shop) => (
                <tr key={shop.id}>
                  <td>{shop.name}</td>
                  <td className="center">
                    <Row>
                      <Col>
                        <Link to={`/categories/${shop.id}/edit`}>Editar</Link>
                      </Col>
                      <Col>
                        <Link to={`/categories/${shop.id}/delete`}>
                          Excluir
                        </Link>
                      </Col>
                    </Row>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};

export default ListCategoriesView;
