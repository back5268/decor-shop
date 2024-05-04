import { Chip } from '@material-tailwind/react';
import React from 'react';

const Chipz = (props) => {
  const { label, ...prop } = props;
  return <Chip color="blue" value={label} />;
};

export default Chipz;
