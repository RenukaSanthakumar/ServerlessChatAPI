const socket = new WebSocket(
"ws://localhost:8080"
);

socket.onopen = () => {
    console.log("Connected");
};

socket.onmessage = (event) => {

    document.getElementById("chat").innerHTML +=
    "<p>" + event.data + "</p>";
};

function sendMessage() {

    const msg =
    document.getElementById("message").value;

    socket.send(
        JSON.stringify({
            action: "sendMessage",
            receiver: "user2",
            message: msg
        })
    );
}
