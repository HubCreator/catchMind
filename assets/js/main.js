const body = document.querySelector("body");
const loginForm = document.getElementById("jsLogin");
const nickname = localStorage.getItem("nickname");

const LOGGED_OUT = "loggedOut";
const LOGGED_IN = "loggedIn";

if (nickname === null) {
  body.className = LOGGED_OUT;
} else {
  body.className = LOGGED_IN;
}

const handleFormSubmit = e => {
  e.preventDefault();
  const input = loginForm.querySelector("input");
  const { value } = input;
  input.value = "";
};

if (loginForm) {
  loginForm.addEventListener("submit", handleFormSubmit);
}
