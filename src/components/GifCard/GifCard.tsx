import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { Gif } from '../../types/store';

type Props = {
  gif: Gif;
  onClick: (gif: Gif) => any;
  children?: React.ReactElement;
}

const GifCard: React.FC<Props> = ({ gif, onClick, children }) => {
  const [isIcon, setIsIcon] = useState(false);
  const [iconEl, setIconEl] = useState<React.ReactElement|undefined>();

  useEffect(()=>{
    if(children){
      setIconEl(React.cloneElement(children, { isIcon }));
    }
  }, [children, isIcon])

  const clickHandle = () => {
    onClick(gif);
  }

  const mouseOverHandle = () => {
    setIsIcon(true);
  };

  const mouseOutHandle = () => {
    setIsIcon(false);
  }

  return (
    <Col xs={8} md={3} className="d-flex align-items-center justify-content-center" style={{ minWidth:100, minHeight:250 }}>
      <div style={{position: 'relative'}}>
        {iconEl}
        <img
          style={{ maxWidth: 200, maxHeight: 250, cursor: 'pointer' }}
          src={gif.images.downsized.url}
          alt={gif.title}
          onClick={clickHandle}
          onMouseOver={mouseOverHandle}
          onMouseOut={mouseOutHandle}
        />
      </div>
    </Col>
  );
}

export default GifCard;