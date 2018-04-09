const firstRequest = () => {
    let myRequest = new XMLHttpRequest();
    let player1 = document.getElementById('gladiator1').value;
    myRequest.addEventListener("load", executeThisCodeAfterLoad);
    myRequest.addEventListener("error", executeThisCodeIfXHRFails);
    myRequest.open("GET", `https://teamtreehouse.com/${player1}.json`);
    myRequest.send();
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
}

const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
    addBattleButtonEventListener();
}

const buildPlayerCards = (treeHouseArray) => {
    let domString = "";
    treeHouseArray.forEach((player) => {
        domString += `<h2>${player.name}</h2>
                        <img src="${player.gravatar_url}" alt="person" height="200px" width="200px">
                        <span>${player.points.total}</span>`;
    });
    printToDom(domString, 'playCard');
    winnerWinner(treeHouseArray);
}

const addBattleButtonEventListener = () => {
    const battle = document.getElementById('smashButt');
    battle.addEventListener('click', firstRequest);
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
    winnerPrintOut += `<h2>${winner.name}</h2>`;
        for( let i=0; i<winner.badges.length; i++){
            winnerPrintOut += `<div class="won">
                                <h3>${winner.badges[i].name}</h3>
                                <img src="${winner.badges[i].icon_url}">
                            </div>`;

        }
    printToDom(winnerPrintOut,'wiener');              
}


function executeThisCodeIfXHRFails() {
    console.log('error');
}

function executeThisCodeAfterLoad() {
    const player1Data = JSON.parse(this.responseText);
    secondRequest(player1Data);
}


const startApp = () => {
    addBattleButtonEventListener();
}
startApp();