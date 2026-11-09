// Initialize counters and comments
var likes = 0;
var dislikes = 0;
var comments = [];

// Set a cookie
function setCookie(name, value) {
document.cookie = name + "=" +
encodeURIComponent(value) +
"; max-age=604800; path=/; SameSite=Lax";
}

// Get a cookie
function getCookie(name) {
var cookies = document.cookie.split(";");

for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    var prefix = name + "=";

    if (cookie.indexOf(prefix) === 0) {
        return decodeURIComponent(
            cookie.substring(prefix.length)
        );
    }
}

return "";
}

// Delete a cookie
function deleteCookie(name) {
document.cookie = name +
"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}

// Update counters and buttons
function updateUI() {
document.getElementById("likeCount").textContent = likes;
document.getElementById("dislikeCount").textContent = dislikes;

var choice = getCookie("vote");

document.getElementById("likeBtn").disabled = choice !== "";
document.getElementById("dislikeBtn").disabled = choice !== "";

document.getElementById("submitBtn").disabled =
    getCookie("commentSubmitted") === "true";

document.getElementById("commentInput").disabled =
    getCookie("commentSubmitted") === "true";
}

// Display comments
function displayComments() {
var section = document.getElementById("commentsSection");

section.innerHTML = "";

comments.forEach(function(comment) {
    var p = document.createElement("p");
    p.className = "comment";
    p.textContent = comment;
    section.appendChild(p);
});
}

// Load saved data from cookies
function loadData() {
var choice = getCookie("vote");
var savedComments = getCookie("comments");

if (choice === "like") {
    likes = 1;
} else if (choice === "dislike") {
    dislikes = 1;
}

if (savedComments !== "") {
    try {
        comments = JSON.parse(savedComments);
        if (!Array.isArray(comments)) {
            comments = [];
        }
    } catch (error) {
        comments = [];
    }
}

updateUI();
displayComments();
}

// Handle Like button
function likePage() {
if (getCookie("vote") === "") {
likes++;

    setCookie("vote", "like");

    document.getElementById("message").textContent =
        "You liked this page!";

    updateUI();
}
}

// Handle Dislike button
function dislikePage() {
if (getCookie("vote") === "") {
dislikes++;

    setCookie("vote", "dislike");

    document.getElementById("message").textContent =
        "You disliked this page!";

    updateUI();
}
}

// Handle comment submission
function submitComment() {
var input = document.getElementById("commentInput");
var comment = input.value.trim();

if (getCookie("commentSubmitted") === "true") {
    alert("You have already submitted a comment!");
    return;
}

if (comment === "") {
    alert("Please write a comment first!");
    return;
}

comments.push(comment);

setCookie("comments", JSON.stringify(comments));
setCookie("commentSubmitted", "true");

displayComments();

input.value = "";

document.getElementById("message").textContent =
    "Comment submitted successfully!";

updateUI();
}

// Reset vote and comments
function resetData() {
deleteCookie("vote");
deleteCookie("comments");
deleteCookie("commentSubmitted");

likes = 0;
dislikes = 0;
comments = [];

document.getElementById("commentInput").value = "";

updateUI();
displayComments();

document.getElementById("message").textContent =
    "Your vote and comments have been reset!";
}

// Event listeners
document.getElementById("likeBtn").addEventListener("click", likePage);

document.getElementById("dislikeBtn").addEventListener("click", dislikePage);

document.getElementById("submitBtn").addEventListener("click", submitComment);

document.getElementById("resetBtn").addEventListener("click", resetData);

// Load data when the page opens
loadData();