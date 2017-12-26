import React from 'react';
import { AppBar, Layout } from 'react-toolbox';
import appStyle from './app.css';

const ListGroup = (props) => {
  const items = props.listItems;
  const content = items.map(item => (
    <li key={item.id}>
      <span>
        {item.title}
      </span>
    </li>));
  return <ul>{content}</ul>;
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
              <ListGroup listItems={this.data} />
            </div>
          </div>
        </Layout>
      </div>
    );
  }
}

export default App;
