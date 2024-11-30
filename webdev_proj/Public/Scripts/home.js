
        // Carousel functionality
        // const carousel = document.querySelector('.carousel');
        // let isDragging = false, startPos = 0, scrollLeft = 0;

        // carousel.addEventListener('mousedown', (e) => {
        //     isDragging = true;
        //     startPos = e.pageX - carousel.offsetLeft;
        //     scrollLeft = carousel.scrollLeft;
        // });

        // carousel.addEventListener('mousemove', (e) => {
        //     if (!isDragging) return;
        //     const x = e.pageX - carousel.offsetLeft;
        //     const walk = (x - startPos) * 2;
        //     carousel.scrollLeft = scrollLeft - walk;
        // });

        // carousel.addEventListener('mouseup', () => {
        //     isDragging = false;
        // });

        // carousel.addEventListener('mouseleave', () => {
        //     isDragging = false;
        // });

      

        // document.addEventListener('DOMContentLoaded', () => {
        //     const calendars = document.querySelectorAll('.calendar');
        //     const eventModal = document.getElementById('eventModal');
        //     const overlay = document.getElementById('overlay');
        //     const tooltip = document.getElementById('tooltip');
        //     const addEventBtn = document.getElementById('addEventBtn');
        //     let selectedDate = null;
        //     let selectedCalendar = null;

        //     // Events storage for each calendar
        //     const calendarEvents = {
        //         calendar1: {},
        //         calendar2: {}
        //     };

        //     // Initialize each calendar and add click event listeners
        //     calendars.forEach(calendar => {
        //         calendar.innerHTML = generateCalendar(calendar.id);
        //         calendar.addEventListener('click', (e) => {
        //             if (e.target.tagName === 'TD' && e.target.textContent !== '') {
        //                 selectedDate = e.target.getAttribute('data-day');
        //                 selectedCalendar = calendar.id;
        //                 addEventBtn.disabled = false; // Enable the button once a date is selected
        //             }
        //         });
        //     });

        //     // Add Event Button click to open modal
        //     addEventBtn.addEventListener('click', openModal);

        //     function generateCalendar(calendarId) {
        //         let calendarHTML = '<table>';
        //         calendarHTML += '<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>';
        //         let days = 1;
        //         for (let i = 0; i < 5; i++) {
        //             calendarHTML += '<tr>';
        //             for (let j = 0; j < 7; j++) {
        //                 if (days <= 31) {
        //                     calendarHTML += `<td data-day="${days}" data-calendar="${calendarId}">${days}</td>`;
        //                     days++;
        //                 } else {
        //                     calendarHTML += '<td></td>';
        //                 }
        //             }
        //             calendarHTML += '</tr>';
        //         }
        //         calendarHTML += '</table>';
        //         return calendarHTML;
        //     }


        document.addEventListener('DOMContentLoaded', () => {
            const calendars = document.querySelectorAll('.calendar');
            const eventModal = document.getElementById('eventModal');
            const overlay = document.getElementById('overlay');
            const tooltip = document.getElementById('tooltip');
            const addEventBtn = document.getElementById('addEventBtn');
            let selectedDate = null;
            let selectedCalendar = null;

            // Events storage for each calendar
            const calendarEvents = {
                calendar1: {},
                
            };

            // Initialize each calendar and add click event listeners
            calendars.forEach(calendar => {
                calendar.innerHTML = generateCalendar(calendar.id);
                calendar.addEventListener('click', (e) => {
                    if (e.target.tagName === 'TD' && e.target.textContent !== '') {
                        selectedDate = e.target.getAttribute('data-day');
                        selectedCalendar = calendar.id;
                        addEventBtn.disabled = false; // Enable the button once a date is selected
                    }
                });
            });

            // Add Event Button click to open modal
            addEventBtn.addEventListener('click', openModal);

            function generateCalendar(calendarId) {
                let calendarHTML = '<table>';
                calendarHTML += '<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>';
                let days = 1;
                for (let i = 0; i < 5; i++) {
                    calendarHTML += '<tr>';
                    for (let j = 0; j < 7; j++) {
                        if (days <= 31) {
                            calendarHTML += `<td data-day="${days}" data-calendar="${calendarId}">${days}</td>`;
                            days++;
                        } else {
                            calendarHTML += '<td></td>';
                        }
                    }
                    calendarHTML += '</tr>';
                }
                calendarHTML += '</table>';
                return calendarHTML;
            }

            // Modal open
            function openModal() {
                if (selectedDate && selectedCalendar) {
                    eventModal.style.display = 'block';
                    overlay.style.display = 'block';
                }
            }

            // Save Event
            document.getElementById('saveEvent').addEventListener('click', () => {
                const title = document.getElementById('eventTitle').value;
                const time = document.getElementById('eventTime').value;

                if (title && time) {
                    if (!calendarEvents[selectedCalendar][selectedDate]) {
                        calendarEvents[selectedCalendar][selectedDate] = [];
                    }
                    calendarEvents[selectedCalendar][selectedDate].push({ title, time });

                    document.querySelectorAll(`#${selectedCalendar} [data-day="${selectedDate}"]`).forEach(cell => cell.classList.add('event-day'));
                    closeModal();
                }
            });

            // Close Modal
            document.getElementById('closeModal').addEventListener('click', closeModal);
            overlay.addEventListener('click', closeModal);

            function closeModal() {
                eventModal.style.display = 'none';
                overlay.style.display = 'none';
                document.getElementById('eventTitle').value = '';
                document.getElementById('eventTime').value = '';
                selectedDate = null;
                addEventBtn.disabled = true; // Disable add event button until a new date is selected
            }

            // Show tooltip on hover
            calendars.forEach(calendar => {
                calendar.addEventListener('mouseover', (e) => {
                    if (e.target.tagName === 'TD' && e.target.classList.contains('event-day')) {
                        const day = e.target.getAttribute('data-day');
                        const calendarId = e.target.getAttribute('data-calendar');

                        if (calendarEvents[calendarId][day]) {
                            tooltip.innerHTML = calendarEvents[calendarId][day]
                                .map(event => `<div>${event.time}: ${event.title}</div>`)
                                .join('');
                            tooltip.style.left = `${e.pageX + 10}px`;
                            tooltip.style.top = `${e.pageY + 10}px`;
                            tooltip.style.display = 'block';
                        }
                    }
                });

                calendar.addEventListener('mouseout', (e) => {
                    if (e.target.tagName === 'TD' && e.target.classList.contains('event-day')) {
                        tooltip.style.display = 'none';
                    }
                });
            });
        });






        const searchInput = document.getElementById('search-input');
        const dropdownContainer = document.getElementById('dropdown-container');
        const searchButton = document.getElementById('search-button');
        let selectedUrl = '';  // Stores the selected URL from the dropdown

        // Show dropdown when the input field is focused
        searchInput.addEventListener('focus', function() {
            dropdownContainer.classList.add('show');
        });

        // Hide dropdown if clicked outside the search area
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.search-container')) {
                dropdownContainer.classList.remove('show');
            }
        });

        // Add event listeners to dropdown items
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', function() {
                // Set the search input to the selected item text
                searchInput.value = this.innerText;
                // Store the URL associated with the selected item
                selectedUrl = this.getAttribute('data-url');
                // Hide the dropdown after selection
                dropdownContainer.classList.remove('show');
            });
        });

        // Handle the search button click
        searchButton.addEventListener('click', function() {
            if (selectedUrl) {
                // Redirect to the selected URL if present
                window.location.href = selectedUrl;
            } else {
                // Optionally, you can add custom logic here if no item is selected
                alert('Please select an option from the dropdown.');
            }
        });

    

    // Fetch and display event cards
    fetch('events.json')
        .then(response => response.json())
        .then(data => {
            const eventContainer = document.getElementById('event-cards-container');
            data.forEach(event => {
                const card = document.createElement('div');
                card.className = 'event-card';
                card.innerHTML = `
                    <img src="${event.image}" alt="${event.title}" class="img2">
                    <div class="card_text1">
                        <h1>${event.title}</h1>
                        <p>${event.description}</p>
                        <div id="card_text2">
                            <h1>${event.date}</h1>
                            <a href="${event.link}">
                                <button>Register Now</button>
                            </a>
                        </div>
                    </div>
                `;
                eventContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching event data:', error));
    
    // Fetch and display club cards
    fetch('clubs.json')
        .then(response => response.json())
        .then(data => {
            const clubContainer = document.getElementById('club-cards-container');
            data.forEach(club => {
                const card = document.createElement('div');
                card.className = 'event-card';
                card.innerHTML = `
                    <img src="${club.image}" alt="${club.title}" class="img2">
                    <div class="card_text1">
                        <h1>${club.title}</h1>
                        <p>${club.description}</p>
                        <div id="card_text2">
                            <h1>${club.subtitle}</h1>
                            <a href="${club.link}">
                                <button>Register Now</button>
                            </a>
                        </div>
                    </div>
                `;
                clubContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching club data:', error));

        
