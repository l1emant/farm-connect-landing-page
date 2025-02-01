// Import required ICP dependencies
import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { canisterId, createActor } from "../declarations/farm_connect_backend";

// Initialize ICP connection
let actor;
let authClient;

async function initializeICP() {
    try {
        authClient = await AuthClient.create();
        const agent = new HttpAgent({
            host: "https://ic0.app" // ICP mainnet
        });

        // Create actor for interacting with the canister
        actor = createActor(canisterId, {
            agent
        });

        console.log("ICP connection initialized");
    } catch (error) {
        console.error("Error initializing ICP:", error);
    }
}

// Function to book warehouse space
async function bookWarehouse() {
    try {
        // Get form values
        const farmerId = document.getElementById('farmerId').value;
        const warehouseId = document.getElementById('warehouseId').value;
        const date = document.getElementById('date').value;

        if (!farmerId || !warehouseId || !date) {
            alert('Please fill in all fields');
            return;
        }

        // Check if user is authenticated
        if (!authClient.isAuthenticated()) {
            await authClient.login({
                identityProvider: "https://identity.ic0.app",
                onSuccess: () => {
                    console.log("Successfully logged in to Internet Computer");
                }
            });
        }

        // Create booking object
        const bookingData = {
            farmerId,
            warehouseId,
            storageDate: new Date(date).toISOString(),
            status: "pending"
        };

        // Call canister method to store booking
        const result = await actor.createBooking(bookingData);

        if (result.ok) {
            alert('Booking successfully recorded on the ICP blockchain!');
            // Reset form
            document.getElementById('farmerId').value = '';
            document.getElementById('warehouseId').value = '';
            document.getElementById('date').value = '';
        } else {
            throw new Error(result.err);
        }
    } catch (error) {
        console.error("Error booking warehouse:", error);
        alert('Failed to create booking. Please try again.');
    }
}

// Function to get booking status
async function getBookingStatus(bookingId) {
    try {
        const result = await actor.getBooking(bookingId);
        return result;
    } catch (error) {
        console.error("Error getting booking status:", error);
        throw error;
    }
}

// Initialize ICP when page loads
window.addEventListener('load', initializeICP);

// Export functions for use in HTML
window.bookWarehouse = bookWarehouse;
window.getBookingStatus = getBookingStatus;
