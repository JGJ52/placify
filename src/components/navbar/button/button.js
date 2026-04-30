import "./button.css";

export default function Button({ onClick, href, children, background }) {
    const className = background === true ? "navbar-button navbar-button-background" : "navbar-button";

    if (href) {
        return (
            <>
                <a href={href} className={className}>{children}</a>
            </>
        )
    }

    return (
        <>
            <button onClick={onClick} className={className}>{children}</button>
        </>
    )
}