import React from "react";

const Input = (props) => {
    const {type, id, value, onChange, onBlur} = props;
    return (
        <input type={type} id={id} value={value} onChange={onChange} onBlur={onBlur} />
    )
} 

export default Input;