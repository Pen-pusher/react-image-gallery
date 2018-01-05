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
        <Slides slides={this.props.slides} active={this.state.active.index} />
        <div className={Style['tool-bar']}>
          <div className={Style.fixed} />
          <div className={Style.fill}>
            <div className={Style.icon}>
              <FontIcon value="play_arrow" />
            </div>
          </div>
          <div className={Style.fixed}>
            <div className={Style.icon}>
              <FontIcon value="share" />
            </div>
            <div className={Style.icon}>
              <FontIcon value="file_download" />
            </div>
            <div className={Style.icon}>
              <FontIcon value="close" />
            </div>
          </div>
        </div>
        {this.state.active.description &&
          <div className={Style['description-bar']}>
            <div>{this.state.active.description}</div>
          </div>
        }
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
