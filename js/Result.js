class Result {

    static checkWin(drawResult) {
        if (drawResult[0] === drawResult[1] && drawResult[1] === drawResult[2]) {
            return true;
        }
    }

    static moneyWonInGame(bid, check) {
        if (check) return bid * 5
        else return 0;
    }

}