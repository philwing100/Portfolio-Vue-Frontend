

export function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`; // Format: YYYY-MM-DD
  }

  export function incrementDate(dateString) {
    let date;

    // Check if dateString is null or undefined, use current date if so
    if (!dateString) {
      date = new Date(this.getCurrentDate()); // Convert the current date string to a Date object
    } else {
      date = new Date(dateString); // Convert the provided dateString to a Date object
    }

    date.setDate(date.getDate() + 1); // Increment the date by 1
    return date.toISOString().split('T')[0]; // Return the incremented date as a string in YYYY-MM-DD format
  }

  export function decrementDate(dateString) {
    let date;

    // Check if dateString is null or undefined, use current date if so
    if (!dateString) {
      date = new Date(this.getCurrentDate()); // Convert the current date string to a Date object
    } else {
      date = new Date(dateString); // Convert the provided dateString to a Date object
    }

    date.setDate(date.getDate() - 1); // Increment the date by 1
    return date.toISOString().split('T')[0]; // Return the incremented date as a string in YYYY-MM-DD format
  }

  export function normalizeDate(datetimeString) {
    // Create a Date object from the MySQL DATETIME string
    const date = new Date(datetimeString);
  
    // Extract year, month, and day and format them as YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Month is 0-indexed, so +1
    const day = String(date.getDate()).padStart(2, '0');
  
    // Return the formatted date
    return `${year}-${month}-${day}`;
  }
  