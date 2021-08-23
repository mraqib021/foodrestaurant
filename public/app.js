// firebase.auth().onAuthStateChanged(('user') => {
//   if (user) {
//     var uid = user.uid;
//     console.log(uid)
    // firebase.database().ref("owner${uid}").on("value", (data) => {
    //   console.log(data.val)
    //   if(res.val().role === "res-owner")
    //   // let cards = document.getElementById("cards");
    //   // cards.style.display = "block";
    //   // cards.innerHTML += `<div class="card" id="caard" style="width: 18rem;">
    //   //   <img class="card-img-top" src="${res.val().profile}" alt="Card image cap">
    //   //   <div class="card-body">
    //   //     <p> Product name :  ${res.val().name}</p>
    //   //     <p> price : ${res.val().price}</p>
    //   //     <p> Type: ${res.val().type}</p>
    //   //     <p> Categorey :  ${res.val().categorey}</p>
    //   //     </div>
    //   // </div>`
    // })

  // })

// })
let signup = () => {
  let name = document.getElementById("input-user");
  let email = document.getElementById("input-email");
  let password = document.getElementById("input-password");
  let restaurant = document.getElementById("input-restaurant");
  let country = document.getElementById("input-country");
  let city = document.getElementById("input-city");
  // console.log(name.value)
  // console.log(email.value)
  // console.log(password.value)
  // console.log(restaurant.value)
  // console.log(country.value)
  // console.log(city.value)
  firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then((res) => {
      // Signed in 
      var user = res.user;
      firebase.database().ref(`owner/${res.user.uid}`).set({
        username: name.value,
        email: email.value,
        password: password.value,
        restaurantname: restaurant.value,
        usercountry: country.value,
        usercity: city.value
      })
        .then(() => {
          alert("Owner Register");
          name.value = "";
          email.value = "";
          password.value = "";
          restaurant.value = "";
          country.value = "";
          city.value = "";
          setTimeout(function(){ 
          window.location.href = "login.html";
        }, 2000);
          // ...
        })

      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(error)
      // ..
    });
}
////user signup

let usersignup = () => {
  let name = document.getElementById("input-user");
  let email = document.getElementById("input-email");
  let password = document.getElementById("input-password");
  let country = document.getElementById("input-country");
  let city = document.getElementById("input-city");
  // console.log(name.value)
  // console.log(email.value)
  // console.log(password.value)
  // console.log(restaurant.value)
  // console.log(country.value)
  // console.log(city.value)
  firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then((res) => {
      // Signed in 
      var user = res.user;
      firebase.database().ref(`users/${res.user.uid}`).set({
        username: name.value,
        email: email.value,
        password: password.value,
        usercountry: country.value,
        usercity: city.value
      })
        .then(() => {
          alert("User Register");
          name.value = "";
          email.value = "";
          password.value = "";
          country.value = "";
          city.value = "";
          setTimeout(function(){ 
          window.location.href = "userlogin.html";
        }, 2000);
          // ...
        })

      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("error")
      // ..
    });
}


//// Restaurant Login

let login = () => {
  let useremail = document.getElementById("useremail");
  let userpassword = document.getElementById("userpassword");
  // console.log(username.value)
  // console.log(useremail.value)
  firebase.auth().signInWithEmailAndPassword(useremail.value, userpassword.value)
    .then((res) => {
      // Signed in
      var user = res.user;
      alert("User Login")
      setTimeout(function(){ 
        window.location.href = "profile.html";
      }, 2000);
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Error")
    });
}


// user login
let userlogin = () => {
  let useremail = document.getElementById("useremail");
  let userpassword = document.getElementById("userpassword");
  // console.log(username.value)
  // console.log(useremail.value)
  firebase.auth().signInWithEmailAndPassword(useremail.value, userpassword.value)
    .then((res) => {
      // Signed in
      var user = res.user;
      alert("User Login")
      setTimeout(function(){ 
        window.location.href = "product.html";
      }, 2000);
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Error")
    });
}