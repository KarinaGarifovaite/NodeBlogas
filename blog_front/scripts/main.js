window.addEventListener('DOMContentLoaded', () => {
  token = localStorage.getItem('author-auth');
  getAllPublications();
});

let getAllPublications = async () => {
  try {
    let response = await fetch('http://localhost:3000/blog/publication', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'author-auth': token,
      },
    });
    let items = await response.json();
    console.log(items);
    publications = items;
    displayAllPublications(items);
  } catch (e) {
    console.log(e);
  }
};
let displayAllPublications = (items) => {
  let publications = document.querySelector('.sec-2');
  let publicationsItems = '';
  items.forEach((item, index) => {
    publicationsItems += `
    <div class="publicationContainer">
    <div class="one-of-publication">

        <div class="author">
          <div>
            <img src="http://localhost:3000/${item.author.avatarURL}" id="avatar-img" alt="">
          </div>
          <div>
            <p>${item.author.name} ${item.author.surname}</p>
          </div>
        </div>

        <a href="../pages/publication.html?publicationID=${item._id}">
          <div class="publication">
            <div>
              <img src="http://localhost:3000/${item.imageURL}" id="publication-img" alt="">
            </div>
            <div class="publication-content">
              <input class="authorTitle" value="${item.title}" readonly>
              <textarea class="authorContent" readonly>${item.content}</textarea>
            </div>
          </div>
        </a>
      </div>
    </div>
      `;
    publications.innerHTML = publicationsItems;
  });
};
