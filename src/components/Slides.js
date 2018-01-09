import React from 'react';
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
      >
        {el}
      </div>
    );
  }
}

export default Slides;
