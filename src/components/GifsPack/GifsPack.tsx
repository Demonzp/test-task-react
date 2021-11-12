import { Row, Alert } from 'react-bootstrap';
import { Gif, Pack } from '../../types/store';
import GifCard from '../GifCard';

type Props = {
  pack: Pack,
  onClick: (gif: Gif) => any,
  children?: React.ReactElement;
}

const GifsPack: React.FC<Props> = ({ pack, onClick, children }) => {
  return (
      <Row>
        {
          pack.error?
          <Alert variant="danger" style={{color:'black'}}>
            Error: {pack.error}
          </Alert>
          :
          null
        }
        {
          pack.gifs.map(gif=>{
            return <GifCard key={gif.id} gif={gif} onClick={onClick}>{children}</GifCard>
          })
        }
      </Row>
  );
};

export default GifsPack;