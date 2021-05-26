import './index.css';
import { css, Global } from '@emotion/react';
/** @jsxImportSource @emotion/react */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Global
      styles={css`
        body {
          background-color: #fff;
          color: #232221;
          margin: 0;
          font-family: 'Raleway', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        div,
        li,
        input {
          font-family: 'Raleway', sans-serif;
        }

        h1,
        h2 {
          font-family: 'Raleway', sans-serif;
          text-align: center;
          text-decoration: none;
          font-weight: 600;
        }

        h1 {
          font-size: 30px;
          font-weight: 600;
          margin-bottom: 30px;
        }

        h2 {
          font-size: 25px;
          font-weight: 400;
          margin-bottom: 10px;
        }

        code {
          font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
            monospace;
        }
      `}
    />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
