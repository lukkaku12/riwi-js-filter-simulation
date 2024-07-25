import { navigateTo } from "../../../Router";

export function NotFoundPageComponent() {
  const $root = document.getElementById('root')
  $root.innerHTML = `
  <div>
  <p>404 - Page not Found</p>
  <p>you will be redirected lo register in a few seconds</p>
  </div>
  `;

  setTimeout(() => {
    navigateTo('/register')
  }, 8000)
}
