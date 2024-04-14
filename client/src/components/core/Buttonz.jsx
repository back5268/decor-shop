import { Button } from '@components/ui/button';
import React from 'react';
import Loadingz from './Loadingz';

const Buttonz = (props) => {
  const { label, children, type = "button", disabled, loading, ...prop } = props;
  return (
    <Button type={type} disabled={disabled || loading} {...prop}>
      {loading && <Loadingz size={4} severity="neutral" />}
      {label || children}
    </Button>
  );
};

export default Buttonz;
