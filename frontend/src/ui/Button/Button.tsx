import { Button as ButtonComponent, ButtonProps } from "@gravity-ui/uikit";
import cn from "classnames";
import styles from "./styles.module.css";
import { Spin } from "../Spin";

interface IButtonProps extends ButtonProps {}

export const Button = (props: IButtonProps) => {
  const { className, loading, view, children, ...restProps } = props;
  let content = children;
  if (loading) content = <Spin size="s" />;
  return (
    <ButtonComponent
      className={cn(styles.default, className, {
        [styles.main]: view === "action",
      })}
      children={content}
      {...restProps}
    />
  );
};
