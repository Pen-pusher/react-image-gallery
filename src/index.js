import React from 'react';
import { render } from 'react-dom';
import 'normalize.css';
import './Base.css';
import App from './components/App';

const fetchUrl = 'https://api.unsplash.com/collections/featured';
const id = '2ebf57611c3566052a250a60c74cd822ac81e4198686d9dc5607a532508937f4';
const myHeaders = new Headers();
myHeaders.append('Authorization', `Client-ID ${id}`);
const init = {
  method: 'GET',
  headers: myHeaders
};
const promise = fetch(fetchUrl, init);

promise
  .then(response => response.json())
  .then((data) => {
    console.log(data);
    render(
      <App data={data} />,
      document.getElementById('root')
    );
  });
