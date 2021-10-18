import React, { useContext } from 'react'
import AuthContext from '../context/auth-context'

export default function EventItem({ _id, title, price, date, description, creator, onDetail }) {
    const value = useContext(AuthContext)

    return (
        <li className='events-list-item'>
            <div>
                <h1>{title}</h1>
                <h2>
                    ${price} - {new Date(date).toLocaleDateString()}
                </h2>
            </div>
            <div>
                <button className='btn' onClick={() => onDetail(_id)}>
                    {value.userId === creator._id ? "أنت صاحب هذا الحدث" : "عرض التفاصيل"}
                </button>
            </div>
        </li>
    )
}

