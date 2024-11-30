import * as shapes from "./shapes.mjs";

export function exit_button(canvas, ctx,) {
    let cords = [20, 20];
    let size = [70, 70];

    shapes.draw_filled_rect(ctx, ...cords, ...size, shapes.NEON_GREEN);
    shapes.draw_hollow_rect(ctx, ...cords, ...size, shapes.DARK_GREEN, 7);

    ctx.font = "55px pixel_font";
    ctx.fillStyle = shapes.DARK_GREEN;
    
    let centered_cord = shapes.get_centered_position(ctx, "E", cords[0], cords[1] - 6, ...size)
    ctx.fillText("E", ...centered_cord);
}

export function draw_sections(canvas, ctx, show_info, show_dealer, show_wager) {
    // Player Cards
    let player_dimensions = [600, 235];
    let player_cord = [canvas.width / 30, canvas.height * (3/5)];

    shapes.draw_filled_rounded_rect(ctx, ...player_cord, ...player_dimensions, 4, shapes.BRIGHT_GREEN);
    shapes.draw_hollow_rounded_rect(ctx, ...player_cord, ...player_dimensions, 4, shapes.DARK_GREEN, 7);

    // Player Info
    if (show_info !== false) {
        let player_info_dimensions = [300, 45];
        let player_info_cords = [player_cord[0], player_cord[1] - player_info_dimensions[1]];

        shapes.draw_filled_rounded_rect(ctx, ...player_info_cords, ...player_info_dimensions, 4, shapes.BRIGHT_GREEN);
        shapes.draw_hollow_rounded_rect(ctx, ...player_info_cords, ...player_info_dimensions, 4, shapes.DARK_GREEN, 7);

        let score_text;
        if (show_info[0] !== 0) {
            score_text = `Score: ${show_info.filter(item => item != null).join(' / ')}`;
        } else {
            score_text = "Score: Bust!";
        }
        ctx.font = "25px pixel_font";
        ctx.fillStyle = shapes.DARK_GREEN;
        ctx.fillText(score_text, ...shapes.get_centered_position(ctx, score_text, ...player_info_cords, player_info_dimensions[0], player_info_dimensions[1] - 12));
    }

    // Options
    let options_dimensions = [300, 235];
    let options_cords = [canvas.width - canvas.width / 30 - options_dimensions[0], canvas.height * (3/5)];

    shapes.draw_filled_rounded_rect(ctx, ...options_cords, ...options_dimensions, 4, shapes.BRIGHT_GREEN);
    shapes.draw_hollow_rounded_rect(ctx, ...options_cords, ...options_dimensions, 4, shapes.DARK_GREEN, 7);

    // Dealer Cards
    if (show_dealer) {
        let dealer_dimensions = [600, 188];
        let dealer_cords = [canvas.width / 7, -10];

        shapes.draw_filled_rounded_rect(ctx, ...dealer_cords, ...dealer_dimensions, 4, shapes.BRIGHT_GREEN);
        shapes.draw_hollow_rounded_rect(ctx, ...dealer_cords, ...dealer_dimensions, 4, shapes.DARK_GREEN, 7);
    }

    // Wager
    if (show_wager != false) {
        let player_info_dimensions = [300, 45];
        let player_info_cords = [player_cord[0] + player_info_dimensions[0], player_cord[1] - player_info_dimensions[1]];

        shapes.draw_filled_rounded_rect(ctx, ...player_info_cords, ...player_info_dimensions, 4, shapes.BRIGHT_GREEN);
        shapes.draw_hollow_rounded_rect(ctx, ...player_info_cords, ...player_info_dimensions, 4, shapes.DARK_GREEN, 7);

        let wager_text = `Wager: $${show_wager}`;
        ctx.font = "25px pixel_font";
        ctx.fillStyle = shapes.DARK_GREEN;
        ctx.fillText(wager_text, ...shapes.get_centered_position(ctx, wager_text, ...player_info_cords, player_info_dimensions[0], player_info_dimensions[1] - 12));
    }
}

