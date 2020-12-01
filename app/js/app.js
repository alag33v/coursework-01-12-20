(function () {
  // Находим родительский элемент
  const newItemsWrapper = document.querySelector('.new-left__wrapper')

  // Динамически загружаем данные из базы данных в секцию сезон 20/21
  async function showProducts() {
    const response = await fetch('http://localhost:2020/data');
    const products = await response.json();

    products.products.map((product) => {
      const newItem = document.createElement('div')
      newItem.classList.add('new-left__item')
      newItemsWrapper.insertAdjacentElement('beforeend', newItem)
      newItem.innerHTML = `
        <div class="new-left__image-wrapper">
          <img class="new-left__image" src="${product.image}" alt="">
        </div>
        <h4 class="new-left__name">${product.name}</h4>
        <strong class="new-left__cost">${product.cost}</strong>`
    })
  }
  showProducts()

  // Находим родительский элемент
  const arrivalsWrapper = document.querySelector('.new__wrapper')

  // Динамически загружаем данные из базы данных в секцию новые поступления
  async function showArrivals() {
    const response = await fetch('http://localhost:2020/data');
    const arrivals = await response.json();

    arrivals.arrivals.map((item) => {
      const newItem = document.createElement('div')
      newItem.classList.add('new__item')
      newItem.setAttribute('data-price', `${item.price}`);
      arrivalsWrapper.insertAdjacentElement('beforeend', newItem)
      newItem.innerHTML = `
        <div class="new__item-wrapper">
          <img class="new__item-image" src="${item.image}" alt="">
        </div>
        <h4 class="new__item-name">${item.name}</h4>
        <strong class="new__item-cost">${item.cost}</strong>`
    })
  }
  showArrivals()

  // Находим кнопку добавить ещё
  const btnMore = document.querySelector('.new__btn')

  btnMore.addEventListener('click', showArrivals)

  // Находим элементы связанные с login
  const headerLoginBtn = document.querySelector('.header__top-login')
  const login = document.querySelector('.login')
  const loginPopup = document.querySelector('.login__popup')
  const closeBtn = document.querySelector('.login__close')
  const loginBtn = document.querySelector('.login__popup-btn')

  headerLoginBtn.addEventListener('click', () => {
    login.classList.add('active')
    loginPopup.classList.add('active')
  })

  closeBtn.addEventListener('click', () => {
    login.classList.remove('active')
  })

  loginBtn.addEventListener('click', () => {
    login.classList.remove('active')
  })

  // Находим элементы связанные с footer и popup
  const btnSubscribeForm = document.querySelector('.form__btn')
  const subscribe = document.querySelector('.subscribe')
  const btnSubscribe = document.querySelector('.subscribe-popup__btn')
  const formInput = document.querySelector('.form__input')

  btnSubscribeForm.addEventListener('click', () => {
    if (formInput.value.includes('@')) {
      subscribe.classList.add('active')
      formInput.style.border = 'none'
      formInput.value = ''
    } else {
      formInput.style.border = '2px solid tomato'
      formInput.value = 'Неверный адрес'
    }
  })

  btnSubscribe.addEventListener('click', () => {
    subscribe.classList.remove('active')
  })

  // Сортируем по цене
  const newWrapper = document.querySelector('.new__wrapper')
  const btnCost = document.querySelector('.new__sort-btn')

  btnCost.addEventListener('click', () => sortBy('data-price'))

  // Функция сортировки
  function sortBy(sortType) {
    for (let i = 0; i < newWrapper.children.length; i++) {
      for (let j = i; j < newWrapper.children.length; j++) {
        if (+newWrapper.children[i].getAttribute(sortType) > +newWrapper.children[j].getAttribute(sortType)) {
          replacedNode = newWrapper.replaceChild(newWrapper.children[j], newWrapper.children[i])
          insertAfter(replacedNode, newWrapper.children[i])
        }
      }
    }
  }

  // Вставить элемент после другого
  function insertAfter(newNode, referenceNode) {
    return referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  // Burger menu
  const wrapper = document.querySelector('.burger__button-wrapper');
  const burger = document.querySelector('.burger__button');
  const menu = document.querySelector('.menu');
  let html = document.querySelector('html');
  let body = document.querySelector('body');

  wrapper.addEventListener('click', (e) => {
    e.preventDefault();
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    html.classList.toggle('block');
    body.classList.toggle('block');
  });

})()