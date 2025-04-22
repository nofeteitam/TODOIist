class User {
    constructor(username, password, email, phone, gender, city, userId, profilePic) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.city = city;
        this.userId = userId;
        this.profilePic = profilePic;
    }
}
class Seller {
    constructor(username, password, email, phone, gender, city, sellerId, profilePic) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.city = city;
        this.sellerId = sellerId;
        this.profilePic = profilePic;
    }
}


$("#registerBtn").click(async (event) => {
    event.preventDefault();
    let username = $("#username").val();
    let password = $("#password").val();
    let email = $("#email").val();
    let phone = $("#phone").val();
    let city = $("#city").val();
    let genderOptions = document.getElementsByName("inlineRadioOptions");
    let gender = null;
    for (let i in genderOptions) {
        if (genderOptions[i].checked) {
            gender = genderOptions[i].value;
            break;
        }
    }
    let configOptions = document.getElementsByName("configOptions");
    let config = null;
    for (let i in genderOptions) {
        if (configOptions[i].checked) {
            config = configOptions[i].value;
            break;
        }
    }
    let profilePic = await converPic(username)
    if (config == "user") {
        let newUser = new User(username, password, email, phone, gender, city)
        newUser.profilePic = profilePic
        let users = JSON.parse(localStorage.getItem("users"));
        if (users) {
            newUser.userId = users[users.length - 1].userId + 1;
            users.push(newUser)
            localStorage.setItem("users", JSON.stringify(users));
        } else {
            newUser.userId = 1;
            localStorage.setItem("users", JSON.stringify([newUser]));
        }
    } else {
        let newSeller = new Seller(username, password, email, phone, gender, city)
        newSeller.profilePic = profilePic
        let sellers = JSON.parse(localStorage.getItem("sellers"));
        if (sellers) {
            newSeller.sellerId = sellers[sellers.length - 1].sellerId + 1;
            sellers.push(newSeller)
            localStorage.setItem("sellers", JSON.stringify(sellers));
        } else {
            newSeller.sellerId = 1;
            localStorage.setItem("sellers", JSON.stringify([newSeller]));
        }
    }
    alert(`new ${config.toUpperCase()} Created`)
    window.location.href = "./login.html"
})


function converPic(username) {
    // const pic = document.getElementById("pictureOptions");
    const pic = document.querySelector('input[name=pictureOptions]:checked').value;

    switch (pic) {
        case 'Avatar':
            let avatar = document.getElementById("avName").value;
            console.log(avatar);
            console.log(username);
            if (avatar !== "") {
                return "https://api.dicebear.com/7.x/avataaars/svg?seed=${" + avatar + "}"
            }
            else {
                return "https://api.dicebear.com/7.x/avataaars/svg?seed=${" + username + "}"
            }
        case 'Choose':
            const file = document.getElementById("picOption").files[0];
            if (!file) {
                return "../images/profileDefault.png"
            }
            else {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = function () {
                        const base64 = reader.result;
                        resolve(base64);
                    }
                    reader.readAsDataURL(file);
                })
            }
        case 'None':
            return "../images/profileDefault.png"

    }

}