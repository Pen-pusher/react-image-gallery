import React from 'react';
import Style from './Slides.css';

class Slides extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movex: ''
    };
  }
  render() {
    const el = this.props.slides.map((slide) => {
      return (
        <div className={Style.slide} key={slide.id}>
          <img src={slide.urls.regular} />
        </div>
      );
    });
    const newStyle = { transform: `translate3d(${this.state.movex},0px,0px)` };
    return (
      <div
        className={Style.slides}
        style={newStyle}
      >
        {el}
      </div>
    );
  }
}

export default Slides;
