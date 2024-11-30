export default class Input {
    #buttons = {};
    #canvas

    #down = false;
    #button_clicked = false;
    #position = [0, 0];

    constructor(canvas) {
        this.#canvas = canvas;
    }

    set_event_listeners() {
        // Mouse Controls
        this.#canvas.addEventListener("mousedown", (e) => {
            this.#down = true;
            this.#button_clicked = false;

            const rect = this.#canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) * (this.#canvas.width / rect.width);
            const y = (e.clientY - rect.top) * (this.#canvas.height / rect.height);

            this.#position = [x, y];
        });
        this.#canvas.addEventListener("mouseup", (e) => {
            this.#down = false;
            this.#button_clicked = false;
        });
        this.#canvas.addEventListener("mousemove", (e) => {
            const rect = this.#canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) * (this.#canvas.width / rect.width);
            const y = (e.clientY - rect.top) * (this.#canvas.height / rect.height);

            this.#position = [x, y];
        });

        // Touch Screen Controls
        this.#canvas.addEventListener("touchstart", (e) => {
            this.#down = true;
            this.#button_clicked = false;

            const rect = this.#canvas.getBoundingClientRect();            
            const touch = e.touches[0];  // Get the first touch point
            const x = (touch.clientX - rect.left) * (this.#canvas.width / rect.width);
            const y = (touch.clientY - rect.top) * (this.#canvas.height / rect.height);

            this.#position = [x, y];
        });
        this.#canvas.addEventListener("touchend", (e) => {
            this.#down = false;
            this.#button_clicked = false;
        })
    }

    update() {
        this.get_collisions();
    }

    get_collisions() {
        // Resetting All buttons 
        Object.keys(this.#buttons).forEach((name) => {
            this.#buttons[name].clicked = false;
        })
        // Getting Clicked Ones
        if (this.#down && !this.#button_clicked) {
            for (let name of Object.keys(this.#buttons)) {
                const button = this.#buttons[name];
    
                if (this.#position[0] > button.x && this.#position[0] < button.width + button.x &&
                    this.#position[1] > button.y && this.#position[1] < button.height + button.y
                ) {
                    this.#button_clicked = true;
                    this.#buttons[name].clicked = true;
                    console.log("Clicked: ", name);
                }
            };
        }
    }

    // Button Functions
    add_button(name, X, Y, W, H) {
        this.#buttons[name] = {
            x: X,
            y: Y,
            width: W,
            height: H,
            clicked: false
        };
    }
    remove_button(name) {
        delete this.#buttons[name];
    }
    get_button(name) {
        return this.#buttons[name];
    }
    clear_buttons() {
        this.#buttons = {};
    }
    is_clicked(name) {
        return this.#buttons[name].clicked;
    }
    buttons() {
        return this.#buttons;
    }

    // Getter / Setter for canvas
    get_canvas() {
        return this.#canvas;
    }

    set_canvas(new_canvas) {
        this.#canvas = new_canvas;
    }
}