// Global Variables
let form = document.querySelector('form')

// Functions
let registration = async (e) => {
    e.preventDefault();
    // Variables
    let username = document.getElementById('username').value
    let name = document.getElementById('name').value
    let surname = document.getElementById('surname').value
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    
    let data = {
        username,
        name,
        surname,
        password,
        email
    }
    try{
        const response = await fetch('http://localhost:3000/blog/author/signup', {
            method: 'POST',
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify(data)
        })
        if(response.status != 200) throw await response.json()
         window.location.href = '../pages/login.html'
    }catch(e) {
       console.log(e);
    }
}
// events
form.addEventListener('submit', registration)