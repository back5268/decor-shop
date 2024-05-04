import React from 'react';

const MultiRadioz = (props) => {
  const { name, options = [], optionValue, optionLabel, ...prop } = props;

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
            <ListItem className="p-0">
              <label htmlFor={key} className="flex w-full cursor-pointer items-center px-3 py-2">
                <ListItemPrefix className="mr-3">
                  <Radio
                    name={name}
                    id={key}
                    ripple={false}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: 'p-0'
                    }}
                    {...prop}
                  />
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium text-blue-gray-400">
                  React.js
                </Typography>
              </label>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};

export default MultiRadioz;
