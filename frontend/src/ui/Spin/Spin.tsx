import { Spin as SpinComponent, SpinProps } from "@gravity-ui/uikit";
import cn from "classnames";

interface ISpinProps extends SpinProps {}

export const Spin = (props: ISpinProps) => {
  const { className, ...restProps } = props;
  return (
    <div className="min-w-max min-h-max flex-grow flex-shrink-0 flex py-20 justify-center items-center">
      <SpinComponent size="xl" className={cn("", className)} {...restProps} />
    </div>
  );
};
