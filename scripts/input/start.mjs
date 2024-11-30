export default class StartInputController {
    static START_MENU_BUTTONS = {
        "Start": {
            x: 102.4,
            y: 288,
            width: 225,
            height: 150
        },

        "Plus10": {
            x: 451.6,
            y: 274.45,
            width: 90,
            height: 90
        },
        "Plus1": {
            x: 566.6,
            y: 279.45,
            width: 80,
            height: 80
        }, 
        "Sub10": {
            x: 811.7,
            y: 274.45,
            width: 90,
            height: 90
        },
        "Sub1": {
            x: 706.6,
            y: 279.45,
            width: 80,
            height: 80
        },
        "Cycle": {
            x: 501.7,
            y: 434.45,
            width: 350,
            height: 60
        }
    };
    static MIN_MONEY = 1;

    static DEALER_OPTIONS = {
        "infinite": "$infinite",
        ".5x": "$x1/2",
        "1x": "$x1",
        "2x": "$x2",
        "3x": "$x3",
        "5x": "$x5",
        "10x": "$x10",
    };
    
    #dealer_index = 2;
    #starting = false;

    constructor() {
        this.money = 100;
    }

    init(base) {
        base.clear_buttons();
        for (let name of Object.keys(StartInputController.START_MENU_BUTTONS)) {
            const button = StartInputController.START_MENU_BUTTONS[name];
            base.add_button(name, button.x, button.y, button.width, button.height);
        }
    }

    update(base) {
        if (base.is_clicked("Start")) {
            this.#starting = true;
        }

        // Starting Money Changing
        if (base.is_clicked("Plus10")) {
            this.money += 10;
        } else if (base.is_clicked("Plus1")) {
            this.money += 1;
        } else if (base.is_clicked("Sub10")) {
            this.money -= 10;
        } else if (base.is_clicked("Sub1")) {
            this.money -= 1;
        }

        // Dealer Logic
        if (base.is_clicked("Cycle")) {
            this.#dealer_index++;
        }


        if (this.money < StartInputController.MIN_MONEY) {
            this.money = StartInputController.MIN_MONEY;
        }
    }

    start() {
        return this.#starting;
    }

    dealer_mode() {
        const index = this.#dealer_index % Object.keys(StartInputController.DEALER_OPTIONS).length;
        const mode_data = {
            "key": Object.entries(StartInputController.DEALER_OPTIONS)[index][0],
            "display": Object.entries(StartInputController.DEALER_OPTIONS)[index][1]
        };
        return mode_data; 
    }

    get_money() {
        let amounts = {
            "player": this.money,
            "dealer": this.money
        };
        const mode = this.dealer_mode().key;
        if (mode == "2x") {
            amounts["dealer"] = this.money * 2;
        } else if (mode == "3x") {
            amounts["dealer"] = this.money * 3;
        } else if (mode == "5x") {
            amounts["dealer"] = this.money * 5;
        } else if (mode == "10x") {
            amounts["dealer"] = this.money * 10;
        }else if (mode == ".5x") {
            amounts["dealer"] = this.money * .5;
        } else if (mode == "infinite") {
            amounts["dealer"] = "infinite";
        } 
        if (amounts["dealer"] != "infinite")
            amounts["dealer"] = Math.max(amounts["dealer"], 1);
        
        return amounts;
    }
}