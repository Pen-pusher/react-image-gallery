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
    this.onClose = this.onClose.bind(this);
    this.handleSlidesUpdate = this.handleSlidesUpdate.bind(this);
  }

  onClose() {
    this.props.onItemClick();
  }

  handleSlidesUpdate(int) {
    // change the active slide index
    const prevIndex = parseInt(this.state.active.index, 10);
    // check if next index number will exceeds data length
    const condition = prevIndex + int <= this.length - 1 && prevIndex + int >= 0;
    if (condition) {
      const nextIndex = prevIndex + int;
      this.setState({
        active: {
          index: nextIndex,
          description: this.props.slides[nextIndex].description,
          link: this.props.slides[nextIndex].links.html,
          download: this.props.slides[nextIndex].links.download
        }
      });
    } else {
      // stop slide autoplay when reaches the end of slides
      // then clear timer
      // this.stopAutoplay(this.state.autoplayTimerId);
    } 
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
            <div
              className={Style.icon}
              role="button"
              tabIndex="0"
              onClick={this.onClose}
              onKeyDown={event => event.which === 13 && this.onClose}
            >
              <FontIcon value="close" />
            </div>
          </div>
        </div>
        {this.state.active.description &&
          <div className={Style['description-bar']}>
            <div>{this.state.active.description}</div>
          </div>
        }
        <div
          className={Style.prev}
          role="button"
          tabIndex="0"
          onClick={() => this.handleSlidesUpdate(-1)}
          onKeyDown={event => event.which === 13 && this.handleSlidesUpdate(-1, event)}
        >
          <FontIcon value="chevron_left" />
        </div>
        <div
          className={Style.next}
          role="button"
          tabIndex="0"
          onClick={() => this.handleSlidesUpdate(1)}
          onKeyDown={event => event.which === 13 && this.handleSlidesUpdate(1, event)}
        >
          <FontIcon value="chevron_right" />
        </div>
      </div>
    );
  }
}

export default Lightbox;
