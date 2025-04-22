$("#lgnBtn").click((event) => {
    event.preventDefault();
    let email = $("#email").val();
    let password = $("#password").val();
    const users = JSON.parse(localStorage.getItem("users"));
    const sellers = JSON.parse(localStorage.getItem("sellers"));
    if (users) {
        for (let i in users) {
            let user = users[i];
            if (user.email == email) {
                if (user.password == password) {
                    localStorage.setItem("currentUser", JSON.stringify(user));
                    window.location.href = "./home.html"
                    return
                } else {
                    alert("Incorrect Password!")
                    return;
                }
            }
        }
    }
    if (sellers) {
        for (let i in sellers) {
            let seller = sellers[i];
            if (seller.email == email) {
                if (seller.password == password) {
                    localStorage.setItem("currentUser", JSON.stringify(seller));
                    window.location.href = "./home.html"
                    return
                } else {
                    alert("Incorrect Password!")
                    return;
                }
            }
        }
    }
    alert("No User / Seller found!")
})

/* <div class="col-md-9 col-lg-6 col-xl-5">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                class="img-fluid" alt="Sample image">
            </div>*/ 