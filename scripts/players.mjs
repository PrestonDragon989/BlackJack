export default class Players {
    constructor() {
        this.player = {
            "HiddenCards": [],
            "ShownCards": []
        };
        this.dealer = {
            "HiddenCards": [],
            "ShownCards": []
        }
    }

    clear_cards() {
        for (var cards of ["HiddenCards", "ShownCards"]) {
            this.player[cards] = [];
            this.dealer[cards] = [];
        }
    }

    deal_first_cards(deck) {
        for (var cards of ["HiddenCards", "ShownCards"]) {
            this.player[cards].push(deck.deal_card());
            this.dealer[cards].push(deck.deal_card());
        }
    }

    total_player_cards() {
        return this.player["HiddenCards"].concat(this.player["ShownCards"]);
    }

    total_dealer_cards() {
        return this.dealer["HiddenCards"].concat(this.dealer["ShownCards"]);
    }
}