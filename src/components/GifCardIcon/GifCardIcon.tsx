import { Fragment } from "react";

type Props = {
  isIcon?: boolean,
  icon: string
}

const GifCardIcon: React.FC<Props> = ({isIcon, icon})=>{
  return(
    <Fragment>
      {
        isIcon?
        <div className="d-flex align-items-center justify-content-center" style={{pointerEvents: 'none', backgroundColor:'white', width:40, height:32, borderRadius: 2, position: 'absolute', left:'70%', top: '3%'}}>
          <img src={`./assets/${icon}.svg`}/>
        </div>
        :
        null
      }
    </Fragment>
  );
};

export default GifCardIcon;