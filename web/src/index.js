import React from 'react';
import ReactDOM from 'react-dom';
import './config';
import App from './App';
import {RecoilRoot} from "recoil"
import {CurrentUserSubscription} from "./hooks/current-user"

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <CurrentUserSubscription />
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

 