export function draw_dealer_score(canvas, ctx, score) {
    let dealer_dimensions = [600, 188];
    let dealer_cords = [canvas.width / 7, -10];

    let score_size = [300, 50];
    let score_cord = [dealer_cords[0], dealer_cords[1] + dealer_dimensions[1]];

    shapes.draw_filled_rounded_rect(ctx, ...score_cord, ...score_size, 4, shapes.BRIGHT_GREEN);
    shapes.draw_hollow_rounded_rect(ctx, ...score_cord, ...score_size, 4, shapes.DARK_GREEN, 7);

    let score_text;
    if (score[0] === 0) {
        score_text = "Score: Bust!"
    } else {
        score_text = `Score: ${score.filter(item => item != null).join(' / ')}`;
    }
    ctx.font = "25px pixel_font";
    ctx.fillStyle = shapes.DARK_GREEN;
    ctx.fillText(score_text, ...shapes.get_centered_position(ctx, score_text, ...score_cord, score_size[0], score_size[1] - 12));
}

export function draw_wager_options(ctx, canvas, current_wager) {
    // Consts for where things start
    let start_dimensions = [300, 235];
    let start_cords = [canvas.width - canvas.width / 30 - start_dimensions[0], canvas.height * (3/5)];

    let button_dimensions = [600, 235];
    let button_cord = [canvas.width / 30, canvas.height * (3/5)];

    // Start Button
    let start_button_dimensions = [200,  157];
    let start_button_cords = [start_cords[0] + (start_dimensions[0] - start_button_dimensions[0]) / 2, start_cords[1] + (start_dimensions[1] - start_button_dimensions[1]) / 2]

    shapes.draw_filled_rect(ctx, ...start_button_cords, ...start_button_dimensions, shapes.NEON_GREEN);
    shapes.draw_hollow_rect(ctx, ...start_button_cords, ...start_button_dimensions, shapes.DARK_GREEN, 7);

    ctx.font = "55px pixel_font";
    ctx.fillStyle = shapes.DARK_GREEN;
    ctx.fillText("Start", ...shapes.get_centered_position(ctx, "Start", start_button_cords[0], start_button_cords[1] - 10, ...start_button_dimensions));

    // Button Variables
    let major_box_y = button_cord[1] + 125;
    let minor_box_y = button_cord[1] + 130;
    let all_box_y = button_cord[1] + 115;

    let major_box_sides = [90, 90];
    let minor_box_sides = [80, 80]; 

    // Button Boxes
    shapes.draw_filled_rect(ctx, button_cord[0] + 25, major_box_y, ...major_box_sides, shapes.NEON_GREEN); // Major Add
    shapes.draw_filled_rect(ctx, button_cord[0] + button_dimensions[0] - 25 - major_box_sides[0], major_box_y, ...major_box_sides, shapes.NEON_GREEN); // Major Sub

    shapes.draw_filled_rect(ctx, button_cord[0] + major_box_sides[0] + 50, minor_box_y, ...minor_box_sides, shapes.NEON_GREEN); // Minor Add
    shapes.draw_filled_rect(ctx, button_cord[0] + button_dimensions[0] - 50 - major_box_sides[0] - minor_box_sides[0], minor_box_y, ...minor_box_sides, shapes.NEON_GREEN); // Minor Sub

    // Button Outlines
    shapes.draw_hollow_rect(ctx, button_cord[0] + 25, major_box_y, ...major_box_sides, shapes.DARK_GREEN, 7); // Major Add
    shapes.draw_hollow_rect(ctx, button_cord[0] + button_dimensions[0] - 25 - major_box_sides[0], major_box_y, ...major_box_sides, shapes.DARK_GREEN, 7); // Major Sub

    shapes.draw_hollow_rect(ctx, button_cord[0] + major_box_sides[0] + 50, minor_box_y, ...minor_box_sides, shapes.DARK_GREEN, 7); // Minor Add
    shapes.draw_hollow_rect(ctx, button_cord[0] + button_dimensions[0] - 50 - major_box_sides[0] - minor_box_sides[0], minor_box_y, ...minor_box_sides, shapes.DARK_GREEN, 7); // Minor Sub

    // Button Text
    ctx.font = "50px pixel_font";
    ctx.fillStyle = shapes.DARK_GREEN;

    let add_ten_cord = shapes.get_centered_position(ctx, "+10", button_cord[0] + 25, major_box_y - 5, ...major_box_sides);
    let add_one_cord = shapes.get_centered_position(ctx, "+1", button_cord[0] + major_box_sides[0] + 50, minor_box_y - 5, ...minor_box_sides);

    let sub_ten_cord = shapes.get_centered_position(ctx, "-10", button_cord[0] + button_dimensions[0] - 25 - major_box_sides[0], major_box_y - 5, ...major_box_sides);
    let sub_one_cord = shapes.get_centered_position(ctx, "-1", button_cord[0] + button_dimensions[0] - 50 - major_box_sides[0] - minor_box_sides[0], minor_box_y - 5, ...minor_box_sides);
    
    ctx.fillText("+10", ...add_ten_cord);
    ctx.fillText("+1", ...add_one_cord);
    ctx.fillText("-10", ...sub_ten_cord);
    ctx.fillText("-1", ...sub_one_cord);

    // Wager Amount
    let wager_text = `Wager: $${current_wager}`;
    ctx.font = "55px pixel_font";
    ctx.fillStyle = shapes.DARK_GREEN;
    ctx.fillText(wager_text, ...shapes.get_centered_position(ctx, wager_text, ...button_cord, button_dimensions[0], button_dimensions[1] / 2));

    // All In Button
    let all_size = [110, 110];
    let all_cord = [button_dimensions[0] / 2 - (all_size[0] / 2) + button_cord[0], all_box_y];

    shapes.draw_filled_rect(ctx, ...all_cord, ...all_size, shapes.NEON_GREEN);
    shapes.draw_hollow_rect(ctx, ...all_cord, ...all_size, shapes.DARK_GREEN, 7);

    ctx.font = "60px pixel_font";
    ctx.fillStyle = shapes.DARK_GREEN;
    ctx.fillText("All", ...shapes.get_centered_position(ctx, "All", ...all_cord, all_size[0], all_size[1] - 12));
}

