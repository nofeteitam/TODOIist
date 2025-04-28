
function logOut(event){
    event.preventDefault();

    let guestMode=JSON.parse(localStorage.getItem(`guestMode`));
    console.log(guestMode)

    localStorage.setItem("currentUser", JSON.stringify(guestMode));

    //localStorage.removeItem(`currentUser`);
    window.location.href="../pages/login.html"
}