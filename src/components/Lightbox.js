import React from 'react';
import { Layout, Panel } from 'react-toolbox';
import Style from './Lightbox.css';

class Lightbox extends React.Component {

  render() {
    return (
      <div className={Style.lightbox}>
        <div>
          <div>layout test</div>
        </div>
      </div>
    )
  }
}

export default Lightbox;