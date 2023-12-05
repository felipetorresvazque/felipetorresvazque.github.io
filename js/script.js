"use strict";

const form = document.querySelector(".form");
form.addEventListener('submit', function (e) {
  e.preventDefault();
  sendMessage(form);
});

async function sendMessage(form) {
  const formdata = new formdata(form);
  if (formdata) {
    const url = "php/sendMessage.php";
    const response = await fetch(url, {
      method: "POST",
      body: formdata,
    });
    if (response.ok) {
      form.reset();
      alert("form sent !");
    } else {
      alert("form error!");
    }
  }
}
