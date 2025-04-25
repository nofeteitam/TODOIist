
function logOut(event){
    event.preventDefault();
    localStorage.removeItem(`currentUser`);
    window.location.href="../pages/login.html"
}