import cn from 'classnames';
import styles from './styles.module.css'
import { PropsWithChildren, ReactNode } from "react";

export interface ILayoutProps extends PropsWithChildren{
    className?:string;
    top?: ReactNode;
    contentClassName?:string;
}

export const Layout = (props:ILayoutProps)=>{
    const {className, children, top,contentClassName} = props;
    return <div className={cn(className, styles.layout)}>

        {top ? <div className={styles.top}>{top}</div> : null}

        <div className={cn(contentClassName, styles.content)}>
            {children}
        </div>
    </div>
}