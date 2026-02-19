// card number validation

function isCardNumberValid(number) {
  return number === "1234123412341234";
}

function displayMessage(msg) {
	// display error message
	document.querySelector('#confirmation').textContent = msg
}

function submitHandler(event) {
  event.preventDefault();
  let errorMsg = "";
  displayMessage("");

  let cardNumber = document.querySelector("#cardNumber");
  const cardNum = cardNumber.value.trim();

  // Check if it's numeric and valid in one go
  if (!/^\d{16}$/.test(cardNum)) {
    errorMsg += "Card number must be 16 digits. ";
  } else if (!isCardNumberValid(cardNum)) {
    errorMsg += "Card number is not valid. ";
  }

  //check date
  const expYear = Number(document.querySelector("#year").value);
  const expMonth = Number(document.querySelector("#month").value);
  const currentDate = new Date();

  if (
    2000 + expYear < currentDate.getFullYear() ||
    (2000 + expYear === currentDate.getFullYear() && expMonth <= currentDate.getMonth())
  ) {
    errorMsg += "Card is expired. ";
  }

  if (errorMsg !== "") {
    // there was an error. stop the form and display the errors.
    displayMessage(errorMsg);
    return;
  }
  // Success: show a confirmation message
  displayMessage('Success!');
}

document.querySelector("#card-form").addEventListener("submit", submitHandler);
