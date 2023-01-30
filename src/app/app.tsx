import React from 'react';
import './app.css';
import { Main } from '../pages/main/main';
import { withProviders } from './providers';

const App = () => {
  return (
    <div className="app-container">
      <Main/>
    </div>
  );
}

export default withProviders(App);
