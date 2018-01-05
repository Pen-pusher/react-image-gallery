import React from 'react';
import Style from './Slides.css';

class Slides extends React.Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    const el = this.props.slides.map((slide) => {
      return (
        <div className={Style.slide} key={slide.id}>
          <img src={slide.urls.regular} />
        </div>
      );
    });
    return (
      <div className={Style.slides}>
        {el}
      </div>
    );
  }
}

export default Slides;
