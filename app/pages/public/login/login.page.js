import { navigateTo } from "../../../Router";

export function LoginPageComponent() {
  const $root = document.getElementById('root');
  $root.innerHTML = /*html*/ `
    <main>
      <div class="form-container">
        <h1>Login</h1>
        <form id="form-login">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" name="email" id="emailsito" required>
          </div>
          <div class="form-group">
            <label for="password">Contraseña:</label>
            <input type="password" name="password" id="password" required>
          </div>
          <button type="submit">Iniciar sesion</button>
        </form>
      </div>
    </main>
  `;


  // -*********************************************************-
  // Logica del Login
  const $formRegister = document.getElementById('form-login');
  const $emailInput = document.getElementById('emailsito');
  const $passwordInput = document.getElementById('password');


  

  $formRegister.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log($emailInput.value)
    if ( !$emailInput || !$passwordInput) {
      alert('fill in all fields!')
      return
    };
    try {
      const response = await fetch('http://localhost:4000/users')
      if (response.ok) {
        const users = await response.json();
        console.log(users)
        const foundUser = users.find((user) => user.email === $emailInput.value)
        console.log(foundUser)
        if (!foundUser) {
          alert('usuario no valido');
          return
        };
        const passwordAuth = foundUser.password === $passwordInput.value;
       if (!passwordAuth){
          alert('verifique la contrasenia');
        };

        const token = Math.random().toString(36).substring(2)

        localStorage.setItem('token', token);
        localStorage.setItem('roleId', foundUser.roleId);
        alert('usuario autenticado con exito');
        navigateTo('/dashboard/products')
      }
    } catch (error) {
      console.error(error, 'incorrecto')
    }

    
  })
}
