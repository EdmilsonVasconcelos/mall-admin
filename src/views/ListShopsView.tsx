import { Card, Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Shop } from "../types/shop";
import axios from "axios";
import { BASE_API } from "../utils/BaseApi";
import { Pencil, Trash } from "react-bootstrap-icons";

const ListShopsView = () => {
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
          <Link to="adiciona-loja" className="btn btn-primary">
            Adicionar loja
          </Link>
        </Col>
      </Row>
      <Card>
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
                          <Link
                            className="btn btn-danger text-white"
                            to={`/categories/${shop.id}/delete`}
                            title={`Deletar loja ${shop.name}`}
                          >
                            <Trash />
                          </Link>
                        )}
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

export default ListShopsView;
