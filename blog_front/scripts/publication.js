function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

let publicationId = getParameterByName('publicationID');

window.addEventListener('DOMContentLoaded', () => {
  // token = localStorage.getItem('author-auth');
  getPublication(publicationId);
});

let getPublication = async (id) => {
  try {
    const response = await fetch(
      'http://localhost:3000/blog/publicationInfo/' + id,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status != 200) throw await response.json();
    let publication = await response.json();
    displayPublication(publication);
    console.log(publication);
  } catch (err) {
    console.log(err);
  }
};

let displayPublication = (publication) => {
  let publicationPlace = document.querySelector('.publicationContainer');
  let publicationItem = '';
  publicationItem = `
      <div class="container-about">
      <div class="container-about__title">
        <h1>${publication.title}</h1>
      </div>
      <div class="container-about__author">
        <div class="author__img">
          <img
            id="header-avatar"
            class="img-conteiner"
            src="http://localhost:3000/${publication.author.avatarURL}"
            alt=""
          />
        </div>
        <div class="author-info">
          <h4>${publication.author.name} ${publication.author.surname}</h4>
          <p>${publication.publicationDate}</p>
        </div>
      </div>
    </div>
    <div class="container-main">
      <div class="container-main__img">
        <img src="http://localhost:3000/${publication.imageURL}" alt="" />
      </div>
      <div class="container-main__story">${publication.content}
      </div>
    </div>
    <hr />
    <div class="container-feedback">
      <div class="feedback__claps">
        <i class="fas fa-heart"></i>
        <p>2 claps</p>
      </div>
      <div class="feedback__comments">
        <i class="far fa-comment"></i>
        <p>2 comments</p>
      </div>
    </div>
        `;
  publicationPlace.innerHTML = publicationItem;
};
