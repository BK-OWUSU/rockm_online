//=======================ACCOUNT SETTINGS===================================
const new_password_input = document.getElementById('new_password');
const confirm_password_input = document.getElementById('confirm_password');
const new_password_toggle = document.getElementById('new_password_toggle');
const confirm_password_toggle = document.getElementById('confirm_password_toggle');
const change_password_submit_btn = document.getElementById('change_password_submit_btn');

let isCurrentPasswordVisible = false;
let isNewPasswordVisible = false;
let isConfirmPasswordVisible = false;



new_password_toggle.addEventListener('click', ()=> {
    isNewPasswordVisible = !isNewPasswordVisible;
    if (isNewPasswordVisible) {
        new_password_toggle.innerHTML = '<i class="uil uil-eye"></i>';
        new_password_input.type = "text";
    } else {
        new_password_toggle.innerHTML = '<i class="uil uil-eye-slash"></i>';
        new_password_input.type = "password";
    }
})

confirm_password_toggle.addEventListener('click', ()=> {
    isConfirmPasswordVisible = !isConfirmPasswordVisible;
    if (isConfirmPasswordVisible) {
        confirm_password_toggle.innerHTML = '<i class="uil uil-eye"></i>';
        confirm_password_input.type = "text";
    } else {
        confirm_password_toggle.innerHTML = '<i class="uil uil-eye-slash"></i>';
        confirm_password_input.type = "password";
    }
})
//End

//validating characters and length
// Function to validate password
new_password_input.addEventListener('keyup', ()=> {
    let password = new_password_input.value;
    let password_hint = document.querySelector('.password_hint');
    if (password.length >= 8) {
        password_hint.classList.add('hide')
    }else {
        password_hint.classList.remove('hide')
    }
});
confirm_password_input.addEventListener('keyup', () =>{
    let password_new = new_password_input.value;
    let password_confirm = confirm_password_input.value;
    let password_mismatch = document.querySelector('.password_mismatch');
    if (password_confirm.length >= 8) {
        if (password_new === password_confirm) {
            password_mismatch.classList.remove('show')
        }else{
            password_mismatch.classList.add('show')
        }
    }else {
        password_mismatch.classList.add('show')
    }
})
//End

