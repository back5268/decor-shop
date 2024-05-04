import { Textarea } from '@material-tailwind/react';
import React from 'react';

const TextAreaz = (props) => {
  const { ...prop } = props;
  return <Textarea label="Message" {...prop} />;
};

export default TextAreaz;
