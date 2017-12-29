import React from 'react';
import { render } from 'react-dom';
import 'normalize.css';
import './Base.css';
import App from './components/App';
import Fetch from './Fetch';

Fetch('collections/featured/?per_page=20')
  .then((response) => {
    if (response.errors) {
      console.log('not ok');
    } else {
      render(
        <App albumData={response} />,
        document.getElementById('root')
      );
    }
  });
