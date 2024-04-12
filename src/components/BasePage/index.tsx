import { Col, Row } from "react-bootstrap";
import "./style.css";
import SideBar from "../SideBar";
import ContentPage from "../ContentPage";

type ContentPageProps = {
  contentPage: React.ReactNode;
};

const BasePage = ({ contentPage }: ContentPageProps) => {
  return (
    <>
      <Row className="baseContent">
        <Col sm={3}>
          <SideBar />
        </Col>
        <Col sm={9} className="p-3">
          <ContentPage children={contentPage} />
        </Col>
      </Row>
    </>
  );
};

export default BasePage;
