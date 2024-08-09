import { Modal as ModalComponent, ModalProps } from "@gravity-ui/uikit";
import cn from "classnames";
import { ReactNode, useCallback, useState } from "react";
import { Text } from "../Text";
import { Button } from "../Button";

interface IModalProps extends ModalProps {
  modalClassName?: string;
  buttonContent?: ReactNode;
  title?: string;
}

export const Modal = (props: IModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    className,
    children,
    title,
    buttonContent,
    modalClassName,
    ...restProps
  } = props;

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <>
      <Button className={className} onClick={handleOpen}>
        {buttonContent ?? "Открыть"}
      </Button>
      <ModalComponent
        open={isOpen}
        onClose={handleClose}
        contentClassName={cn(
          "min-h-[300px] md:min-w-[400px] max-w-[90vw] md:max-w-[1000px] text-green-500 flex flex-col gap-[20px] px-[40px] py-[40px] rounded-xl !important",
          modalClassName
        )}
        {...restProps}
      >
        {title ? (
          <Text variant="m" isBold>
            {title}
          </Text>
        ) : (
          ""
        )}
        {children}
      </ModalComponent>
    </>
  );
};
