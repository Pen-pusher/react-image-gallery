import React from 'react';
import { AppBar, Layout } from 'react-toolbox';
import appStyle from './app.css';

const Gallery = (props) => {
  const { items } = props;
  const el = items.map(item => (
    <li key={item.id} className={appStyle.item}>
      <a href="#" style={{ backgroundImage: `url(${item.cover_photo.urls.thumb})` }}>
        {item.title}
      </a>
    </li>));
  return <ul>{el}</ul>;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.data = props.data;
  }
  render() {
    return (
      <div>
        <Layout>
          <AppBar />
          <div className={appStyle.content}>
            <div>相簿</div>
            <div>
              <Gallery items={this.data} />
            </div>
          </div>
        </Layout>
      </div>
    );
  }
}

export default App;
