import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../context/auth-context';

export default function MainNavigation() {
    const value = useContext(AuthContext);
   
    return (
        <header className='main-navigation'>
            <div className='main-navigation-items'>
                <h1>أحداث حسوب</h1>
                <ul>
                    {value.token && (
                        <li>
                            <NavLink to='/bookings'>حجوزاتي</NavLink>
                        </li>
                    )}
                    {!value.token && (
                        <li>
                            <NavLink to='/auth'>تسجيل دخول</NavLink>
                        </li>
                    )}
                    <li>
                        <NavLink to='/events'>الأحداث</NavLink>
                    </li>
                </ul>
            </div>
            {value.token && (
                <button onClick= {value.logout} 
                >تسجيل خروج</button>
            )}

        </header>
    );
}
