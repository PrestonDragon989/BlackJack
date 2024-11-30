export default class Deck {
    static SUITS = ["diamond", "spade", "heart", "club"];
    static CARD_SIZE = [70, 100];

    #blank_card = new Image(70, 100);

    constructor(size = 1) {
        // Deck size
        this.size = size;

        // Card Sprites
        this.card_sprites = {}
        for (let i = 0; i < 13; i++) {
            Deck.SUITS.forEach(suit => {
                if (i == 0) {
                    this.card_sprites[suit] = {};
                }
                this.card_sprites[suit][i + 1] = new Image(...Deck.CARD_SIZE);
            });
        }
        
        // Total Card deck
        this.all_cards = [];
        for (let i = 0; i < 13; i++) {
            Deck.SUITS.forEach(suit => {
                let card = [i + 1, suit, this.card_sprites[suit][i + 1]];
                this.all_cards.push(card);
            });
        }

        // Playing Decks
        this.total_deck;
        this.current_deck;

        // Loading Sprites
        this.load_card_sprites();
    }

    // Card Management functions (set deck, shuffle deck, deal cards, etc. . .)
    create_deck() {
        this.total_deck = [];
        for (let i = 0; i < this.size; i++) {
            this.total_deck = this.total_deck.concat(this.all_cards);
        }
        this.current_deck = this.total_deck;
    }

    shuffle() {
        // Shuffling Current Deck
        for (let i = this.current_deck.length - 1; i > 0; i--) {
            const r = Math.floor(Math.random() * (i + 1));
            [this.current_deck[i], this.current_deck[r]] = [this.current_deck[r], this.current_deck[i]];
        }
    }

    // Simply dealing a shuffled card. It then removes that card from the deck
    deal_card() {
        // Dealing card, and removing it from the current deck
        const card_dealt = this.current_deck[0];
        this.current_deck.splice(0, 1);
        return card_dealt;
    }

    // Setting up Card Sprites
    load_card_sprites() {
        // Sprite Sheets
        const sprite_sheets = {
            "spade": new Image(Deck.CARD_SIZE[0] * 13, Deck.CARD_SIZE[1]),
            "diamond": new Image(Deck.CARD_SIZE[0] * 13, Deck.CARD_SIZE[1]),
            "heart": new Image(Deck.CARD_SIZE[0] * 13, Deck.CARD_SIZE[1]),
            "club": new Image(Deck.CARD_SIZE[0] * 13, Deck.CARD_SIZE[1])
        };
        sprite_sheets["spade"].src = "card-images/spade-cards.png";
        sprite_sheets["diamond"].src = "card-images/diamond-cards.png";
        sprite_sheets["heart"].src = "card-images/heart-cards.png";
        sprite_sheets["club"].src = "card-images/club-cards.png";

        for (let i = 1; i < 14; i++) {
            Deck.SUITS.forEach(suit => {
                this.card_sprites[suit][i].src = sprite_sheets[suit].src;
                this.card_sprites[suit][i].onload = function() {
                    this.name = `${suit} ${i}`;
                    this.xOffset = Deck.CARD_SIZE[0] * (i - 1);
                    this.yOffset = 0;
                    this.width = Deck.CARD_SIZE[0];
                    this.height = Deck.CARD_SIZE[1];

                    this.src_data = [this.xOffset, this.yOffset, this.width, this.height];
                    this.size = [this.width, this.height];
                }
            });
        }

        this.#blank_card.src = "card-images/blank.png";
        this.#blank_card.onload = function() {
            this.name = "blank";
            this.xOffset = 0;
            this.yOffset = 0;
            this.width = Deck.CARD_SIZE[0];
            this.height = Deck.CARD_SIZE[1];

            this.src_data = [this.xOffset, this.yOffset, this.width, this.height];
            this.size = [this.width, this.height];
        }
    }

    blank() {
        return this.#blank_card;
    }
}
