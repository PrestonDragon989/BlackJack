import * as shapes from "./shapes.mjs";

export function write_name(canvas, ctx) {
    ctx.font = "90px pixel_font";
    let start_cord = [canvas.width / 3, canvas.height / 10]
    let centered_cord = shapes.get_centered_position(ctx, "Blackjack!", ...start_cord, ...start_cord);

    // Text
    ctx.fillStyle = shapes.BORDER_GREEN;
    ctx.fillText("Blackjack!", ...centered_cord);
    shapes.draw_filled_rect(ctx, centered_cord[0], centered_cord[1] + 13, ctx.measureText("Blackjack!").width, 10, shapes.BORDER_GREEN); // Underline
}

export function start_button(canvas, ctx) {
    let start_cord = [canvas.width / 10, canvas.height / 2];
    let dimensions = [225, 150];
    let text_cords = [130, 390];

    shapes.draw_filled_rect(ctx, ...start_cord, ...dimensions, shapes.BRIGHT_GREEN);
    shapes.draw_hollow_rect(ctx, ...start_cord, ...dimensions, shapes.DARK_GREEN, 10);

    ctx.font = "70px pixel_font";
    ctx.fillStyle = shapes.DARK_GREEN;
    ctx.fillText("Start", ...text_cords);
}

export function main_options_section(canvas, ctx) {
    let start_cord = [canvas.width / 2.40, canvas.height / 2.75];
    let dimensions = [500, 300];

    shapes.draw_filled_rect(ctx, ...start_cord, ...dimensions, shapes.BRIGHT_GREEN);
    shapes.draw_hollow_rect(ctx, ...start_cord, ...dimensions, shapes.DARK_GREEN, 10);
}

export function money_chooser_label(canvas, ctx, money) {
    let box_start_cords = [canvas.width / 2.40, canvas.height / 2.75];
    let box_dimensions = [500, 300];

    // Current Starting Money
    var money_text = `$${money}`;
    ctx.font = "90px pixel_font";
    let centered_money_cord = shapes.get_centered_position(ctx, money_text, box_start_cords[0] + box_dimensions[0] * (4/5), box_start_cords[1], box_dimensions[0] * (1/5), 10);

    ctx.font = "40px pixel_font";
    ctx.fillStyle = shapes.DARK_GREEN;
    ctx.fillText(money_text, ...centered_money_cord);

    // Current Starting money label
    let centered_money_label_cord = shapes.get_centered_position(ctx, "Starting Money:", box_start_cords[0], box_start_cords[1] + 23, box_dimensions[0] * (2/3), 10);
    ctx.fillText("Starting Money:", ...centered_money_label_cord);
}

