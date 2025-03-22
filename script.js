const header = document.querySelector("#topFullDate");
const datesContainer = document.querySelector("#dates");
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let currentDate = new Date();
let month = currentDate.getMonth();
let year = currentDate.getFullYear();

function renderCalendar() {
    const startDay = new Date(year, month, 1).getDay();
    const endDate = new Date(year, month + 1, 0).getDate();
    const prevMonthEndDate = new Date(year, month, 0).getDate();
    

    let datesHtml = '';
    let currentRow = '<tr>';

    for (let i = 0; i < startDay; i++) {
        currentRow += `<td class="inactive">${prevMonthEndDate - startDay + i + 1}</td>`;
    }

    for (let i = 1; i <= endDate; i++) {
        let className = '';
        if (i === currentDate.getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
            className = 'class = "today"';
        } else {
            className = 'class="numbers"';
        }

        currentRow += `<td ${className}>${i}</td>`;

        if ((i + startDay) % 7 === 0) {
            currentRow += '</tr>';
            datesHtml += currentRow;
            currentRow = '<tr>';
        }
    }

    const remainingDays = (7 - (endDate + startDay) % 7) % 7;
    for (let i = 1; i <= remainingDays; i++) {
        currentRow += `<td class="inactive">${i}</td>`;
    }

    if (remainingDays > 0) {
        currentRow += '</tr>';
        datesHtml += currentRow;
    }

    datesContainer.innerHTML = datesHtml;
    header.textContent = `${months[month]} ${year}`;
};

prevButton.addEventListener("click", () => {
    if (month === 0) {
        year--;
        month = 11;
    } else {
        month--;
    }
    currentDate = new Date(year, month, currentDate.getDate());
    renderCalendar();
});

nextButton.addEventListener("click", () => {
    if (month === 11) {
        year++;
        month = 0;
    } else {
        month++;
    }
    currentDate = new Date(year, month, currentDate.getDate());
    renderCalendar();
});

renderCalendar();


