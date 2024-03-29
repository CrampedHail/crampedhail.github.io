//Galleries
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
["/Images/battleships.png", "/Images/hangman.png", 
"/Images/polacz4.png", "/Images/tanks.png", 
"/Images/tictactoe.png"];
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
    image = image.substring(image.indexOf("/Images"), image.length-1)
    imgCollection.forEach((img)=>{
        if(img.match(image)) {
            ind = imgCollection.indexOf(img);
        }
    })
    return ind;
}


//Themes
let darkMode = localStorage.getItem('darkmode');
let sunIcon = document.querySelector('.fa-sun');
sunIcon.addEventListener('click', () => {
    if(darkMode=='enabled'){
        enableLightMode();
        themeSwitch.checked = false;
    }
});
let moonIcon = document.querySelector('.fa-moon');
moonIcon.addEventListener('click', () => {
    if(darkMode=='disabled'){
        enableDarkMode();
        themeSwitch.checked = true;
    }
});
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
    document.documentElement.style.setProperty('--secondary-color', '#808080');
    document.documentElement.style.setProperty('--third-color', '#E8E8E8');
    document.documentElement.style.setProperty('--gradient-color-1', 'red');
    document.documentElement.style.setProperty('--gradient-color-2', 'blue');
    document.documentElement.style.setProperty('color-scheme', 'light dark');
    document.documentElement.style.setProperty('--img-shadow-color', 'gray');
    document.documentElement.style.setProperty('--fourth-color', '#C0C0C0');
    localStorage.setItem('darkmode', 'disabled');
    darkMode = localStorage.getItem('darkmode');
}

function enableDarkMode(){
    document.documentElement.style.setProperty('--background-color', '#212121');
    document.documentElement.style.setProperty('--main-color', '#F9F9F9');
    document.documentElement.style.setProperty('--secondary-color', '#A9A9A9');
    document.documentElement.style.setProperty('--third-color', '#303030');
    document.documentElement.style.setProperty('--gradient-color-1', 'rgb(255, 100, 255)');
    document.documentElement.style.setProperty('--gradient-color-2', '#6fcfff');
    document.documentElement.style.setProperty('--img-shadow-color', '#2F2F2F');
    document.documentElement.style.setProperty('--fourth-color', '#555555');
    document.documentElement.style.setProperty('color-scheme', 'dark light');
    localStorage.setItem('darkmode', 'enabled');
    darkMode = localStorage.getItem('darkmode');
}

function setTheme(){
    if(darkMode=='disabled'){
        enableLightMode();
        themeSwitch.checked = false;
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
            themeSwitch.checked = false;
        }
    }
}
window.onload = setTheme();


//Write Animation
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};




// Dropdown Handling
let dropButton = document.getElementById("dropbtn");
var myDropdown = document.getElementById("myDropdown");

window.ontouchmove,
document.onscroll,
document.ontouchmove, document.ontouchstart,
myDropdown.ontouchend, myDropdown.onmouseleave
 = function() {
    closeDropdown()
  }

  function closeDropdown(){
    if (myDropdown.classList.contains('show')) {
        myDropdown.classList.remove('show');
    }
    if(dropButton.classList.contains('active')){
        dropButton.classList.remove('active');
    }
  }

function toggleShowDropdown() {
    myDropdown.classList.toggle("show");
    dropButton.classList.toggle("active");
  }




  // Accordion
  var acc = document.getElementsByClassName("accordion");
  var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}



  // Connection Status 
  window.addEventListener('online', ConnectionStatusCheck)
  window.addEventListener('offline', ConnectionStatusCheck)
  let conn = document.querySelector("#connectionIndicator");

  ConnectionStatusCheck();
function ConnectionStatusCheck(event){
    if(navigator.onLine){
        if(conn.classList.contains("offline"))
            conn.classList.remove("offline");
        conn.classList.add("online");
        conn.title = "Online!";
    }
    else{
        if(conn.classList.contains("online"))
            conn.classList.remove("online");
        conn.classList.add("offline");
        conn.title = "Offline";
    }
}