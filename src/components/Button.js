const Button = ({value, theme, isAction, handleClick}) => {
    return <button onClick={() => handleClick(value)} className={`btn btn-${isAction ? 'action-' : ''}${theme}`}>{value}</button>
}

export default Button;