function filterRange() {
  const rangeInput = document.querySelectorAll(".filter__range__input input"),
    priceInput = document.querySelectorAll(".filter__price__input input"),
    range = document.querySelector(".filter__slider .filter__progress");
  let priceGap = 1000;

  range.style.left = 0 + "%";
  range.style.right = 0 + "%";

  priceInput.forEach(input => {
    input.addEventListener("input", e => {
      let minPrice = parseInt(priceInput[0].value),
        maxPrice = parseInt(priceInput[1].value);

      if ((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max) {
        if (e.target.className === "filter__input__min") {
          rangeInput[0].value = minPrice;
          range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
        } else {
          rangeInput[1].value = maxPrice;
          range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
        }
      }
    });
  });

  rangeInput.forEach(input => {
    input.addEventListener("input", e => {
      let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);

      if ((maxVal - minVal) < priceGap) {
        if (e.target.className === "filter__range__min") {
          rangeInput[0].value = maxVal - priceGap
        } else {
          rangeInput[1].value = minVal + priceGap;
        }
      } else {
        priceInput[0].value = minVal;
        priceInput[1].value = maxVal;
        range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
        range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
      }
    });
  });
};

function serachData(param) {
  let temp = {};
  data.forEach(element => {
    if (element.articul === param) {
      temp = element;
    }
  });
  return temp;
};

function basket() {
  const categoriesEl = document.querySelector('.categories');
  categoriesEl.style.display = 'none';
  const shopingEl = document.querySelector('.shoping');
  shopingEl.style.display = 'none';
  const cabinetEl = document.querySelector('.cabinet');
  cabinetEl.style.display = 'none';
  const basketEl = document.querySelector('.basket');
  basketEl.style.display = 'flex';
  addInplace('Корзина');
  basketForming();
};

const basketForming = () => {
  const basketEl = document.querySelector('.basket');
  basketEl.innerHTML = `<div class="basket__products">
  <h2 class="basket__title">Корзина</h2>
  <ul class="basket__prod__list">
  </ul>
</div>
<div class="basket__summ__price">
  <p class="bascket__summ__txt"> Стоимость товаров в корзине:
    <span class="basket__summ__value"></span><span>р</span>
  </p>
  <p class="bascket__summ__txt">Товаров в корзине:
    <span class="basket__summ__items__value"></span>шт
  </p>
</div>
<button class="basket__clear__btn button__hover">Очистить корзину</button>
<form action="#" class="buy__form">
  <span class="buy__txt">Ваш заказ на:
    <span class="basket__summ__value"></span>р
  </span>
  <span class="buy__txt">Количество товаров: <span class="basket__summ__items__value"></span>шт</span>
  <input type="tel" class="buy__phone__number" placeholder="телефон">
  <input type="email" class="buy__email" placeholder="почта">
  <button class="buy__btn button__hover">Заказать</button>
</form>`;
  const busketListEls = document.querySelector('.basket__prod__list');
  for (const key in busketArticules) {
    const dataBusket = serachData(key);
    const liEl = document.createElement('li');
    liEl.classList.add('basket__prod__item');
    liEl.setAttribute('articul', key);
    busketListEls.appendChild(liEl);
    const prodName = document.createElement('span');
    prodName.classList.add('basket__prod__name');
    prodName.textContent = `${dataBusket.title}, цвет: ${dataBusket.color}, размер: ${dataBusket.size}, материал: ${dataBusket.material}`;
    liEl.appendChild(prodName);

    const prodPrice = document.createElement('span');
    prodPrice.classList.add('basket__prod__price');
    prodPrice.textContent = `${dataBusket.price * busketArticules[key]}р`;
    liEl.appendChild(prodPrice);

    const countWrapEl = document.createElement('div');
    countWrapEl.classList.add('basket__prod__count__wrap');
    liEl.appendChild(countWrapEl);

    const inputBasketCount = document.createElement('input');
    inputBasketCount.classList.add('basket__prod__count');
    inputBasketCount.setAttribute('type', "number");
    inputBasketCount.setAttribute('value', busketArticules[key]);
    inputBasketCount.setAttribute('max', "999");
    inputBasketCount.setAttribute('min', "0");
    countWrapEl.appendChild(inputBasketCount);

    const prodCount = document.createElement('span');
    prodCount.classList.add('basket__prod__count__txt');
    prodCount.innerHTML = `шт<svg class="basket__arrow__up" width="24px" height="9px"
      viewBox="0 4 24 1" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18.3174 7.88675C18.708 7.49623 18.708 6.86307 18.3174 6.47254L13.4252 1.58509C12.644 0.804698 11.3783 0.805008 10.5975 1.58579L5.70711 6.47615C5.31658 6.86667 5.31658 7.49984 5.70711 7.89036C6.09763 8.28089 6.7308 8.28089 7.12132 7.89036L11.307 3.70472C11.6975 3.31419 12.3307 3.31419 12.7212 3.70472L16.9032 7.88675C17.2937 8.27728 17.9269 8.27728 18.3174 7.88675Z"
        fill="#0F0F0F" />
    </svg>
    <svg class="basket__arrow__down" width="24px" height="9px" viewBox="0 20 24 1" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.70711 16.1359C5.31659 16.5264 5.31659 17.1596 5.70711 17.5501L10.5993 22.4375C11.3805 23.2179 12.6463 23.2176 13.4271 22.4369L18.3174 17.5465C18.708 17.156 18.708 16.5228 18.3174 16.1323C17.9269 15.7418 17.2937 15.7418 16.9032 16.1323L12.7176 20.3179C12.3271 20.7085 11.6939 20.7085 11.3034 20.3179L7.12132 16.1359C6.7308 15.7454 6.09763 15.7454 5.70711 16.1359Z"
        fill="#0F0F0F" />
    </svg>`;
    countWrapEl.appendChild(prodCount);

    const dellBtnEl = document.createElement('span');
    dellBtnEl.classList.add('basket__prod__dell', 'button__hover');
    dellBtnEl.textContent = 'Удалить';
    liEl.appendChild(dellBtnEl);
  }

  dellOutBusket();
  basketProductCount();
  basketProductSumm();
}

