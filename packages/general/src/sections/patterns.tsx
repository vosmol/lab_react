import {
  ComponentType,
  FC,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useRenderTrigger } from './hooks/custom';

export const Section_Patterns = () => {
  return (
    <div>
      <h4>Patterns</h4>
      <RenderProp />
      <HigherOrderComponent />
    </div>
  );
};

type t_pokemon = {
  name: string;
  height: number;
  weight: number;
};

type t_species = {
  count: number;
  results: Array<{
    name: string;
  }>;
};

const RenderProp = () => {
  const { trigger } = useRenderTrigger();

  return (
    <div>
      <h4>Render prop</h4>
      <button onClick={trigger}>Rerender</button>
      <Fetch url="https://pokeapi.co/api/v2/pokemon/ditto">
        {({
          fetch,
          isSuccess,
          isLoading,
          isError,
          data
        }: t_fetchProps<t_pokemon>) => {
          if (isLoading) return <Loading msg="pokemon ..." />;
          if (isError) return <Error />;
          if (isSuccess) {
            return (
              <div>
                <h5>{data.name}</h5>
                <p>weight: {data.weight}</p>
                <p>height: {data.height}</p>
              </div>
            );
          }
          return (
            <button onClick={fetch} style={{ marginTop: '1rem' }}>
              Load pokemon
            </button>
          );
        }}
      </Fetch>
      <Fetch url="https://pokeapi.co/api/v2/pokemon-species/?limit=10">
        {({
          fetch,
          isSuccess,
          isLoading,
          isError,
          data
        }: t_fetchProps<t_species>) => {
          if (isLoading) return <Loading msg="species ..." />;
          if (isError) return <Error />;
          if (isSuccess) {
            return (
              <div>
                <h5>Species</h5>
                <p>
                  <b>Total: {data.count}</b>
                </p>
                {data.results.map(({ name }) => (
                  <p key={name}>{name}</p>
                ))}
              </div>
            );
          }
          return (
            <button onClick={fetch} style={{ marginTop: '1rem' }}>
              Load species
            </button>
          );
        }}
      </Fetch>
    </div>
  );
};

const Loading: FC<{ msg?: string }> = ({ msg }) => {
  return <p>Loading {msg}</p>;
};

const Error = () => {
  return <p>Error</p>;
};

type t_state = 'loading' | 'error' | 'success' | 'initial';

type t_fetchProps<T = any> = {
  state: t_state;
  data: T;
  fetch: () => Promise<T>;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
};

const Fetch: FC<{
  url: string;
  children: (props: t_fetchProps) => ReactNode;
}> = memo(({ url, children }) => {
  const [state, setState] = useState<t_state>('initial');
  const [data, setData] = useState(undefined);

  const handleFetch = useCallback(async () => {
    try {
      setState('loading');
      const r = await fetch(url);
      const data = await r.json();
      await new Promise((res) => {
        setTimeout(() => {
          res(true);
        }, 1000);
      });
      setData(data);
      setState('success');
    } catch (error) {
      setState('error');
    }
  }, [url]);

  const props = useMemo(
    () => ({
      fetch: handleFetch,
      isLoading: state === 'loading',
      isError: state === 'error',
      isSuccess: state === 'success',
      data,
      state
    }),
    [handleFetch, state]
  );

  return <div>{children(props)}</div>;
});

Fetch.displayName = 'Fetch';

const HigherOrderComponent = () => {
  return (
    <div>
      <h4>HOC</h4>
      <Clock msg="Customer 142" />
    </div>
  );
};

type t_time = { h: number; m: number; s: number; full: string };

type t_regularCompProps = i_timeProps & { msg: string };

const TimeWithMsg: FC<t_regularCompProps> = ({ msg, updateTime, time }) => {
  useEffect(() => {
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [updateTime]);

  return (
    <div>
      <p>
        <b>{time.full}</b>
      </p>
      <p>{msg}</p>
    </div>
  );
};

const Clock = withTime(TimeWithMsg);

interface i_timeProps {
  getTime: () => t_time;
  updateTime: () => void;
  time: t_time;
}

function withTime<T extends i_timeProps>(Component: ComponentType<T>) {
  return (hocProps: Omit<T, keyof i_timeProps>) => {
    const getTime: () => t_time = useCallback(() => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();
      const s = now.getSeconds();

      return {
        h,
        m,
        s,
        full: `${('00' + h).slice(-2)}:${('00' + m).slice(-2)}:${(
          '00' + s
        ).slice(-2)}`
      };
    }, []);

    const [time, setTime] = useState(() => getTime());

    const updateTime = useCallback(() => {
      setTime(getTime());
    }, []);

    const props = useMemo(
      () => ({ getTime, updateTime, time, ...hocProps }),
      [getTime, updateTime, time, hocProps]
    );

    return <Component {...(props as T)} />;
  };
}
