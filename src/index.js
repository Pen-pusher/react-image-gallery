import React from 'react';
import { render } from 'react-dom';
import 'normalize.css';
import './Base.css';
import App from './components/App';
import Fetch from './Fetch';

const { pathname } = window.location;


Fetch('collections/featured/?per_page=20').then((res) => {
  if (res.errors) {
    console.log('not ok');
  } else {
    render(
      <App albums={res} />,
      document.getElementById('root')
    );
  }
});
