const transformEvent = event => ({
  ...event._doc,
  //date: event.date.toDateString()
  date: new Date(event.date).toISOString().replace(/T/, " ")
}) 

const transformBooking = booking => ({
  ...booking._doc,
  createdAt: booking.createdAt.toDateString(),
  updatedAt: booking.updatedAt.toDateString()
}) 

exports.transformEvent = transformEvent 
exports.transformBooking = transformBooking 
