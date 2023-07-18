const collMyLink = () => {
  const linkEl = document.querySelector('#collMy');
  linkEl.addEventListener('click', function () {
    alert(`Просто номер телефона, можно было не нажымать, но раз уж Вы нажали, то вон он Вам еще раз: 8(992)043-75-18`)
  });
}
collMyLink();