import React, { useContext } from 'react' 
import AuthContext from '../context/auth-context' 
import ReactTooltip from 'react-tooltip';

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
                {value.userId === creator._id ? (
                    <>
                    <p data-tip={description}>أنت صاحب هذا الحدث</p>
                    <ReactTooltip place="bottom" />
                    </>
                ) : (
                    <button  className='btn' onClick={() => onDetail(_id)}>
                        عرض التفاصيل
                    </button>
                )}
            </div>
        </li>
    ) 
}

