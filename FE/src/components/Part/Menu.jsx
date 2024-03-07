import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Menu = ({ handleClick }) => {
    return (
        <div className='' onClick={handleClick}>
            <FontAwesomeIcon icon={faBars} className="text-yellow-900 dark:text-orange-200 text-2xl p-3 rounded-full ml-10 hover:bg-yellow-900 dark:hover:bg-yellow-600 hover:text-orange-200 hover:cursor-pointer drop-shadow-xl" />
        </div>
    )
}

export default Menu