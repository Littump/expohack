import {Text as TextComponent, TextProps} from '@gravity-ui/uikit';
import cn from 'classnames';
import styles from './styles.module.css'
import { PropsWithChildren } from 'react';

interface ITextProps extends Omit<TextProps, 'variant'>, PropsWithChildren{
    variant?:'xl'| 'l' | 'm' | 's' | 'xs';
    isBold?:boolean;
}

export const Text = (props:ITextProps)=>{

    const {variant = 's', isBold, className, ...restProps} = props;

    return <TextComponent 
            className={cn(styles.text, 
            className, 
            [styles[`text_${variant}`]], 
            {[styles.text_bold]: isBold,
            [styles.text_default]: !isBold})} 
            {...restProps}
            />
}