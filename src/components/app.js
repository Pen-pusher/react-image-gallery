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
  const handleClick = (crumb) => {
    props.onCrumbClick(crumb.id, true);
  };
  const el = items.filter((item, index) => {
    // Don't render the last path
    if (index < items.length - 1) {
      return true;
    }
    return false;
  }).map((item) => {
    const crumb = {
      id: item.id,
      name: item.name
    };
    return (
      <div key={item.id} className={Style.crumb}>
        <span
          className={Style.name}
          role="button"
          tabIndex="0"
          onClick={() => { handleClick(crumb); }}
          onKeyDown={(event) => { if (event.which === 13) { handleClick(crumb); } }}
        >
          {item.name}
        </span>
        <FontIcon className={Style['chevron-right']} value="chevron_right" />
      </div>
    );
  });
  // scroll page to top
  window.scroll(0, 0);

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
  handleNav(id, goBack) {
    if (id) {
      // get new collection data
      const getCollection = Fetch(`collections/${id}`);
      const getRelated = Fetch(`collections/${id}/related`);
      const getPhotos = Fetch(`collections/${id}/photos?per_page=20`);
      Promise.all([getCollection, getRelated, getPhotos]).then((res) => {
        const newAlbum = {
          collection: res[0],
          albumData: res[1],
          photoData: res[2]
        };
        if (goBack) {
          // user clicks breadcrumbs links
          // remove all links after the clicked one
          const array = this.state.breadcrumbs;
          // get the index of the clicked link
          const index = array.findIndex(el => el.id === id);
          // remove all links after this index
          array.splice(index + 1);
        } else {
          // user clicks album
          // save new collection data to breadcrumbs
          this.state.breadcrumbs.push({
            id,
            name: res[0].title
          });
        }
        // update current album data
        this.setState(newAlbum);
      });
    } else {
      // user clicks on Home link
      // remove all breadcrumb links except Home
      this.state.breadcrumbs.splice(1);
      Fetch('collections/featured/?per_page=20').then((res) => {
        const home = {
          collection: {},
          albumData: res,
          photoData: []
        };
        this.setState(home);
      });
    }
    // scroll page to top
    window.scroll(0, 0);  
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
              {this.state.breadcrumbs.length > 0 &&
                <Breadcrumbs items={this.state.breadcrumbs} onCrumbClick={this.handleNav} />
              }
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
