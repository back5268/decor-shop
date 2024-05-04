import { Card, CardBody, CardFooter, CardHeader } from '@material-tailwind/react';
import React from 'react';

const Cardz = (props) => {
  const { children, footer, header, className = 'mt-6 w-96' } = props;
  return (
    <Card className={`text-color ${className}`}>
      {header && (  
        <CardHeader color="blue-gray" className="relative h-56">
          {header}
        </CardHeader>
      )}
      <CardBody>{children}</CardBody>
      {footer && <CardFooter className="pt-0">{footer}</CardFooter>}
    </Card>
  );
};

export default Cardz;
