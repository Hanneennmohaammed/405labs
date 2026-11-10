let ascending = true;

// Handle sort click events
function sort(elem) {
let table = document.querySelector('table');
let colIndex = elem.cellIndex;
const rows = table.querySelectorAll('tbody tr');
let headerRow = document.querySelector('thead');
let rowsArray = [];

for (let i = 0; i < rows.length; i++) {
rowsArray.push(rows[i]);
}

rowsArray.sort((a, b) => {
let aVal = a.cells[colIndex].innerText;
let bVal = b.cells[colIndex].innerText;

if (!isNaN(aVal) && !isNaN(bVal)) {
  aVal = Number(aVal);
  bVal = Number(bVal);
}

if (aVal < bVal) {
  return ascending ? -1 : 1;
}
if (aVal > bVal) {
  return ascending ? 1 : -1;
}
return 0;
});

if (ascending) {
elem.children[0].className = "desc";
} else {
elem.children[0].className = "asc";
}

ascending = !ascending;

let tbody = document.querySelector('tbody');
tbody.innerHTML = "";

rowsArray.forEach(row => tbody.appendChild(row));
}

// Handle win score filtering (>= number)
function filterWins() {
let minWins = Number(document.getElementById("minWins").value);
let rows = document.querySelectorAll("tbody tr");

rows.forEach(function(row) {
let wins = Number(row.cells[1].innerText);

if (wins >= minWins) {
  row.style.display = "";
} else {
  row.style.display = "none";
}
});
}

// Reset filter
function resetFilter() {
document.getElementById("minWins").value = "";

let rows = document.querySelectorAll("tbody tr");

rows.forEach(function(row) {
row.style.display = "";
});
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}