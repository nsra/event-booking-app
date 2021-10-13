import React, { useState, useEffect, useContext } from 'react';
import Spinner from '../components/Spinner';
import { BOOKINGS, CANCEL_BOOKING } from '../queries';
import BookingItem from '../components/BookingItem';
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import Error from '../components/Error';
import AuthContext from '../context/auth-context';

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [alert, setAlert] = useState("");
    let canceledBooking = "";
    const client = useApolloClient();

    function BookingsList() {
        const value = useContext(AuthContext);
        const { loading, error, data } = useQuery(BOOKINGS, {
            onError: (error) => setAlert(error.message)
        });

        useEffect(() => {
            if (!loading && !error && data) {
                setBookings(data.bookings)
            }
        }, [data, error, loading]);

        if (error) {
            setAlert(error.message);
            console.log("here");
            return;
        }

        return (
            <React.Fragment>
                <Error error={alert} />
                {loading || cancelBookingLoading ? (
                    <Spinner />
                ) : (
                    <ul className='bookings-list'>
                        {data.bookings.map(booking => (
                            <BookingItem
                                key={booking._id}
                                {...booking}
                                onCancelBooking={() => {
                                    canceledBooking = booking._id
                                    cancelBooking({ variables: { bookingId: canceledBooking } });
                                }}
                            />
                        ))}
                    </ul>
                )}
            </React.Fragment>
        );
    }

    const [cancelBooking, { cancelBookingLoading }] = useMutation(CANCEL_BOOKING, {
        onError: (error) => setAlert(error.message),
        onCompleted: () => {
            setBookings(bookings.filter(booking => booking._id !== canceledBooking))
            setAlert("تم إلغاء حجزك");
        }
    });


    client.refetchQueries({
        include: "active",
    })

    return (
        <div>
            <h2>الأحداث التي حجزتها</h2>
            <BookingsList />
        </div>
    );
}