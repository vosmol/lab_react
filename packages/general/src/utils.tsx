import { Link } from 'react-router-dom';
import { CSSProperties } from 'react';

export const GenerateRouteLinks = ({
  routes,
  styles
}: {
  routes: { [key: string]: string };
  styles?: CSSProperties;
}) => {
  if (Object.keys(routes).length === 0) return null;

  return (
    <>
      {Object.entries(routes).map(([name, path]) => (
        <Link key={name} to={path}>
          <span
            style={{
              marginRight: '1rem',
              marginBottom: '0.5rem',
              display: 'inline-block',
              ...styles
            }}
          >
            {name}
          </span>
        </Link>
      ))}
    </>
  );
};
