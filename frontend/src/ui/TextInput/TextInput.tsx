import {
  TextInput as TextInputComponent,
  TextInputProps,
} from "@gravity-ui/uikit";
import cn from "classnames";
import styles from "./styles.module.css";
import { memo } from "react";

interface ITextInput extends TextInputProps {
  value: string;
  error?: boolean;
}

export const TextInput = memo((props: ITextInput) => {
  const { className, errorMessage, error, ...restProps } = props;

  return (
    <TextInputComponent
      validationState={error ? "invalid" : undefined}
      className={cn(styles.default, className)}
      errorPlacement="inside"
      {...restProps}
    />
  );
});
