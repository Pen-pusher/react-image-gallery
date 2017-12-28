import React from 'react';
import Style from './Gallery.css';

class Gallery extends React.Component {
  // constructor(props) {
  //   super(props);

  // }
  render() {
    const el = this.props.items.map(item => (
      <li key={item.id} className={Style.item}>
        <a href="#" style={{ backgroundImage: `url(${item.cover_photo.urls.thumb})` }}>
          {item.title}
        </a>
        {this.props.isAlbum && <span>{item.title}</span>}
      </li>));
    const type = this.props.isAlbum ? 'album' : 'photo';
    return (
      <div className={Style[`${type}`]}>
        <div>{this.props.isAlbum ? '相簿' : '照片'}</div>
        <ul className={Style['list-group']}>{el}</ul>
      </div>
    );
  }
}

export default Gallery;
