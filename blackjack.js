// Importing Deck
import { clear_screen } from "./scripts/graphics/shapes.mjs";
import Base from "./scripts/input/base.mjs";

import StartInputController from "./scripts/input/start.mjs";
import MainGameInputController from "./scripts/input/game.mjs";

import * as menu_graphics from "./scripts/graphics/menu.mjs";
import * as game_graphics from "./scripts/graphics/gameplay.mjs";

class Blackjack {
    static InGame = "game";
    static StartScreen = "start";

    constructor() {
        // Frame Time for FPS
        this.dt = 0;
        this.last_time = 0;
        this.fps = 0;

        // Getting Page Elements and CTX for drawing
        this.canvas = document.getElementById("poker-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;

        // States & Inputs
        this.base_input = new Base(this.canvas);
        this.state_input = new StartInputController();

        this.game_state = Blackjack.StartScreen;

        // Setting up Event listeners
        this.add_event_listeners();
    }

    add_event_listeners() {
        // Blocking right click menu
        this.canvas.addEventListener("contextmenu", event => {
            event.preventDefault();
        });

        this.base_input.set_event_listeners();
    }

    start() {
        this.state_input.init(this.base_input);
    }

    // Game Functions
    render() {
        clear_screen(this.ctx, this.canvas);
        if (this.game_state == Blackjack.StartScreen) {
            menu_graphics.write_name(this.canvas, this.ctx);

            menu_graphics.start_button(this.canvas, this.ctx);

            menu_graphics.main_options_section(this.canvas, this.ctx);
            menu_graphics.money_chooser_label(this.canvas, this.ctx, this.state_input.money);
            menu_graphics.money_chooser_boxes(this.canvas, this.ctx);
            menu_graphics.dealer_money_options(this.canvas, this.ctx, this.state_input.dealer_mode()["display"]);

        } else if (this.game_state == Blackjack.InGame) {
            game_graphics.exit_button(this.canvas, this.ctx);
            game_graphics.show_player_money(this.canvas, this.ctx, this.state_input.player_money());
            game_graphics.draw_sections(this.canvas, this.ctx, this.state_input.should_show_player_info(), this.state_input.should_show_dealer(), this.state_input.show_wager());
            this.state_input.render_stage(this.canvas, this.ctx, game_graphics);

        } else {
            throw `Game State not typical - Game state: ${this.game_state}`;
        }
    }

    update() {
        if (this.game_state == Blackjack.StartScreen) {
            this.base_input.update();            
            this.state_input.update(this.base_input);

            if (this.state_input.start()) {
                this.switch_state(Blackjack.InGame);
            }
        } else if (this.game_state == Blackjack.InGame) {
            this.base_input.update();
            this.state_input.update(this.base_input, this.dt);

            if (this.state_input.exit()) {
                this.switch_state(Blackjack.StartScreen);
            }
        } else {
            throw `Game State not typical - Game state: ${this.game_state};`
        }
    }

    switch_state(new_state) {
        if (new_state == Blackjack.StartScreen) {
            this.game_state = Blackjack.StartScreen;
            this.state_input = new StartInputController();
            this.start();

        } else if (new_state == Blackjack.InGame) {
            if (this.game_state == Blackjack.StartScreen) {
                this.game_state = Blackjack.InGame;
                this.state_input = new MainGameInputController(this.state_input.get_money());
                this.start();
            }
        } else {
            throw `New State Not Valid - new_state: ${new_state}`;
        }
    }

    gameLoop(timestamp) {
        // Calculate the elapsed time since the last frame
        this.dt = timestamp - this.last_time;
        this.last_time = timestamp;
        
        this.fps = 1000 / this.dt;
    
        // Update & Render
        this.update();
        this.render();
        
        // Recall the game loop
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }
}

// Starting Game When Page Loads
addEventListener("DOMContentLoaded", function() {
    console.log("Welcome to Poker! Thanks for checking out the console, by the way! This is an open source project, and can be found here: https://github.com/PrestonDragon989/Blackjack");

    const blackjack = new Blackjack();
    blackjack.start();
    blackjack.gameLoop();
});
