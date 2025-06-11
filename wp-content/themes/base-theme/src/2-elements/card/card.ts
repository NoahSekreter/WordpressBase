import './card.scss';

export default function card(el: HTMLElement) {
  el.getElementsByClassName('card__cover')[0].addEventListener('click', () => {
    el.getElementsByClassName('card__cover')[0].classList.toggle('open');
  });

  // let cardContent = <HTMLElement>el.getElementsByClassName('card__content')[0];
  // cardContent.setAttribute('style', 'height: ' + cardContent.clientHeight + 'px;');
}
