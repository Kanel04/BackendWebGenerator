import { Link } from "react-router-dom"

export const Button = (props) => {
    return <button {...props} className="px-4 py-3 bg-blue-400 rounded-md text-white">{props.children}</button>
}

export const LinkButton = (props) => {
    return <Link to={props.page}>
        <span className="px-4 py-3 bg-blue-400 rounded-md text-white inline-block">{props.children}</span>
    </Link>
}