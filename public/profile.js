// firebase.database().ref('owner').once("child_added", (data) => {
//   for(var key in data.val()){
//     // console.log(key) 
//     for(var key1 in key){
//       console.log(data.val()[key])
//       }
//     console.log(data.val()[key])
//   }
// })
// add image
let uploadFiles = (file) => {
  return new Promise((resolve, reject) => {
    let storageRef = firebase.storage().ref(`myfolder/${file.name}`);
    // let progress1 = document.getElementById("progress");
    // let bar = document.getElementById("bar");
    // progress1.style.display = "block"
    let uploading = storageRef.put(file)
    uploading.on('state_changed',
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // bar.style.width = Math.round(progress.toFixed()) + "%";
        // bar.innerHTML = Math.round(progress.toFixed()) + "%";
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        reject(error)
      },
      () => {
        uploading.snapshot.ref.getDownloadURL().then((downloadURL) => {
          resolve(downloadURL)
        });
      }
    );
  })
}
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    // console.log(uid)
    firebase.database().ref(`owner/${uid}`).once("value", (data) => {
      // let restaurant = document.getElementById("retaurantname");
      // let username = document.getElementById("fname");
      // let email = document.getElementById("email1");
      // let country = document.getElementById("country");
      // let city = document.getElementById("city");        
      // restaurant.innerHTML = ("Restaurants Name : " + data.val().restaurantname)
      // username.innerHTML = ("Name : " + data.val().username);
      // email.innerHTML = ("Email : " + data.val().email);
      // country.innerHTML = ("Country : " + data.val().usercountry);
      // city.innerHTML = ("City : " + data.val().usercity);
      // console.log(data.val())
    })
    // ...
  } else {
    window.location.href = "login.html"
  }
})



let logout = () => {
  firebase.auth().signOut()
    .then(() => {
      window.location.href = "index.html"
    })
}
//add product

let addproducts = () => {

  firebase.auth().onAuthStateChanged(async (user) => {
    let proname = document.getElementById("productname");
    let prodescription = document.getElementById("productdescription");
    let proprice = document.getElementById("productprice");
    let protype = document.getElementById("deliverytype");
    let procategory = document.getElementById("category");
    let proimage = document.getElementById("productimage");
    let image = await uploadFiles(proimage.files[0]);
    // console.log(proname.value);
    // console.log(prodescription.value);
    // console.log(proprice.value);
    // console.log(protype.value);
    // console.log(procategory.value);
    // console.log(proimage.files);
    firebase.database().ref(`owner/${user.uid}/products`).push({
      name: proname.value,
      description: prodescription.value,
      price: proprice.value,
      type: protype.value,
      categorey: procategory.value,
      profile: image,
    })
      .then(() => {
        console.log()
        alert("products add")

        //   let cards = document.getElementById("cards");
        //   cards.innerHTML = `<div class="card" style="width: 18rem;">
        //   <img class="card-img-top" src="..." alt="Card image cap">
        //   <div class="card-body">
        //     <h5>${}</h5>
        //     <p class="card-text">${}</p>
        //   </div>
        // </div>`
        // ...

      })
  })
}


//
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    // console.log(uid)
    firebase.database().ref(`owner/${uid}/products`).once("child_added", (data) => {
      let cards = document.getElementById("cards");
      cards.style.display = "block";
      cards.innerHTML += `<div class="card" id="caard" style="width: 18rem;">
        <img class="card-img-top" src="${data.val().profile}" alt="Card image cap">
        <div class="card-body">
          <p> Product name :  ${data.val().name}</p>
          <p> price : ${data.val().price}</p>
          <p> Type: ${data.val().type}</p>
          <p> Categorey :  ${data.val().categorey}</p>
          </div>
      </div>`
    })

  }

})


