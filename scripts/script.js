document.addEventListener('DOMContentLoaded', () => {

    const getData = (url, callback) => {
        const request = new XMLHttpRequest();
        request.open("GET", url); //1 ready-state 
        request.send();
        request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) return;
            if (request.status === 200) {
                const response = JSON.parse(request.response)
                callback(response);
            } else {
                console.log(new Error('Ошибка:' + request.status))
            }
        })
    };
    //         const getData = (url, callback) => {   //Через fetch и Promise запрос обрабатываем
    //             fetch(url)
    //                 .then((response) => {
    //                     if (response.ok) {
    //                         return response.json();
    //                     }
    //                     new Error (response.statusText)

    //    })
    //                 .then(callback)
    //                 .catch((err) => {
    //                    console.log(err)
    //  })
    //         }

    const tabs = () => {
        const cardDetailChangeElems = document.querySelectorAll('.card-detail__change')
        const cardDetailsTitleElem = document.querySelector('.card-details__title')
        const cardImageItemElem = document.querySelector('.card__image_item')
        const cardDetailPriceElem = document.querySelector('.card-details__price')
        const descriptionMemory = document.querySelector('.description__memory')
        const data = [
            {
                name: 'Смартфон Apple iPhone 12 Pro 128GB Graphite',
                img: 'img/iPhone-graphite.png',
                price: 60000,
                memoryROM: 128
            },
            {
                name: 'Смартфон Apple iPhone 12 Pro 128GB Silver',
                img: 'img/iPhone-silver.png',
                price: 100000,
                memoryROM: 256
            },
            {
                name: 'Смартфон Apple iPhone 12 Pro 128GB Pacific Blue',
                img: 'img/iPhone-blue.png',
                price: 120000,
                memoryROM: 256
            }
        ];
        const deactive = () => {
            cardDetailChangeElems.forEach(btn => btn.classList.remove('active'))
        }
        cardDetailChangeElems.forEach((btn, i) => {
            btn.addEventListener("click", () => {
                if (!btn.classList.contains('active')) {
                    deactive();
                    btn.classList.add('active')

                    cardDetailsTitleElem.textContent = data[i].name;
                    cardImageItemElem.src = data[i].img;
                    cardImageItemElem.alt = data[i].name;
                    cardDetailPriceElem.textContent = data[i].price + "₽"
                    descriptionMemory.textContent = `Встроенная память (ROM) ${data[i].memoryROM} ГБ`;
                }
            });
        })
    };
    // const accordion=()=>{
    //    const characteristicsTitle=document.querySelectorAll('.characteristics__title')
    //    const characteristicsDescription=document.querySelectorAll('.characteristics__description')

    //    characteristicsTitle.forEach((elem,i) => {
    //       elem.addEventListener('click', ()=>{
    //           elem.classList.toggle('active');
    //           characteristicsDescription[i].classList.toggle('active')
    //       });
    //    });
    // };

    const accordion = () => {
        characteristicsListElem = document.querySelector('.characteristics__list');
        characteristicsItemElems = document.querySelectorAll('.characteristics__item');

        characteristicsItemElems.forEach(elem => {
            if (elem.children[1].classList.contains('active')) {
                elem.children[1].style.height = `${elem.children[1].scrollHeight}px`
            }

        })

        const open = (button, dropDown) => {
            closeAllDrops(button, dropDown)
            dropDown.style.height = `${dropDown.scrollHeight}px`;
            button.classList.add('active')
            dropDown.classList.add('active')
        }

        const close = (button, dropDown) => {
            button.classList.remove('active');
            dropDown.classList.remove('active');
            dropDown.style.height = '';
        }
        const closeAllDrops = (button, dropDown) => {
            characteristicsItemElems.forEach((elem) => {
                close(elem.children[0], elem.children[1]);

            })
        }

        characteristicsListElem.addEventListener('click', (event) => { // Делегирование, вешаем событие в целом на окно на область например на область дивку с лишками( со списками)
            const target = event.target;
            if (target.classList.contains('characteristics__title')) {
                const parent = target.closest('.characteristics__item') //Получаем родителя кнопки через closest
                const description = parent.querySelector('.characteristics__description')
                description.classList.contains('active') ? close(target, description)
                    : open(target, description)
            }
        })
        document.body.addEventListener('click', (event) => {
            const target = event.target
            if (!target.closest('.characteristics__list')) {
                closeAllDrops()
            }
        })
    };
    const modal = () => {
        const cardDetailsButtonBuy = document.querySelector('.card-details__button_buy')
        const cardDetailsButtonDelivery = document.querySelector(".card-details__button_delivery")
        const modal = document.querySelector('.modal')
        const cardDetailsTitle = document.querySelector('.card-details__title')
        const modalTitle = document.querySelector('.modal__title')
        const modalSubTitle = document.querySelector('.modal__subtitle')
        const modalTitleSubmit = document.querySelector('.modal__title-submit ')


        const openModal = (event) => {
            const target = event.target
            modal.classList.add('open')
            document.addEventListener("keydown", escapeHandler)
            modalTitle.textContent = cardDetailsTitle.textContent
            modalTitleSubmit.value = cardDetailsTitle.textContent
            modalSubTitle.textContent = target.dataset.buttonBuy
        }
        const closeModal = () => {
            modal.classList.remove('open')
            document.removeEventListener("keydown", escapeHandler)
        }

        const escapeHandler = event => {
            if (event.code === 'Escape') {
                modal.classList.remove('open')
            }
        }

        modal.addEventListener('click', (event) => {
            const target = event.target
            if (target.classList.contains('modal__close') || target === modal) {
                closeModal()

            }
        })
        cardDetailsButtonBuy.addEventListener('click', openModal)
        cardDetailsButtonDelivery.addEventListener('click', openModal)
    }

    const renderCrossSell = () => {
        const crossSellList = document.querySelector('.cross-sell__list')
        const allGoods = [];
        const buttonShowAllGoods = document.querySelector('.cross-sell__add');

        const createCrossSellItem = (good) => {
            const liItem = document.createElement('li')
            liItem.innerHTML = `
          <article class="cross-sell__item">
							<img class="cross-sell__image" src=${good.photo} alt=${good.name}>
							<h3 class="cross-sell__title">${good.name}</h3>
							<p class="cross-sell__price">${good.price}₽</p>
							<button type='button' class="button button_buy cross-sell__button">Купить</button>
						</article>`;
            return liItem;
        };
        const renderButtonShowAll = (arr) => {
            arr.forEach(item => {
                crossSellList.append(createCrossSellItem(item));
            })
                }

          const wrapper=(fn, count)=> {
              console.log(count)
              let counter=0;
              return (...args)=> {
                  if(counter==count) return;
                counter++;
                return fn(...args)
              }
          }      
const wrapperRenderButtonShowAll= wrapper(renderButtonShowAll,2)

        const createCrossSellList = (goods = []) => { //Если не передали ничегор в goods передаем пустой массив,иначе ошибка iterable
            allGoods.push(...goods)
            // crossSellList.textContent = ''; //Содержимое контента обнуляем, чтоб только 4 показывало элемента,иначе видно все будет 13шт
            MathRandomArray(allGoods);
            console.log(allGoods)
            const fourItems = allGoods.splice(0, 4); //Слайс оставляет 4  элемента из массива сплайс вырезает их
            console.log(allGoods)
            wrapperRenderButtonShowAll(fourItems);
               
            // setTimeout(createCrossSellList, 5000)
            
        }
        buttonShowAllGoods.addEventListener('click',()=> {
            wrapperRenderButtonShowAll(allGoods);
        })
        getData('cross-sell-dbase/dbase.json', createCrossSellList)
    }
  
    
    const MathRandomArray = (goods) => {
        goods.sort(() => Math.random() - 0.5);
    }
   
    tabs();
    accordion();
    modal();
    renderCrossSell();
    amenu('.header__menu', '.header-menu__list', '.header-menu__item', '.header-menu__burger');

});