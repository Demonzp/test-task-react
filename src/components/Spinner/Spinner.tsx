import { Spinner } from "react-bootstrap";

const MySpinner:React.FC = ()=>{
  return(
    <div className="d-flex align-items-center justify-content-center">
      <Spinner animation="border" variant="secondary" />
    </div>
  );
}

export default MySpinner;