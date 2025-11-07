import './nav.scss';

export default function nav(el: HTMLElement) {
  const primaryNavItems = el.getElementsByClassName('nav__primary-link');

  Array.from(primaryNavItems).forEach((primaryNavItem) => {
    primaryNavItem.addEventListener('click', (e) => {
      if ((primaryNavItem.parentElement as HTMLElement).classList.contains('menu-item-has-children')) {
        e.preventDefault();
        const toggleState = (primaryNavItem.parentElement as HTMLElement).classList.contains('open');
        Array.from(primaryNavItems).forEach((item) => (item.parentElement as HTMLElement).classList.remove('open'));
        if (!toggleState) {
          (primaryNavItem.parentElement as HTMLElement).classList.add('open');
        }
        else {
          (primaryNavItem.parentElement as HTMLElement).classList.remove('open');
        }
      }
    });
  });
}
