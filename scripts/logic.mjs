import Players from "./players.mjs";

export default class Logic {
    // Winning and losing constants
    static Dealer = "dealer";
    static Player = "player";
    static Tie    = "tie";
    static Both   = "both";
    static None   = "none";

    constructor(players) {
        this.max_amount = 21;

        this.players = players;

        this.dealer_cards = [];
        this.player_cards = [];
    }

    initialize() {
        this.dealer_cards.push(...this.players.dealer["HiddenCards"].map((card) => card[0]).concat(this.players.dealer["ShownCards"].map((card) => card[0])));
        this.player_cards.push(...this.players.player["HiddenCards"].map((card) => card[0]).concat(this.players.player["ShownCards"].map((card) => card[0])));
    }

    static has_blackjack(players) {
        const dealer_cards = players.dealer["HiddenCards"].concat(players.dealer["ShownCards"]).map((card) => Math.min(card[0], 10));
        const player_cards = players.player["HiddenCards"].concat(players.player["ShownCards"]).map((card) => Math.min(card[0], 10));

        const dealer_blackjack = [1, 10].every(value => dealer_cards.includes(value));
        const player_blackjack = [1, 10].every(value => player_cards.includes(value));
    
        if (dealer_blackjack && !player_blackjack) {
            return Logic.Dealer;
        } else if (!dealer_blackjack && player_blackjack) {
            return Logic.Player;
        } else if (dealer_blackjack && player_blackjack) {
            return Logic.Tie;
        } else {
            return Logic.None;
        }
    }

    bust() {
        const dealer_bust = this.parse_possibilities(this.get_all_possibilities(this.dealer_cards))[0] == 0;
        const player_bust = this.parse_possibilities(this.get_all_possibilities(this.player_cards))[0] == 0;
    
        if (dealer_bust && !player_bust) {
            return Logic.Dealer;
        } else if (!dealer_bust && player_bust) {
            return Logic.Player;
        } else if (dealer_bust && player_bust) {
            return Logic.Both;
        } else {
            return Logic.None;
        }
    }

    get_all_possibilities(cards) {
        var scores = [0]
        for (var card of cards) {
            let new_scores = [];
            if (card == 1) {
                new_scores.push(...scores.map((score) => score + 1).concat(scores.map((score) => score + 11)));
            } else {
                new_scores.push(...scores.map((score) => score + Math.min(card, 10)));
            }
            scores = new_scores;
        }
        return scores;
    }

    parse_possibilities(possibilities) {
        var best_possibilities = [];
        for (var score of possibilities) {
            if (score >= 1 && score <= 21) {
                best_possibilities.push(score);
            }
        }
        if (best_possibilities.length == 0) {
            best_possibilities.push(0);
        }
        return [...new Set(best_possibilities)];
    }

    get_best_possibilities(possibilities) {
        return Math.max(...possibilities);
    }

    get_score(hand) {
        return this.get_best_possibilities(this.parse_possibilities(this.get_all_possibilities(hand)));
    }

    winner() {
        var dealer_score = this.get_score(this.dealer_cards);
        var player_score = this.get_score(this.player_cards);

        if (dealer_score > player_score) {
            return Logic.Dealer;
        } else if (dealer_score < player_score) {
            return Logic.Player;
        } else if (dealer_score == player_score) {
            return Logic.Tie;
        } else {
            throw `Scores Incorrect/Miscalculated - Player: ${player_score} - Dealer: ${dealer_score} `;
        }
    }
}