export function show_player_money(canvas, ctx, money) {
    let money_dimensions = [300, 45];
    let money_cords = [canvas.width - canvas.width / 30 - money_dimensions[0], canvas.height * (3/5) - money_dimensions[1] + 5];

    shapes.draw_filled_rounded_rect(ctx, ...money_cords, ...money_dimensions, 4, shapes.BRIGHT_GREEN);
    shapes.draw_hollow_rounded_rect(ctx, ...money_cords, ...money_dimensions, 4, shapes.DARK_GREEN, 7);

    let money_text = `Cash: $${money}`;
    ctx.font = "25px pixel_font";
    ctx.fillStyle = shapes.DARK_GREEN;
    ctx.fillText(money_text, ...shapes.get_centered_position(ctx, money_text, ...money_cords, money_dimensions[0], money_dimensions[1] - 12));
}

export function draw_player_cards(canvas, ctx, cards) {
    // Consts
    const card_w = 140;
    const card_h = 200;

    let base_size = [600, 235];
    let start_cord = [canvas.width / 30, canvas.height * (3/5)];
    let card_y = start_cord[1] + (base_size[1] - card_h) / 2

    // Spacing     
    const gap_size = (base_size[0] - (cards.length * card_w)) / (cards.length + 1);
    const x_positions = [];

    let current_position = 0;
    for (let i = 0; i < cards.length; i++) {
        current_position += gap_size;
        x_positions.push(current_position);
        current_position += card_w;
    }

    // Actual Drawing
    for (let i = 0; i < cards.length; i++) {
        const img = cards[i][2];
        const card_x = start_cord[0] + x_positions[i];
        ctx.drawImage(img, ...img.src_data, card_x, card_y, card_w, card_h);
    }
}

export function draw_hit_stand_buttons(canvas, ctx) {
    // Consts
    let box_dimensions = [300, 235];
    let box_cords = [canvas.width - canvas.width / 30 - box_dimensions[0], canvas.height * (3/5)];

    let button_dimensions = [box_dimensions[0] * 0.8, box_dimensions[1] * (1/3)];
    let button_x = box_cords[0] + (box_dimensions[0] - button_dimensions[0]) / 2;

    let text_dimensions = [button_dimensions[0], button_dimensions[1] * .9];

    // Stand
    let stand_y = box_cords[1] + box_dimensions[1] * .125;

    shapes.draw_filled_rect(ctx, button_x, stand_y, ...button_dimensions, shapes.NEON_GREEN);
    shapes.draw_hollow_rect(ctx, button_x, stand_y, ...button_dimensions, shapes.DARK_GREEN, 7);

    ctx.font = "50px pixel_font";
    ctx.fillStyle = shapes.DARK_GREEN;
    ctx.fillText("Stand", ...shapes.get_centered_position(ctx, "Stand", button_x, stand_y, ...text_dimensions));

    // Hit
    let hit_y = box_cords[1] + box_dimensions[1] * .2 + button_dimensions[1];

    shapes.draw_filled_rect(ctx, button_x, hit_y, ...button_dimensions, shapes.NEON_GREEN);
    shapes.draw_hollow_rect(ctx, button_x, hit_y, ...button_dimensions, shapes.DARK_GREEN, 7);

    ctx.font = "50px pixel_font";
    ctx.fillStyle = shapes.DARK_GREEN;
    ctx.fillText("Hit", ...shapes.get_centered_position(ctx, "Hit", button_x, hit_y, ...text_dimensions));
}

