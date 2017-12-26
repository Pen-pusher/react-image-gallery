import React from 'react';
import { AppBar, Layout } from 'react-toolbox';
import appStyle from './app.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.data = props.data;
  }
  render() {
    const items = this.data;
    const listItems = items.map(item => (
      <li key={item.id}>
        <span>
          {item.title}
        </span>
      </li>));
    return (
      <div>
        <Layout>
          <AppBar />
          <div className={appStyle.content}>
            <div>相簿</div>
            <div>
              <ul>
                {listItems}
              </ul>
            </div>
          </div>
        </Layout>
      </div>
    );
  }
}

export default App;
