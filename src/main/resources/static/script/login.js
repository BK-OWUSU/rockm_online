const password_input = document.getElementById('password');
const password_toggle = document.getElementById('password_toggle');

let isPasswordVisible = false;

password_toggle.addEventListener('click', ()=> {
    isPasswordVisible = !isPasswordVisible;
    if (isPasswordVisible) {
        password_toggle.innerHTML = '<i class="uil uil-eye"></i>';
        password_input.type = "text";
        } else {
            password_toggle.innerHTML = '<i class="uil uil-eye-slash"></i>';
            password_input.type = "password";
        }
})
