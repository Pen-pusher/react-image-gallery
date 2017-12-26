import React from 'react';
import { render } from 'react-dom';
import 'normalize.css';
import App from './components/app';

const fetchUrl = 'https://api.unsplash.com/collections/';
const id = '2ebf57611c3566052a250a60c74cd822ac81e4198686d9dc5607a532508937f4';
const query = `${fetchUrl}?client_id=${id}`;
const promise = fetch(query);

promise
  .then(response => response.json())
  .then((data) => {
    console.log(data);
    render(
      <App data={data} />,
      document.getElementById('root')
    );
  });
