class Draw {

    constructor() {
        this.options = ['apple.png', 'banana.png', 'lemon.png', 'orange.png', 'plum.png'];
        //zmienna prywatna, do której mamy dostęp tylko dzięki metodzie getDrawResult
        this._result = this.drawResult();
    }

    getDrawResult() {
        return this._result;
    }

    drawResult() {
        const randomOptions = [];
        for (let i = 0; i < 3; i++) {
            const index = Math.floor(Math.random() * this.options.length);
            randomOptions.push(this.options[index]);
        }

        return randomOptions;
    }

}