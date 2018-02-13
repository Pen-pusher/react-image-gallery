import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'react-toolbox/lib/font_icon';
import Slides from './Slides';
import ShareDialog from './ShareDialog';
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
      isAutoplayingSlides: false,
      isShareBoxActive: false,
      hasControl: true
    };
    this.length = props.slides.length;
    this.timer = {
      autoplay: null,
      control: null,
      idle: null
    };
    this.controlHidden = {
      opacity: 0,
      transition: 'opacity 1s ease-in-out'
    };
    this.onClose = this.onClose.bind(this);
    this.onStartingTimer = this.onStartingTimer.bind(this);
    this.onClearTimer = this.onClearTimer.bind(this);
    this.onIdleInterrupt = this.onIdleInterrupt.bind(this);
    this.onDownloadClick = this.onDownloadClick.bind(this);
    this.wakeUp = this.wakeUp.bind(this);
    this.handleSlideUpdate = this.handleSlideUpdate.bind(this);
    this.handleSlideAutoplay = this.handleSlideAutoplay.bind(this);
    this.handleShareBoxActive = this.handleShareBoxActive.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    // start autoplay after lightbox component is mounted to the DOM
    this.onStartingTimer('autoplay');
    // start control timer
    this.onStartingTimer('control');
    // add an event listener for keyboard events on window
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    // when closing lightbox, clear all ongoing timers
    this.onClearTimer('autoplay');
    this.onClearTimer('control');
    this.onClearTimer('idle');
    // remove keyboard event listener
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  onClose() {
    this.props.onCloseClick();
  }

  onStartingTimer(name) {
    switch (name) {
      case 'autoplay':
        this.timer.autoplay = setInterval(() => this.handleSlideUpdate(1), 5000);
        this.setState({
          isAutoplayingSlides: true
        });
        break;

      case 'control':
        // hide controls after 7 seconds
        this.timer.control = window.setTimeout(() => this.onClearTimer('control'), 7000);
        break;

      case 'idle':
        // if this timer isn't cleared after 0.1 second
        // start control timer to hide slider controls after 7 seconds
        this.timer.idle = window.setTimeout(() => this.onStartingTimer('control'), 100);
        break;
      // no default
    }
  }

  onClearTimer(name) {
    if (this.timer[name]) {
      if (name === 'autoplay') {
        // clear autoplay timer
        clearInterval(this.timer.autoplay);
        // change pause button to play button
        this.setState({
          isAutoplayingSlides: false
        }, () => {
          // clear timer after state change
          this.timer.autoplay = null;
        });
      } else if (name === 'control') {
        // clear control timer
        window.clearTimeout(this.timer.control);
        // hide controls
        this.setState({
          hasControl: false
        }, () => {
          // clear timer after state change
          this.timer.control = null;
        });
      } else if (name === 'idle') {
        window.clearTimeout(this.timer.idle);
        this.timer.idle = null;
      }
    }
  }

  onIdleInterrupt() {
    this.wakeUp();
    // start new idle timer
    this.onStartingTimer('idle');
  }

  onDownloadClick() {
    // pause autoplay
    // this.onClearTimer('autoplay');
    // download active photo
    // document.getElementById('download').submit();
    // const id = '2ebf57611c3566052a250a60c74cd822ac81e4198686d9dc5607a532508937f4';
    // const secret = 'bdf4f405a97e6cca3e8252074206b3e580bee49073b426d478c187bae9f6f153';
    console.log('download');
  }

  wakeUp() {
    // clear ongoing control and idle timers
    this.onClearTimer('control');
    this.onClearTimer('idle');
    // show controls
    this.setState({
      hasControl: true
    });
  }

  handleSlideUpdate(int) {
    // change active slide index
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
      this.onClearTimer('autoplay');
    }
  }

  handleSlideAutoplay() {
    if (this.state.isAutoplayingSlides) {
      // stop autoplay, pause
      this.onClearTimer('autoplay');
    } else {
      // start autoplay
      this.onStartingTimer('autoplay');
    }
  }

  handleShareBoxActive() {
    // pause autoplay, and never resume
    this.onClearTimer('autoplay');
    // trigger share dialog
    this.setState({
      isShareBoxActive: !this.state.isShareBoxActive
    }, () => {
      if (this.state.isShareBoxActive) {
        // remove keyboard event listener when share dialog is active
        window.removeEventListener('keydown', this.handleKeyDown);
        // keep controls visiable
        this.wakeUp();
      } else {
        // add keyboard event listener back when share is inactive
        window.addEventListener('keydown', this.handleKeyDown);
        // start idle timer
        this.onStartingTimer('idle');
      }
    });
  }

  handleKeyDown(event) {
    const { keyCode } = event;
    switch (keyCode) {
      case 32:
        // space bar
        // this.toggleControl();
        this.handleSlideAutoplay();
        break;
      case 37:
        // left arrow
        this.handleSlideUpdate(-1);
        break;
      case 39:
        // right arrow
        this.handleSlideUpdate(1);
        break;
      case 67:
        // c
        this.onClose();
        break;
      case 68:
        // d
        this.handleDownload();
        break;
      case 83:
        // s
        this.handleShareBoxActive();
        break;
      // no default
    }
  }

  render() {
    return (
      <div className={Style.lightbox}>
        <Slides
          slides={this.props.slides}
          active={this.state.active.index}
          handleAutoplay={this.handleSlideAutoplay}
          handleUpdate={this.handleSlideUpdate}
          autoplayTimer={this.autoplayTimer}
        />
        <div className={Style['tool-bar']}>
          <div className={Style.fixed} />
          <div className={Style.fill}>
            <div
              className={Style.icon}
              role="button"
              tabIndex="0"
              onClick={this.handleSlideAutoplay}
              onKeyDown={event => event.which === 13 && this.handleSlideAutoplay}
            >
              <FontIcon value={this.state.isAutoplayingSlides ? 'pause' : 'play_arrow'} />
            </div>
          </div>
          <div className={Style.fixed}>
            <div
              className={Style.icon}
              role="button"
              tabIndex="0"
              onClick={this.handleShareBoxActive}
              onKeyDown={event => event.which === 13 && this.handleShareBoxActive}
            >
              <FontIcon value="share" />
            </div>
            <div
              className={Style.icon}
              role="button"
              tabIndex="0"
              onClick={this.onDownloadClick}
              onKeyDown={event => event.which === 13 && this.onDownloadClick}
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
            onClick={() => this.handleSlideUpdate(-1)}
            onKeyDown={event => event.which === 13 && this.handleSlideUpdate(-1)}
          >
            <FontIcon value="chevron_left" />
          </div>
        }
        {parseInt(this.state.active.index, 10) < this.length - 1 &&
          <div
            className={Style.next}
            role="button"
            tabIndex="0"
            onClick={() => this.handleSlideUpdate(1)}
            onKeyDown={event => event.which === 13 && this.handleSlideUpdate(1)}
          >
            <FontIcon value="chevron_right" />
          </div>
        }
        <ShareDialog
          type="photo"
          active={this.state.isShareBoxActive}
          link={this.state.active.link}
          onCloseClick={this.handleShareBoxActive}
        />
      </div>
    );
  }
}

Lightbox.propTypes = {
  index: PropTypes.string.isRequired,
  slides: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCloseClick: PropTypes.func.isRequired
};

export default Lightbox;