function addToBusket(target) {
  target.addEventListener('click', function () {
    const articulValue = target.getAttribute('articul');
    if (busketArticules[articulValue]) {
      busketArticules[articulValue]++;
    } else {
      busketArticules[articulValue] = 1;
    }
    const basketEl = document.querySelector('.basket');
    if (basketEl.style.display === 'flex') {
    }
    const infoEl = target.querySelector('.prodact__inform');
    infoEl.style.display = 'block';
    setTimeout(() => infoEl.style.display = 'none', 500);
    basketForming();
  });
};

function dellOutBusket() {
  const busketEls = document.querySelectorAll('.basket__prod__dell');
  const clearBtn = document.querySelector('.basket__clear__btn');
  clearBtn.addEventListener('click', () => {
    busketArticules = {};
    basketForming();
  });
  busketEls.forEach(element => {
    element.addEventListener('click', function () {
      const art = element.parentElement.getAttribute('articul');
      for (const key in busketArticules) {
        if (key === art) {
          delete busketArticules[art];
        }
      }
      basketProductSumm();
      element.parentElement.remove();
    });
  });
};

function basketProductCount() {
  const busketEls = document.querySelectorAll('.basket__prod__dell');
  busketEls.forEach(element => {
    const articulValue = element.parentElement.getAttribute('articul');
    const inputEl = element.parentElement.querySelector('.basket__prod__count');
    const priceEl = element.parentElement.querySelector('.basket__prod__price');
    let price = Number(priceEl.textContent.replace('р', '')) / inputEl.value;
    inputEl.addEventListener('change', () => {
      busketArticules[articulValue] = inputEl.value;
      basketProductSumm();
    });
    const arrowUp = element.parentElement.querySelector('.basket__arrow__up');
    const arrowDown = element.parentElement.querySelector('.basket__arrow__down');
    arrowUp.addEventListener('click', () => {
      if (inputEl.value < 999) {
        inputEl.value++;
        busketArticules[articulValue] = inputEl.value;
        priceEl.textContent = `${price * inputEl.value}р`;
        basketProductSumm();
      }
    });
    arrowDown.addEventListener('click', () => {
      if (inputEl.value > 0) {
        inputEl.value--;
        busketArticules[articulValue] = inputEl.value;
        priceEl.textContent = `${price * inputEl.value}р`;
        basketProductSumm();
      }
    });
    inputEl.addEventListener('keyup', () => {
      if (inputEl.value > 999) {
        inputEl.value = '999';
        busketArticules[articulValue] = inputEl.value;
        priceEl.textContent = `${price * inputEl.value}р`;
        basketProductSumm();
      }
      else if (inputEl.value < 0) {
        inputEl.value = '0'
        busketArticules[articulValue] = inputEl.value;
        priceEl.textContent = `${price * inputEl.value}р`;
        basketProductSumm();
      }
      else {
        priceEl.textContent = `${price * inputEl.value}р`;
        basketProductSumm();
      };
    });
  }
  );
};

