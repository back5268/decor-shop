import { Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import React from 'react';

const Dialogz = (props) => {
  const { children, footer, header, open, setOpen, ...prop } = props;
  const handleOpen = () => setOpen(!open);

  return (
    <Dialog open={open} handler={handleOpen} {...prop}>
      <DialogHeader>{header}</DialogHeader>
      <DialogBody>{children}</DialogBody>
      <DialogFooter>{footer}</DialogFooter>
    </Dialog>
  );
};

export default Dialogz;
