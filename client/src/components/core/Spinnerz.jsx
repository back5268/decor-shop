import { Spinner } from '@material-tailwind/react';
import React from 'react';

const Spinnerz = (props) => {
  const { ...prop } = props;
  return <Spinner color="blue" {...prop} />;
};

export default Spinnerz;
