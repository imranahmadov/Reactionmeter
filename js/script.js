let alertMessage = document.getElementById("alertMessage");
let btnTryAgain = document.getElementById("btnTryAgain");
let main = document.getElementsByTagName("main")[0];
let tableBody = document.getElementById("tbody");
let table = document.getElementById("thetable");
let startTime;
let timeCounter;
let count = 0;
let results = [];
let sum = 0;
let testLimit = 5;

main.classList.add("lightblue");
table.classList.add("d-none");

main.onmousedown = function() {
    if (results.length != testLimit) {
        btnTryAgain.classList.add("d-none");
        if (main.className.includes("lightblue")) {
            switchFromBlueToRed();
        } else if (main.className.includes("red")) {
            main.classList.remove("red");
            main.classList.add("lightblue");
            alertMessage.innerText = "Too soon!";
            main.children[1].innerText = "Click to try again.";
            main.children[1].classList.remove("d-none");
            clearTimeout(timeCounter);
            return;
        } else {
            main.classList.remove("green");
            main.classList.add("lightblue");
            elapsedTime = Date.now() - startTime;
            alertMessage.innerText = elapsedTime + " ms";
            main.children[1].innerText = "Click to keep going";
            main.children[1].classList.remove("d-none");
            if (results.length < testLimit) {
                results.push(elapsedTime);
                count++;
                if (results.length >= 1) {
                    sum += elapsedTime;
                    let tableRow = document.createElement("tr");

                    let tableHeader = document.createElement("th");
                    tableHeader.setAttribute("scope", "row");
                    tableHeader.innerText = count;

                    let tableCell = document.createElement("td");
                    tableCell.innerHTML = elapsedTime;

                    let tableCell2 = document.createElement("td");
                    tableCell2.innerHTML = (sum / results.length).toFixed(0);

                    tableRow.append(tableHeader, tableCell, tableCell2);
                    tableRow.setAttribute("style", `background-color: rgba(${(elapsedTime / 1000) * 255}, ${255-(elapsedTime / 1000) * 255 }, 0, 0.8) !important`);
                    tableBody.append(tableRow);
                    table.classList.remove("d-none");
                }
            }
            if (results.length == testLimit) {
                main.children[1].classList.add("d-none");
                btnTryAgain.classList.remove("d-none");
            }
        }
    }
}

btnTryAgain.onclick = function() {
    testLimit += 5;
    btnTryAgain.classList.add("d-none");
    switchFromBlueToRed();
}

function switchFromBlueToRed() {
    main.classList.remove("lightblue");
    main.classList.add("red");
    let randVar = (Math.random() * 2.5 + 1.5) * 1000;
    randVar = randVar.toFixed(0);
    alertMessage.innerText = "Wait for green";
    main.children[1].classList.add("d-none");
    main.children[2].classList.add("d-none");
    timeCounter = setTimeout(function() {
        main.classList.remove("red");
        main.classList.add("green");
        alertMessage.innerText = "Click";
        startTime = Date.now();
    }, randVar);
    return;
}