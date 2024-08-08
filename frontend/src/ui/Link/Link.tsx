import { NavLink as NavLinkComponent, NavLinkProps } from "react-router-dom";
import cn from "classnames";
import styles from "./styles.module.css";

interface ILink extends NavLinkProps {
  isBold?: boolean;
  isTransition?: boolean;
}

export const Link = (props: ILink) => {
  const {
    isBold = false,
    isTransition = true,
    className,
    ...restProps
  } = props;

  return (
    <NavLinkComponent
      className={({ isActive, isPending }) => {
        return cn(
          styles.link,
          {
            [styles.link_bold]: isBold,
            [styles.link_transition]: isTransition,
            [styles.link_active]: isActive || isPending,
          },
          className
        );
      }}
      {...restProps}
    ></NavLinkComponent>
  );
};
