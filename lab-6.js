const likeBtn = document.getElementById("like");
const dislikeBtn = document.getElementById("dislike");
const resetBtn = document.getElementById("reset");
const comments = document.getElementById("comment");
const submit = document.getElementById("submit-comment");
const commentSection = document.getElementById("comment-section");
let countLike = 100;
let countDislike = 0;

likeBtn.innerText = `👍${countLike}`;
dislikeBtn.innerText = `👎${countDislike}`;

function like() {
    if (!hasVoted()) {
        countLike++;
        likeBtn.innerText = `👍${countLike}`;
        setCookie();
        disableButtons();
    }
}

function dislike() {
    if (!hasVoted()) {
        countDislike++;
        dislikeBtn.innerText = `👎${countDislike}`;
        setCookie();
        disableButtons();
    }
}

function reset() {

    document.cookie = "voted=true; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    
    likeBtn.disabled = false;
    dislikeBtn.disabled = false;
}

function setCookie() {
    const expiresOn = new Date(Date.now() + 2 * 60 * 1000); 
    document.cookie = `voted=true; path=/; expires=${expiresOn.toUTCString()}`;
}

function hasVoted() {
    return document.cookie.includes("voted=true");
}

function disableButtons() {
    likeBtn.disabled = true;
    dislikeBtn.disabled = true;
}

function addComment() {
    let comment = comments.value.trim();
    if (comment === "") {
        alert("Comment cannot be empty!");
        return;
    }

    const p = document.createElement("p");
    p.innerText = comment;
    commentSection.appendChild(p);

    
    comments.value = "";
}

likeBtn.addEventListener("click", like);
dislikeBtn.addEventListener("click", dislike);
resetBtn.addEventListener("click", reset);
submit.addEventListener("click", addComment);
document.addEventListener("DOMContentLoaded", () => {
    if (hasVoted()) {
        disableButtons();
    }
});