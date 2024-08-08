import { Link } from "react-router-dom"

export const ErrorPage = ()=>{
    return <div className="">
        Ошибка
        <Link to="/">Вернуться на главную</Link>
    </div>
}