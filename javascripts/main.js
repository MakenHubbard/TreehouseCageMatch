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
            playerArray.push(player1Data,player2Data);
            buildPlayerCards(playerArray);
            console.log(playerArray);
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
}

const addBattleButtonEventListener = () => {
    const battle = document.getElementById('smashButt');
    battle.addEventListener('click', firstRequest);
    winnerWinner();
    printWinnerCard();
}

const winnerWinner = (winnerArray) => {
    let winnerString = "";
    for(let i=0; i<winnerArray; i++){
       const peeOne = winnerArray[0].points.total;
       const peeTwo = winnerArray[1].points.total;
       if (peeOne > peeTwo){
           return peeOne;
       } else {
           return peeTwo;
       }
    }
    printWinnerCard (winnerString, 'wiener')
}



const printWinnerCard = (winnerString, divId) => {
    document.getElementById(divId).innerHTML;
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