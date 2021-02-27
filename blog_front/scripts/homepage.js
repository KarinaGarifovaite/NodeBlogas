// Global variables
let token;
let logoutButton = document.querySelector('.logout');
let authorEditModal = document.getElementById('authorModal');
let modalSpan = document.getElementsByClassName('modal-close__span')[0];
let editAuthorBtn = document.getElementById('edit-authorInfo');

window.addEventListener('DOMContentLoaded', () => {
  token = localStorage.getItem('author-auth');
  if (!token) window.location.href = '../pages/main.html';
  displayProfilePhoto();
  getUsernameOnHeader();
});
// Functions
let logout = async () => {
  localStorage.removeItem('author-auth');
  try {
    const response = await fetch('http://localhost:3000/blog/author/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'author-auth': token
      },
    });
    if (response.status != 200) throw await response.json();

    window.location.href = '../pages/main.html';
  } catch (e) {
    alert(e);
  }
};

let editAuthor = () => {
  authorEditModal.style.display = 'block';
  displayProfilePhoto();
};

let closeModal = () => {
  authorEditModal.style.display = 'none';
};

let getUsernameOnHeader = async () => {
  try {
    const response = await fetch('http://localhost:3000/blog/author', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'author-auth': token,
      },
    });

    if (response.status != 200) throw await response.json();
    let author = await response.json();
    const helloUsernamePlace = document.getElementById('helloUsername');
    helloUsernamePlace.innerText = `${author.username}!`;
    console.log(author);
  } catch (e) {
    console.log(e);
  }
};

let displayProfilePhoto = async () => {
  try {
    const response = await fetch('http://localhost:3000/blog/author', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'author-auth': token,
      },
    });

    if (response.status != 200) throw await response.json();
    let author = await response.json();
    const avatariMG = document.getElementById('avatar-upload');
    avatariMG.src = 'http://localhost:3000/' + author.avatarURL;
    const avatariMG2 = document.getElementById('header-avatar');
    avatariMG2.src = 'http://localhost:3000/' + author.avatarURL;
    console.log(avatariMG.src);
  } catch (e) {
    console.log(e);
  }
};

document
  .getElementById('profile-img-input')
  .addEventListener('change', async (e) => {
    // e.preventDefault();
    // e.stopPropagation();
    if (
      document.getElementById('profile-img-input').isDefaultNamespace.length ===
      0
    )
      return;
    let file = document.getElementById('profile-img-input').files[0];
    let formData = new FormData();
    formData.append('test', file);
    try {
      const response = await fetch(
        'http://localhost:3000/blog/author/uploadProfilePhoto', {
          method: 'POST',
          headers: {
            'author-auth': token,
          },
          body: formData,
        }
      );
      // return false;
      // let author = response.json();
      displayProfilePhoto();
      console.log(response);
      // let uploadedAvatarPlace = document.getElementById('uploadedAvatarPlace');
      // let child = uploadedAvatarPlace.firstElementChild;
      // uploadedAvatarPlace.removeChild(child);

      // const avatariMG = document.getElementById('avatar-upload');
      // uploadedAvatarPlace.innerHTML = `<img class="profile-img" id="avatar-upload" src="http://localhost:3000/${author}"></img>`;
      // avatariMG.src = 'http://localhost:3000/' + author.avatarURL;
    } catch (e) {
      console.log(e);
    }
    // return false;
  });

// Events

logoutButton.addEventListener('click', logout);

editAuthorBtn.addEventListener('click', editAuthor);

modalSpan.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
  if (e.target == authorEditModal) {
    closeModal();
  }
});

document.getElementById('avatar-upload').addEventListener(
  'click',
  () => {
    const fileInput = document.getElementById('profile-img-input');
    if (fileInput) {
      fileInput.click();
    }
  },
  false
);