import React from 'react';
import Style from './Gallery.css';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props.items);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(id) {
    this.props.handleClick(id);
  }
  render() {
    const el = this.props.items.map((item) => {
      const bgUrl = this.props.isAlbum ? item.cover_photo.urls.thumb : item.urls.thumb;
      return (
        <li key={item.id} className={Style.item}>
          <span
            className={Style.thumb}
            role="button"
            tabIndex="0"
            style={{ backgroundImage: `url(${bgUrl})` }}
            onClick={() => { this.handleClick(`${item.id}`); }}
            onKeyDown={(event) => { if (event.which === 13) { this.handleClick(`${item.id}`); } }}
          >
            {item.id}
          </span>
          {this.props.isAlbum && <span className={Style['album-title']}>{item.title}</span>}
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
