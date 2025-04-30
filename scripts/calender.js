
function populateTimeOptions() {
    const timeSelect = document.getElementById('time');
    timeSelect.innerHTML = '<option value="">בחר שעה</option>';

    for (let hour = 8; hour <= 18; hour++) {
        const formatted = hour.toString().padStart(2, '0') + ':00';
        const option = document.createElement('option');
        option.value = formatted;
        option.textContent = formatted;
        timeSelect.appendChild(option);
    }
}


window.addEventListener('DOMContentLoaded', populateTimeOptions);

function logOut(event) {
    event.preventDefault();

    let guestMode = JSON.parse(localStorage.getItem(`guestMode`));
    console.log(guestMode)

    localStorage.setItem("currentUser", JSON.stringify(guestMode));

    //localStorage.removeItem(`currentUser`);
    window.location.href = "../pages/login.html"
}