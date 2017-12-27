import React from 'react';
import { AppBar, Layout } from 'react-toolbox';
import Style from './App.css';

const Gallery = (props) => {
  const { items } = props;
  const el = items.map(item => (
    <li key={item.id} className={Style.item}>
      <a href="#" style={{ backgroundImage: `url(${item.cover_photo.urls.thumb})` }}>
        {item.title}
      </a>
    </li>));
  return <ul className={Style['list-group']}>{el}</ul>;
};

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
          <div className={Style.gallery}>
            <div>相簿</div>
            <Gallery items={this.data} />
          </div>
        </div>
      </Layout>
    );
  }
}

export default App;
