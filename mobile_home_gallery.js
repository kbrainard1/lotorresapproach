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