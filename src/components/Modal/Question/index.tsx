import { Button, Modal } from "react-bootstrap";

type QuestionModalProps = {
  show: boolean;
  nameRegister: string;
  handleClose: () => void;
  setQuestion: (param: boolean) => void;
};

const QuestionModal = ({
  show,
  nameRegister,
  handleClose,
  setQuestion,
}: QuestionModalProps) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Atenção</Modal.Title>
        </Modal.Header>
        <Modal.Body>Deseja deletar {nameRegister}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => setQuestion(true)}>
            Deletar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default QuestionModal;
