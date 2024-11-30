import Deck from "../deck.mjs";
import Players from "../players.mjs";
import Logic from "../logic.mjs";

export default class MainGameInputController {
    static WAGER_STAGE_BUTTONS = {
        "Exit": {
            x: 20,
            y: 20,
            width: 70,
            height: 70
        },
        "Start": {
            x: 740,
            y: 385,
            width: 200,
            height: 157
        },
        "Add10": {
            x: 59,
            y: 471,
            width: 90,
            height: 90
        },
        "Sub10": {
            x: 519,
            y: 471,
            width: 90,
            height: 90
        },
        "Add1": {
            x: 174,
            y: 476,
            width: 80,
            height: 80
        },
        "Sub1": {
            x: 414,
            y: 476,
            width: 80,
            height: 80
        },
        "All": {
            x: 279,
            y: 461,
            width: 110,
            height: 110
        }
    };
    static PLAYER_STAGE_BUTTONS = {
        "Exit": {
            x: 20,
            y: 20,
            width: 70,
            height: 70
        },
        "Hit": {
            x: 720,
            y: 471,
            width: 240,
            height: 78
        }, 
        "Stand": {
            x: 720,
            y: 375,
            width: 240,
            height: 78
        }
    };
    static DEALER_STAGE_BUTTONS = {
        "Exit": {
            x: 20,
            y: 20,
            width: 70,
            height: 70
        }
    };
    static END_STAGE_BUTTONS = {
        "Exit": {
            x: 20,
            y: 20,
            width: 70,
            height: 70
        }
    };
    static LOSING_AMOUNT_OF_MONEY = 0;

    // Stages
    static WAGER_STAGE  = "wager";
    static PLAYER_STAGE = "player";
    static DEALER_STAGE = "dealer";
    static END_STAGE    = "end";
    static GAME_FINISH  = "finish"

    // Win Protocols
    static BLACKJACK          = "blackjack";
    static PLAYER_BUST        = "player_bust";
    static DEALER_BUST        = "dealer_bust";
    static PLAYER_BETTER_HAND = "player";
    static DEALER_BETTER_HAND = "dealer";
    static TIE                = "tie";
    static NULL               = "null";

    // Winners
    static PLAYER = "player";
    static DEALER = "dealer";
      
    // Stage
    #stage = MainGameInputController.WAGER_STAGE;

    #wager = 0;

    // Player Stats
    #players = new Players();

    #player_money = 0;
    #dealer_money = 0;

    // Cards
    #deck = new Deck();

    // Misc
    #exiting = false;
    #count = 0;

    #win_protocol = MainGameInputController.NULL;

    #winner = MainGameInputController.NULL;

    constructor(amounts) {
        this.#dealer_money = amounts["dealer"];
        this.#player_money = amounts["player"];

        this.#wager = Math.round(this.#player_money * 0.05);

        this.reset();
    }

    init(base) {
        base.clear_buttons();
        for (let name of Object.keys(MainGameInputController.WAGER_STAGE_BUTTONS)) {
            const button = MainGameInputController.WAGER_STAGE_BUTTONS[name];
            base.add_button(name, button.x, button.y, button.width, button.height);
        }
    }

