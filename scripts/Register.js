class User {
    constructor(username, password, email, phone, gender, city, userId, profilePicture) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.city = city;
        this.userId = userId;
        this.profilePicture = profilePicture;
    }
}

class Seller {
    constructor(username, password, email, phone, gender, city, sellerId, profilePicture) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.city = city;
        this.sellerId = sellerId;
        this.profilePicture = profilePicture;
    }
}

class Email {
    constructor(email, emailId) {
        this.email = email;
        this.emailId = emailId;
    }
}

const sleepMode = (time) => new Promise(res => setTimeout(res, time * 2000));
//localStorage.removeItem(`currentUser`);

async function deleteFields() {

    document.getElementById("cube1").style.display = "block";
    await sleepMode(2);

    $("#username").val("");
    $("#password").val("");
    $("#email").val("");
    $("#phone").val("");
    $("#city").val("");

    $("#urlPicture").val("");
    $("#profilePicture").val("");

    document.getElementById("cube1").style.display = "none";
    window.location.href = "../pages/register.html";


}

async function loginBtnFunc() {

    document.getElementById("cubeLogin").style.display = "block";
    await sleepMode(3);

    window.location.href = "../pages/login.html"

}

$("#submitRegBtn").click(async (event) => {

    event.preventDefault();

    let username = $("#username").val();
    let password = $("#password").val();
    let email = $("#email").val();
    let phone = $("#phone").val();
    let city = $("#city").val();

    if (username == "" || password == "" || email == "" || phone == "" ||
        city == "") {
        alert("please complete all fields");
    }
    else {  // Check is exist? EMAIL
        let newemail = new Email(email)
        newemail.email = email;

        let emails = JSON.parse(localStorage.getItem("emails"));
        let emailexist = false;
        if (emails) {
            for (let i in emails) {
                if (email == emails[i].email) {
                    alert("email exist please type new email ")
                    emailexist = true;
                    break;
                }
            }
            if (!emailexist) {
                newemail.emailId = emails[emails.length - 1].emailId + 1;
                emails.push(newemail);
                localStorage.setItem("emails", JSON.stringify(emails));
            }
        }
        else {
            newemail.emailId = 1;
            localStorage.setItem("emails", JSON.stringify([newemail]));
        }
        // gender conf 
        if (!emailexist) {
            let genderOpt = document.getElementsByName("GenderRadioOptions");   //arr
            let gender = null;

            for (let i in genderOpt) {
                if (genderOpt[i].checked) {
                    gender = genderOpt[i].value;
                    break;
                }
            }
            // user/ seller uptodate

            let configOptions = document.getElementsByName("configOption");   //arr
            let uptodateConfig = null;

            for (let i in configOptions) {
                if (configOptions[i].checked) {
                    uptodateConfig = configOptions[i].value;
                    break;
                }
            }
            let profilePicture = await convertPic();
            console.log(profilePicture)
            let newId;

            if (localStorage.getItem("configUptodate")) {
                let storageConfig = JSON.parse(localStorage.getItem("configUptodate"))
                if (storageConfig[uptodateConfig]) {
                    for (let i = 0; i < storageConfig[uptodateConfig].length; i++) {
                        if (uptodateConfig == "user") {
                            for (let j = 0; j < storageConfig[uptodateConfig].length; j++) {
                                newId = storageConfig[uptodateConfig][j].userId
                            }
                            newId += 1

                            let newUser = new User(username, password, email, phone, gender, city)
                            newUser.profilePicture = profilePicture;
                            newUser.userId = newId;
                            storageConfig[uptodateConfig].push(newUser)
                            localStorage.setItem("configUptodate", JSON.stringify(storageConfig));
                            alert("You have successfully registered");
                            deleteFields()
                            window.location.href = "../pages/Login.html"
                            return;
                        }
                        else {

                            for (let j = 0; j < storageConfig[uptodateConfig].length; j++) {
                                newId = storageConfig[uptodateConfig][j].sellerId
                            }
                            newId += 1

                            let newSeller = new Seller(username, password, email, phone, gender, city)
                            newSeller.profilePicture = profilePicture;
                            newSeller.sellerId = newId;

                            storageConfig[uptodateConfig].push(newSeller)
                            localStorage.setItem("configUptodate", JSON.stringify(storageConfig));
                            alert("You have successfully registered")
                            deleteFields()
                            return;
                        }
                    } //end of for let i = 0
                }//end of if (storageConfig[uptodateConfig])

                let configArr = {};
                if (uptodateConfig == "user") {
                    let newUser = new User(username, password, email, phone, gender, city)
                    newUser.userId = 1;
                    newUser.profilePicture = profilePicture;
                    storageConfig[uptodateConfig] == [(newUser)]
                }
                else {
                    let newSeller = new Seller(username, password, email, phone, gender, city)
                    newSeller.sellerId = 1;
                    newSeller.profilePicture = profilePicture;
                    storageConfig[uptodateConfig] = [(newSeller)]
                }
                localStorage.setItem("configUptodate", JSON.stringify(storageConfig));
                alert("You have successfully registered")
                deleteFields()
                return;
            }
            else {
                let configArr = {};
                if (uptodateConfig == "user") {
                    let newUser = new User(username, password, email, phone, gender, city)
                    newUser.userId = 1;
                    newUser.profilePicture = profilePicture;
                    configArr[uptodateConfig] = [(newUser)]
                }
                else {
                    let newSeller = new Seller(username, password, email, phone, gender, city)
                    newSeller.sellerId = 1;
                    newSeller.profilePicture = profilePicture;
                    configArr[uptodateConfig] = [(newSeller)]
                }
                localStorage.setItem("configUptodate", JSON.stringify(configArr));
                alert("You have successfully registered")
                deleteFields()

            }
        }
    }  //end of Check is exist? EMAIL
})


function convertPic() {

    let picturerOpt = document.getElementsByName("pictureFileOpt");   //arr
    let currentPicture = null;
    let i = 0;

    for (i = 0; i < picturerOpt.length; i++) {
        if (picturerOpt[i].checked) {
            currentPicture = picturerOpt[i].value;
            console.log(i)
            break;
        }
    }


    if (i == 0) {
        console.log(0);
        const file = document.getElementById("profilePicture").files[0];
        console.log(file)
        if (!file) {
            console.log(file)
            return "../images/no.jpg"
        }
        else {
            console.log(file)
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = function () {
                    const base64 = reader.result;
                    resolve(base64);
                }
                reader.readAsDataURL(file);
            })
        }
    }

    if (i == 1) {
        console.log(1);
        const file = $("#urlPicture").val();
        console.log(file)
        if (!file) {
            return "../images/no.jpg";
        }
        else {
            return file;
        }
    }
}


