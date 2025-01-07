let currentColor = { r: 0, g: 0, b: 0 };
let currentFormat = 'rgb'; // Tracks the current format (rgb, hex, hsl)

const generateRGBColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return { r, g, b };
};

const rgbToHex = ({ r, g, b }) => {
    const toHex = (value) => value.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const rgbToHSL = ({ r, g, b }) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    return `hsl(${h}, ${s}%, ${l}%)`;
};

const updateColorBox = (color) => {
    const colorBox = document.getElementById('colorBox');
    colorBox.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
};

const displayColorFormat = (format) => {
    const colorCode = document.getElementById('colorCode');
    currentFormat = format; // Update the current format
    if (format === 'rgb') {
        colorCode.innerText = `RGB: rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`;
    } else if (format === 'hex') {
        const hex = rgbToHex(currentColor);
        colorCode.innerText = `Hexadecimal: ${hex}`;
    } else if (format === 'hsl') {
        const hsl = rgbToHSL(currentColor);
        colorCode.innerText = `HSL: ${hsl}`;
    }
};

const copyColorCode = () => {
    const colorCodeText = document.getElementById('colorCode').innerText.split(': ')[1]; // Extract color code
    navigator.clipboard.writeText(colorCodeText).then(() => {
        alert(`Copied to clipboard: ${colorCodeText}`);
    }).catch(() => {
        alert('Failed to copy color code.');
    });
};

const generateNewColor = () => {
    currentColor = generateRGBColor();
    updateColorBox(currentColor);
    displayColorFormat('rgb'); // Default to RGB format
};

// Add event listener to the copy button
document.getElementById('copyColorBtn').addEventListener('click', copyColorCode);

// Initialize with a random color on page load
generateNewColor();
