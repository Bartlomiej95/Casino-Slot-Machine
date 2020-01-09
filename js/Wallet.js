class Wallet {
    //budujemy konstruktor, do którego przekażemy ilość pieniędzy 
    constructor(money) {
        let _money = money;

        this.getWalletValue = () => {
            return _money;
        }

        // funkcja sprawdzająca czy mamy odpowidnią ilość pieniędzy
        // funkcja zwróci true albo false
        // do funkcji musimy podac stawkę za jaką gracz będzie chciał wejść do rozgrywki
        this.checkCanPlay = (value) => {
            if (value <= _money) return true;
            return false;
        }

        // funkcja dodająca/odejmująca pieniądze z portfela gracza
        // funkcja przyjmuje ilosc pieniedzy i argument podający czy ilosc pieniedzy trzeba dodac czy odjac
        this.changeWallet = (value, type = "+") => {
            if (typeof value === "number" && !isNaN(value)) {
                if (type === "+") {
                    _money += value;
                } else if (type === "-") {
                    _money -= value;
                } else {
                    throw Error("Nieprawidłowy rodzaj działania")
                }
            } else {
                console.log(typeof value)
                throw Error("Nieprawidłowa liczba");
            }

        }
    }
    addMoney(elemBidValue = 0, btnAmount) {
        const result = parseInt(elemBidValue) + btnAmount;
        console.log(elemBidValue, result)
        return result;


    }
}