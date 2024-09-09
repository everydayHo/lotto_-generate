document.addEventListener('DOMContentLoaded', function () {
	const calendarContainer = document.getElementById('calendar');
	const currentDate = new Date();
	let currentMonth = currentDate.getMonth();
	let currentYear = currentDate.getFullYear();

	renderCalendar(currentYear, currentMonth);

	function renderCalendar(year, month) {
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const daysInMonth = lastDay.getDate();
		const startDay = firstDay.getDay();

		const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

		// Calendar header with navigation arrows
		const calendarHeader = `
      <div class="claendar_header">
        <button onclick="prevMonth()">◀</button>
        <h2>${monthNames[month]} ${year}</h2>
        <button onclick="nextMonth()">▶</button>
      </div>
    `;

		// Calendar body
		let calendarBody = '<table>';
		calendarBody += '<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>';
		let dayCounter = 1;

		for (let i = 0; i < 6; i++) {
			calendarBody += '<tr>';
			for (let j = 0; j < 7; j++) {
				if ((i === 0 && j < startDay) || dayCounter > daysInMonth) {
					calendarBody += '<td></td>';
				} else {
					const isToday = isSameDay(new Date(year, month, dayCounter), currentDate);
					calendarBody += `<td data-day="${dayCounter}"${isToday ? ' class="today"' : ''}>${dayCounter}</td>`;
					dayCounter++;
				}
			}
			calendarBody += '</tr>';
			if (dayCounter > daysInMonth) break;
		}

		calendarBody += '</table>';

		// Set calendar content
		calendarContainer.innerHTML = calendarHeader + calendarBody;

		// Add event listeners to each day
		const dayCells = document.querySelectorAll('td[data-day]');
		dayCells.forEach((cell) => {
			cell.addEventListener('click', function () {
				alert(`Clicked on ${monthNames[month]} ${cell.dataset.day}, ${year}`);
			});
		});
	}

	function isSameDay(date1, date2) {
		return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
	}

	// 이전 달로 이동
	window.prevMonth = function () {
		currentMonth--;
		if (currentMonth < 0) {
			currentMonth = 11;
			currentYear--;
		}
		renderCalendar(currentYear, currentMonth);
	};

	// 다음 달로 이동
	window.nextMonth = function () {
		currentMonth++;
		if (currentMonth > 11) {
			currentMonth = 0;
			currentYear++;
		}
		renderCalendar(currentYear, currentMonth);
	};
});
