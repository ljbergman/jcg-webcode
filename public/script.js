document.addEventListener("DOMContentLoaded", () => {


        let loginLabel = document.createElement("label");
      loginLabel.setAttribute("for", "login");
      loginLabel.textContent = "LoginX:";
      container.appendChild(loginLabel);


let login = document.createElement("input");
      login.type = "text";
      login.value = "";
      login.placeholder = "your username";
      login.className = "my-input-class";
      login.id = "login";
      container.appendChild(login);


login.addEventListener("change", () => {
    // Your event listener code here
    // you can for example run a function:
    // runThisFunction();
  });


let passwordLabel = document.createElement("label");
      passwordLabel.setAttribute("for", "password");
      passwordLabel.textContent = "Password:";
      container.appendChild(passwordLabel);


let password = document.createElement("input");
      password.type = "password";
      password.value = "";
      password.placeholder = "your password";
      password.className = "my-input-class";
      password.id = "password";
      container.appendChild(password);


let textarea1Label = document.createElement("label");
      textarea1Label.setAttribute("for", "textarea1");
      textarea1Label.textContent = "Password:";
      container.appendChild(textarea1Label);


let textarea1 = document.createElement("textarea");
    textarea1.innerText = "test";
    textarea1.className = "my-input-class";
    textarea1.id = "textarea1";
    container.appendChild(textarea1);


let submit = document.createElement("button");
    submit.innerText = "Send";
    submit.className = "my-button-class";
    submit.id = "submit";
    container.appendChild(submit);


submit.addEventListener("click", () => {
    // Your event listener code here
    // you can for example run a function:
    // runThisFunction();
  });



    
        



    });