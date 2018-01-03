import React from 'react';
import { AppBar, Layout, Panel, Button } from 'react-toolbox';
import Gallery from './Gallery';
import Lightbox from './Lightbox';
import Style from './App.css';
import Fetch from '../Fetch';

// React-Toolbox themeing
import AppBarTheme from '../css/AppBarTheme.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: {},
      albumData: props.albumData || [],
      photoData: props.photoData || [],
      isLightboxActive: false
    };
    this.handleBrowsing = this.handleBrowsing.bind(this);
    this.handleLightbox = this.handleLightbox.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }
  handleBrowsing(id) {
    const getCollection = Fetch(`collections/${id}`);
    const getRelated = Fetch(`collections/${id}/related`);
    const getPhotos = Fetch(`collections/${id}/photos?per_page=20`);
    Promise.all([getCollection, getRelated, getPhotos]).then((res) => {
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
            {this.state.albumData.length > 0 &&
              <Gallery items={this.state.albumData} isAlbum handleClick={this.handleBrowsing} />
            }
            {this.state.photoData.length > 0 &&
              <Gallery items={this.state.photoData} handleClick={this.handleLightbox} />
            }
          </div>
          <div className={Style.footer}>
            <div className={Style.copyright}>
              &copy; {copyrightYear} 版權所有
            </div>
          </div>
        </Panel>
        {this.state.isLightboxActive &&
          <Lightbox />
        }
      </Layout>
    );
  }
}

export default App;
