(function () {
  let dataConnection = null;
  const peersEl = document.querySelector(".peers");
  const sendButtonEl = document.querySelector(".send-new-message-button");
  const newMessageEl = document.querySelector(".new-message");
  const messagesEl = document.querySelector(".messages");
  const listPeersButtonEl = document.querySelector(".list-all-peers-button");
  const theirVideoContainer = document.querySelector(".video-container.them");
const videoOfMeEl = document.querySelector("video-container.them")

  navigator.mediaDevices
  .getUserMedia({audio: false, video: true})
  .then((stream) => {
    videoOfMeEl.muted = true;
    videoOfMeEl.srcObject = stream;
  });
  const printMessage = (text, who) => {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message", who);
    messageContainer.innerHTML = `<div>"${text}<div/>`;
    messagesEl.append(messageEl);
    messagesEl.scrolltop = messagesEl.scrollHeight;
  };

  //Get peer id.(hash) from URL.

  const myPeerId = location.hash.slice(1);

  //Connect to peer server.
  let peer = new Peer(myPeerId, {
    host: "glajan.com",
    port: 8443,
    path: "/myapp",
    secure: true,
    config: {},
  });

  peer.on("open", (id) => {
    document.querySelector(".my-peer-id").innerText = id;
  });
  peer.on("error", (errorMessage) => {
    console.error(errorMessage);
  });
  peer.on("connection", (connection) => {
    console.log(connection);
    const event = new CustomEvent("peer-changed", { detail: connection.peer });
    document.dispatchEvent(event);
  });

  //Event listener for click. "Refresh list"
  // TODO
   listPeersButtonEl.addEventListener("click", (e) => { 
       peer.listAllPeers((peers)=>{
           // Create a list of peers
           <li> button class="connect-button peerId"${peer}</li> 
       })
 });

  //Eventlistener for click on peerbutton
  //TODO

  //Event listener for custom event 'peer-changed'.
  document.addEventListener("peer-changed", (e) => {
    const peerId = e.detail;

    //Get clicked button.
    const connectButtonEl = document.querySelector(""

    //Remove class 'connected' from button.
    document.querySelectorAll ("connect-button.connected").forEach((button) =>

    //Add class 'connected' to clicked button.
    connectButtonEl && connectButtonEl.classList.add("connected");

    //Listen for incoming data/textmessage.
    dataConnection.on("data", (textMessage) => {
      printMessage(textMessage, "them");
    });

    //Set focus on text input field.
    newMessageEl.focus();

    //Sets name under video.
    theirVideoContainer.querySelector(".name").innerText = peerId;
    theirVideoContainer.classList.add("connected");
    theirVideoContainer.querySelector(".start").classList.add("active");
    theirVideoContainer.querySelector(".start").classList.add("active");
  });

  //Event listener for click on "send".
  const sendMessage = (e) => {
    if (!dataConnection) return;
    if (e.type === 13) {
      dataConnection.send(newMessageEl.value);
      printMessage(newMessageEl.value, "me");

      //Clear text input field
      newMessageEl.value = "";
    }
  };

  //Event listeners for "send".
  sendButtonEl.addEventListener("click", sendMessage);
  newMessageEl.addEventListener("keyup", sendMessage);

  //Event listener for click 'Start video chat'.
  const startVideoButton = theirVideoContainer.querySelector(".start");
  const stopVideoButton = theirVideoContainer.querySelector(".stop");
  startVideoButton.addEventListener("click", () => {
    startVideoButton.classList.remove("active");
    stopVideoButton.classList.add("active");
  });
})();
