"use strict"

const form = document.querySelector('.form');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  sendMessage(form);
})

async function sendMessage(form) {
  const formData = new formData(form);
  if (formData) {
    const url = "php/sendMessage.php";
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      form.reset();
      alert("form sent !");
    } else {
      alert("form error!");
    }
  }
}
