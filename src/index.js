import React from 'react';
import ReactDom from 'react-dom';
import Warikan from './component/warikan';

//ReactのコンポーネントをレンダリングするDOM
const container = document.getElementById("app");

//containerにWarikanコンポーネントをレンダリングする
ReactDom.render(
  <Warikan />,
  container
);
