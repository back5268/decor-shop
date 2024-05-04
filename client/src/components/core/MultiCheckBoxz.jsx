import { Card, List, ListItem, ListItemPrefix, Typography } from '@material-tailwind/react';
import React from 'react';

const MultiCheckBoxz = (props) => {
  const { options = [], optionValue, optionLabel, ...prop } = props;

  return (
    <Card className="w-full max-w-[24rem]">
      <List className="flex-row">
        {options.map((item) => {
          let key, text;
          if (typeof item === 'object') {
            key = item[optionValue];
            text = item[optionLabel];
          } else key = text = item;
          return (
            <ListItem key={key} className="p-0">
              <label htmlFor={key} className="flex w-full cursor-pointer items-center px-3 py-2">
                <ListItemPrefix className="mr-3">
                  <Checkbox
                    id={key}
                    ripple={false}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: 'p-0'
                    }}
                    {...prop}
                  />
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium">
                  {text}
                </Typography>
              </label>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};

export default MultiCheckBoxz;
