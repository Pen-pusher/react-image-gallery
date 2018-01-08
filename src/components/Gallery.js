import React from 'react';
import { Button } from 'react-toolbox';
import Style from './Gallery.css';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasTeaserButton: true
    };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.teaserExpand = this.teaserExpand.bind(this);
  }
  handleItemClick(id) {
    this.props.onItemClick(id);
  }
  teaserExpand() {
    this.setState({
      hasTeaserButton: false
    });
  }
  render() {
    const el = this.props.items.map((item, index) => {
      const thumbUrl = this.props.isAlbumLayout ? item.cover_photo.urls.thumb : item.urls.thumb;
      const onClickCallbackArgument = this.props.isAlbumLayout ? item.id : index;
      return (
        <li key={item.id} className={Style.item}>
          <span
            className={Style.thumb}
            role="button"
            tabIndex="0"
            style={{ backgroundImage: `url(${thumbUrl})` }}
            onClick={() => this.handleItemClick(`${onClickCallbackArgument}`)}
            onKeyDown={event => event.which === 13 && this.handleItemClick(`${onClickCallbackArgument}`)}
          >
            {item.id}
          </span>
          {this.props.isAlbumLayout && <span className={Style['album-title']}>{item.title}</span>}
        </li>
      );
    });
    const type = this.props.isAlbumLayout ? 'album' : 'photo';
    const classArray = [Style[type]];
    if (this.state.teaser) {
      classArray.push(Style.tease);
    }
    const classes = classArray.join(' ');
    return (
      <div className={Style['gallery-wrapper']}>
        <div className={Style.subtitle}>{this.props.isAlbumLayout ? '相簿' : '照片'}</div>
        <div className={classes}>
          <ul className={Style['list-group']}>{el}</ul>
        </div>
        {this.state.hasTeaserButton &&
          <div className={Style.teaser}>
            <Button label="全部顯示" flat onClick={this.teaserExpand} />
          </div>        
        }
      </div>
    );
  }
}

export default Gallery;
