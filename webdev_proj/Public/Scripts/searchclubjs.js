// Get references to the input and club list
const searchInput = document.getElementById('clubSearchInput');
const clubItems = document.getElementsByClassName('club-item');

// Add event listener to the search input
searchInput.addEventListener('input', function() {
    const filter = searchInput.value.toLowerCase().trim();  // Get the input value in lowercase and trim extra spaces
    
    // Loop through all club items and show/hide based on the input
    for (let i = 0; i < clubItems.length; i++) {
        let clubName = clubItems[i].getElementsByTagName("p")[0].textContent.toLowerCase();  // Get club name
        
        // Check if the input matches the club name
        if (clubName.includes(filter)) {
            clubItems[i].style.display = "block";  // Show the club item
        } else {
            clubItems[i].style.display = "none";  // Hide the club item
        }
    }
});
