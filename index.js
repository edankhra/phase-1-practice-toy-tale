let addToy = false;

function updateLikes(id, newNumberOfLikes) {
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers:
  {
    "Content-Type": "application/json",
    Accept: "application/json"
  },

  body: JSON.stringify({
    "likes": newNumberOfLikes
  })
  })
  
}
// Access the list of toys from an API (mocked using JSON Server) and render each of them in a "card" on the page
// Hook up a form that enables users to add new toys. Create an event listener so that, when the form is submitted, the new toy is persisted to the database and a new card showing the toy is added to the DOM
// Create an event listener that gives users the ability to click a button to "like" a toy. When the button is clicked, the number of likes should be updated in the database and the updated information should be rendered to the DOM
//json-server --watch db.json
// http://localhost:3000/toys

// Fetch Andy's Toys
// On the index.html page, there is a div with the id "toy-collection."

// When the page loads, make a 'GET' request to fetch all the toy objects. With the response data, make a <div class="card"> for each toy and add it to the toy-collection div.
//Creating function called creatCardElement
function createCardElement(toy) {
  //make a <div class="card">
  //create div
  let card = document.createElement("div")
  //add card class
  card.classList.add("card")
  /*
  Each card should have the following child elements:

h2 tag with the toy's name
img tag with the src of the toy's image attribute and the class name "toy-avatar"
p tag with how many likes that toy has
button tag with a class "like-btn" and an id attribute set to the toy's id number
After all of that, the toy card should look something like this:

<div class="card">
  <h2>Woody</h2>
  <img src="[toy_image_url]" class="toy-avatar" />
  <p>4 Likes</p>
  <button class="like-btn" id="[toy_id]">Like ❤️</button>
</div>
  */
   let h2 = document.createElement("h2");
   h2.textContent = toy.name
   
   let img = document.createElement("img");
   img.src = toy.image;
   img.classList.add("toy-avatar")

   let p = document.createElement("p");
   p.textContent = `${toy.likes} Likes`;

   let button = document.createElement("button")
   button.addEventListener("click", () => {
    //update likes element
    p.textContent = `${toy.likes += 1} Likes`;
    //patch
    updateLikes(toy.id, toy.likes)
   })
   button.classList.add("like-btn")
   button.id = toy.id
   button.textContent = "Like ❤️"

   card.append(h2, img, p, button)
   document.getElementById("toy-collection").appendChild(card);
}

//make a function called sendItOut
function sendItOut(newToy){
  fetch("http://localhost:3000/toys", {
    method: "POST",
     headers:

        {
          "Content-Type": "application/json",
           Accept: "application/json"
        },

    body: JSON.stringify({
          ...newToy,
          "likes": 0
    })
  }).then(
    (response) => response.json()
  )
  .then(responseToy  => createCardElement(responseToy))
}

document.addEventListener("DOMContentLoaded", () => {

  //How to use GET request 
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(toys => toys.forEach(toy => createCardElement(toy)))


  //Adding a form
  const form =document.querySelector("form.add-toy-form")
  form.addEventListener("submit", (event) => {
     event.preventDefault();
     const formData = Object.fromEntries(new
      FormData(event.target));
      console.log(formData);
      sendItOut(formData)
  })

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    //hide &seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    }
    else {
      toyFormContainer.style.display = "none";
    }
  });
})

/*
Add a New Toy
When a user submits the toy form, two things should happen:

A POST request should be sent to http://localhost:3000/toys and the new toy added to Andy's Toy Collection.
If the post is successful, the toy should be added to the DOM without reloading the page.
In order to send a POST request via fetch(), give the fetch() a second argument of an object. This object should specify the method as POST and also provide the appropriate headers and the JSON data for the request. The headers and body should look something like this:

headers:
{
  "Content-Type": "application/json",
  Accept: "application/json"
}

body: JSON.stringify({
  "name": "Jessie",
  "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
  "likes": 0
})
*/