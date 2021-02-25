// Global variables
let token;
let logoutButton = document.querySelector('.logout');
let authorEditModal = document.getElementById('authorModal');
let modalSpan = document.getElementsByClassName('modal-close__span')[0];
let editAuthorBtn = document.getElementById('edit-authorInfo');

window.addEventListener('DOMContentLoaded', () => {
  token = localStorage.getItem('author-auth');
  if (!token) window.location.href = '../pages/main.html';
});
// Functions
let logout = async () => {
  localStorage.removeItem('author-auth');
  try {
    const response = await fetch('http://localhost:3000/blog/author/logout', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'author-auth': token },
    });
    if (response.status != 200) throw await response.json();

    window.location.href = '../pages/main.html';
  } catch (e) {
    alert(e);
  }
};

let editAuthor = () => {
  authorEditModal.style.display = 'block';
};

let closeModal = () => {
  authorEditModal.style.display = 'none';
};

// Events

logoutButton.addEventListener('click', logout);
editAuthorBtn.addEventListener('click', editAuthor);
modalSpan.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
  if (e.target == authorEditModal) {
    closeModal();
  }
});
