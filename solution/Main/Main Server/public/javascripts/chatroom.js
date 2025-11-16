// Establish a socket connection using the Socket.IO library.
const socket = io();

// Variables to hold the username and chatroom name.
let username = "";
let chatroom = "";

// Function to handle login button click.
// It retrieves the username and chatroom from the input fields and redirects the user to the chatroom page.
function click_login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById("password").value;
    const chatroom = document.getElementById('chatroom').value;

    if (username.trim() === "" || password.trim() === "" || chatroom.trim() === "") {
        $('#checkPopupModal').modal('show');
        $('#profileModal').modal('hide');
    } else {
        window.location.href=`http://localhost:3000/html/chatroom.html?username=${username}&chatroom=${chatroom}`;
    }
}

// Function to initialize the chatroom.
// It sets up the chat interface, including event listeners for sending messages and handling socket events.
function init_chatroom() {
    // Extracts username and chatroom from the URL parameters.
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    const chatroom = urlParams.get('chatroom');
    setChat(chatroom, username);

    // DOM elements for the chat interface.
    const ul_chatroom = document.getElementById("ul_chatroom");
    const message = document.getElementById("message");
    const sendButton = document.getElementById("sendButton");
    const logoutButton = document.getElementById('logoutButton');
    const changeButton = document.getElementById('changeButton');

    // Hides the chatroom list if it's empty.
    if (ul_chatroom.childElementCount === 0) {
        ul_chatroom.style.display = 'none';
    }

    // Event listeners for logout, send, and change room buttons.
    logoutButton.addEventListener('click', function () {
        click_logout(chatroom, username);
    });

    logoutButton.addEventListener('click', function () {
        click_logout(chatroom, username);
    });

    sendButton.addEventListener('click', () => {
        sendMessage(message, username, chatroom);
    });

    changeButton.addEventListener('click', function () {
        click_change(chatroom, username);
    });

    // Sends the message when the Enter key is pressed.
    message.addEventListener('keypress', function (event) {
        if(event.key === 'Enter') {
            sendMessage(message, username, chatroom);
            return false;
        }
    });

    // Socket event for receiving a new message.
    socket.on('chat message', (msg, name) => {
        ul_chatroom.style.display = 'block';
        let user = (name === username) ? "Me" : name;
        const li = document.createElement('li');
        li.textContent = user + ": " +msg;
        ul_chatroom.appendChild(li);
    });

    // Socket event for notifying when a user joins the conversation.
    socket.on('create or join conversation', (name) => {
        if (name === username) return;
        ul_chatroom.style.display = 'block';
        const li = document.createElement('li');
        li.textContent = name + ": " + "has joined the conversation";
        ul_chatroom.appendChild(li);
    });
}

// Function to set the chatroom.
// It emits a 'create or join conversation' event and updates the UI accordingly.
function setChat(chatroom, username) {
    socket.emit('create or join conversation', chatroom, username);
    localStorage.setItem('username', username);
    localStorage.setItem('chatroom', chatroom);
    document.getElementById('welcome').innerHTML= "Welcome to " + chatroom + " room";
}

// Function to handle logout.
// It clears the local storage, emits a 'leave room' event, and redirects the user to the homepage.
function click_logout(chatroom, username) {
    window.location.href="../html/homepage.html";
    localStorage.clear();
    socket.emit('leave room', chatroom, username);
    chatroom = null;
}

// Function to handle changing the chatroom.
// It emits a 'leave room' event for the current room and redirects the user to the new chatroom.
function click_change(chatroom, username) {
    const changeroomInput = document.getElementById("chatroom");
    const changeroomValue = changeroomInput.value.trim();

    if (changeroomValue === "") {
        alert("Please enter a room name.");
    } else {
        socket.emit('leave room', chatroom, username);
        const chatroomNew = document.getElementById("chatroom").value;
        window.location.href=`../html/chatroom.html?username=${username}&chatroom=${chatroomNew}`;
        setChat(chatroomNew, username);
    }

}

// Function to handle sending a message.
// It emits a 'chat message' event with the message content, username, and chatroom.
function sendMessage(message, username, chatroom) {
    const messageValue = message.value.trim();

    if(messageValue !== "") {
        socket.emit('chat message', chatroom, messageValue, username);
        message.value = '';
    }
    else {
        // Nothing.
    }
}