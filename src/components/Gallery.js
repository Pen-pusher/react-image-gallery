import React from 'react';
import Style from './Gallery.css';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.items);
  }
  render() {
    const el = this.props.items.map((item) => {
      const bgUrl = this.props.isAlbum ? item.cover_photo.urls.thumb : item.urls.thumb;
      return (
        <li key={item.id} className={Style.item}>
          <a href="#" style={{ backgroundImage: `url(${bgUrl})` }}>
            {item.id}
          </a>
          {this.props.isAlbum && <span>{item.title}</span>}
        </li>
      );
    });
    const type = this.props.isAlbum ? 'album' : 'photo';
    return (
      <div>
        <div className={Style.subtitle}>{this.props.isAlbum ? '相簿' : '照片'}</div>
        <div className={Style[`${type}`]}>
          <ul className={Style['list-group']}>{el}</ul>
        </div>
      </div>
    );
  }
}

export default Gallery;
