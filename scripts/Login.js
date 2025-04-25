
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
  
  