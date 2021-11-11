import { useState } from 'react';
import { Form, InputGroup, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { RouteNames } from '../../types/routeNames';

const Search: React.FC = ()=>{
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const searchHandle = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(search.length>0){
      navigate(`${RouteNames.SEARCH}?q=${search}`);
    }
  };

  return (
    <Form onSubmit={searchHandle} className="d-flex">
      <Row>
        <Col>
          <InputGroup style={{minWidth:300}}>
            <InputGroup.Text><img src="./assets/search.svg" /></InputGroup.Text>
            <Form.Control onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setSearch(e.target.value)} type="text" placeholder="Search GIF" />
          </InputGroup>
        </Col>
        {
          search.length>0?
          <Col>
            <Button type="submit">Search</Button>
          </Col>
          :
          null
        }
      </Row>
    </Form>
  );
};

export default Search;
