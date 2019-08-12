
let filterGoodDogs = false
let dog_array  = []

document.addEventListener("DOMContentLoaded", () => {


	const filterButton = document.querySelector("#good-dog-filter")
	filterButton.addEventListener("click", () => {
		filterGoodDogs = !filterGoodDogs
		if (filterGoodDogs == false) {
			filterButton.innerText = "Filter good dogs: OFF"
		} else {
			filterButton.innerText = "Filter good dogs: ON"
		}
		draw_bar(dog_array)
	})

	dogs = fetch("http://localhost:3000/pups")
        .then(res => res.json())
        .then(json => {
			dog_array = json
            draw_bar(json)
        })
})

function draw_bar(json) {
	const maindiv = document.querySelector("#dog-bar")
	maindiv.innerHTML = ""
	for (var i = 0; i < json.length; i++) {
     	if ((json[i].isGoodDog != true) && (filterGoodDogs == true))
        	maindiv.appendChild(add_info(json[i]))

        if (filterGoodDogs == false)
        	maindiv.appendChild(add_info(json[i]))
    }
}

function add_info(dog) {
	const span = document.createElement("span")
    span.innerText = dog.name

    span.addEventListener("click", function(){
    	const infodiv = document.querySelector("#dog-info")
    	infodiv.innerHTML = ""

    	const img = document.createElement("img")
    	img.src = dog.image
    	infodiv.appendChild(img)

    	const name = document.createElement("h2")
    	name.innerText = dog.name
    	infodiv.appendChild(name)

    	const status = document.createElement("button")
    	if (dog.isGoodDog == true)
    		status.innerText = "Good Dog!"
    	else
    		status.innerText = "Bad Dog!"
    	infodiv.appendChild(status)

    	status.addEventListener("click", () => {
    		if (status.innerText === "Good Dog!"){
    			status.innerText = "Bad Dog!"
    			dog.isGoodDog = true
    		}
    		else{
    			status.innerText = "Good Dog!"
    			dog.isGoodDog = false
    		}

			fetch(`http://localhost:3000/pups/${dog.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                      Accept: "application/json"
                },
                body: JSON.stringify({
                    isGoodDog: dog.isGoodDog
                        
                })
            })
            .then(res => res.json())
            .then(json => {              
               console.log(json)             
            })

    	})


    })
    return span
}