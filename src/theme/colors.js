export const pickerColors = [
    "#3498db", // Blue
    "#e74c3c", // Red
    "#2ecc71", // Green
    "#f39c12", // Orange
    "#9b59b6", // Purple
    "#e67e22", // Pumpkin
    "#f1c40f", // Yellow
];

export const themeColors = [
    "#3498db", // Blue
    "#e74c3c", // Red
    "#2ecc71", // Green
    "#f39c12", // Orange
    "#9b59b6", // Purple
    "#e67e22", // Pumpkin
    "#f1c40f", // Yellow
    "#1abc9c", // Turquoise
    "#34495e", // Dark Gray
    "#95a5a6", // Silver
    "#d35400", // Rust
    "#8e44ad", // Violet
    "#27ae60", // Emerald
];

export const lightenColor = (hex, percent) => {
    console.log(hex);   
    if(hex){
        return '';
    }
    let num = parseInt(hex.slice(1), 16);
    let amt = Math.round(2.55 * percent);
    let R = (num >> 16) + amt;
    let G = (num >> 8 & 0x00FF) + amt;
    let B = (num & 0x0000FF) + amt;

    console.log(`#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`)

    return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
  };