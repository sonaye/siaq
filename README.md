# qaf

[![npm version](https://badge.fury.io/js/qaf.svg)](https://badge.fury.io/js/qaf) [![Build Status](https://travis-ci.org/sonaye/qaf.svg?branch=master)](https://travis-ci.org/sonaye/qaf)

<img src="qaf.svg" alt="qaf logo" width="96">

## Quick facts

- Based on React's new context API (`16.3.0`).
- Every store is a React component (state as a component).
- Actions, computed values, lifecycle methods and more.
- No dependencies, all just React goodness.
- ~2 KB in size, with < 100 lines of code.

## Installation

`yarn add qaf`

## Usage

### The store

```js
import { createStore } from 'qaf';

// this creates a store instant with context hooks
// you should do this for every store you intend to have
const QafStore = createStore();

// every store is a typical React class pure component
class Store extends QafStore {}

// e.g. if you have two stores Foo and Bar
const Foo = createStore(); // class FooStore extends Foo {}
const Bar = createStore(); // class BarStore extends Bar {}

// or invoke directly
class Store extends createStore() {
  state = { counter: 0 };

  // actions are regular functions (must be arrow functions, better perf.)
  // NOTE: avoid having action names that already exist in the state
  // e.g. counter = () => ..
  inc = () => this.setState(state => ({ counter: state.counter + 1 }));
  dec = () => this.setState(state => ({ counter: state.counter - 1 }));

  // computed values
  get sadCounter() {
    return `${this.state.counter} :(`;
  }

  // lifecycle methods
  componentDidMount() {
    // do your thing here, e.g. make an async call
  }

  // or write a custom logger
  componentDidUpdate() {
    if (process.env.NODE_ENV !== 'production') console.log('I_WAS_UPDATED');
  }

  // NOTE: dont't declare `render`, qaf will take care of that for you
}
```

### The component

```js
import { Subscribe, subscribe } from 'qaf';

// a typical react component
const Counter = ({ store }) => (
  <div>
    {/* state is available, notice it's not `store.state.counter` */}
    <div>{store.counter}</div>

    {/* actions are available */}
    <button onClick={store.inc}>+</button>
    <button onClick={store.dec}>-</button>

    {/* computed values are available */}
    <div>{store.sadCounter}</div>
  </div>
);

// render props pattern: you can use `<Subscribe />` to inject stores
<Subscribe store anotherStore ..>
  {(store, anotherStore) => <Counter {...{ store, anotherStore }} />}
</Subscribe>

// HOC pattern: injecting stores by passing their keys (as defined in `<Provider />`)
subscribe('store', 'anotherStore', ..)(Counter);
```

### The app

```js
import { Provider } from 'qaf';

<Provider store={Store} anotherStore={AnotherStore} ..>
  <Counter />
</Provider>
```

## Example

Available [here](/example).

[![Edit 3mz6wrrv5](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/3mz6wrrv5)
