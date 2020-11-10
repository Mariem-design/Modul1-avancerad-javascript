//Global constants
const username = location.hash.slice(1), //Retrieves what is put after the # in the URL
  listPeersButton = document.querySelector(".list-all-peers-button");
//Creates a new peer object
peer = new Peer(`${username}`, {
  host: "glajan.com",
  port: 8443,
  path: "/myapp",
  secure: true,
});
//Displays the userID on screen
peer.on("open", (id) => {
  const myPeerIdEl = document.querySelector(".my-peer-id");
  myPeerIdEl.innerText = id;
});
peer.on("error", (errorMessage) => {
  console.error(errorMessage);
});
//Updates the list of online users when the Refresh list button is pressed
listPeersButton.addEventListener("click", () => {
  const peersEl = document.querySelector(".peers");
  let list = "";
  peer.listAllPeers((peers) => {
    let listArray = [];
    let newPeers = peers.filter((id) => id != username);
    newPeers.forEach((element) => {
      listArray =
        listArray +
        `<li><button class="connect-button peerId-${element}">${element}</button></li>`;
    });
    list = "<ul>" + listArray.toString("") + "</ul>";
    peersEl.innerHTML = list;
    //Array of all buttons
    const peersButton = document.querySelectorAll(".connect-button");
    peersButton.forEach((element) => {
      element.addEventListener("click", () => {
        console.log(element.classList[1]);
      });
    });
  });
});
