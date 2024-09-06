// All Boxes 
let allBtn = document.querySelectorAll(".box");
// Clear Text In Boxes
let clearAll = document.querySelector(".clear-all");
// Start New Game Btn
let newGame = document.querySelector(".new-game");
// MSG Who Won The Game
let msg = document.getElementById("msg");
// Player Turn O or X
var turn = true;

// All Moves Pattern
let allMoves = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Get All box And His Inner Element
allBtn.forEach((box) => {
    box.addEventListener("click", () => {
        // True So Print O
        if (turn === true) {
            box.innerHTML = '<i class="fa-solid fa-o"></i>';
            turn = false;
            // False So Print X
        } else if (turn === false) {
            box.innerHTML = "<i class='fa-solid fa-x'></i>";
            turn = true;
        }
        // Box AllBtn Disabled
        box.disabled = true;

        // Moves Check Function
        checkMoves();

        // Check Tie The Game function
        checkTie();
    })
});

// Check The Pattern Function
const checkMoves = () => {
    for (let i = 0; i < allMoves.length; i++) {
        const winPattern = allMoves[i];
        let pos1 = allBtn[winPattern[0]].innerHTML;
        let pos2 = allBtn[winPattern[1]].innerHTML;
        let pos3 = allBtn[winPattern[2]].innerHTML;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                // O or X win bg color change
                highlightWinningLine(winPattern);
                let msg = document.getElementById("msg");
                msg.innerHTML = `" ${pos1} " WON THE GAME`;
                msg.classList.remove("hide"); // msg Show
                disabledbtn();
                clearAll.classList.add("hide");
                enablebtn();
                resetBtn();
            };
        };
    };
};

// Win pattern bg Color Chnage function
const highlightWinningLine = (winPattern) => {
    winPattern.forEach(index => {
        allBtn[index].classList.add("highlight");
    });
}

// Tie Function
const checkTie = () => {
    let allDisabled = true;
    for (let btn of allBtn) {
        if (!btn.disabled) {
            allDisabled = false;
            break;
        };
    };

    if (allDisabled) {
        msg.innerHTML = "TIE!";
        msg.classList.remove("hide"); // Show tie msg
        clearAll.classList.add("hide");
        enablebtn();
    };
};

// All btn Disabled after the win game
const disabledbtn = () => {
    for (let dis of allBtn) {
        dis.disabled = true;
    };
};

// All butn Enable afetr click new game
const enablebtn = () => {
    for (let dis of allBtn) {
        newGame.classList.remove("hide");  // hide Reset Btn
        newGame.addEventListener("click", () => {
            clearAll.classList.remove("hide"); // Show New Game Btn
            newGame.classList.add("hide");  // Again Show reset btn
            msg.classList.add("hide"); // msg Hide
            dis.disabled = false; // All btn Disabled
            dis.innerHTML = "";   // boxes Empty
            dis.classList.remove("highlight"); // bg Color CLass Hide
        });
    };
};

newGame.addEventListener("click", enablebtn);

newGame.classList.add("hide");


clearAll.addEventListener("click", () => {
    for (let clear of allBtn) {
        clear.innerHTML = "";
        clear.disabled = false;
    };
});