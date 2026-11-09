
var accessKey = "B3YBQFDFm0z8izLgPOtqfW1OUanB3YEYXjAOTPFX2sA";


// Display images and JSON response
function displayImages(data) {
var imagesElem = document.getElementById("images");
var sampElem = document.getElementById("sampleOutput");

imagesElem.innerHTML = "";
sampElem.textContent = JSON.stringify(data, null, 2);

data.results.forEach(function(photo) {
    var container = document.createElement("div");

    var img = document.createElement("img");
    img.src = photo.urls.small;
    img.alt = photo.alt_description || "Unsplash photo";
    img.width = 200;

    var credit = document.createElement("p");
    var photographer = document.createElement("a");

    photographer.href = photo.user.links.html;
    photographer.textContent = photo.user.name;

    credit.append("Photo by ", photographer, " on Unsplash");

    container.appendChild(img);
    container.appendChild(credit);
    imagesElem.appendChild(container);
});
}

// 1. Search using XHR
function searchUsingXHR() {
var query = document.getElementById("inputBox").value;
var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
    if (this.readyState === 4) {
        if (this.status === 200) {
            var responseObj = JSON.parse(this.responseText);
            displayImages(responseObj);
        } else {
            console.error("XHR Error:", this.status);
        }
    }
};

xhr.open(
    "GET",
    "https://api.unsplash.com/search/photos?query=" +
    encodeURIComponent(query),
    true
);

xhr.setRequestHeader(
    "Authorization",
    "Client-ID " + accessKey
);

xhr.send();
}

// 2. Search using Fetch (Promises)
function searchUsingFetch() {
var query = document.getElementById("inputBox").value;

fetch(
    "https://api.unsplash.com/search/photos?query=" +
    encodeURIComponent(query),
    {
        headers: {
            "Authorization": "Client-ID " + accessKey
        }
    }
)
.then(function(response) {
    if (!response.ok) {
        throw new Error("HTTP " + response.status);
    }
    return response.json();
})
.then(function(data) {
    displayImages(data);
})
.catch(function(error) {
    console.error("Fetch Error:", error);
});
}

// 3. Search using Async/Await
async function searchUsingFetchAwaitAsync() {
var query = document.getElementById("inputBox").value;

try {
    let response = await fetch(
        "https://api.unsplash.com/search/photos?query=" +
        encodeURIComponent(query),
        {
            headers: {
                "Authorization": "Client-ID " + accessKey
            }
        }
    );

    if (!response.ok) {
        throw new Error("HTTP " + response.status);
    }

    let data = await response.json();
    displayImages(data);

} catch (error) {
    console.error("Async/Await Error:", error);
}
}