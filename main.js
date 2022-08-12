let openModal = document.querySelectorAll('.img');
const modal = document.querySelector('.modal');
const modalImg = document.querySelector('.dialog-img');
openModal.forEach((img) => {
    img.addEventListener('click', () => {
        modalImg.src=img.src;
        modal.showModal();
      });
});


let closeModal = document.querySelector('.close-button');
closeModal.addEventListener('click', () => {
    modal.close();
});

let javaGalleryItems = 
["crampedhail.github.io/Images/battleships.png", "crampedhail.github.io/Images/hangman.png", 
"crampedhail.github.io/Images/polacz4.png", "crampedhail.github.io/Images/tanks.png", 
"crampedhail.github.io/Images/tictactoe.png"];
let currJavaImg = document.querySelector('.java-img');
let prevJavaImg = document.querySelector('.prev-java-img');
prevJavaImg.addEventListener('click', ()=>{
    currJavaImg.src = switchImg(currentImg(currJavaImg.src, javaGalleryItems)-1, javaGalleryItems)
});
let nextJavaImg = document.querySelector('.next-java-img');
nextJavaImg.addEventListener('click', ()=>{
    currJavaImg.src = switchImg(currentImg(currJavaImg.src, javaGalleryItems)+1, javaGalleryItems)
});

let pbxGalleryItems = 
["/Images/pbx.png", "/Images/pbx-ogl.png", 
"/Images/pbx-login.png", "/Images/pbx-konto.png", 
"/Images/pbx-admin.png"];
let currPbxImg = document.querySelector('.pbx-img');
let prevPbxImg = document.querySelector('.prev-pbx-img');
prevPbxImg.addEventListener('click', ()=>{
    currPbxImg.src = switchImg(currentImg(currPbxImg.src, pbxGalleryItems)-1, pbxGalleryItems)
});
let nextPbxImg = document.querySelector('.next-pbx-img');
nextPbxImg.addEventListener('click', ()=>{
    currPbxImg.src = switchImg(currentImg(currPbxImg.src, pbxGalleryItems)+1, pbxGalleryItems)
});



function switchImg(destInd, imgCollection){
    if(destInd<0) destInd = destInd + imgCollection.length;
    if(destInd>=imgCollection.length) destInd = destInd % imgCollection.length;
    return imgCollection[destInd];
}
function currentImg(image, imgCollection){
    let ind = 0;
    imgCollection.forEach((img)=>{
        if(img.match(image)) {
            ind = imgCollection.indexOf(img);
        }
    })
    return ind;
}

let darkMode = localStorage.getItem('darkmode');
let themeSwitch = document.querySelector('.theme-switch');
themeSwitch.addEventListener('click', ()=>{
    if(themeSwitch.checked){
        enableDarkMode();
    }
    else{
        enableLightMode();
    }
});

function enableLightMode(){
    document.documentElement.style.setProperty('--background-color', '#F9F9F9');
    document.documentElement.style.setProperty('--main-color', '#303030');
    document.documentElement.style.setProperty('--secondary-color', '#A0A0A0');
    document.documentElement.style.setProperty('--gradient-color-1', 'red');
    document.documentElement.style.setProperty('--gradient-color-2', 'blue');
    document.documentElement.style.setProperty('color-scheme', 'light dark');
    document.documentElement.style.setProperty('--img-shadow-color', 'gray');
    localStorage.setItem('darkmode', 'disabled');
}

function enableDarkMode(){
    document.documentElement.style.setProperty('--background-color', '#212121');
    document.documentElement.style.setProperty('--main-color', '#F9F9F9');
    document.documentElement.style.setProperty('--secondary-color', '#A9A9A9');
    document.documentElement.style.setProperty('--gradient-color-1', 'rgb(255, 100, 255)');
    document.documentElement.style.setProperty('--gradient-color-2', '#6fcfff');
    document.documentElement.style.setProperty('--img-shadow-color', '#2F2F2F');
    document.documentElement.style.setProperty('color-scheme', 'dark light');
    localStorage.setItem('darkmode', 'enabled');
}

function setTheme(){
    if(darkMode=='disabled'){
        enableLightMode();
    }
    else if(darkMode=='enabled'){
        enableDarkMode();
        themeSwitch.checked = true;
    }
    else{
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            enableDarkMode();
            themeSwitch.checked = true;
        }
        else{
            enableLightMode();
        }
    }
}
