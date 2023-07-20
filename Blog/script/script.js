/* <article class="post__article">
  <div class="post__txt__wrap">
    <a href="#" class="post__open__link">
      <img src="img/test.jpg" alt="img  post" class="post__img" height="160">
      <h2 class="post__title"></h2>
      <p class="post__txt"></p>
    </a>
  </div>
</article>  */

const postsIds = [];
const data = JSON.parse(dataPosts);
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
loadContentPost(data);
const buttonLoadEl = document.querySelector('.load__post__button');
buttonLoadEl.addEventListener('click', () => {
  loadContentPost(data);
});