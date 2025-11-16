// Displays the login modal and hides the check popup.
function openLogin() {
    document.getElementById('profileModal').style.display = 'block';
    document.getElementById('checkPopup').style.display = 'none';
}

// Hides the login modal.
function closeLogin() {
    document.getElementById('profileModal').style.display = 'none';
    $('#profileModal').modal('hide');
}

// Hides the registration (signin) modal.
function closeSignin() {
    document.getElementById('registerModal').style.display = 'none';
    $('#registerModal').modal('hide');
}

// Displays the reset password popup and an overlay behind it.
function openPopup() {
    document.getElementById('resetPopup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

// Hides the reset password popup and the overlay.
function closePopup() {
    document.getElementById('resetPopup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

// Hides the check popup using Bootstrap's modal hide function.
function closeCheckPopup() {
    $('#checkPopupModal').modal('hide');
}

// Handles the scenario when the 'OK' button in the check popup is clicked.
function clickOkCheckPopup() {
    $('#profileModal').modal('show');
    $('#checkPopupModal').modal('hide');
}
