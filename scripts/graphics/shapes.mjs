// Color Constants
export const TABLE_COLOR = "rgb(11, 125, 32)";
export const NEON_GREEN = "rgb(39, 196, 39)";
export const BRIGHT_GREEN = "rgb(39, 176, 39)";
export const DARK_GREEN = "rgb(24, 82, 24)";
export const BORDER_GREEN = "rgb(5, 56, 14)"

// simple Shape Drawing Functions
export function draw_hollow_rounded_rect(ctx, x, y, width, height, roundedNess, borderColor, borderWidth) {
    ctx.beginPath();
    ctx.moveTo(x + roundedNess, y);
    ctx.arcTo(x + width, y, x + width, y + height, roundedNess);
    ctx.arcTo(x + width, y + height, x, y + height, roundedNess);
    ctx.arcTo(x, y + height, x, y, roundedNess);
    ctx.arcTo(x, y, x + width, y, roundedNess);
    ctx.closePath();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    ctx.stroke();
}
export function draw_filled_rounded_rect(ctx, x, y, width, height, roundedNess, fillColor) {
    ctx.beginPath();
    ctx.moveTo(x + roundedNess, y);
    ctx.arcTo(x + width, y, x + width, y + height, roundedNess);
    ctx.arcTo(x + width, y + height, x, y + height, roundedNess);
    ctx.arcTo(x, y + height, x, y, roundedNess);
    ctx.arcTo(x, y, x + width, y, roundedNess);
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
}
export function draw_hollow_rect(ctx, x, y, width, height, borderColor, borderWidth) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
    ctx.closePath();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    ctx.stroke();
}
export function draw_filled_rect(ctx, x, y, width, height, fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(x, y, width, height);
}
export function clear_screen(ctx, canvas) {
    draw_filled_rect(ctx, 0, 0, canvas.width, canvas.height, TABLE_COLOR)
}

export function get_centered_position(ctx, text, area_x, area_y, area_width, area_height) {
    let text_width = ctx.measureText(text).width;
    let x = area_x + (area_width - text_width) / 2;
    let y = area_y + (area_height / 2) + (parseInt(ctx.font) / 2);
    return [x, y];
}