    update(base, dt) {
        if (base.is_clicked("Exit") && confirm("Are you sure you want to exit?")) {
            this.#exiting = true;
        }

        if (this.#stage == MainGameInputController.WAGER_STAGE) {
            this.update_wager_adjustments(base);
            if (base.is_clicked("Start")) {
                this.advance_stage(base);
            }
        } else if (this.#stage == MainGameInputController.PLAYER_STAGE) {
            if (base.is_clicked("Hit")) {
                this.#players.player["ShownCards"].push(this.#deck.deal_card());
            } else if (base.is_clicked("Stand")) {
                this.advance_stage(base);
            }

            const logic = new Logic(this.#players);
            logic.initialize();
            if (logic.bust(this.#players) == Logic.Player) {
                this.#win_protocol = MainGameInputController.PLAYER_BUST;
                this.advance_stage(base);
                this.advance_stage(base);
            }

        } else if (this.#stage == MainGameInputController.DEALER_STAGE) {
            this.#count += dt / 1000;

            if (this.#count > 2) {
                this.#count = 0;

                const logic = new Logic(this.#players);
                logic.initialize();

                let score = logic.parse_possibilities(logic.get_all_possibilities(logic.dealer_cards));

                if (score[0] == 0) {
                    this.#win_protocol = MainGameInputController.DEALER_BUST;
                    this.advance_stage(base);
                } else if (score.length > 1) {
                    if (score[1] < 17) {
                        this.#players.dealer["ShownCards"].push(this.#deck.deal_card());
                    } else if (score[1] >= 17) {
                        this.advance_stage(base);
                    }
                } else {
                    if (score[0] < 17) {
                        this.#players.dealer["ShownCards"].push(this.#deck.deal_card());
                    } else if (score[0] >= 17) {
                        this.advance_stage(base);
                    }
                }
            }
        } else if (this.#stage == MainGameInputController.END_STAGE) {
            this.#count += dt / 1000;

            if (this.#count > 5) {
                if (this.#win_protocol == MainGameInputController.PLAYER_BETTER_HAND ||
                    this.#win_protocol == MainGameInputController.DEALER_BUST ||
                    this.#win_protocol == MainGameInputController.BLACKJACK
                ) {
                    // Player Wins
                    if (this.#dealer_money != "infinite") {
                        this.#dealer_money -= this.#wager;
                    }
                    this.#player_money += this.#wager;

                    console.log("WIN! Money gained.")

                } else if (this.#win_protocol == MainGameInputController.DEALER_BETTER_HAND ||
                    this.#win_protocol == MainGameInputController.PLAYER_BUST
                ) {
                    // Dealer Wins
                    if (this.#dealer_money != "infinite") {
                        this.#dealer_money += this.#wager;
                    }
                    this.#player_money -= this.#wager;

                    console.log("LOSE! Money lost.")

                } else if (this.#win_protocol == MainGameInputController.TIE) {
                    // Tie
                    console.log("TIE! No money lost/gained.")
                }

                // Moving On
                this.reset();

                if (this.#player_money <= 0 || this.#dealer_money <= 0) {
                    this.#stage = MainGameInputController.GAME_FINISH;
                    if (this.#player_money <= 0) {
                        this.#winner = MainGameInputController.DEALER;
                    } else {
                        this.#winner = MainGameInputController.PLAYER;
                    }
                } else {
                    this.advance_stage(base);
                }
            }
        } else if (this.#stage == MainGameInputController.GAME_FINISH) {
            this.#count += dt / 1000;
            if (this.#count > 4) {
                this.#exiting = true;
            }
        }
    }

    exit() {
        return this.#exiting;
    }

    get_deck() {
        return this.#deck;
    }

    // Drawing Variables
    should_show_player_info() {
        const logic = new Logic(this.#players);
        logic.initialize();
        switch (this.#stage) {
            case MainGameInputController.WAGER_STAGE: {
                return false;
            } case MainGameInputController.PLAYER_STAGE: {
                return logic.parse_possibilities(logic.get_all_possibilities(logic.player_cards));
            } case MainGameInputController.DEALER_STAGE: {
                return logic.parse_possibilities(logic.get_all_possibilities(logic.player_cards));
            } case MainGameInputController.END_STAGE: {
                return logic.parse_possibilities(logic.get_all_possibilities(logic.player_cards));
            }
        }
        return false;
    }
    should_show_dealer() {
        switch (this.#stage) {
            case MainGameInputController.WAGER_STAGE: {
                return false;
            } case MainGameInputController.PLAYER_STAGE: {
                return true;
            } case MainGameInputController.DEALER_STAGE: {
                return true;
            } case MainGameInputController.END_STAGE: {
                return true;
            }
        }
        return false;
    }

    // Wager
    wager() {
        return this.#wager;
    }
    set_wager(amount) {
        this.#wager = amount;
    }
    show_wager() {
        switch (this.#stage) {
            case MainGameInputController.WAGER_STAGE: {
                return false;
            } case MainGameInputController.PLAYER_STAGE: {
                return this.#wager;
            } case MainGameInputController.DEALER_STAGE: {
                return this.#wager;
            } case MainGameInputController.END_STAGE: {
                return this.#wager;
            }
        }
        return false;
    }
    update_wager_adjustments(base) {
        if (base.is_clicked("Add10")) {
            this.#wager += 10;
        } else if (base.is_clicked("Sub10")) {
            this.#wager -= 10;
        } else if (base.is_clicked("Add1")) {
            this.#wager += 1;
        } else if (base.is_clicked("Sub1")) {
            this.#wager -= 1;
        } else if (base.is_clicked("All")) {
            this.#wager = this.#player_money + 1;
        }


        if (this.#dealer_money != "infinite") {
            this.#wager = Math.min(Math.max(this.#wager, 1), Math.min(this.#player_money, this.#dealer_money));
        } else {
            this.#wager = Math.min(Math.max(this.#wager, 1), Math.min(this.#player_money, this.#player_money));
        }
    }

    // Stage Managers
    advance_stage(base) {
        switch (this.#stage) {
            case MainGameInputController.WAGER_STAGE: {
                this.#stage = MainGameInputController.PLAYER_STAGE;
                this.set_stage_buttons(base, MainGameInputController.PLAYER_STAGE_BUTTONS);

                // Checking for blackjacks, and advancing stage if found
                const blackjacks = Logic.has_blackjack(this.#players);
                if (blackjacks == Logic.Player) {
                    this.#win_protocol = MainGameInputController.BLACKJACK;
                } else if (blackjacks == Logic.Tie) {
                    this.#win_protocol = MainGameInputController.TIE;
                }
                if (this.#win_protocol != MainGameInputController.NULL) {
                    this.#stage = MainGameInputController.END_STAGE;
                    this.set_stage_buttons(base, MainGameInputController.END_STAGE_BUTTONS);
                }

                break;
            } case MainGameInputController.PLAYER_STAGE: {
                this.#stage = MainGameInputController.DEALER_STAGE;
                this.set_stage_buttons(base, MainGameInputController.DEALER_STAGE_BUTTONS);

                break;
            } case MainGameInputController.DEALER_STAGE: {
                this.#stage = MainGameInputController.END_STAGE;
                this.set_stage_buttons(base, MainGameInputController.END_STAGE_BUTTONS);

                if (this.#win_protocol == MainGameInputController.NULL) {
                    const logic = new Logic(this.#players);
                    logic.initialize();

                    if (logic.winner() == Logic.Player) {
                        this.#win_protocol = MainGameInputController.PLAYER_BETTER_HAND;
                    } else if (logic.winner() == Logic.Dealer) {
                        this.#win_protocol = MainGameInputController.DEALER_BETTER_HAND;
                    } else if (logic.winner() == Logic.Tie) {
                        this.#win_protocol = MainGameInputController.TIE;
                    }
                }

                break;
            } case MainGameInputController.END_STAGE: {
                this.#stage = MainGameInputController.WAGER_STAGE;
                this.set_stage_buttons(base, MainGameInputController.WAGER_STAGE_BUTTONS);
                break;
            }
        }
    }
    set_stage_buttons(base, stage_buttons) {
        base.clear_buttons();
        for (let name of Object.keys(stage_buttons)) {
            const button = stage_buttons[name];
            base.add_button(name, button.x, button.y, button.width, button.height);
        }
    }
    stage() {
        return this.#stage;
    }
    render_stage(canvas, ctx, gameplay) {
        switch (this.#stage) {
            case MainGameInputController.WAGER_STAGE: {
                gameplay.draw_wager_options(ctx, canvas, this.#wager);

                gameplay.draw_game_news_box(canvas, ctx, this.#dealer_money, ["Wager", "Phase"]);

                break;
            } case MainGameInputController.PLAYER_STAGE: {
                gameplay.draw_player_cards(canvas, ctx, this.#players.total_player_cards());
                
                let dealer_cards = this.#players.total_dealer_cards().map((card) => card[2]);
                dealer_cards[0] = this.#deck.blank();
                gameplay.draw_dealer_cards(canvas, ctx, dealer_cards);


                gameplay.draw_hit_stand_buttons(canvas, ctx);

                gameplay.draw_game_news_box(canvas, ctx, this.#dealer_money, ["Player", "Turn"]);

                gameplay.draw_dealer_score(canvas, ctx, [Math.min(this.#players.dealer["ShownCards"][0][0], 10), "?"]);

                break;
            } case MainGameInputController.DEALER_STAGE: {
                gameplay.draw_player_cards(canvas, ctx, this.#players.total_player_cards());
                gameplay.draw_dealer_cards(canvas, ctx, this.#players.total_dealer_cards().map((card) => card[2]));

                gameplay.draw_game_news_box(canvas, ctx, this.#dealer_money, ["Dealer", "Turn"])

                const logic = new Logic(this.#players);
                logic.initialize();
                const score = logic.parse_possibilities(logic.get_all_possibilities(logic.dealer_cards));
                gameplay.draw_dealer_score(canvas, ctx, score);
                
                break;
            } case MainGameInputController.END_STAGE: {
                gameplay.draw_player_cards(canvas, ctx, this.#players.total_player_cards());
                gameplay.draw_dealer_cards(canvas, ctx, this.#players.total_dealer_cards().map((card) => card[2]));

                const logic = new Logic(this.#players);
                logic.initialize();
                const score = logic.parse_possibilities(logic.get_all_possibilities(logic.dealer_cards));
                gameplay.draw_dealer_score(canvas, ctx, score);
            
                // News & End Message
                if (this.#win_protocol == MainGameInputController.TIE) {
                    gameplay.draw_game_news_box(canvas, ctx, this.#dealer_money, ["Payout:", `+$0`]);
                    gameplay.draw_end_messages(canvas, ctx, ["It was a", "tie!", "Nobody wins", "anything!"]);
                } else if (this.#win_protocol == MainGameInputController.BLACKJACK) {
                    gameplay.draw_game_news_box(canvas, ctx, this.#dealer_money, ["Payout:", `+$${this.#wager}`]);
                    gameplay.draw_end_messages(canvas, ctx, ["You got", "a blackjack!", "You get", "the wager!"]);
                } else if (this.#win_protocol == MainGameInputController.DEALER_BETTER_HAND) {
                    gameplay.draw_game_news_box(canvas, ctx, this.#dealer_money, ["Payout:", `-$${this.#wager}`]);
                    gameplay.draw_end_messages(canvas, ctx, ["You've lost!", "Dealer gets", "the wager!"]);
                } else if (this.#win_protocol == MainGameInputController.PLAYER_BETTER_HAND) {
                    gameplay.draw_game_news_box(canvas, ctx, this.#dealer_money, ["Payout:", `+$${this.#wager}`]);
                    gameplay.draw_end_messages(canvas, ctx, ["You've won!", "You get", "the wager!"]);
                } else if (this.#win_protocol == MainGameInputController.PLAYER_BUST) {
                    gameplay.draw_game_news_box(canvas, ctx, this.#dealer_money, ["Payout:", `-$${this.#wager}`]);
                    gameplay.draw_end_messages(canvas, ctx, ["You've gone", "over! Dealer", "gets the", "wager!"]);
                } else if (this.#win_protocol == MainGameInputController.DEALER_BUST) {
                    gameplay.draw_game_news_box(canvas, ctx, this.#dealer_money, ["Payout:", `+$${this.#wager}`]);
                    gameplay.draw_end_messages(canvas, ctx, ["Dealers gone", "over! You", "get the", "wager!"]);
                } 

                break;
            } case MainGameInputController.GAME_FINISH: {
                if (this.#winner == MainGameInputController.PLAYER) {
                    gameplay.draw_finish_message(canvas, ctx, "You Win!");
                    gameplay.draw_end_messages(canvas, ctx, ["You have", "taken the", "house's cash!!"]);
                } else {
                    gameplay.draw_finish_message(canvas, ctx, "You Lose!");
                    gameplay.draw_end_messages(canvas, ctx, ["You've run", "out of", "money!!"]);
                }
            }
        }
    }

    // Moneys
    player_money() {
        return this.#player_money;
    }
    dealer_money() {
        return this.dealer_money;
    }

    reset() {
        this.#count = 0;

        this.#win_protocol = MainGameInputController.NULL;

        this.#players.clear_cards();
        
        this.#deck = new Deck();
        this.#deck.create_deck();
        this.#deck.shuffle();

        this.#players.deal_first_cards(this.#deck);
    }
}