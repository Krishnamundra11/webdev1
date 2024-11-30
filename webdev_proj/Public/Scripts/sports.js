// Search functionality to filter sports
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-wrapper input[type="text"]');
    const sportItems = document.querySelectorAll('.sport-item');

    searchInput.addEventListener('input', function() {
        const searchText = searchInput.value.toLowerCase();
        
        sportItems.forEach(function(item) {
            const sportName = item.querySelector('p').textContent.toLowerCase();
            
            // Show/hide based on search text match
            if (sportName.includes(searchText)) {
                item.style.display = 'block'; // Show matching sport
            } else {
                item.style.display = 'none';  // Hide non-matching sport
            }
        });
    });
});
