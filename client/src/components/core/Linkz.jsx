import React from 'react';
import { Link } from 'react-router-dom';

const Linkz = (props) => {
  const { label, children, to, ...prop } = props;
  return (
    <Link to={to} className="text-sm font-medium leading-none text-primary" { ...prop}>
      {label || children}
    </Link>
  );
};

export default Linkz;
