import { useState, forwardRef, useImperativeHandle } from "react";



const Togglable = forwardRef((props,refs) => {
    const [loginVisible, setLoginVisible] = useState(false)
    
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    const toggleVisibility = () => {
        setLoginVisible(!loginVisible)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={showWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={hideWhenVisible}>

                <button onClick={toggleVisibility} >cancel</button>
            {props.children}
            </div>
        </div>
    )
})




export default Togglable