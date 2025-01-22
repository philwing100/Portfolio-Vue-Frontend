

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
  