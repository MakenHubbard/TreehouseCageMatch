const startApp = () => {
    let myRequest = new XMLHttpRequest();
    let player1 = document.getElementById('gladiator1').value;
    myRequest.addEventListener("load", executeThisCodeAfterLoad);
    myRequest.addEventListener("error", executeThisCodeIfXHRFails);
    myRequest.open("GET", `https://teamtreehouse.com/${player1}.json`);
    myRequest.send();
    addBattleButtonEventListener(player1Data);
}

const secondRequest = (player1Data) => {
    let player2 = document.getElementById('gladiator2').value;
    let playerArray = [];
    let anotherRequest = new XMLHttpRequest();
    anotherRequest.addEventListener("load", successAfterPlayer1Load);
    anotherRequest.open("GET", `https://teamtreehouse.com/${player2}.json`);
    anotherRequest.send();
    function successAfterPlayer1Load() {
        const player2Data = JSON.parse(this.responseText);
        playerArray.push(player1Data, player2Data);
        buildPlayerCards(playerArray);
    }
    addBattleButtonEventListener();
}

const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
}

const buildPlayerCards = (treeHouseArray) => {
    let domString = "";
    treeHouseArray.forEach((player) => {
        domString += `<div class="contestants">
                        <h2 class="whoAreYou">${player.name}</h2>
                        <img class="mug-shot" src="${player.gravatar_url}" alt="person" height="200px" width="200px">
                        <p class="pts">${player.points.total}</p>
                      </div>`
    });
    printToDom(domString, 'playCard');
    winnerWinner(treeHouseArray);
}

const addBattleButtonEventListener = () => {
    const battle = document.getElementById('smashButt');
    battle.addEventListener('click', secondRequest);
}

const winnerWinner = (winnerArray) => {
    let winnerString = "";
    const peeOne = winnerArray[0].points.total;
    const peeTwo = winnerArray[1].points.total;
    if (peeOne > peeTwo) {
        printWinnerCard(winnerArray[0]);
    } else {
        printWinnerCard(winnerArray[1]);
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
    const player1Data = JSON.parse(this.responseText);
    //secondRequest(player1Data);
}


// const startApp = () => {
//     addBattleButtonEventListener();
// }
startApp();