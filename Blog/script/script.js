
function clireHistoryPost() {
  const liEl = document.querySelectorAll('.history__post__item');
  postsIds.length = 0;
  liEl.forEach(element => {
    element.remove();
  });
};

function sortByKey(array, key) {
  return array.sort(function (a, b) {
    let x = a[key]; let y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

function filters(data) {
  loadContentPost(data);
  const filterNewEl = document.querySelector('.new__filter');
  const filterOldEl = document.querySelector('.old__filter');
  const filteralphabetEl = document.querySelector('.alphabet__filter');
  filterNewEl.addEventListener('click', function () {
    clireHistoryPost()
    data = data.sort(function (a, b) {
      return new Date(a.time) - new Date(b.time);
    });
    loadContentPost(data);
  });
  filterOldEl.addEventListener('click', function () {
    clireHistoryPost()
    data = data.sort(function (a, b) {
      return new Date(b.time) - new Date(a.time);
    });
    loadContentPost(data);
  });
  filteralphabetEl.addEventListener('click', function () {
    clireHistoryPost()
    data = sortByKey(data, 'title');
    loadContentPost(data);
  });
};

const loadContentPost = (array) => {
  const listEl = document.querySelector('.history__list');
  let countStart = 0;
  array.forEach(element => {
    if (countStart < 8 && !postsIds.includes(element.id)) {
      const listItemEl = document.createElement('li');
      listItemEl.classList.add('history__post__item');
      listEl.appendChild(listItemEl);
      const postArticEl = document.createElement('article');
      postArticEl.classList.add('post__article');
      postArticEl.setAttribute('postId', element.id);
      postsIds.push(element.id);
      listItemEl.appendChild(postArticEl);
      const postWrapEl = document.createElement('div');
      postWrapEl.classList.add('post__txt__wrap');
      postArticEl.appendChild(postWrapEl);
      const linkPostOpenEl = document.createElement('a');
      linkPostOpenEl.href = '#';
      linkPostOpenEl.classList.add('post__open__link');
      postWrapEl.appendChild(linkPostOpenEl);
      const postImgEl = document.createElement('img');
      postImgEl.classList.add('post__img');
      postImgEl.setAttribute('alt', 'post pohoto');
      postImgEl.src = element.img;
      linkPostOpenEl.appendChild(postImgEl);
      const postTitleEl = document.createElement('h2');
      postTitleEl.textContent = element.title;
      postTitleEl.classList.add('post__title');
      linkPostOpenEl.appendChild(postTitleEl);
      const postTimeEl = document.createElement('p');
      postTimeEl.classList.add('post__time');
      postTimeEl.textContent = element.time;
      linkPostOpenEl.appendChild(postTimeEl);
      const postTxtEl = document.createElement('p');
      postTxtEl.classList.add('post__txt');
      postTxtEl.textContent = element.txt;
      linkPostOpenEl.appendChild(postTxtEl);
      countStart++;
    }
  });
}

const loudContent = (data) => {
  const buttonLoadEl = document.querySelector('.load__post__button');
  buttonLoadEl.addEventListener('click', () => {
    loadContentPost(data);
  });
}

const genPostLouder = (array) => {
  array = array.sort(function (a, b) {
    return new Date(a.time) - new Date(b.time);
  });
  const sectionGenPostEl = document.querySelector('.general__post');
  const postArticEl = document.createElement('article');
  postArticEl.classList.add('general__post__article');
  postArticEl.setAttribute('postId', array[0].id);
  postsIds.push(array[0].id);
  sectionGenPostEl.appendChild(postArticEl);
  const postWrapEl = document.createElement('div');
  postWrapEl.classList.add('post__txt__wrap');
  postArticEl.appendChild(postWrapEl);
  const linkPostOpenEl = document.createElement('a');
  linkPostOpenEl.href = '#';
  linkPostOpenEl.classList.add('post__open__link');
  postWrapEl.appendChild(linkPostOpenEl);
  const postImgEl = document.createElement('img');
  postImgEl.classList.add('post__img');
  postImgEl.setAttribute('alt', 'post pohoto');
  postImgEl.src = array[0].img;
  linkPostOpenEl.appendChild(postImgEl);
  const postTitleEl = document.createElement('h2');
  postTitleEl.textContent = array[0].title;
  postTitleEl.classList.add('post__title');
  linkPostOpenEl.appendChild(postTitleEl);
  const postTimeEl = document.createElement('p');
  postTimeEl.classList.add('post__time');
  postTimeEl.textContent = array[0].time;
  linkPostOpenEl.appendChild(postTimeEl);
  const postTxtEl = document.createElement('p');
  postTxtEl.classList.add('post__txt');
  postTxtEl.textContent = array[0].txt;
  linkPostOpenEl.appendChild(postTxtEl);
  array = array.filter(o => o.id !== array[0].id)
  filters(array);
  loudContent(array);
};

let data = JSON.parse(dataPosts);
const postsIds = [];
genPostLouder(data);
