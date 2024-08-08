import { Button as ButtonComponent, ButtonProps } from "@gravity-ui/uikit"
import cn from 'classnames';
import styles from './styles.module.css'

interface IButtonProps extends ButtonProps{
    
}

export const Button = (props:IButtonProps)=>{
    const {className, view, ...restProps} = props;
    return <ButtonComponent className={cn(styles.default, className, {[styles.main]: view === 'action'}) } {...restProps}/>
}