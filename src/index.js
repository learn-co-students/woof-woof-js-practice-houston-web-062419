document.addEventListener("DOMContentLoaded", () => {
    const filter = document.getElementById("good-dog-filter")
    filter.addEventListener("click", () => {
        // filter.innerText == "Filter good dogs: OFF" ? 
    
        const dogbar = document.getElementById("dog-bar")
        fetch("http://localhost:3000/pups")
        .then(res => res.json())
        .then(pups => {
            pups.forEach(pup => {
                const span = document.createElement("span")
                span.innerText = pup.name
                dogbar.append(span)

                span.addEventListener("click", () => {
                    const doginfo = document.getElementById("dog-info")
                        doginfo.innerHTML = ""
                    const img = document.createElement("img")
                        img.src = pup.image
                    const h2 = document.createElement("h2")
                        h2.innerText = pup.name
                    const button = document.createElement("button")
                    pup.isGoodDog == true ? button.innerText = "Good Dog" : button.innerText = "Bad Dog"

                        button.addEventListener("click", () => {
                            fetch(`http://localhost:3000/pups/${pup.id}`, {
                                method: "PATCH",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    isGoodDog: !pup.isGoodDog
                                })
                            })
                            .then(res => res.json())
                            .then(updatedPup => {
                                pup.isGoodDog = updatedPup.isGoodDog
                                updatedPup.isGoodDog == true ? button.innerText = "Good Dog" : button.innerText = "Bad Dog"
                            })
                        })                 
                    doginfo.append(img, h2, button)              
                })
            })
        })  
    })
})

