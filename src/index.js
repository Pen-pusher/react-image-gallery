import React from 'react';
import { render } from 'react-dom';
import 'normalize.css';
import './Base.css';
import App from './components/App';
import Fetch from './Fetch';

const promise = Fetch('collections/featured/?per_page=20');

promise
  .then(response => response.json())
  .then((response) => {
    // console.log(response);
    render(
      <App albumData={response} />,
      document.getElementById('root')
    );
  });
