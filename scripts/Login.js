
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

let configArr=[];
let newUser = new User("Guest", "", "", "", "", "")
newUser.userId = 0;
newUser.profilePicture = "../images/no.jpg";
configArr = (newUser)
localStorage.setItem("guestMode", JSON.stringify(configArr));
localStorage.setItem("currentUser", JSON.stringify(configArr));



$("#homeBtn").click(()=>{
    window.location.href="../pages/calender.html"
  })
    
  $("#rgBtn").click(()=>{
    window.location.href="../pages/register.html"
  })
  
  $("#lgnBtn").click(()=>{
      
      let email=$("#email").val();
      let password=$("#password").val();
  
      const configUptodate=JSON.parse(localStorage.getItem("configUptodate"))
  
      console.log(configUptodate)
  
      if(email=="" || password=="" )
        {
          alert("please complete all fields");
        }
      else
       {
        if(configUptodate["user"])
         {
          for(let i in configUptodate["user"])
           {
            let user=configUptodate["user"][i];
            if(user.email==email)
             {
              if (user.password==password)
               {
                localStorage.setItem("currentUser",JSON.stringify(user));
                alert("enter")

                alert(user.username)
                window.location.href="../pages/calender.html"
                return;
                }
              else{
                   alert("Incorrect Password")
                   return;
                  } 
              }
             }
           }

       alert("No User/ seller Found")     
     }
   
  })
  
  