import React from 'react';
import FontIcon from 'react-toolbox/lib/font_icon';
import Slides from './Slides';
// import { Layout, Panel } from 'react-toolbox';
import Style from './Lightbox.css';

class Lightbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: {
        index: props.index,
        description: props.slides[props.index].description,
        link: props.slides[props.index].links.html,
        download: props.slides[props.index].links.download
      }
    };
  }

  render() {
    return (
      <div className={Style.lightbox}>
      <Slides />
        <div className={Style['tool-bar']}>
          <div>layout test</div>
        </div>
        <div className={Style['description-bar']}>
          <div>{this.state.active.description}</div>
        </div>
        <div className={Style.prev}>
          <FontIcon value="chevron_left" />
        </div>
        <div className={Style.next}>
          <FontIcon value="chevron_right" />
        </div>
      </div>
    );
  }
}

export default Lightbox;
