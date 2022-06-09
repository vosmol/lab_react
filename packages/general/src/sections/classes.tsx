import React, { Component, CSSProperties, PureComponent } from 'react';

export class Section_Classes extends Component<never, { color: string }> {
  state = {
    color: 'green'
  };

  handle = () =>
    this.setState((state) => ({
      color: state.color === 'green' ? 'red' : 'green'
    }));

  render() {
    return (
      <>
        <button onClick={this.handle}>Rerender</button>
        <MyClassComponent msg="Hello" />
      </>
    );
  }
}

interface i_state {
  count: number;
  hasError: boolean;
}

type t_props = {
  msg: string;
};

/*
	https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
	---
	## Mount ##
	constructor
	getDerivedStateFromProps
	willMount ?? legacy
	render
	!> Error handling for children, not current component (error boundary cannot catch itself)
	!> getDerivedStateFromError 
	!> didCatch
	didMount
	---
	## Update ##
	getDerivedStateFromProps
	willRecieveProps ?? legacy
	shouldUpdate
	willUpdate ?? legacy 
	render
	!> Error handling for children, not current component (error boundary cannot catch itself)
	!> getDerivedStateFromError
	!> didCatch
	didUpdate
	---
	## Unmount ##
	willUnmount
*/

// https://reactjs.org/docs/react-component.html
class MyClassComponent extends Component<t_props, i_state> {
  constructor(props: t_props) {
    super(props);

    this.state = {
      count: 0,
      hasError: false
    };

    this.updateCount3 = this.updateCount3.bind(this);
  }

  // https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path
  // UNSAFE_componentWillMount
  // !! This should have been removed in R17
  componentWillMount() {
    console.log('will mount');
  }

  // UNSAFE_componentWillUpdate
  // !! This should have been removed in R17
  componentWillUpdate() {
    console.log('will update');
  }

  // UNSAFE_componentWillReceiveProps
  // !! This should have been removed in R17
  componentWillReceiveProps() {
    console.log('will rec props');
  }

  // ! Use sparingly
  // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state
  // static getDerivedStateFromProps() {}

  /* static getDerivedStateFromError(error) {
	! No side effects here (called during render)
	return (VALUE_TO_UPDATE_STATE) like {hasError:true}
  }*/

  getSnapshotBeforeUpdate() {
    // Simillar use case to useLayoutEffect - read DOM and return value used by componentDidUpdate()
    // ! Do it here because there can be delay between snapshot() and didUpdate()
    return null;
  }

  componentDidCatch(error: Error, info: any) {
    console.log('did catch');
    // ! Do not setState here - will be depracated in the future instead call setState in getDerivedStateFromError
  }

  componentDidMount() {
    console.log('did mount');
    // Same use case as useEffect - fetch, subscribe, etc.
    // ! Use with caution - immidiate setState will update before screen updates
  }

  shouldComponentUpdate() {
    console.log('should update');
    return true;
  }

  componentWillUnmount() {
    console.log('will unmount');
    // ! No setState calls
    // ! Only lifecycle method called in SSR
  }

  // ! Preffer PureComponent if possible
  componentDidUpdate(prevProps: t_props, prevState: i_state, snapshot: any) {
    console.log('did update');
    console.log(snapshot);
    // Same use case as useEffect with deps - fetch, subscribe, etc.
    // ! SetState in condition, otherwise inifite loop
  }

  updateCount() {
    this.setState((state) => ({ count: state.count + 1 }));
  }

  updateCount1 = () => this.updateCount();

  updateCount2() {
    this.updateCount();
  }

  updateCount3() {
    this.updateCount();
  }

  handleSomething() {
    // ! flushSync() works here too
  }

  btnStyle: CSSProperties = {
    marginRight: '1rem'
  };

  render() {
    const T = this;
    const P = T.props;
    const $ = T.state;

    console.log('render');

    if ($.hasError) return <p>D'oh! Something went wrong.</p>;

    return (
      <div>
        <p>{P.msg}</p>
        <button onClick={T.updateCount1} style={this.btnStyle}>
          Count {$.count}
        </button>
        <button onClick={() => T.updateCount2()} style={this.btnStyle}>
          Count {$.count}
        </button>
        <button onClick={T.updateCount2.bind(this)} style={this.btnStyle}>
          Count {$.count}
        </button>
        <button onClick={T.updateCount3} style={this.btnStyle}>
          Count {$.count}
        </button>
        <button
          onClick={() => {
            // ! Wont trigger shouldComponentUpdate
            T.forceUpdate();
          }}
        >
          Force update
        </button>
      </div>
    );
  }
}

// ClassComponent.defaultProps;
// ClassComponent.displayName

class MyPureComponent extends PureComponent {
  render() {
    return <div></div>;
  }
}
