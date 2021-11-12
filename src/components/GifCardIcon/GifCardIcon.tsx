import { Fragment } from 'react';
import styles from './gifCardIcon.module.css';

type Props = {
  isIcon?: boolean,
  icon: string
}

const GifCardIcon: React.FC<Props> = ({ isIcon, icon }) => {
  return (
    <Fragment>
      {
        isIcon ?
          <div className={`d-flex align-items-center justify-content-center ${styles.iconCont}`}>
            <img src={`./assets/${icon}.svg`} />
          </div>
          :
          null
      }
    </Fragment>
  );
};

export default GifCardIcon;