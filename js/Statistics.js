class Statistics {

    constructor() {
        this.gamesStatistics = [];
        //tablica w której przechowujemy:
        //wins(info czy wygrana czy przegrana)
        //bid(ilość pieniędzy)
    }

    addGameToStats(win, bid) {
        //dostajemy zmienne: win - boolen spr. czy wygraliśmy i bid - ilosc kasy
        const gameStatistic = {
            win,
            bid
        };
        this.gamesStatistics.push(gameStatistic);


    };

    showGamesStats() {
        const amountGame = this.gamesStatistics.length;
        const wins = this.gamesStatistics.filter(stat => stat.win).length;
        const losses = this.gamesStatistics.filter(stat => !stat.win).length;


        return [wins, losses, amountGame]

    };


}