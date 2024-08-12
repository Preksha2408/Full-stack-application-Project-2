document.addEventListener("DOMContentLoaded", () => {
    const calendarCardsContainer = document.getElementById('calender-cards');
  
    // Use day.js to get the start of the current week
    const startOfWeek = dayjs().startOf('week');
    
    // Generate cards for the entire week
    for (let i = 0; i < 7; i++) {
      const currentDay = startOfWeek.add(i, 'day');
      const dayOfWeek = currentDay.format('dddd'); // e.g., Monday
      const date = currentDay.format('MMMM D'); // e.g., August 7, 2024
  
      // Create a card element
      const card = document.createElement('div');
      card.classList.add('calendar-card');
      card.innerHTML = `
        <div class="card-header">
          <h5>${dayOfWeek} <br> ${date}</h5>
        </div>
        <div class="card-body">
          <!-- Buttons for tasks can be added here -->
          <button id = "task-btn" class="btn btn-secondary">${taskName}</button>
        </div>
      `;
  
      // Append the card to the container
      calendarCardsContainer.appendChild(card);
    }


});