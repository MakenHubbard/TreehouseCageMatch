const startApplication = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load",exceuteThisCodeAfterLoad);
    myRequest.addEventListener("error", executeThisCodeIfXHRFails);
    myRequest.open("GET",);
    myRequest.send();
}

const secondRequest = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load",startApplication);
    myRequest.open("Get",);
    myRequest.send();
}

const addBattleButtonEventListener = () => {
    const battle = document.getElementById('smashButt');
    battle.addEventListener('click', )
    
}

function executeThisCodeIfXHRFails () {
    console.log('error');
}

function executeThisCodeAfterLoad () {
    const data = JSON.parse(this.responseText);

}
