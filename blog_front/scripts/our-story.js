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
        let output = ''
        authors.forEach(author => {
            output += `
            <div class="author-item">
            <div class="author-img-cont">
            <img class="author-img" src="http://localhost:3000/${author.avatarURL}" id="avatar-img" alt="">
          </div>
            <div class="author-username"><p>@${author.username}</p></div>
          </div>
            `
        })
        authorsConteiner.innerHTML = output;
        console.log(authors)
    } catch (err) {
        console.log(err)
    }
}

// Events

window.addEventListener('DOMContentLoaded', () => {
    getAllAuthors();
})