export function money_chooser_boxes(canvas, ctx) {
    // Variables
    let box_start_cords = [canvas.width / 2.40, canvas.height / 2.75];
    let box_dimensions = [500, 300];

    let major_box_y = box_start_cords[1] + 65;
    let minor_box_y = box_start_cords[1] + 70;

    let major_box_sides = [90, 90];
    let minor_box_sides = [80, 80]; 

    // Actual Drawing Boxes
    shapes.draw_filled_rect(ctx, box_start_cords[0] + 25, major_box_y, ...major_box_sides, shapes.NEON_GREEN); // Major Add
    shapes.draw_filled_rect(ctx, box_start_cords[0] + box_dimensions[0] - 25 - major_box_sides[0], major_box_y, ...major_box_sides, shapes.NEON_GREEN); // Major Sub

    shapes.draw_filled_rect(ctx, box_start_cords[0] + major_box_sides[0] + 50, minor_box_y, ...minor_box_sides, shapes.NEON_GREEN); // Minor Add
    shapes.draw_filled_rect(ctx, box_start_cords[0] + box_dimensions[0] - 50 - major_box_sides[0] - minor_box_sides[0], minor_box_y, ...minor_box_sides, shapes.NEON_GREEN); // Minor Sub

    // Boxes Outline
    shapes.draw_hollow_rect(ctx, box_start_cords[0] + 25, major_box_y, ...major_box_sides, shapes.DARK_GREEN, 7); // Major Add
    shapes.draw_hollow_rect(ctx, box_start_cords[0] + box_dimensions[0] - 25 - major_box_sides[0], major_box_y, ...major_box_sides, shapes.DARK_GREEN, 7); // Major Sub

    shapes.draw_hollow_rect(ctx, box_start_cords[0] + major_box_sides[0] + 50, minor_box_y, ...minor_box_sides, shapes.DARK_GREEN, 7); // Minor Add
    shapes.draw_hollow_rect(ctx, box_start_cords[0] + box_dimensions[0] - 50 - major_box_sides[0] - minor_box_sides[0], minor_box_y, ...minor_box_sides, shapes.DARK_GREEN, 7); // Minor Sub
    
    // Text
    ctx.font = "50px pixel_font";
    ctx.fillStyle = shapes.DARK_GREEN;

    let add_ten_cord = shapes.get_centered_position(ctx, "+10", box_start_cords[0] + 25, major_box_y - 5, ...major_box_sides);
    let add_one_cord = shapes.get_centered_position(ctx, "+1", box_start_cords[0] + major_box_sides[0] + 50, minor_box_y - 5, ...minor_box_sides);

    let sub_ten_cord = shapes.get_centered_position(ctx, "-10", box_start_cords[0] + box_dimensions[0] - 25 - major_box_sides[0], major_box_y - 5, ...major_box_sides);
    let sub_one_cord = shapes.get_centered_position(ctx, "-1", box_start_cords[0] + box_dimensions[0] - 50 - major_box_sides[0] - minor_box_sides[0], minor_box_y - 5, ...minor_box_sides);
    
    ctx.fillText("+10", ...add_ten_cord);
    ctx.fillText("+1", ...add_one_cord);
    ctx.fillText("-10", ...sub_ten_cord);
    ctx.fillText("-1", ...sub_one_cord);
}

export function dealer_money_options(canvas, ctx, dealer_mode) {
    let box_start_cords = [canvas.width / 2.40, canvas.height / 2.75];
    let box_dimensions = [500, 300];

    ctx.font = "40px pixel_font";
    ctx.fillStyle = shapes.DARK_GREEN;
    let dealer_label = "Dealer's Money:"
    let dealer_label_cord = shapes.get_centered_position(ctx, dealer_label, box_start_cords[0], box_start_cords[1] + box_dimensions[1] / 2, box_dimensions[0] / 1.5, box_dimensions[1] / 4);
    ctx.fillText(dealer_label, ...dealer_label_cord);

    let mode_label_cord = shapes.get_centered_position(ctx, dealer_label, box_start_cords[0] + box_dimensions[0] / 1.25, box_start_cords[1] + box_dimensions[1] / 2, box_dimensions[0] / 3.2, box_dimensions[1] / 4);
    ctx.fillText(dealer_mode, ...mode_label_cord);

    let cycle_dimensions = [350, 60];
    let cycle_start_cords = [box_start_cords[0] + (box_dimensions[0] / 2 - cycle_dimensions[0] / 2), box_start_cords[1] + box_dimensions[1] * (3/4)];

    shapes.draw_filled_rect(ctx, ...cycle_start_cords, ...cycle_dimensions, shapes.NEON_GREEN);
    shapes.draw_hollow_rect(ctx, ...cycle_start_cords, ...cycle_dimensions, shapes.DARK_GREEN);

    ctx.font = "35px pixel_font";
    ctx.fillStyle = shapes.DARK_GREEN;
    let cycle_text = "Cycle Dealer Money";
    let centered_cycle_cord = shapes.get_centered_position(ctx, cycle_text, ...cycle_start_cords, cycle_dimensions[0], cycle_dimensions[1] * .8);
    ctx.fillText(cycle_text, ...centered_cycle_cord);
}