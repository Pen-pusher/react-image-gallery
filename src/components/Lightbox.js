import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'react-toolbox/lib/font_icon';
import Slides from './Slides';
import Style from './Lightbox.css';

class Lightbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: {
        index: props.index,
        description: props.slides[props.index].description,
        link: props.slides[props.index].links.html,
        downloadLocation: props.slides[props.index].links.download_location
      },
      autoplayTimer: null
    };
    this.length = props.slides.length;
    this.onClose = this.onClose.bind(this);
    this.handleSlidesUpdate = this.handleSlidesUpdate.bind(this);
    this.handleSlidesAutoplay = this.handleSlidesAutoplay.bind(this);
    this.startAutoplay = this.startAutoplay.bind(this);
    this.stopAutoplay = this.stopAutoplay.bind(this);
  }

  componentDidMount() {
    // start autoplay after lightbox component is mounted to the DOM
    this.startAutoplay();
    // start control timer
    // this.startControlTimer();
    // add an event listener for keyboard events on window
    // window.addEventListener('keydown', this.handleKeyboard);
  }

  componentWillUnmount() {
    // when closing lightbox, first clear autoplay timer
    this.stopAutoplay();
    // then clear control timer
    // this.clearControlTimer();
    // clear idle timer
    // this.clearIdleTimer();
    // remove keyboard event listener
    // window.removeEventListener('keydown', this.handleKeyboard);
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
          downloadLocation: this.props.slides[nextIndex].links.download_location
        }
      });
    } else {
      // stop slides autoplay when reaches the last slide
      // clear autoplay timer
      this.stopAutoplay(this.state.autoplayTimer);
    }
  }

  handleSlidesAutoplay() {
    if (this.state.autoplayTimer) {
      // stop autoplay, pause
      this.stopAutoplay();
    } else {
      // start autoplay
      this.startAutoplay();
    }
  }

  startAutoplay() {
    this.setState({
      autoplayTimer: setInterval(() => this.handleSlidesUpdate(1), 5000)
    });
  }

  stopAutoplay() {
    // check if autoplay is still going
    if (this.state.autoplayTimer) {
      clearInterval(this.state.autoplayTimer);
      this.setState({
        autoplayTimer: null
      });
    }
  }

  render() {
    return (
      <div className={Style.lightbox}>
        <Slides
          slides={this.props.slides}
          active={this.state.active.index}
          handleAutoplay={this.handleSlidesAutoplay}
          handleUpdate={this.handleSlidesUpdate}
          autoplayTimer={this.autoplayTimer}
        />
        <div className={Style['tool-bar']}>
          <div className={Style.fixed} />
          <div className={Style.fill}>
            <div
              className={Style.icon}
              role="button"
              tabIndex="0"
              onClick={this.handleSlidesAutoplay}
              onKeyDown={event => event.which === 13 && this.handleSlidesAutoplay}
            >
              <FontIcon value={this.state.autoplayTimer ? 'pause' : 'play_arrow'} />
            </div>
          </div>
          <div className={Style.fixed}>
            <div className={Style.icon}>
              <FontIcon value="share" />
            </div>
            <div
              className={Style.icon}
              role="button"
              tabIndex="0"
              onClick={Lightbox.downloadPhoto}
              onKeyDown={event => event.which === 13 && Lightbox.downloadPhoto}
            >
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
        {parseInt(this.state.active.index, 10) > 0 &&
          <div
            className={Style.prev}
            role="button"
            tabIndex="0"
            onClick={() => this.handleSlidesUpdate(-1)}
            onKeyDown={event => event.which === 13 && this.handleSlidesUpdate(-1, event)}
          >
            <FontIcon value="chevron_left" />
          </div>
        }
        {parseInt(this.state.active.index, 10) < this.length - 1 &&
          <div
            className={Style.next}
            role="button"
            tabIndex="0"
            onClick={() => this.handleSlidesUpdate(1)}
            onKeyDown={event => event.which === 13 && this.handleSlidesUpdate(1, event)}
          >
            <FontIcon value="chevron_right" />
          </div>
        }
      </div>
    );
  }
}

Lightbox.propTypes = {
  index: PropTypes.string.isRequired,
  slides: PropTypes.arrayOf(PropTypes.object).isRequired,
  onItemClick: PropTypes.func.isRequired
};

export default Lightbox;
