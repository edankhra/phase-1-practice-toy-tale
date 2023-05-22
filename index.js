/*let addToy = false;

function updateLikes(id, newNumberOfLikes){
  fetch(`http://localhost:3000/toys/${id}`,{
    method : "PATCH",
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
/*
Access the list of toys from an API (mocked using JSON Server) and render each of them in a "card" on the page


Hook up a form that enables users to add new toys. Create an event listener so that, when the form is submitted, the new toy is persisted to the database and a new card showing the toy is added to the DOM


Create an event listener that gives users the ability to click a button to "like" a toy. When the button is clicked, the number of lik
*/
/*function creatCardElement(toy){
  //make a <div calss = "card">
  //creat div
  let card = document.createElement("div");
  //add card class
  card.classList.add("card");

  let h2 = document.createElement("h2");
  h2.textContent = toy.name;

  let img = document.createElement("img");
  img.src = toy.image;
  img.classList.add ("toy-avatar");

  let p = document.createElement("p");
  p.textContent = `${toy.likes} Likes`;

  let button = document.createElement("button")
  button.addEventListener("click", () => {
    //update lekes element
    p.textContent = `${toy.likes += 1}Likes`;
    //patch
    updateLikes(toy.id, toy.likes )
    })
  button.classList.add("like-btn")
  button.id = toy.id
  button.textContent = "Like ❤️"

  card.append(h2, img, p, button)
  document.getElementById("toy-collection").appendChild(card);
}

function sendItOut(newToy){
  fetch("http://localhost:3000/toys",{
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
    (res) => res.json()
  )
  .then(resToy => creatCardElement(resToy))

}



document.addEventListener("DOMContentLoaded", ()=> {
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(toys => toys.forEach(toy => creatCardElement(toy)))


    const form = document.querySelector("form.add-toy-form");
    form.addEventListener("submit", (event) =>{
      event.preventDefault();
      const formData = Object.fromEntries(new
       FormData(event.target));
       console.log(formData);
       sendItOut(formData)
    })

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", ()=> {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy){
      toyFormContainer.getElementsByClassName.display = "block";
    } else {
      toyFormContainer.getElementsByClassName.display = "none";
    }
  });
}); */

const URL = 'http://localhost:3000/toys'
const addBtn = document.querySelector('#new-toy-btn')
const toyFormCont = document.querySelector('.container')
const toyForm = document.querySelector('.add-toy-form')
const toyCollection = document.getElementById('toy-collection')
let addToy = false

// YOUR CODE HERE

toyForm.addEventListener('submit',function(e){
  e.preventDefault();
  let toyName = e.target.children.name.value
  let toyImgUrl = e.target.children.image.value
  e.target.children.name.value = ''
  e.target.children.image.value = ''
  createNewToy(toyName,toyImgUrl)
  .then(json => createToyCard(json))
})

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyFormCont.style.display = 'block'
    // submit listener here
  } else {
    toyFormCont.style.display = 'none'
  }
})

function thatsSoFetch(){
  fetch(URL)
  .then(res => res.json())
  .then(json => {
    console.log(json)
     createToyCards(json)
  })
}

function createToyCards(toys){
  for(let i = 0;i < toys.length;i++){
    let toy = toys[i];
    createToyCard(toy)
    }
}

function createToyCard(toy){
  let toyDivCard = document.createElement('div')
  toyDivCard.className = 'card' 
  let toyh2 = document.createElement('h2')
  toyh2.innerText = toy.name
  let toyImg = document.createElement('img')
  toyImg.src = toy.image
  toyImg.className = 'toy-avatar'
  let toyLikes = document.createElement('p')
  toyLikes.innerText = toy.likes + " Likes";
  let toyLikeButton = document.createElement('button')
  toyLikeButton.className = 'toy-btn'
  toyLikeButton.innerText = "Like 💖"
  toyLikeButton.addEventListener('click', function(){
    toy.likes++
    fetch(URL + "/" + toy.id, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: toy.name, image: toy.image, likes: toy.likes})
    })
    .then(res => res.json())
    .then(json => {
      toyLikes.innerText = toy.likes + " Likes";
    })
  })
  toyCollection.appendChild(toyDivCard)
  toyDivCard.appendChild(toyh2)
  toyDivCard.appendChild(toyImg)
  toyDivCard.appendChild(toyLikes)
  toyDivCard.appendChild(toyLikeButton)
}

function createNewToy(name,url){
  return fetch(URL,{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name: name, image: url, likes: 0})
  })
  .then(res => res.json())
}

// function addLike(toy, toyLikes){
//   toy.likes++
//   fetch(URL + "/" + toy.id, {
//     method: 'PUT',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({name: toy.name, image: toy.image, likes: toy.likes})
//   })
//   .then(res => res.json())
//   .then(json => {
//     toyLikes.innerText = toy.likes + " Likes";
//   })
// }

thatsSoFetch()



