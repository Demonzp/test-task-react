import { Row } from 'react-bootstrap';
import { Gif, Pack } from '../../types/store';
import GifCard from '../GifCard';

type Props = {
  pack: Pack,
  onClick: (gif: Gif) => any
}

const GifsPack: React.FC<Props> = ({ pack, onClick }) => {
  return (
      <Row>
        {
          pack.gifs.map(gif=>{
            return <GifCard key={gif.id} gif={gif} onClick={onClick}/>
          })
        }
      </Row>
  );
};

export default GifsPack;