import React from 'react';
import { AppBar, Layout, Panel, Button } from 'react-toolbox';
import Gallery from './Gallery';
import Style from './App.css';
import Fetch from '../Fetch';

// React-Toolbox themeing
import PanelTheme from '../css/PanelTheme.css';
import AppBarTheme from '../css/AppBarTheme.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: {},
      albumData: props.albumData || [],
      photoData: props.photoData || []
    };
    this.handleBrowsing = this.handleBrowsing.bind(this);
  }
  handleBrowsing(id) {
    const getCollection = Fetch(`collections/${id}`);
    const getRelated = Fetch(`collections/${id}/related`);
    const getPhotos = Fetch(`collections/${id}/photos?per_page=20`);
    Promise.all([getCollection, getRelated, getPhotos]).then((results) => {
      Promise.all(results.map((result) => result.json())).then((r) => {
        this.setState({
          collection: r[0],
          albumData: r[1],
          photoData: r[2]
        });
      });
    });
  }
  render() {
    const copyrightYear = new Date().getFullYear();
    return (
      <Layout>
        <Panel theme={PanelTheme}>
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
              <Gallery items={this.state.albumData} isAlbum handleBrowsing={this.handleBrowsing} />
            }
            {this.state.photoData.length > 0 &&
              <Gallery items={this.state.photoData} />
            }
          </div>
          <div className={Style.footer}>
            <div className={Style.copyright}>
              &copy; {copyrightYear} 版權所有
            </div>
          </div>
        </Panel>
      </Layout>
    );
  }
}

export default App;
