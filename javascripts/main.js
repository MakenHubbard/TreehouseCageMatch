const startApp = () => {
    let myRequest = new XMLHttpRequest();
    let player1 = document.getElementById('gladiator1').value;
    myRequest.addEventListener("load", executeThisCodeAfterLoad);
    myRequest.addEventListener("error", executeThisCodeIfXHRFails);
    myRequest.open("GET", `https://teamtreehouse.com/${player1}.json`);
    myRequest.send();
    addBattleButtonEventListener();
}
let playerArray = [];
const secondRequest = (player1) => {
    let player2 = document.getElementById('gladiator2').value;
    let anotherRequest = new XMLHttpRequest();
    anotherRequest.addEventListener("load", successAfterPlayer1Load);
    anotherRequest.open("GET", `https://teamtreehouse.com/${player2}.json`);
    anotherRequest.send();
    function successAfterPlayer1Load(player1) {
        const player2Data = JSON.parse(this.responseText);
        playerArray.push(player2Data);
        buildPlayerCards(playerArray);
    }
    addBattleButtonEventListener();
}

const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
}

const buildPlayerCards = (playerArray) => {
    let domString = "";
    playerArray.forEach((playerArray) => {
        domString += `<div class="contestants">
                        <h2 class="whoAreYou">${playerArray.name}</h2>
                        <img class="mug-shot" src="${playerArray.gravatar_url}" alt="person" height="200px" width="200px">
                        <p class="pts">${playerArray.points.total}</p>
                      </div>`
    });
    printToDom(domString, 'playCard');
    winnerWinner(playerArray);
}

const addBattleButtonEventListener = () => {
    const battle = document.getElementById('smashButt');
    battle.addEventListener('click', secondRequest);
}

const winnerWinner = (playerArray) => {
    const peeOne = playerArray[0].points.total;
    const peeTwo = playerArray[1].points.total;
    if (peeOne > peeTwo) {
        printWinnerCard(playerArray[0]);
    } else {
        printWinnerCard(playerArray[1]);
    }
}



const printWinnerCard = (winner) => {
    let winnerPrintOut = "";
    winnerPrintOut += `<h2><u>${winner.name}</u></h2>`;
    for (let i = 0; i < winner.badges.length; i++) {
        winnerPrintOut += `<div class="won">
                                <img class="badgers" src="${winner.badges[i].icon_url}" alt="badg" width="50px" height="50px">
                            </div>`;

    }
    printToDom(winnerPrintOut, 'wiener');
}


function executeThisCodeIfXHRFails() {
    console.log('error');
}

function executeThisCodeAfterLoad() {
    const player1 = JSON.parse(this.responseText);
    playerArray.push(player1);
}
startApp();