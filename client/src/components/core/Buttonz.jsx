import { Button } from '@material-tailwind/react';
import React from 'react';

const Buttonz = (props) => {
  const { type = 'button', size = "md", label, children, ...prop } = props;
  return (
    <Button type={type} size={size} color="cyan" {...prop}>
      {children || label}
    </Button>
  );
};

export default Buttonz;
