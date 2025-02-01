// Import the DFINITY agent libraries using a bundler or include them via a <script> tag if available.
// In a pure HTML file, you might need to bundle your code using tools like Webpack or Parcel.
// For simplicity, we assume you have bundled this file or are using a module-supporting environment.

// --- Example using ES modules: ---
// import { Actor, HttpAgent } from "https://cdn.jsdelivr.net/npm/@dfinity/agent@latest/dist/agent.esm.min.js";
// import { idlFactory } from "./idl.js"; // This should be your candid interface file (generated from your backend)

const CANISTER_ID = "36dh2-aiaaa-aaaad-aajna-cai"; // Replace with your actual deployed canister ID
const HOST = "https://icp0.io"; // Mainnet host

// Create an HTTP agent to talk to ICP
const agent = new HttpAgent({ host: HOST });

// Create an actor to interact with your canister
// Ensure that idlFactory is correctly imported or defined here.
// If you don't have module support in your HTML, you might have to inline the idlFactory.
const bookingCanister = Actor.createActor(idlFactory, {
  agent,
  canisterId: CANISTER_ID,
});

// This function will be called when the user clicks the "Book on ICP Blockchain" button.
async function bookWarehouse() {
  // Get values from the form inputs
  const farmerId = document.getElementById('farmerId').value;
  const warehouseId = document.getElementById('warehouseId').value;
  const date = document.getElementById('date').value;

  // Basic validation (optional)
  if (!farmerId || !warehouseId || !date) {
    alert("Please fill in all fields");
    return;
  }

  // Call the canister method.
  // Change the method name below if your canister defines it differently.
  try {
    // Assume your smart contract method is named 'bookStorage'
    const result = await bookingCanister.bookStorage(farmerId, warehouseId, date);
    
    // Display the result on the page (in the element with id "bookings")
    document.getElementById('bookings').innerText = "Booking Successful: " + JSON.stringify(result);
    console.log("Booking result:", result);
  } catch (error) {
    console.error("Error while booking:", error);
    document.getElementById('bookings').innerText = "Booking Failed: " + error;
  }
}

// Expose the function to the global scope so it can be called from your HTML button's onclick attribute.
window.bookWarehouse = bookWarehouse;
