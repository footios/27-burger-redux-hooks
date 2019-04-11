import React, { Component } from "react";

// 2.
// This component here should help me load a component
// asynchronously i.e. only when it's needed.

const asyncComponent = importComponent => {
  return class extends Component {
    // This state here (this component property)
    // will be set to the dynamically loaded component
    // and the code for this will get implemented in componentDidMount.
    state = { component: null };

    // Now, the 'importComponent' should be a function reference in the end,
    // so I will execute 'importComponent' here and this actually will be a function
    // which will return as a promise.
    componentDidMount() {
      importComponent().then(cmp => {
        // cmp.default -> is the case due to the set up
        // we're using here with 'create react app'.
        this.setState({ component: cmp.default });
      });
    }
    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  };
};

export default asyncComponent;