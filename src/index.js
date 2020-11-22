const URL = "http://localhost:3000/pups"

document.addEventListener('DOMContentLoaded', () => {
    displayDogs()
})

function displayDogs() {
    fetch(URL)
    .then(resp => resp.json())
    .then(json => addDoggos(json))
}

function addDoggos(dogs) {
    dogs.forEach(dog => {
        const dogBar = document.querySelector('#dog-bar')
        const span = document.createElement('span') 

        span.innerText = dog.name
        
        dogBar.appendChild(span)
        
        span.addEventListener('click', () => {
            removeDoggo()
            viewDoggo(dog)          
        })
        
    })

    const sortBtn = document.querySelector('#good-dog-filter')
    sortBtn.addEventListener('click', (e) => sortDogs(e, dogs))
}

function viewDoggo(dog) {
    const dogInfo = document.querySelector('#dog-info')
    const pic = document.createElement('img')
    const dogName = document.createElement('h2')
    const btn = document.createElement('button')
    
    pic.setAttribute('src', dog.image)  

    dogName.innerText = dog.name   

    btn.innerText = dogRating(dog)
    btn.addEventListener('click', (ev) => changeDoggoRating(ev, dog))
    
    dogInfo.append(pic, dogName, btn)
}

function removeDoggo() {
    const dogInfo = document.querySelector('#dog-info')
    while (dogInfo.firstChild) {
        dogInfo.removeChild(dogInfo.firstChild);
      }
}

function dogRating(dog) {
    if (dog.isGoodDog) {
        return "Good Dog!"
    } else {
        return "Bad Dog!"
    }
}

function changeDoggoRating(event, dog) {
    const id = dog.id
    dog.isGoodDog = !dog.isGoodDog
    
    const dogObj = {
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        }, 
        body: JSON.stringify({isGoodDog: dog.isGoodDog = dog.isGoodDog})
    }
    
    fetch(URL + `/${id}` , dogObj)
    .then(resp => resp.json())
    .then(console.log)
    
    if (dog.isGoodDog) {
        event.target.innerText = "Good Dog!"
    } else {
        event.target.innerText = "Bad Dog!"
    }
}

function sortDogs(e, dogs) {

    if (e.target.innerText == "Filter good dogs: OFF") {
        e.target.innerText = "Filter good dogs: ON"
        renderGoodDogs(dogs)
    } else {
        e.target.innerText = "Filter good dogs: OFF"
        renderBadDogs(dogs)
    }
}

function renderGoodDogs(dogs) {
    const dogBar = document.querySelector('#dog-bar')
    const dogNames = document.querySelectorAll('span')                                

    dogNames.forEach(span => span.removeAttribute('style'))
    dogs.forEach(dog => {
        if (!dog.isGoodDog) {
            dogNames.forEach(span => {
                if (span.innerText == dog.name) {
                    span.setAttribute('style', 'display:none')
                }
            })
        }
    })
}

function renderBadDogs(dogs) {
    const dogBar = document.querySelector('#dog-bar')
    const dogNames = document.querySelectorAll('span')

    dogNames.forEach(span => span.removeAttribute('style'))
    dogs.forEach(dog => {
        if (dog.isGoodDog) {
            dogNames.forEach(span => {
                if (span.innerText == dog.name) {
                    span.setAttribute('style', 'display:none')
                }
            })
        }
    })
}

