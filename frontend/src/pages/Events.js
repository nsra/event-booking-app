import React, { useState, useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { EVENTS, BOOK_EVENT } from '../queries'
import EventItem from '../components/EventItem';
import Modal from '../components/Modal';
import Backdrop from '../components/Backdrop';
import AuthContext from '../context/auth-context';
import { NavLink } from 'react-router-dom';

export default function EventsPage() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const value = useContext(AuthContext);

    function EventList() {
        const { loading, error, data } = useQuery(EVENTS, {
            onCompleted: () => setEvents(data.events)
        });

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        return (
            <ul className='events__list'>
                {events.map(event => (
                    <EventItem
                        key={event._id}
                        {...event}
                        onDetail={showDetailHandler}
                    />
                ))}
            </ul>
        );
    }

    const [bookEventHandler] = useMutation(BOOK_EVENT, {
        onError: (error) => {
            setSelectedEvent(null);
            console.log(error.message)
        },
        onCompleted: () => {
            setSelectedEvent(null);
            console.log("تم حجز الحدث بنجاح");
        }
    });

    const showDetailHandler = eventId => {
        const clickedEvent = events.find(event => event._id === eventId);
        setSelectedEvent(clickedEvent);
    };

    return (
        <div>
            {selectedEvent && <Backdrop />}
            {selectedEvent && (
                <Modal
                    title='حجز الحدث'
                    onCancel={() => {
                        // setCreating(false);
                        setSelectedEvent(null);
                        // setAlert("");
                    }}
                    onConfirm={() => {
                        bookEventHandler({ variables: { eventId: selectedEvent._id } });
                    }}
                    confirmText={value.token ? 'احجز' : <NavLink to='/auth'>سجل دخول لتحجز</NavLink>}
                >
                    <h1>{selectedEvent.title}</h1>
                    <h2>
                        ${selectedEvent.price} -{' '}
                        {new Date(selectedEvent.date).toLocaleDateString()}
                    </h2>
                    <p>{selectedEvent.description}</p>
                </Modal>
            )}
            {value.token && (
                <div className='events-control'>
                    <h2>شارك أحداثك الخاصة!</h2>
                    <button className='btn'>
                        إنشاء حدث
                    </button>
                </div>
            )}
            <div>
                <h2>الأحداث من حولك!!</h2>
                <EventList />
            </div>
        </div>
    )
}