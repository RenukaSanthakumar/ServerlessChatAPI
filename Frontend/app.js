const socket = new WebSocket(
"wss://your-api-id.execute-api.ap-south-1.amazonaws.com/dev"
);

const chatBox =
document.getElementById("chat");

const messageInput =
document.getElementById("message");


// Connection opened

socket.onopen = () => {

    console.log("Connected to WebSocket");

};


// Receive message

socket.onmessage = (event)=>{

    displayMessage(
        event.data,
        "received"
    );

};


// Error handling

socket.onerror = (error)=>{

    console.log(
        "WebSocket Error:",
        error
    );

};


// Connection closed

socket.onclose = ()=>{

    console.log(
        "Disconnected"
    );

};


function sendMessage(){

    const message =
    messageInput.value.trim();


    if(message==="")
        return;

    const data = {

        action:"sendMessage",
        receiver:"user2",
        message:message

    };

    socket.send(
        JSON.stringify(data)
    );

    displayMessage(
        message,
        "sent"
    );

    messageInput.value="";

}


function displayMessage(
message,
type
){

    const div =
    document.createElement("div");

    div.className =
    "message " + type;

    const time =
    new Date()
    .toLocaleTimeString([],{
        hour:"2-digit",
        minute:"2-digit"
    });

    div.innerHTML = `

        ${message}

        <span class="time">
        ${time}
        </span>

    `;

    chatBox.appendChild(div);

    chatBox.scrollTop =
    chatBox.scrollHeight;

}


// Send message using Enter key


messageInput.addEventListener(
"keypress",
function(event){

    if(event.key==="Enter"){

        sendMessage();

    }

});
