function getCurrentMonthDates(year, month) {
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);
  const dates = [];

  for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
    dates.push(new Date(date));
  }

  return dates;
}

function updateCalendar() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDate = now.getDate();

  const monthLabel = document.getElementById("month-label");
  const calendarTable = document.getElementById("calendar-table");

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  monthLabel.textContent = monthNames[currentMonth];

  const currentMonthDates = getCurrentMonthDates(currentYear, currentMonth);
  const firstDayOfMonth = (currentMonthDates[0].getDay() + 6) % 7;
  const lastDateOfPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  let calendarHTML = "";
  let dayCounter = 1;
  let nextMonthCounter = 1;

  for (let week = 0; week < 5; week++) {
    calendarHTML += "<tr>";

    for (let day = 0; day < 7; day++) {
      if (week === 0 && day < firstDayOfMonth) {
        const prevMonthDate = lastDateOfPrevMonth - firstDayOfMonth + day + 1;
        calendarHTML += `<td class="prev-month">${prevMonthDate}</td>`;
      } else if (dayCounter > currentMonthDates.length) {
        calendarHTML += `<td class="next-month">${nextMonthCounter}</td>`;
        nextMonthCounter++;
      } else {
        const isCurrentDay = dayCounter === currentDate;
        const dayClass = isCurrentDay ? "current-day" : "";
        calendarHTML += `<td class="${dayClass}">${dayCounter}</td>`;
        dayCounter++;
      }
    }

    calendarHTML += "</tr>";
  }

  calendarTable.querySelector("tbody").innerHTML = calendarHTML;
}

function initCalendar() {
  updateCalendar();

  // Update the calendar every minute to handle day changes
  setInterval(() => {
    const now = new Date();
    const currentMinute = now.getMinutes();
    if (currentMinute === 0) {
      updateCalendar();
    }
  }, 60 * 1000);
}

module.exports = {
  init: initCalendar,
};

