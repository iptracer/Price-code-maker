// Initialize priceCodeMap from local storage or as an empty object
let priceCodeMap = JSON.parse(localStorage.getItem('priceCodeMap')) || {};

// Show the Create Code form
function showCreateCodeForm() {
    document.getElementById('createCodeForm').classList.remove('hidden');
    document.getElementById('retrieveCodeForm').classList.add('hidden');
}

// Show the Retrieve Code form
function showRetrieveCodeForm() {
    document.getElementById('retrieveCodeForm').classList.remove('hidden');
    document.getElementById('createCodeForm').classList.add('hidden');
}

// Generate a unique code
function generateCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

// Create a new code and store it in local storage
function createCode() {
    const priceInput = document.getElementById('priceInput').value;
    if (!priceInput || isNaN(priceInput)) {
        alert("Please enter a valid price.");
        return;
    }

    const code = generateCode();
    priceCodeMap[code] = parseFloat(priceInput);
    localStorage.setItem('priceCodeMap', JSON.stringify(priceCodeMap)); // Save to local storage
    document.getElementById('generatedCode').innerText = `Generated Code: ${code}`;
    document.getElementById('priceInput').value = ''; // Clear input
}

// Retrieve the price associated with the unique code
function retrievePrice() {
    const codeInput = document.getElementById('codeInput').value;
    const price = priceCodeMap[codeInput];

    if (price !== undefined) {
        document.getElementById('retrievedPrice').innerText = `Price: $${price}`;
    } else {
        document.getElementById('retrievedPrice').innerText = "Invalid code.";
    }
}

// Load existing codes from local storage when the page loads
window.onload = function() {
    priceCodeMap = JSON.parse(localStorage.getItem('priceCodeMap')) || {};
};
