import { useState } from 'react';
import { Col } from 'react-bootstrap';
import { Gif } from '../../types/store';

type Props = {
  gif: Gif
  onClick: (gif: Gif)=>any
}

const GifCard: React.FC<Props> = ({ gif, onClick }) => {
  const [isIcon, setIsIcon] = useState(false);

  const clickHandle = ()=>{
    onClick(gif);
  }

  const mouseOverHandle = ()=>{
    setIsIcon(true);
  };

  const mouseOutHandle = ()=>{
    setIsIcon(false);
  }

  return (
    <Col xs={8} md={3} className="align-items-center justify-content-center" style={{position:'relative'}}>
      {
        isIcon?
        <div className="d-flex align-items-center justify-content-center" style={{pointerEvents: 'none', backgroundColor:'white', width:40, height:32, borderRadius: 2, position: 'absolute', left:'70%', top: '3%'}}>
          <img src="./assets/trash.svg" style={{}}/>
        </div>
        :
        null
      }
      <img 
        style={{maxWidth: 200, maxHeight: 250, cursor: 'pointer'}} 
        src={gif.images.downsized.url}
        alt={gif.title}
        onClick={clickHandle}
        onMouseOver={mouseOverHandle}
        onMouseOut={mouseOutHandle}
      />
    </Col>
  );
}

export default GifCard;