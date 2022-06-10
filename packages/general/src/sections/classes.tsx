import {
  Component,
  createRef,
  CSSProperties,
  ErrorInfo,
  forwardRef,
  PureComponent,
  RefObject
} from 'react';

// TODO: Add working with context experiment
// TODO: Add pass component as prop experiment

export class Section_Classes extends Component<never, { color: string }> {
  state = {
    color: 'green'
  };

  handle = () => {
    this.setState((state) => ({
      color: state.color === 'green' ? 'red' : 'green'
    }));
  };

  render() {
    return (
      <>
        <button onClick={this.handle}>Rerender</button>
        <MyPureComponent />
        <MyClassComponent msg="Hello" />
      </>
    );
  }
}

type t_modernProps = {
  id: string;
};

interface i_data {
  name: string;
  icon: string;
}

type t_moderState = {
  height: number;
  data: undefined | i_data;
};

type t_snaphshot = {
  takeIntoAccountThisValue: number;
};

class ModernComponent extends Component<t_modernProps, t_moderState> {
  state: t_moderState = {
    height: 0,
    data: undefined
  };

  wrapperRef: RefObject<HTMLDivElement>;
  compRef: RefObject<ReferencedComponent>;
  forwardedRef: RefObject<HTMLDivElement>;

  constructor(props: t_modernProps) {
    super(props);
    this.wrapperRef = createRef();
    this.compRef = createRef();
    this.forwardedRef = createRef();
  }

  timer: number | undefined;

  componentDidMount() {
    this.fetchData();
    this.timer = setInterval(this.tick, 1000);
  }

  getSnapshotBeforeUpdate() {
    const measured = window.scrollY;
    return {
      takeIntoAccountThisValue: measured
    };
  }

  componentDidUpdate(
    prevProps: t_modernProps,
    prevState: t_moderState,
    snapshot: t_snaphshot
  ) {
    console.log('wrapper element', this.wrapperRef.current);
    console.log('component reference', this.compRef.current);
    console.log('forwarded ref to element', this.forwardedRef.current);
    console.log(prevProps.id, this.props.id);
    if (prevProps.id !== this.props.id) this.fetchData();
    console.log(snapshot);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const $ = this.state;
    return (
      <div ref={this.wrapperRef}>
        <p>Modern</p>
        <ReferencedComponent ref={this.compRef} />
        <ForwardedRefComponent ref={this.forwardedRef} msg="wroom" />
        {$.data ? (
          <div>
            <span>
              {$.data.name} {$.data.icon}
            </span>
          </div>
        ) : (
          <p>Loading ...</p>
        )}
      </div>
    );
  }

  // ==================
  // Methods
  // ==================

  tick() {
    console.log('tick');
  }

  async fetchData() {
    try {
      const data = await new Promise<i_data>((res) =>
        setTimeout(
          () => res({ name: `Jane ${this.props.id}`, icon: '🏄‍♀️' }),
          1000
        )
      );

      this.setState({ data });
    } catch (e) {}
  }
}

class ReferencedComponent extends PureComponent {
  render() {
    return <div>ref</div>;
  }
}

type t_fwdProps = {
  msg: string;
};

const ForwardedRefComponent = forwardRef<HTMLDivElement, t_fwdProps>(
  (props, ref) => {
    class Component extends PureComponent<t_fwdProps> {
      constructor() {
        super(props);
      }

      render() {
        const { msg } = this.props;
        return <div ref={ref}>Forward {msg}</div>;
      }
    }

    return <Component {...props} />;
  }
);

class MyPureComponent extends PureComponent {
  render() {
    console.log('pure render');
    return <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>Pure</div>;
  }
}

type t_errBoundaryProps = {};

type t_errBoundaryState = {
  hasError: boolean;
  renderFaulty: boolean;
};

const defaultState: t_errBoundaryState = {
  hasError: false,
  renderFaulty: false
};

const logService = {
  logError: (err: Error, info: ErrorInfo, ...other: any[]) => {}
};

class ErrorBoundary extends Component<t_errBoundaryProps, t_errBoundaryState> {
  state = defaultState;

  static getDerivedStateFromError(): Partial<t_errBoundaryState> {
    return {
      hasError: true
    };
  }

  componentDidCatch(err: Error, info: ErrorInfo) {
    logService.logError(err, info, this.state, this.props);
    console.warn('error occured');
  }

  triggerError = () => {
    this.setState({
      renderFaulty: true
    });
  };

  recoverError = () => {
    this.setState({
      ...defaultState
    });
  };

  render() {
    const t = this;
    const $ = this.state;

    if ($.hasError)
      return (
        <div>
          <p>Arrrgh! Something went wrong.</p>
          <button onClick={t.recoverError}>Retry</button>
        </div>
      );

    return (
      <>
        <button onClick={t.triggerError}>Trigger error</button>
        {$.renderFaulty ? <FaultyComponent /> : null}
      </>
    );
  }
}

class FaultyComponent extends PureComponent {
  render() {
    throw new Error();
    return null;
  }
}

interface i_state {
  count: number;
}

type t_props = {
  msg: string;
};

/*
	https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
	---
	! No side effects before render() call
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

    // ! use constructor only for initializing local state and...
    this.state = {
      count: 0
    };

    // ! ...and binding of event handler methods
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
	return (VALUE_TO_UPDATE_STATE) like {hasError:true}
  }*/

  /* getSnapshotBeforeUpdate() {
    Simillar use case to useLayoutEffect - read DOM and return value used by componentDidUpdate()
    ! Do it here because there can be delay between snapshot() and didUpdate()
    return null;
  }*/

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
    const { msg } = this.props;
    const t = this;
    const $ = this.state;

    console.log('render');

    return (
      <>
        <div>
          <p>{msg}</p>
          <button onClick={t.updateCount1} style={t.btnStyle}>
            Count {$.count}
          </button>
          <button onClick={() => t.updateCount2()} style={t.btnStyle}>
            Count {$.count}
          </button>
          <button onClick={t.updateCount2.bind(t)} style={t.btnStyle}>
            Count {$.count}
          </button>
          <button onClick={t.updateCount3} style={t.btnStyle}>
            Count {$.count}
          </button>
          <button
            onClick={() => {
              // ! Wont trigger shouldComponentUpdate
              t.forceUpdate();
            }}
          >
            Force update
          </button>
        </div>
        <div style={{ marginTop: '2rem' }}>
          <ErrorBoundary />
        </div>
        <div style={{ marginTop: '2rem' }}>
          <ModernComponent id={String($.count)} />
        </div>
      </>
    );
  }
}

// ClassComponent.defaultProps;
// ClassComponent.displayName
