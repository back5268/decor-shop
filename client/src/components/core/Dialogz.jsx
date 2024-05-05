import { Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import React from 'react';

const Dialogz = (props) => {
  const { children, footer, header, open, setOpen, ...prop } = props;

  return (
    <Dialog open={open} handler={() => setOpen(!open)} {...prop}>
      {header && <DialogHeader>{header}</DialogHeader>}
      <DialogBody>{children}</DialogBody>
      {footer && <DialogFooter>{footer}</DialogFooter>}
    </Dialog>
  );
};

export default Dialogz;
