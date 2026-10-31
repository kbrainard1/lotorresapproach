var carouselIndex = 0;
var lastRotated = 0;

// Rotate review every 10 seconds unless we're interacting with it
setInterval(() => {
    const exampleDiv = document.getElementById('review_box');
    if (exampleDiv && !exampleDiv.matches(':hover')) {
        var currentTime = Date.now();
        // don't rotate if they recently clicked through
        if ((currentTime - lastRotated) > 3000) {
            nextImage(true);
        }
    }
}, 8000);

function drawGallery() {
    var dotDiv = document.getElementById("gallery_dot_progress");
    var limit = document.getElementById("full_available_list").childElementCount
    for (let i = 0; i < limit; i++) {
        var newDot = document.createElement("div");
        newDot.className = "gallery_dot";
        dotDiv.appendChild(newDot);
    }

    var width = document.querySelector(".nav_box_mobile").width;
    var remainingWidth = width - (limit * 20);
    dotDiv.style = "margin-left: " + (remainingWidth / 2) + "px; grid-column: 1 / 3;";
    displayImage(false);
}

function prevImage() {
    lastRotated = Date.now();
    carouselIndex--;
    carouselIndex = makeSafe(carouselIndex);
    displayImage(false);
}

function nextImage() {
    nextImage(false);
}

function nextImage(fade) {
    lastRotated = Date.now();
    carouselIndex++;
    carouselIndex = makeSafe(carouselIndex);
    displayImage(fade);
}

async function displayImage(fade) {

    var toDisplay = document.getElementById("full_available_list").children[carouselIndex];
    var reviewText = toDisplay.getAttribute("text");
    var reviewAuthor = toDisplay.getAttribute("author");

    var textPara = document.getElementById("review_gallery_text");
    var authorPara = document.getElementById("review_gallery_author");
    if (!textPara || ! reviewAuthor) {
        return;
    }
    if (fade) {
        const fade1 = fadeElem(textPara, 1, 0);
        const fade2 = fadeElem(authorPara, 1, 0);
        await fade1.finished;
        await fade2.finished;
    }

    textPara.textContent = reviewText;
    authorPara.textContent = reviewAuthor;

    var dotProgress = document.getElementById("gallery_dot_progress");
    for (let i = 0; i < dotProgress.childElementCount; i++) {
        dotProgress.children[i].style = "background-color: lightgrey;";
    }
    dotProgress.children[carouselIndex].style = "background-color: darkgrey;";

    if (fade) {
        const fade1 = fadeElem(textPara, 0, 1);
        const fade2 = fadeElem(authorPara, 0, 1)

        await fade1.finished;
        await fade2.finished;
    }

}

function fadeElem(element, startOpacity, endOpacity) {
    return element.animate(
            [{ opacity: startOpacity }, { opacity: endOpacity }],
            { duration: 500, fill: 'forwards', easing: 'ease-in-out' }
        );
}

function makeSafe(bound) {
    var numChildren = document.getElementById("full_available_list").childElementCount;
    if (bound < 0) {
        return bound + numChildren;
    }
    if (bound >= numChildren) {
        return bound - numChildren;
    }
    return bound;
}