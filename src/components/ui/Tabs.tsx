import React, { FC } from "react";
import { NavLink } from "react-router-dom";

interface ILink {
  title: string;
  path: string;
  id: number;
}

interface Props {
  className?: string;
  items?: ILink[];
}

const Tabs: FC<Props> = ({ className, items }) => {
  return (
    <div
      className={`flex gap-6 border-b border-border pb-[0.5px] ${className}`}
    >
      {items?.map((item: ILink) => (
        <NavLink
          className={`hover:text-text text-text-muted custom-tab-link`}
          to={item.path}
          key={item.id}
          end={item.id === 0}
        >
          {item.title}
        </NavLink>
      ))}
    </div>
  );
};

export default React.memo(Tabs);
