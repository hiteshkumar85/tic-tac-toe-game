let boxContainer = document.getElementsByClassName('container');
let boxes = document.querySelectorAll('.box');

let turnO = true;
let count = 0;
let newBtn = document.querySelector('#newBtn');
let msg = document.querySelector('#msg p');
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const disableBox = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBox = () => {
    for (let box of boxes) {
        box.innerHTML = "";
        box.disabled = false;
    }
    turnO = true;
    count = 0;
    msg.innerHTML = "";
    newBtn.style.display = "none";
}

const showResult = (pos1Val) => {
    msg.innerHTML = `Congratulation ! Winner is ${pos1Val}`;
    newBtn.style.display = "block";
    disableBox();
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerHTML;
        let pos2Val = boxes[pattern[1]].innerHTML;
        let pos3Val = boxes[pattern[2]].innerHTML;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val == pos2Val && pos2Val == pos3Val) {
                showResult(pos1Val);
                return true;
            }
        }

    }
};

const gameDraw = () => {
    msg.innerHTML = "Game Draw";
    newBtn.style.display = "block";
    disableBox();
};

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (turnO) {
            box.innerHTML = 'O';
            turnO = false;
        }
        else {
            box.innerHTML = 'X';
            turnO = true;
        }

        count++;
        box.disabled = true;

        let isWinner = checkWinner();
        if (count == 9 && !isWinner) {
            gameDraw();
        }
    });
});

document.querySelector('#resetBtn').addEventListener('click', enableBox);
newBtn.addEventListener('click', enableBox);