import './media-block.scss';

export default function mediaBlock(el: HTMLElement) {
  el.addEventListener('click', () => {
    el.classList.toggle('media-block--active');
  });
}
