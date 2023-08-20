import classes from "./Button.module.css"
const Button = (props) => {

    return (
            <button 
                className={classes.button} 
                type={props.type || 'button'}
                onClick = {props.onClick}
                style={props.style}
            >
                {props.children}
            </button>
    )
}

export default Button