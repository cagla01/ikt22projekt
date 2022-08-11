let shareImageButton = document.querySelector('#share-image-button');
let createPostArea = document.querySelector('#create-post');
let closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');
let sharedMomentsArea = document.querySelector('#shared-moments');

function openCreatePostModal() {
    createPostArea.style.display = 'block';
}

function closeCreatePostModal() {
    createPostArea.style.display = 'none';
}

shareImageButton.addEventListener('click', openCreatePostModal);

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);

function createCard() {
    let cardWrapper = document.createElement('div');
    cardWrapper.className = 'shared-moment-card mdl-card mdl-shadow--2dp';
    cardWrapper.style.width = '250px';
    let cardTitle = document.createElement('div');
    cardTitle.className = 'mdl-card__title';
    cardTitle.style.backgroundImage = 'url("/src/images/food1.jpeg")';
    cardTitle.style.backgroundSize = 'cover';
    cardTitle.style.height = '325px';
    cardWrapper.appendChild(cardTitle);
    let cardTitleTextElement = document.createElement('h2');
    cardTitleTextElement.className = 'mdl-card__title-text';
    cardTitle.appendChild(cardTitleTextElement);
    let cardSupportingText = document.createElement('div');
    cardSupportingText.className = 'mdl-card__supporting-text';
    cardSupportingText.textContent = 'Food Test 1';
    cardSupportingText.style.textAlign = 'center';
    cardWrapper.appendChild(cardSupportingText);
    componentHandler.upgradeElement(cardWrapper);
    sharedMomentsArea.appendChild(cardWrapper);
}

fetch('https://httpbin.org/get')
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        createCard();
    });