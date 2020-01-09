const moneyOnStart = 100
const game = new Game(moneyOnStart);
game.changeAmountInInput();
game.showMoneyOnStart(moneyOnStart);

const downArray = document.querySelector('.downResult');
const tableResult = document.querySelector('.game-info__results-table');
const arrowUp = document.querySelector('.fa-arrow-up');
const arrowDown = document.querySelector('.fa-arrow-down');



const showStatistics = () => {

    // tableResult.classList.remove('game-info__results-table');
    // tableResult.classList.add('active');
    tableResult.style.transform = 'translateY(5%)';
    tableResult.style.margin = '0 auto';

    arrowUp.classList.add('inactive');
    arrowUp.classList.remove('active');
    arrowDown.classList.remove('inactive');
    arrowDown.classList.add('active');

}

const hideStatistics = () => {
    arrowUp.classList.remove('inactive');
    arrowUp.classList.add('active');
    arrowDown.classList.remove('active');
    arrowDown.classList.add('inactive');

    tableResult.style.transform = 'translateY(50vh)';
}

arrowUp.addEventListener('click', showStatistics);
arrowDown.addEventListener('click', hideStatistics);