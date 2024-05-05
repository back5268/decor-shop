import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { ListItem } from '@material-tailwind/react';
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavItem = (props) => {
  const { children, item = {}, className = '', ...prop } = props;
  const { pathname } = useLocation();
  const Item = item.icon;

  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex((id) => id === item.id);
      console.log(currentIndex);
    // if (currentIndex >= 0) {
    //   setIsOpen(item.id);
    // }
  }, [pathname]);

  return (
    <Link to={item.to}>
      <ListItem
        {...prop}
        className={`hover:bg-hover-sidebar focus:bg-hover-sidebar
    active:bg-hover-sidebar hover:text-on-sidebar focus:text-on-sidebar active:text-on-sidebar p-2 ${className}`}
      >
        {children ? (
          children
        ) : (
          <>
            <div className="grid place-items-center mr-4">
              {item.icon ? (
                <Item strokeWidth={3} className="h-5 w-5" />
              ) : (
                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
              )}
            </div>
            <span className="block antialiased text-sm leading-6 text-inherit mr-auto font-normal">{item.label}</span>
          </>
        )}
      </ListItem>
    </Link>
  );
};

export default NavItem;
