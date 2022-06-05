import React from 'react';
import nextIcon from '../assets/images/icons/next.svg'
import backIcon from '../assets/images/icons/back.svg'
import PropTypes from 'prop-types'

const IconButton = ({ type, disabled, className, ...props }) => {

    const disabledClass = disabled ? 'opacity-40' : 'opacity-100'

    return (
        <button {...props} className={`${disabledClass} bg-gray-200 rounded-full w-9 h-9 text-gray-600 font-bold ${className || ""}`}>
            <img className='w-5 h-5 m-auto' src={type === "next" ? nextIcon : type === "back" ? backIcon : ""} alt={type === "next" ? ">" : type === "back" ? "<" : ""} />
        </button>
    );
};

IconButton.propTypes = {
    type: PropTypes.oneOf(["next", "back"]).isRequired,
    disabled: PropTypes.bool,
    className: PropTypes.string
}

IconButton.defaultProps = {
    className: ""
}

export default IconButton;