function basketProductSumm() {
  const basketEl = document.querySelector('.basket');
  const basketProdPriceEls = basketEl.querySelectorAll('.basket__prod__price');
  const basketProdPriceSummEl = basketEl.querySelectorAll('.basket__summ__value');
  const basketProdCountEls = basketEl.querySelectorAll('.basket__prod__count');
  const basketProdCountSummEl = basketEl.querySelectorAll('.basket__summ__items__value');
  let priceCount = 0;
  let prodCount = 0;
  basketProdPriceEls.forEach(element => {
    priceCount += Number(element.textContent.replace('р', ''));
  });
  basketProdPriceSummEl.forEach(element => {
    element.textContent = priceCount;
  });
  basketProdCountEls.forEach(element => {
    prodCount += Number(element.value);
  });
  basketProdCountSummEl.forEach(element => {
    element.textContent = prodCount;
  });
};

function categories() {
  const categoriesEl = document.querySelector('.categories');
  categoriesEl.style.display = 'block';
  const shopingEl = document.querySelector('.shoping');
  shopingEl.style.display = 'none';
  const cabinetEl = document.querySelector('.cabinet');
  cabinetEl.style.display = 'none';
  const basketEl = document.querySelector('.basket');
  basketEl.style.display = 'none';
  addInplace('Категории');
}

function cabinet() {
  const categoriesEl = document.querySelector('.categories');
  categoriesEl.style.display = 'none';
  const shopingEl = document.querySelector('.shoping');
  shopingEl.style.display = 'none';
  const cabinetEl = document.querySelector('.cabinet');
  cabinetEl.style.display = 'flex';
  const basketEl = document.querySelector('.basket');
  basketEl.style.display = 'none';
  addInplace('Личный кабинет');
}

function addInplace(content) {
  const liEl = document.querySelectorAll('.nav__list__item');
  liEl.forEach(element => {
    if (element.firstElementChild.textContent === content) {
      element.firstElementChild.classList.add('inplace');
    } else {
      element.firstElementChild.classList.remove('inplace');
    }
  });
}

function shoplistProdactAdd() {
  const shopingEl = document.querySelector('.shoping');
  const shopingListEl = shopingEl.querySelector('.shoping__list');
  let count = 0;
  data.forEach(element => {
    if (data.length === 0) {
      const titleEl = document.createElement('span');
      titleEl.classList.add('prodact__title');
      titleEl.textContent = 'Товары не найдены';
      shopingListEl.appendChild(titleEl);
    }
    else {
      if (!visibleProdArticuls.includes(element.articul) && count < 9) {
        const liEl = document.createElement('li');
        liEl.classList.add('shoping__item');
        shopingListEl.appendChild(liEl);

        const articleEl = document.createElement('article');
        articleEl.classList.add('prodact', 'button__hover');
        articleEl.setAttribute('articul', element.articul);
        visibleProdArticuls.push(element.articul);
        addToBusket(articleEl);

        liEl.appendChild(articleEl);

        const linkEl = document.createElement('a');
        linkEl.classList.add('prodact__link');
        articleEl.appendChild(linkEl);

        const titleEl = document.createElement('span');
        titleEl.classList.add('prodact__title');
        titleEl.textContent = element.title;
        linkEl.appendChild(titleEl);

        const infoEl = document.createElement('span');
        infoEl.classList.add('prodact__inform');
        infoEl.textContent = 'Добавлено в корзину';
        linkEl.appendChild(infoEl);

        const imgEl = document.createElement('img');
        imgEl.setAttribute('alt', 'prodact');
        imgEl.classList.add('prodact__img');
        imgEl.setAttribute('src', element.imgSrc);
        linkEl.appendChild(imgEl);

        const priceEl = document.createElement('span');
        priceEl.classList.add('prodact__price');
        priceEl.textContent = `${element.price}р, ${element.color}, ${element.material}, ${element.size}`;
        linkEl.appendChild(priceEl);

        const btnEl = document.createElement('button');
        btnEl.classList.add('prodact__btn', 'button__hover');
        btnEl.textContent = 'Купить!';
        linkEl.appendChild(btnEl);

        count++;
      }
    }
  });
}

