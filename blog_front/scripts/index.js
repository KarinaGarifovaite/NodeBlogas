// Global variables
let token;
let logoutButton = document.querySelector('.logout')

// Functions
let logout = async () => {
    localStorage.removeItem('author-auth')
    try {
        let response = await fetch('http://localhost:3000/blog/author/logout', {
            method: 'GET',
            headers: {"Content-Type": 'application/json',
            "auth-token": token}
        })
        if(response.status != 200) throw await response.json()
        window.location.href = '../pages/main.html'
    }catch(e) {
        alert(e)
    }
}

// Events 
window.addEventListener('DOMContentLoaded', () => {
    let token = localStorage.getItem('author-auth')
    if(!token) window.location.href = '../pages/login.html'
})

logoutButton.addEventListener('click', logout)