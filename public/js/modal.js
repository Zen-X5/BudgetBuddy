// 🚀 Show All Expenses Modal
function openAllExpensesModal() {
    let allExpenses = document.querySelectorAll(".card-body.card");
    let allExpensesList = document.getElementById("allExpensesList");
    allExpensesList.innerHTML = ""; // Clear previous data

    allExpenses.forEach(card => {
        let clone = card.cloneNode(true); // Copy card
        allExpensesList.appendChild(clone);
    });

    document.getElementById("allExpensesModal").style.display = "flex";
}

function closeAllExpensesModal() {
    document.getElementById("allExpensesModal").style.display = "none";
}

// 🚀 Single Expense Details Modal
function openExpenseModal(title, amount, date, description) {
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalAmount").innerText = amount;
    document.getElementById("modalDate").innerText = date;
    document.getElementById("modalDescription").innerText = description;
    
    document.getElementById("expenseModal").style.display = "flex";
}

function closeExpenseModal() {
    document.getElementById("expenseModal").style.display = "none";
}
document.addEventListener("DOMContentLoaded", () => {
    const showAllBtn = document.querySelector(".showall");
    const showAllPopup = document.querySelector("#showAllPopup");
    const showAllContainer = document.querySelector(".show-all-container");
    const closeShowAllBtn = document.querySelector("#closeShowAll");

    const detailPopup = document.querySelector("#detailPopup");
    const detailContainer = document.querySelector(".detail-container");
    const closeDetailBtn = document.querySelector("#closeDetail");
    const expenseCards = document.querySelectorAll(".card-body");
    const backgroundBlur = document.querySelector(".background-blur");

    // Open "Show All" Popup
    showAllBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showAllPopup.classList.add("active");
        backgroundBlur.classList.add("blurred"); // Apply blur
    });

    // Close "Show All" Popup
    closeShowAllBtn.addEventListener("click", () => {
        showAllPopup.classList.remove("active");
        backgroundBlur.classList.remove("blurred"); // Remove blur only if detail popup is also closed
    });

    // Open Expense Detail Popup (works even inside "Show All")
    document.addEventListener("click", (e) => {
        if (e.target.closest(".card-body")) {
            const card = e.target.closest(".card-body");
            const title = card.dataset.title;
            const amount = card.dataset.amount;
            const date = card.dataset.date;
            const category = card.dataset.category;
            const description = card.dataset.description;

            document.querySelector("#detailTitle").innerText = title;
            document.querySelector("#detailAmount").innerText = `${amount} Rs`;
            document.querySelector("#detailDate").innerText = date;
            document.querySelector("#detailCategory").innerText = category;
            document.querySelector("#detailDescription").innerText = description;

            detailPopup.classList.add("active");
            backgroundBlur.classList.add("blurred"); // Keep blur
        }
    });

    // Close Expense Detail Popup
    closeDetailBtn.addEventListener("click", () => {
        detailPopup.classList.remove("active");
        if (!showAllPopup.classList.contains("active")) {
            backgroundBlur.classList.remove("blurred"); // Remove blur only if "Show All" is also closed
        }
    });
});
