import React from 'react';
import { AppBar, Layout, Panel, Button } from 'react-toolbox';
import Gallery from './Gallery';
import Style from './App.css';
import PanelTheme from '../css/PanelTheme.css';
import AppBarTheme from '../css/AppBarTheme.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.albumData = props.albumData || [];
    this.photoData = props.photoData || [];
  }
  render() {
    const copyrightYear = new Date().getFullYear();
    return (
      <Layout>
        <Panel theme={PanelTheme}>
          <AppBar title="React Image Gallery" theme={AppBarTheme} flat />
          {this.photoData.length > 0 &&
            <div className={Style['page-header']}>
              <h1 className={Style.title}>
                {this.props.title}
              </h1>
              <div className={Style.actions} >
                <Button raised primary label="分享相簿" />
                <Button raised label="下載相簿" />
              </div>
            </div>
          }
          <div className={Style.content}>
            {this.albumData.length > 0 &&
              <Gallery items={this.albumData} isAlbum />
            }
            {this.photoData.length > 0 &&
              <Gallery items={this.photoData} />
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
