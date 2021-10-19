import React, { useState, useContext, useEffect } from 'react' 
import { useQuery, useMutation, useApolloClient, useSubscription } from '@apollo/client' 
import { EVENTS, BOOK_EVENT, CREATE_EVENT, EVENT_ADDED } from '../queries'
import EventItem from '../components/EventItem' 
import Modal from '../components/Modal' 
import Backdrop from '../components/Backdrop' 
import AuthContext from '../context/auth-context' 
import { NavLink } from 'react-router-dom' 
import Error from '../components/Error' 
import Spinner from '../components/Spinner' 

export default function EventsPage() {
    const [events, setEvents] = useState([]) 
    const [selectedEvent, setSelectedEvent] = useState(null) 
    const value = useContext(AuthContext) 
    const [alert, setAlert] = useState('') 
    const [modelAlert, setModelAlert] = useState('') 
    const [creating, setCreating] = useState(false) 
    const [title, setTitle] = useState("") 
    const [price, setPrice] = useState("") 
    const [date, setDate] = useState("") 
    const [description, setDescription] = useState("") 
    const client = useApolloClient() 

    useSubscription(EVENT_ADDED, {
        onSubscriptionData: async ({ subscriptionData }) => {
            if (subscriptionData.data) {
                const addedEvent = subscriptionData.data.eventAdded 
                setAlert(`حدث جديد بعنوان: ${addedEvent.title}، أُضيف للتو`) 
                window.scrollTo(0, 0)
            }
            if (subscriptionData.errors) setAlert("خطأ في جلب الأحداث الجديدة") 
        }
    })

    function EventList() {
        const { loading, error, data } = useQuery(EVENTS, {
            onCompleted: () => setEvents(data.events)
        }) 
        if (loading) { return <Spinner /> }
        if (error) { 
            setAlert(error.message)
            return;  
        }

        client.refetchQueries({
            include: "active",
        }) 

        return (
            <ul className='events-list'>
                {data.events.map(event => (
                    <EventItem
                        key={event._id}
                        {...event}
                        userId={value.userId}
                        onDetail={showDetailHandler}
                    />
                ))}
            </ul>
        ) 
    } 

    const [bookEventHandler] = useMutation(BOOK_EVENT, {
        onError: (error) => {
            setSelectedEvent(null) 
            setAlert(error.message)
            window.scrollTo(0, 0)
        },
        onCompleted: () => {
            setSelectedEvent(null) 
            setAlert("تم حجز الحدث بنجاح") 
            window.scrollTo(0, 0)
        }
    }) 

    const [eventConfirmHandler, { createEventLoading, createEventError, data }] = useMutation(CREATE_EVENT, {
        onCompleted: () => {
            setCreating(false) 
            setAlert("تم إضافة الحدث بنجاح") 
            window.scrollTo(0, 0)
        },
    }) 

    useEffect(() => {
        if (!createEventLoading && !createEventError && data) {
            setEvents([
                ...events,
                { ...data.createEvent, creator: { _id: value.userId } },
            ]) 
        }
    }, [data, createEventLoading, createEventError, value.userId]) // eslint-disable-line

    if (createEventLoading) { return <Spinner /> }

    const showDetailHandler = eventId => {
        const clickedEvent = events.find(event => event._id === eventId) 
        setSelectedEvent(clickedEvent) 
    } 

    return (
        <React.Fragment>
            {value.token && <Error error={alert} />}
            {(creating || selectedEvent) && <Backdrop />}
            {creating && (
                <Modal
                    title='إضافة حدث'
                    onCancel={() => {
                        setCreating(false) 
                        setAlert("") 
                        setModelAlert("") 
                    }}
                    onConfirm={() => {
                        if (
                            title.trim().length === 0 ||
                            price <= 0 ||
                            date.trim().length === 0 ||
                            description.trim().length === 0
                        ) {
                            setModelAlert("يجب ملئ جميع الحقول بالشكل الصحيح!") 
                            return 
                        }
                        eventConfirmHandler(
                            { variables: { title: title, price: +price, date: date, description: description } }
                        ) 
                        setTitle("") 
                        setPrice("") 
                        setDate("") 
                        setDescription("") 
                    }}
                    confirmText='تأكيد'
                >
                    <form>
                        <Error error={modelAlert} />
                        <div className='form-control'>
                            <label htmlFor='title'>العنوان</label>
                            <input
                                required
                                type='text'
                                id='title'
                                value={title}
                                onChange={({ target }) => setTitle(target.value)}
                            />
                        </div>
                        <div className='form-control'>
                            <label htmlFor='price'>السعر</label>
                            <input
                                required
                                type='number'
                                id='price'
                                value={price}
                                onChange={({ target }) => setPrice(target.value)}
                            />
                        </div>
                        <div className='form-control'>
                            <label htmlFor='date'>التاريخ</label>
                            <input
                                required
                                type='datetime-local'
                                id='date'
                                value={date}
                                onChange={({ target }) => setDate(target.value)}
                            />
                        </div>
                        <div className='form-control'>
                            <label htmlFor='description'>التفاصيل</label>
                            <textarea
                                required id='description'
                                rows='3'
                                value={description}
                                onChange={({ target }) => setDescription(target.value)}
                            />
                        </div>
                    </form>
                </Modal>
            )}
            {selectedEvent && (
                <Modal
                    title='حجز الحدث'
                    onCancel={() => {
                        setCreating(false) 
                        setSelectedEvent(false) 
                        setAlert("") 
                    }}
                    onConfirm={() => {
                        bookEventHandler({ variables: { eventId: selectedEvent._id } }) 
                    }}
                    confirmText={value.token ? 'احجز' : <NavLink to='/login'>سجل دخول لتحجز</NavLink>}
                    isDisabled = {selectedEvent.creator._id === value.userId ? true : false }
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
                    <button className='btn' onClick={() => setCreating(true)}>
                        إنشاء حدث
                    </button>
                </div>
            )}
            <div>
                <h2>الأحداث من حولك!!</h2>
                <EventList />
            </div>
        </React.Fragment>
    ) 
}
