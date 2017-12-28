import React from 'react';
import { AppBar, Layout } from 'react-toolbox';
import Gallery from './Gallery';
import Style from './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.data = props.data;
  }
  render() {
    return (
      <Layout>
        <AppBar />
        <div className={Style.content}>
          <Gallery items={this.data} isAlbum />
        </div>
      </Layout>
    );
  }
}

export default App;
