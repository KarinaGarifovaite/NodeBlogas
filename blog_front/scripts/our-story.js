// Variables
let authorsConteiner = document.querySelector('.authors-cont');



// Functions
getAllAuthors = async () => {
    try {
        let response = await fetch('http://localhost:3000/blog/allAuthors', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

            },
        })
        if (response.status != 200) throw await response.json();
        let authors = await response.json();
        console.log(authors)
    } catch (err) {
        console.log(err)
    }
}

// Events

window.addEventListener('DOMContentLoaded', getAllAuthors)