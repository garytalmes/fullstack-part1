/* ===== selectors ======================== */ 
const form = document.querySelector("form");
const nameInput = document.querySelector("input[name='name']");
const emailInput = document.querySelector("input[name='email']");
const submitBtn = document.querySelector("button");
const msgArea = document.querySelector("#message-here");

function submitFormData(){
  msgArea.innerHTML = "";
  
  const name = nameInput.value 
  const email = emailInput.value

  fetch("/api/contact", {
    method: 'POST',
    body: JSON.stringify({ name, email }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then( resp => resp.json() )
  .then( data => {
    console.log(data)
    if( data.status === 'exists' ){
      msgArea.innerHTML = "<p>You're already signed up!</p>"
    } else if( data.status === 'ok' ){
      msgArea.innerHTML = "<p>You are now signed up!</p>"
    }
  })
  .catch( err => {
    msgArea.innerHTML = "<p>There was a problem with your submission.</p>"
  })
}







/* ===== event listeners ==================== */

form.addEventListener("submit", (event) => {
  event.preventDefault()
  console.log("submit")
  submitFormData()
})