import { Alert } from "react-bootstrap";

type AlertMessageProps = {
  variant?: string;
  message: string;
  setShow: (value: boolean) => void;
};

const AlertMessage = ({
  variant = "danger",
  message,
  setShow,
}: AlertMessageProps) => {
  return (
    <Alert
      key={variant}
      variant={variant}
      onClose={() => setShow(false)}
      dismissible
    >
      {message}
    </Alert>
  );
};

export default AlertMessage;
