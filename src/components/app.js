import React from 'react';
import { AppBar, Layout, Panel, Button } from 'react-toolbox';
import FontIcon from 'react-toolbox/lib/font_icon';
import Gallery from './Gallery';
import Lightbox from './Lightbox';
import Style from './App.css';
import Fetch from '../Fetch';
import ScrollIt from '../ScrollIt';

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

  return <div className={Style.breadcrumbs}>{el}</div>;
};

class App extends React.Component {
  static backToTop() {
    ScrollIt(0);
  }

  constructor(props) {
    super(props);
    this.state = {
      collection: {},
      albums: props.albums || [],
      photos: props.photos || [],
      isLightboxActive: false,
      breadcrumbs: [{
        id: 0,
        name: 'Home'
      }],
      hasBackToTopButton: false
    };
    this.activeSlideIndex = 0;
    this.handleNavigate = this.handleNavigate.bind(this);
    this.handleLightboxActive = this.handleLightboxActive.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    // add listener to track scroll event
    window.addEventListener('scroll', this.handleScroll);
  }

  handleNavigate(id, goBack) {
    if (id) {
      // get new collection data
      const getCollection = Fetch(`collections/${id}`);
      const getRelated = Fetch(`collections/${id}/related`);
      const getPhotos = Fetch(`collections/${id}/photos?per_page=20`);
      Promise.all([getCollection, getRelated, getPhotos]).then((res) => {
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
        // update page
        this.setState({
          collection: res[0],
          albums: res[1],
          photos: res[2]
        });
      });
    } else {
      // user clicks on Home link
      // remove all breadcrumb links except Home
      this.state.breadcrumbs.splice(1);
      Fetch('collections/featured/?per_page=20').then((res) => {
        this.setState({
          collection: {},
          albums: res,
          photos: []
        });
      });
    }
    // scroll page to top
    window.scroll(0, 0);
  }

  // toggle lightbox
  handleLightboxActive(index) {
    if (!this.state.isLightboxActive) {
      this.activeSlideIndex = index;
    }
    this.setState({
      isLightboxActive: !this.state.isLightboxActive
    });
  }

  handleScroll() {
    console.log('scroll');
    // show back-to-top button when scrolled down pass 300px
    if (this.state.hasBackToTopButton) {
      if (window.scrollY <= 300) {
        this.setState({
          hasBackToTopButton: false
        });
      }
    } else {
      if (window.scrollY > 300) {
        this.setState({
          hasBackToTopButton: true
        });
      }
    }
  }


  render() {
    const copyrightYear = new Date().getFullYear();
    return (
      <Layout>
        <Panel theme={Style}>
          <AppBar title="React Image Gallery" theme={AppBarTheme} flat />
          {this.state.photos.length > 0 &&
            <div className={Style['page-header']}>
              {this.state.breadcrumbs.length > 0 &&
                <Breadcrumbs items={this.state.breadcrumbs} onCrumbClick={this.handleNavigate} />
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
            {this.state.albums.length > 1 &&
              <Gallery items={this.state.albums} isAlbumLayout onItemClick={this.handleNavigate} />
            }
            {this.state.photos.length > 0 &&
              <Gallery items={this.state.photos} onItemClick={this.handleLightboxActive} />
            }
          </div>
          <div className={Style.footer}>
            <div className={Style.copyright}>
              &copy; {copyrightYear} 版權所有
            </div>
          </div>
        </Panel>
        {this.state.isLightboxActive &&
          <Lightbox
            slides={this.state.photos}
            index={this.activeSlideIndex}
            onItemClick={this.handleLightboxActive}
          />
        }
        {this.state.hasBackToTopButton &&
          <Button
            primary
            floating
            mini
            icon="arrow_upward"
            className={Style.btt}
            onClick={App.backToTop}
          />
        }
      </Layout>
    );
  }
}

export default App;
