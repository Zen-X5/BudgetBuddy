// Load balance from localStorage on page load
document.addEventListener("DOMContentLoaded", function() {
    let savedBalance = localStorage.getItem("totalBalance");
    if (savedBalance) {
        document.getElementById("balanceDisplay").innerText = savedBalance + " Rs";
    }
});

// Function to set balance
function setBalance() {
    let balance = document.getElementById("balanceInput").value;
    if (balance) {
        document.getElementById("balanceDisplay").innerText = balance + " Rs";
        localStorage.setItem("totalBalance", balance);
        document.getElementById("balanceInput").value = ""; // Clear input
    }
}
