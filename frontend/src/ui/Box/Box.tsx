import { Box as BoxComponent, BoxProps } from "@gravity-ui/uikit"
import cn from 'classnames';
import styles from './styles.module.css'

interface IBoxProps extends BoxProps{
    
}

export const Box = (props:IBoxProps)=>{
    const {className, ...restProps} = props;
    return <BoxComponent className={cn(styles.box, className) } {...restProps}/>
}