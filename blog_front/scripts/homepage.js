// Global variables
let token;
let logoutButton = document.querySelector('.logout');
let authorEditModal = document.getElementById('authorModal');
let modalSpan = document.getElementsByClassName('modal-close__span')[0];
let editAuthorBtn = document.getElementById('edit-authorInfo');
let editBioBtn = document.querySelectorAll('.editBtn');
let saveBioBtn = document.querySelectorAll('.saveBtn');
let publishBtn = document.querySelector('#pub-submit');
let authorPublications = [];

window.addEventListener('DOMContentLoaded', () => {
  token = localStorage.getItem('author-auth');
  if (!token) window.location.href = '../pages/main.html';
  displayProfilePhoto();
  getUsernameOnHeader();
  displayAuthorInfo();
  getAllAuthorPublications();
});
// Functions
let logout = async () => {
  localStorage.removeItem('author-auth');
  try {
    const response = await fetch('http://localhost:3000/blog/author/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'author-auth': token,
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
    const avatariMG2 = document.getElementById('header-avatar');
    if (author.avatarURL === undefined) {
      return (
        (avatariMG.src = '../assets/blank-profile.png'),
        (avatariMG2.src = '../assets/blank-profile.png')
      );
    } else {
      return (
        (avatariMG.src = 'http://localhost:3000/' + author.avatarURL),
        (avatariMG2.src = 'http://localhost:3000/' + author.avatarURL)
      );
    }
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
        'http://localhost:3000/blog/author/uploadProfilePhoto',
        {
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

// author's info in modale

displayAuthorInfo = async () => {
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
    console.log(author);
    let authorName = document.querySelector('#name');
    let authorSurname = document.querySelector('#surname');
    let authorBio = document.querySelector('#bio');

    authorName.value = author.name || '';
    authorSurname.value = author.surname || '';
    authorBio.value = author.bio || '';
  } catch (err) {
    console.log(err);
  }
};

// update and save authors info

updateAndSaveInfo = async () => {
  let name = document.querySelector('#name').value;
  let surname = document.querySelector('#surname').value;
  let bio = document.querySelector('#bio').value;

  let data = {
    name,
    surname,
    bio,
  };

  try {
    const response = await fetch('http://localhost:3000/blog/author/bio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'author-auth': token,
      },
      body: JSON.stringify(data),
    });
    if (response.status != 200) throw await response.json();
    let author = await response.json();
    author.name = name.value;
    author.surname = surname.value;
    author.bio = bio.value;
  } catch (err) {
    console.log(err);
  }
};

// Edit author name and bio

let editInfo = () => {
  let saveNameBtn = document.querySelectorAll('.saveBtn');
  let nameInput = document.querySelector('#name');
  let surnameInput = document.querySelector('#surname');
  let bioInput = document.querySelector('#bio');
  saveNameBtn.forEach((btn) => {
    btn.style.display = 'inline';
  });
  nameInput.readOnly = false;
  surnameInput.readOnly = false;
  bioInput.readOnly = false;
};

// Save publication to server

let savePublication = async (e) => {
  e.preventDefault();

  if (document.getElementById('pub-file').isDefaultNamespace.length === 0)
    return;
  let file = document.getElementById('pub-file').files[0];
  let formData = new FormData();
  let publicationImgUrl;
  formData.append('test', file);
  try {
    const response = await fetch(
      'http://localhost:3000/blog/publication/uploadPublicationPhoto',
      {
        method: 'POST',
        headers: {
          'author-auth': token,
        },
        body: formData,
      }
    );
    if (response.status != 200) throw await response.json();
    console.log(response);
    publicationImgUrl = await response.json();
    console.log(publicationImgUrl);
  } catch (err) {
    console.log(err);
  }

  let title = document.querySelector('#title').value;
  let content = document.querySelector('.publication').value;

  let data = {
    title,
    content,
    imageURL: publicationImgUrl,
  };

  console.log(data);

  try {
    const response = await fetch('http://localhost:3000/blog/publication', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'author-auth': token,
      },
      body: JSON.stringify(data),
    });
    if (response.status != 200) throw await response.json();
    let publication = await response.json();
    console.log(publication);
    authorPublications.push(publication);
    displayAllAuthorPublications(authorPublications);
  } catch (err) {
    console.log(err);
  }
};

// Post all author publications in author home page
let getAllAuthorPublications = async () => {
  try {
    let response = await fetch(
      'http://localhost:3000/blog/authorPublications',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'author-auth': token,
        },
      }
    );
    let items = await response.json();
    console.log(items);
    authorPublications = items;
    displayAllAuthorPublications(items);
  } catch (e) {
    console.log(e);
  }
};
let displayAllAuthorPublications = (items) => {
  let publications = document.querySelector('.my-publications');
  let publicationsItems = '';
  items.forEach((item, index) => {
    publicationsItems += `
      <div class="publicationsContainer">
      <div class="publicationsContainer__btns">
      <button class="btnPreview" onclick="previewPost(${index})">Preview</button>
      <button class="btnEdit" onclick="editPost(${index})">Edit</button>
      <i class="far fa-trash-alt fa-lg" onclick="removeItem('${item._id}', ${index})" style="color: var(--accent-color);"></i>
      </div>
      <div class="publicationsContainer__info">
      <textarea class="textareaTitle" name="text" readonly wrap="soft" maxlength="40" style="resize: none; overflow:hidden" >${item.title}</textarea>
      <img src="http://localhost:3000/${item.imageURL}" id="publication-img" alt="">
      </div>
      <textarea class="content${index} textareaContent" style="display:none"> </textarea>
    </div>
      `;
    publications.innerHTML = publicationsItems;
  });
};
// remove one publication
let removeItem = async (id, index) => {
  try {
    authorPublications.splice(index, 1);
    displayAllAuthorPublications(authorPublications);
    const response = await fetch(
      'http://localhost:3000/blog/publication/' + id,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'author-auth': token,
        },
      }
    );
    location.reload();
  } catch (e) {
    console.log(e);
  }
};
// preview post in author home page
let previewPost =  (index) => {
  let content = document.querySelector(`.content${index}`);
  content.readOnly = true
  content.style.display = "block"
  content.innerText = authorPublications[index].content
};
// edit post in author home page
let editPost = index => {
  let content = document.querySelector(`.content${index}`);
  content.style.display = "block"
  content.innerText = authorPublications[index].content
  content.readOnly = false;
}

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

editBioBtn.forEach((btn) => btn.addEventListener('click', editInfo));
saveBioBtn.forEach((btn) =>
  btn.addEventListener('click', () => {
    updateAndSaveInfo();
    saveBioBtn.forEach((btn) => {
      btn.style.display = 'none';
    });
  })
);

publishBtn.addEventListener('click', savePublication);


