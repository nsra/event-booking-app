import React, { useState, useEffect } from 'react'
import Spinner from '../components/Spinner'
import { BOOKINGS, CANCEL_BOOKING } from '../queries'
import BookingItem from '../components/BookingItem'
import { useQuery, useMutation, useApolloClient } from "@apollo/client"
import Error from '../components/Error'

export default function BookingsPage() {
    const [bookings, setBookings] = useState([])
    const [alert, setAlert] = useState("")
    let canceledBooking = ""
    const client = useApolloClient()

    function BookingsList() {
        const { loading, error, data } = useQuery(BOOKINGS, {
            onError: (error) => setAlert(error.message)
        })

        useEffect(() => {
            if (!loading && !error && data) {
                setBookings(data.bookings)
            }
        }, [data, error, loading])

        if (error) {
            setAlert(error.message)
            console.log("here")
            return
        }

        return (
            <React.Fragment>
                <Error error={alert} />
                {loading || cancelBookingLoading ? (
                    <Spinner />
                ) : (
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            {data.bookings.map(booking => (
                                <BookingItem
                                    key={booking._id}
                                    {...booking}
                                    onCancelBooking={() => {
                                        canceledBooking = booking._id
                                        cancelBooking({ variables: { bookingId: canceledBooking } })
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </React.Fragment>
        )
    }

    const [cancelBooking, { cancelBookingLoading }] = useMutation(CANCEL_BOOKING, {
        onError: (error) => setAlert(error.message),
        onCompleted: () => {
            setBookings(bookings.filter(booking => booking._id !== canceledBooking))
            setAlert("تم إلغاء حجزك")
        }
    })


    client.refetchQueries({
        include: "active",
    })

    return (
        <div className="container-fluid">
            <h2>المناسبات التي حجزتها</h2>
            <BookingsList />
        </div>
    )
}