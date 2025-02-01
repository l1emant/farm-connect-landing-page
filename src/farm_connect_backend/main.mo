import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Error "mo:base/Error";
import Option "mo:base/Option";
import Principal "mo:base/Principal";

actor FarmConnect {
    // Types
    type BookingData = {
        farmerId: Text;
        warehouseId: Text;
        storageDate: Text;
        status: Text;
    };

    // Storage
    private var bookings = HashMap.HashMap<Text, BookingData>(0, Text.equal, Text.hash);

    // Create a new booking
    public shared(msg) func createBooking(data: BookingData) : async {#ok: BookingData; #err: Text} {
        try {
            let bookingId = Text.concat(data.farmerId, data.warehouseId);
            
            // Check if booking already exists
            switch (bookings.get(bookingId)) {
                case (?existing) {
                    return #err("Booking already exists for this farmer and warehouse");
                };
                case (null) {
                    bookings.put(bookingId, data);
                    return #ok(data);
                };
            };
        } catch (e) {
            return #err("Failed to create booking: " # Error.message(e));
        };
    };

    // Get booking details
    public query func getBooking(bookingId: Text) : async ?BookingData {
        bookings.get(bookingId)
    };

    // Update booking status
    public shared(msg) func updateBookingStatus(bookingId: Text, newStatus: Text) : async {#ok: BookingData; #err: Text} {
        try {
            switch (bookings.get(bookingId)) {
                case (?booking) {
                    let updatedBooking = {
                        farmerId = booking.farmerId;
                        warehouseId = booking.warehouseId;
                        storageDate = booking.storageDate;
                        status = newStatus;
                    };
                    bookings.put(bookingId, updatedBooking);
                    return #ok(updatedBooking);
                };
                case (null) {
                    return #err("Booking not found");
                };
            };
        } catch (e) {
            return #err("Failed to update booking: " # Error.message(e));
        };
    };
};
