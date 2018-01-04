import React from 'react';
import { AppBar, Layout, Panel, Button } from 'react-toolbox';
import FontIcon from 'react-toolbox/lib/font_icon';
import Gallery from './Gallery';
import Lightbox from './Lightbox';
import Style from './App.css';
import Fetch from '../Fetch';

// React-Toolbox themeing
import AppBarTheme from '../css/AppBarTheme.css';

const Breadcrumbs = (props) => {
  const { items } = props;
  const el = items.filter((item, index) => {
    // Don't render the last path
    if (index < items.length - 1) {
      return true;
    }
    return false;
  }).map((item) => {
    const breadcrumbData = {
      direction: 'parent',
      id: item.id,
      name: item.name
    };
    return (
      <div key={item.id} className={Style.piece}>
        <span
          className={Style.name}
          role="button"
          tabIndex="0"
          onClick={() => { props.handleNav(breadcrumbData); }}
          onKeyDown={(event) => { if (event.which === 13) { props.handleNav(breadcrumbData); } }}
        >
          {item.name}
        </span>
        <FontIcon className={Style['chevron-right']} value="chevron_right" />
      </div>
    );
  });

  return <div className={Style.breadcrumbs}>{el}</div>;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: {},
      albumData: props.albumData || [],
      photoData: props.photoData || [],
      isLightboxActive: false,
      breadcrumbs: [{
        id: 0,
        name: 'Home'
      }]
    };
    this.handleNav = this.handleNav.bind(this);
    this.handleLightbox = this.handleLightbox.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }
  handleNav(id) {
    // get new collection data
    const getCollection = Fetch(`collections/${id}`);
    const getRelated = Fetch(`collections/${id}/related`);
    const getPhotos = Fetch(`collections/${id}/photos?per_page=20`);
    Promise.all([getCollection, getRelated, getPhotos]).then((res) => {
      // save new collection data to breadcrumbs
      this.state.breadcrumbs.push({
        id: id,
        name: res[0].title
      });
      this.setState({
        collection: res[0],
        albumData: res[1],
        photoData: res[2]
      });
    });
  }
  handleLightbox(id) {
    console.log(`lightbox: ${id}`);
    this.setState({
      isLightboxActive: true
    });
  }
  handleScroll() {
    console.log('scroll');
  }
  render() {
    const copyrightYear = new Date().getFullYear();
    return (
      <Layout>
        <Panel theme={Style}>
          <AppBar title="React Image Gallery" theme={AppBarTheme} flat />
          {this.state.photoData.length > 0 &&
            <div className={Style['page-header']}>
              {this.state.breadcrumbs.length > 0 && <Breadcrumbs items={this.state.breadcrumbs} />}
              <h1 className={Style.title}>
                {this.state.collection.title}
              </h1>
              <div className={Style.actions} >
                <Button raised primary label="分享相簿" />
                <Button raised label="下載相簿" />
              </div>
            </div>
          }
          <div className={Style.content}>
            {this.state.albumData.length > 1 &&
              <Gallery items={this.state.albumData} isAlbum onItemClick={this.handleNav} />
            }
            {this.state.photoData.length > 0 &&
              <Gallery items={this.state.photoData} onItemClick={this.handleLightbox} />
            }
          </div>
          <div className={Style.footer}>
            <div className={Style.copyright}>
              &copy; {copyrightYear} 版權所有
            </div>
          </div>
        </Panel>
        {this.state.isLightboxActive && <Lightbox /> }
      </Layout>
    );
  }
}

export default App;
