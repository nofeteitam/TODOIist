
$("#homeBtn").click(()=>{
    window.location.href="../pages/home.html"
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
                window.location.href="../pages/home.html"
                return;
                }
              else{
                   alert("Incorrect Password")
                   return;
                  } 
              }
             }
           }
  
         if(configUptodate["seller"])
          {
           for(let i in configUptodate["seller"])
            {
              let seller=configUptodate["seller"][i];
              console.log(seller)
              if(seller.email==email)
               {
                if (seller.password==password)
                 {
                  localStorage.setItem("currentUser",JSON.stringify(seller));
                  window.location.href="../pages/AddProduct.html"
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
  
  