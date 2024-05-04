import { Card, CardHeader } from '@material-tailwind/react';
import React from 'react';

const Cardz = (props) => {
  const { children, footer, header } = props;
  return (
    <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        {header}
      </CardHeader>
      <CardBody>{children}</CardBody>
      <CardFooter className="pt-0">{footer}</CardFooter>
    </Card>
  );
};

export default Cardz;
