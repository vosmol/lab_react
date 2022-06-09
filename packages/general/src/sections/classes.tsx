import React, { Component, CSSProperties } from 'react';

export class Section_Classes extends Component {
  render() {
    return <ClassComponent msg="Hello" />;
  }
}

interface i_state {
  count: number;
}

type t_props = {
  msg: string;
};

// go through https://reactjs.org/docs/react-component.html

class ClassComponent extends Component<t_props, i_state> {
  constructor(props: t_props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  static getDerivedStateFromProps() {}

  componentWillMount() {
    console.log('will mount');
  }

  componentDidMount() {
    console.log('did mount');
  }

  // shouldComponentUpdate() {}

  componentWillUpdate() {
    console.log('will update');
  }

  componentWillReceiveProps() {
    console.log('will rec props');
  }

  componentWillUnmount() {
    console.log('will unmount');
  }

  componentDidUpdate() {
    console.log('did update');
  }

  updateCount() {
    this.setState({ count: this.state.count + 1 });
  }

  updateCount1 = () => this.updateCount();

  updateCount2() {
    this.updateCount();
  }

  btnStyle: CSSProperties = {
    marginRight: '1rem'
  };

  render() {
    const T = this;
    const P = T.props;
    const $ = T.state;

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
      </div>
    );
  }
}

// class PureComponent extends PureComponent {}
