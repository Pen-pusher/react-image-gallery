import React from 'react';
import PropTypes from 'prop-types';
import Style from './Slides.css';

class Slides extends React.Component {
  static caculateMove(index, pan) {
    const i = parseInt(index, 10);
    let movex = '';
    if (i) {
      movex = `-${i * 100}%`;
    } else {
      movex = '0px';
    }

    if (pan) {
      movex = `calc(${movex} - ${pan}px)`;
    }

    return movex;
  }

  constructor(props) {
    super(props);
    this.state = {
      movex: ''
    };
    // variables to handle touch events
    this.longTouch = undefined;
    this.touchstartx = undefined;
    this.touchmovex = undefined;
    // methods
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.start = this.start.bind(this);
    this.move = this.move.bind(this);
    this.end = this.end.bind(this);
  }

  componentWillMount() {
    this.setState({
      movex: Slides.caculateMove(this.props.active)
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      movex: Slides.caculateMove(nextProps.active)
    });
  }

  handleTouchMove(event) {
    this.move(event);
  }

  handleTouchEnd() {
    this.end();
  }

  start(event) {
    this.pause = false;
    // pause autoplay in touch events
    if (this.props.isAutoplaying) {
      this.props.canAutoplay();
      this.pause = true;
    }
    // 手勢在螢幕上停留的時間少於 250ms，叫做 flick（快速播動）.
    this.longTouch = false;
    setTimeout(() => {
      this.longTouch = true;
    }, 250);
    // Get the original touch position.
    this.touchstartx = event.touches[0].pageX;
  }

  move(event) {
    // Continuously return touch position.
    this.touchmovex = event.touches[0].pageX;
    // Calculate distance to translate holder.
    this.movex = this.touchstartx - this.touchmovex;
    // caculate how much the slider should pan left or right
    // "5" is a "magic" number
    const panx = this.movex / 5;
    this.setState({
      movex: Slides.caculateMove(this.props.active, panx)
    });
  }

  end() {
    // calculate if the active index should update
    // 取手勢滑動距離的絕對值
    const absMove = Math.abs(this.movex);
    // 以下情況判定為照片更新的條件：
    // 1. 滑動距離的絕對值大於螢幕一半寬度，不管速度
    // 2. 是一個 flick 手勢
    if (absMove > window.innerWidth / 2 || this.longTouch === false) {
      // update to next or previous slide
      if (this.movex > 0) {
        this.props.onSlideUpdate(1);
      } else if (this.movex < 0) {
        this.props.onSlideUpdate(-1);
      }
    } else {
      this.setState({
        movex: Slides.caculateMove(this.props.active)
      });
    }

    // resume autoplay if it is interrupted by touch
    if (this.pause) {
      this.props.canAutoplay();
    }
    this.movex = 0;
  }

  render() {
    const el = this.props.slides.map(slide => (
      <div className={Style.slide} key={slide.id}>
        <img src={slide.urls.regular} alt={slide.description} />
      </div>
    ));
    const newStyle = { transform: `translate3d(${this.state.movex},0px,0px)` };
    return (
      <div
        className={Style.slides}
        style={newStyle}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >
        {el}
      </div>
    );
  }
}

Slides.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.object).isRequired,
  active: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  isAutoplaying: PropTypes.bool.isRequired,
  canAutoplay: PropTypes.func.isRequired,
  onSlideUpdate: PropTypes.func.isRequired
};

export default Slides;
