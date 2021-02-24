// Global variables
let token;
let logoutButton = document.querySelector('.logout')

window.addEventListener('DOMContentLoaded', () => {
    token = localStorage.getItem('author-auth')
    if(!token) window.location.href = '../pages/main.html'
})
// Functions
let logout = async () => {
    localStorage.removeItem('author-auth')
    try {
        const response = await fetch('http://localhost:3000/blog/author/logout', {
            method: 'GET',
            headers: {"Content-Type": 'application/json',
            "author-auth": token}
        })
        if(response.status != 200) throw await response.json()
        
        window.location.href = '../pages/main.html'
        
    }catch(e) {
        alert(e);
    }
}

// Events 

logoutButton.addEventListener('click', logout)