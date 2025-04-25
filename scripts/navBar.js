
document.querySelectorAll('.dropdown-toggle').forEach(item => {
    item.addEventListener('click', event => {
   
      if(event.target.classList.contains('dropdown-toggle') ){
        event.target.classList.toggle('toggle-change');
      }
      else if(event.target.parentElement.classList.contains('dropdown-toggle')){
        event.target.parentElement.cl
        assList.toggle('toggle-change');
      }
    })
  });
  
let currentUser=JSON.parse(localStorage.getItem(`currentUser`));

if (!currentUser){
  //guest config
  document.getElementById("profile-menu").style.display=""
  document.getElementById("profilePic").src="../images/no.jpg"
  document.getElementById("userAccountName").innerText="Guest"

 }
else{
    document.getElementById("profilePic").src=currentUser.profilePicture
    document.getElementById("userAccountName").innerText=currentUser.username;
   
    if (currentUser.sellerId){
      //seller config
        document.getElementById("addProduct").innerHTML=
        `<a id="addProductLink" class="nav-link"  href="../pages/AddProduct.html">Add product</a>  `

        let cartSize=checkCart("seller",currentUser.sellerId)
        $("#cartSize").text(cartSize);
        document.getElementById("seller_Products-link").innerHTML=
         `<a id="" class="nav-link"  href="../pages/sellerProducts.html">My Products</a>  `

     }
    else{
      //user config
      let cartSize=checkCart("user",currentUser.userId)
      $("#cartSize").text(cartSize);

    } 

  }


 function checkCart(config,id){

    let orders=JSON.parse(localStorage.getItem(config+"Orders"));
    let cartSize=0;
   
    for (let i in orders){
      if(orders[i].buyerId==id&& orders[i].orderStatus=="pending"){
        cartSize=cartSize+1;
        
      }
    }
     return cartSize;
  }
  

function logOut(event){
    event.preventDefault();
    localStorage.removeItem(`currentUser`);
    window.location.href="../pages/login.html"
}