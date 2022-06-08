import {
  Children,
  cloneElement,
  createElement,
  createFactory,
  FC,
  forwardRef,
  Fragment,
  isValidElement,
  Profiler,
  PropsWithChildren,
  useEffect,
  useRef,
  version
} from 'react';

const keep = [
  // Legacy
  createFactory
];

export const Section_Other = () => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    console.log('forwardedRef:', ref.current);
  }, []);

  return (
    <Profiler id="profiler" onRender={(...props) => console.dir(props)}>
      <Fragment>
        <>
          {createElement('pre', { className: 'heading' }, [
            'react ',
            'version ',
            version
          ])}
        </>
        <Button ref={ref} />
        <Wrapper headComponent={<>h</>}>
          <div>A</div>
          <div id="B">B</div>
          {[
            <div key="c">C</div>,
            [<div key="d">D</div>, <div key="e">E</div>, <div key="f">F</div>],
            <div key="g">G</div>,
            <div key="h">H</div>
          ]}
          <>
            <div>CH</div>
            <div>I</div>
          </>
        </Wrapper>
        <Wrapper headComponent={<div />}>{null}</Wrapper>
        <Wrapper headComponent={<div />}></Wrapper>
        <Wrapper headComponent={<div />} singleChild>
          <div></div>
        </Wrapper>
      </Fragment>
    </Profiler>
  );
};

const Button = forwardRef<HTMLButtonElement>((props, ref) => {
  return <button ref={ref}>Button</button>;
});

const Wrapper: FC<
  PropsWithChildren<{ headComponent: any; singleChild?: boolean }>
> = ({ children, headComponent, singleChild }) => {
  if (!isValidElement(headComponent)) {
    throw new Error('Head component is not valid react element');
  }

  if (singleChild) Children.only(children);

  useEffect(() => {
    console.log('child count:', Children.count(children));

    Children.forEach(children, (ch) => {
      console.log('child:', ch);
    });
  }, [children]);

  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        marginTop: '2rem'
      }}
    >
      <div>{children}</div>
      <div>
        {Children.map(children, (ch) =>
          isValidElement(ch)
            ? cloneElement(ch, { className: 'pizzatime' }, '#')
            : null
        )}
      </div>
      <div>{Children.toArray(children).slice(0, 2)}</div>
    </div>
  );
};
