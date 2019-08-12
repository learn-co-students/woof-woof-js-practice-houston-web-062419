document.addEventListener("DOMContentLoaded", function() {


fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(dogs => {
        dogs.forEach(dog => {
            renderDog(dog)
    })
})

function renderDog(dog){
    const dogBar = document.querySelector('#dog-bar');
    const span = document.createElement('span')

    span.innerText = dog.name
    // span.setAttribute("dog-id", dog.id)
    
    span.addEventListener('click', (event)=> {
        fetch(`http://localhost:3000/pups/${dog.id}`)
        .then(res => res.json())
        .then(res => showDogs(dog))

    })
    dogBar.append(span)

}

function showDogs(dog){
    const dogDiv = document.querySelectorAll("#dog-info")[0]
    dogDiv.innerText = ""

    const image = document.createElement("img")
    image.src = dog.image

    const name = document.createElement('h2')
    name.innerText = dog.name

    const dogIsGood = document.createElement('button')
    dogIsGood.dataset.id = dog.id;
    if (dog.isGoodDog){
        dogIsGood.innerText = 'Good Dog!';
      }else{
        dogIsGood.innerText = 'Bad Dog!';
      }

    dogDiv.append(image, name, dogIsGood)


    dogIsGood.addEventListener('click', (event) => {
        let id = event.target.dataset.id

        if(dogIsGood.innerText === 'Good Dog!'){
            dogIsGood.innerText = 'Bad Dog!';
            dogtoggle(id, {isGoodDog: false}) ;
          
          }else{
            dogIsGood.innerText = 'Good Dog!';
            dogtoggle(id, {isGoodDog: true}) 
            // dog.isGoodDog = "Good Dog!"
          }
  

    })

    function dogtoggle(id, change){
        fetch(`http://localhost:3000/pups/${id}`, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify(change)
        })
        .then(res => res.json());
      }
  


}

})


