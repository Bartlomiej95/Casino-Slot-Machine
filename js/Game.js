class Game {
    constructor(start) {
        this.stats = new Statistics()
        this.wallet = new Wallet(start);

        document.querySelector('#start').addEventListener('click', this.startGame.bind(this));
        this.bid = document.querySelector('#bid');
        this.wins = document.querySelector('#win');
        this.loss = document.querySelector('#loss');
        this.amountGames = document.querySelector('#number');
        this.gameArea = [...document.querySelectorAll('.board__area')];
        this.moneyInWallet = document.querySelector('.game-info__wallet');
        this.infoAboutWon = document.querySelector('.game-info__checkWin');
        this.btn1plus = document.querySelector('.game-info__btnAdd1');
        this.btn1minus = document.querySelector('.grid3');
        this.btn5plus = document.querySelector('.grid4');
        this.btn5minus = document.querySelector('.grid5');
        this.btnAll = document.querySelector('.grid6');

        this.valueInputMoney = document.getElementById('bid');

        this.showMoneyOnStart = (start) => {
            return this.moneyInWallet.textContent = start;
        }
    }

    changeAmountInInput() {

        this.btn1plus.addEventListener('click', () => {
            console.log(this.valueInputMoney.value)
            if (this.valueInputMoney.value === '') {
                console.log(`Pusty ${this.valueInputMoney.value}`)
                this.valueInputMoney.value = 1;
            } else {
                console.log(`Niepusty ${this.valueInputMoney.value}`);
                const btnAmount = 1;
                const result = this.wallet.addMoney(this.valueInputMoney.value, btnAmount);
                this.valueInputMoney.value = result;
            }
        });

        this.btn1minus.addEventListener('click', () => {
            console.log(this.valueInputMoney.value)
            if (this.valueInputMoney.value === '' || this.valueInputMoney.value <= 0) {
                this.valueInputMoney.value = 0;

            } else {
                console.log(`Niepusty ${this.valueInputMoney.value}`);;
                const btnAmount = -1;
                const result = this.wallet.addMoney(this.valueInputMoney.value, btnAmount)
                this.valueInputMoney.value = result;
            }
        });

        this.btn5plus.addEventListener('click', () => {
            console.log(this.valueInputMoney.value)
            if (this.valueInputMoney.value === '') {
                console.log(`Pusty ${this.valueInputMoney.value}`)
                this.valueInputMoney.value = 5;
            } else {
                console.log(`Niepusty ${this.valueInputMoney.value}`);
                const btnAmount = 5;
                const result = this.wallet.addMoney(this.valueInputMoney.value, btnAmount);
                this.valueInputMoney.value = result;
            }
        });

        this.btn5minus.addEventListener('click', () => {
            console.log(this.valueInputMoney.value)
            if (this.valueInputMoney.value === '' || this.valueInputMoney.value <= 0) {
                this.valueInputMoney.value = 0;

            } else {
                console.log(`Niepusty ${this.valueInputMoney.value}`);;
                const btnAmount = -5;
                const result = this.wallet.addMoney(this.valueInputMoney.value, btnAmount)
                this.valueInputMoney.value = result;
            }
        });
        this.btnAll.addEventListener('click', () => {
            const btnAmount = this.wallet.getWalletValue();
            this.valueInputMoney.value = btnAmount;
        });
    }

    startGame() {

        let inputMoney = Math.floor(this.bid.value);
        console.log(this.valueInputMoney.value);



        if (inputMoney < 1) {
            return alert("Podana kwota jest zbyt mała");
        }
        if (!this.wallet.checkCanPlay(inputMoney)) {
            return alert("Nie masz tylu środków na koncie");
        }

        this.wallet.changeWallet(inputMoney, '-');

        const draw = new Draw();
        //pobieramy wyniki losowania w postaci tablicy ['', '', '']
        const resultDrawing = draw.getDrawResult();
        //sprawdzamy czy wygraliśmy
        const checkWin = Result.checkWin(resultDrawing);
        //musimy zmienic stan pieniędzy w zależności od rezultatu
        const wonMoney = Result.moneyWonInGame(inputMoney, checkWin);
        // znamy już kwotę o jaką zmienimy - teraz musimy zmienic ilosc kasy w portfelu
        const amountInWallet = Math.floor(this.wallet.changeWallet(wonMoney));
        const money = this.wallet.getWalletValue();
        //zmieniamy tablicę wyników
        const statsChange = this.stats.addGameToStats(checkWin, wonMoney);
        const actualStats = this.stats.showGamesStats();


        //Cały nasz bajer polega na tym, że do diva dodajemy w funkcji render znaczniki img i poprzez ingerencje w ich src dodajemy zdjęcia do naszych 3 pól gier
        //Mieliśmy problem z tym, że cały czas funkcja render dodawała nam img, przez co zdjęcia na siebie się nakładały, 
        //Dlatego musielismy usunąć zdjęcia z poprzedniego losowania
        //Dodajemy tę funkcjonalność w funkcji startGame, żeby nastąpiło to zaraz po kolejnym kliknieciu przez gracza przycisku zakręc
        //Powoduje to, że stare zdjęcia znikną, a w ich miejsce pojawią się nowe 
        const imgInDiv = [...document.querySelectorAll('.board__area img')];

        if (imgInDiv.length === 3) {
            this.gameArea.forEach((area, index) => {
                area.removeChild(imgInDiv[index]);
            })
        }

        this.render(inputMoney, resultDrawing, checkWin, wonMoney, money, actualStats);
    }

    render(bid = 0, resultDrawing = ['gray', 'gray', 'gray'], checkWin = false, wonMoney = 0, money = this.wallet.getWalletValue(), stats = [0, 0, 0]) {

        // console.log(this.gameArea);
        // const imgElement = document.createElement('img');
        // imgElement.src = `./img/${resultDrawing[0]}`;

        // this.gameArea[0].appendChild(imgElement);

        this.gameArea.forEach((area, index) => {
            // area.style.backgroundColor = resultDrawing[index];
            // const imgInDiv = [...document.querySelectorAll('.board__area img')];
            // console.log(imgInDiv);
            const imgTable = [];
            const imgEl = document.createElement('img');
            imgTable.push(imgEl);


            imgEl.src = `./img/${resultDrawing[index]}`;

            area.appendChild(imgEl);

        });

        if (checkWin) {
            this.infoAboutWon.textContent = `Gratulacje ! Wygrałeś ${wonMoney}`;
            this.infoAboutWon.style.color = "green";
        } else {
            this.infoAboutWon.textContent = "Przegrałeś :( Gramy dalej !";
            this.infoAboutWon.style.color = "red";
        }
        this.moneyInWallet.textContent = money;

        this.wins.textContent = stats[0];
        this.loss.textContent = stats[1];
        this.amountGames.textContent = stats[2];
        this.valueInputMoney.value = "";

        this.bid.value = "";
        // const imgEl = [...document.querySelectorAll('.board__area img')];

        // this.gameArea.forEach((area, index) => {

        //     console.log(imgEl, imgEl.src);
        //     imgEl.src = '';


        // })
    }






}