const AllProducts = () => {
  const categoriesEl = document.querySelector('.categories');
  categoriesEl.style.display = 'none';
  const shopingEl = document.querySelector('.shoping');
  shopingEl.style.display = 'grid';
  const cabinetEl = document.querySelector('.cabinet');
  cabinetEl.style.display = 'none';
  const basketEl = document.querySelector('.basket');
  basketEl.style.display = 'none';
  addInplace('Все товары');
  shoplistProdactAdd();
}

const sorting = () => {
  const selectEl = document.querySelector('.sort__select');
  if (selectEl.value === 'priceDown') {
    data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  }
  else { data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)); }
  selectEl.addEventListener('change', function () {
    visibleProdArticuls.length = 0;
    const shopListItem = document.querySelectorAll('.shoping__item');
    shopListItem.forEach(element => {
      element.remove();
    });
    if (selectEl.value === 'priceDown') {
      data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }
    else { data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)); }
    AllProducts();
  });
}

const actionForming = () => {
  const shopingListEl = document.querySelector('.super__list');
  let count = 0;
  data.forEach(element => {
    if (data.length === 0) {
      const titleEl = document.createElement('span');
      titleEl.classList.add('prodact__title');
      titleEl.textContent = 'Товары не найдены';
      shopingListEl.appendChild(titleEl);
    }
    else {
      const liEl = document.createElement('li');
      liEl.classList.add('super__item');
      shopingListEl.appendChild(liEl);

      const articleEl = document.createElement('article');
      articleEl.classList.add('prodact', 'button__hover', 'absolute');
      articleEl.setAttribute('articul', element.articul);
      addToBusket(articleEl);

      liEl.appendChild(articleEl);

      const linkEl = document.createElement('a');
      linkEl.classList.add('prodact__link');
      articleEl.appendChild(linkEl);

      const titleEl = document.createElement('span');
      titleEl.classList.add('prodact__title');
      titleEl.textContent = element.title;
      linkEl.appendChild(titleEl);

      const infoEl = document.createElement('span');
      infoEl.classList.add('prodact__inform');
      infoEl.textContent = 'Добавлено в корзину';
      linkEl.appendChild(infoEl);

      const imgEl = document.createElement('img');
      imgEl.setAttribute('alt', 'prodact');
      imgEl.classList.add('prodact__img');
      imgEl.setAttribute('src', element.imgSrc);
      linkEl.appendChild(imgEl);

      const priceEl = document.createElement('span');
      priceEl.classList.add('prodact__price');
      priceEl.textContent = `${element.price}р, ${element.color}, ${element.material}, ${element.size}`;
      linkEl.appendChild(priceEl);

      const btnEl = document.createElement('button');
      btnEl.classList.add('prodact__btn', 'button__hover');
      btnEl.textContent = 'Купить!';
      linkEl.appendChild(btnEl);

      count++;
    }
  });
}

const actionScroll = () => {
  const frameEl = document.querySelector('.super__list');
  const leftEl = document.querySelector('.scroll__left');
  const rightEl = document.querySelector('.scroll__right');
  leftEl.addEventListener('mouseover', () => {
    let timerId = setInterval(() => frameEl.scrollBy(-1, 0), 5);
    leftEl.addEventListener('mouseleave', () => {
      clearTimeout(timerId);
    });
  });
  rightEl.addEventListener('mouseover', () => {
    let timerId = setInterval(() => frameEl.scrollBy(1, 0), 5);
    rightEl.addEventListener('mouseleave', () => {
      clearTimeout(timerId);
    });
  });
}

const data = dataProd;
let busketArticules = {};
let visibleProdArticuls = [];
sorting();
filterRange();
categories();
actionForming();
actionScroll();