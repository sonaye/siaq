/* eslint-disable react/prop-types */

import React from 'react';

import qaf, { inject, Provider } from '../src';

class Store extends qaf() {
  state = { counter: 0 };

  inc = () => this.setState(state => ({ counter: state.counter + 1 }));
  dec = () => this.setState(state => ({ counter: state.counter - 1 }));
}

const StatelessCounter = ({ store }) => (
  <div>
    <div>{store.counter}</div>

    <div>
      <button onClick={store.inc}>+</button>{' '}
      <button onClick={store.dec}>-</button>
    </div>
  </div>
);

const Counter = inject('store')(StatelessCounter);

const App = () => (
  <Provider store={Store}>
    <Counter />
  </Provider>
);

export default App;