export function draw_dealer_cards(canvas, ctx, cards) {
    // Consts
    let dealer_size = [600, 188];
    let dealer_cords = [canvas.width / 7, -10];

    // Consts
    const card_w = 105;
    const card_h = 150;

    let card_y = dealer_cords[1] + (dealer_size[1] - card_h) / 2

    // Spacing     
    const gap_size = (dealer_size[0] - (cards.length * card_w)) / (cards.length + 1);
    const x_positions = [];

    let current_position = 0;
    for (let i = 0; i < cards.length; i++) {
        current_position += gap_size;
        x_positions.push(current_position);
        current_position += card_w;
    }

    // Actual Drawing
    for (let i = cards.length; i > 0; i--) {
        const img = cards[i - 1];
        const card_x = dealer_cords[0] + x_positions[i - 1];
        ctx.drawImage(img, ...img.src_data, card_x, card_y, card_w, card_h);
    }
}

export function draw_game_news_box(canvas, ctx, dealer_money, messages) {
    // Box Details
    let news_dimensions = [240, 188];
    let news_cords = [canvas.width / 7 + 600 + 20, -10];

    shapes.draw_filled_rounded_rect(ctx, ...news_cords, ...news_dimensions, 4, shapes.BRIGHT_GREEN);
    shapes.draw_hollow_rounded_rect(ctx, ...news_cords, ...news_dimensions, 4, shapes.DARK_GREEN, 7);

    // Drawing Dealer Money
    let dealer_size = [240, 40];
    let dealer_cords = [news_cords[0], news_cords[1] + news_dimensions[1] - dealer_size[1]];
    shapes.draw_hollow_rounded_rect(ctx, ...dealer_cords, ...dealer_size, 4, shapes.DARK_GREEN, 7);

    let dealer_text = `Dealer: $${dealer_money}`;
    ctx.font = "25px pixel_font";
    ctx.fillStyle = shapes.DARK_GREEN;
    ctx.fillText(dealer_text, ...shapes.get_centered_position(ctx, dealer_text, ...dealer_cords, dealer_size[0], dealer_size[1] - 12));

    // Message
    const total_y_space = news_dimensions[1] - (12 + dealer_size[1]);
    const y_space_increment = total_y_space / messages.length;
    for (let i = 0; i < messages.length; i++) {
        const message = messages[i];
        ctx.font = "45px pixel_font";
        ctx.fillStyle = shapes.DARK_GREEN;
        ctx.fillText(message, ...shapes.get_centered_position(ctx, message, news_cords[0], news_cords[1] + y_space_increment * i, news_dimensions[0], y_space_increment));
    }
}

export function draw_end_messages(canvas, ctx, messages) {
    // Box Dimensions
    let box_dimensions = [300, 235];
    let box_cords = [canvas.width - canvas.width / 30 - box_dimensions[0], canvas.height * (3/5)];

    // Messages
    const total_y_space = box_dimensions[1] - 12;
    const y_space_increment = total_y_space / messages.length;
    for (let i = 0; i < messages.length; i++) {
        const message = messages[i];
        ctx.font = "45px pixel_font";
        ctx.fillStyle = shapes.DARK_GREEN;
        ctx.fillText(message, ...shapes.get_centered_position(ctx, message, box_cords[0], box_cords[1] + y_space_increment * i, box_dimensions[0], y_space_increment));
    }
}

export function draw_finish_message(canvas, ctx, message) {
    let start_dimensions = [600, 235];
    let start_cords = [canvas.width / 30, canvas.height * (3/5)];

    ctx.font = "100px pixel_font";
    ctx.fillStyle = shapes.DARK_GREEN;
    ctx.fillText(message, ...shapes.get_centered_position(ctx, message, ...start_cords, start_dimensions[0], start_dimensions[1] * .9));

}
