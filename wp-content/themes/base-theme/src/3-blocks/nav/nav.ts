import './nav.scss';

export default function nav(el: HTMLElement) {
  const primaryNavItems = el.getElementsByClassName('nav__primary-link');

  Array.from(primaryNavItems).forEach((primaryNavItem) => {
    primaryNavItem.addEventListener('click', (e) => {
      if ((primaryNavItem.parentElement as HTMLElement).classList.contains('menu-item-has-children')) {
        e.preventDefault();
        (primaryNavItem.parentElement as HTMLElement).classList.toggle('open');
      }
    });
  });
}
