//check if there is local storage color option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
    document.documentElement.style.setProperty('--main-color', mainColors);

    //remove activ class from all color list item
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
        //add active class on element with data color === local storage item
        if (element.dataset.color === mainColors) {
            //add active class
            element.classList.add("active");
        }
    });
}
//random background option
let backgroundOption = true;

//variable to control the interval
let backgroundInterval;

//check if there is local storage random background item
let backgroudLocalStorge = localStorage.getItem("background_option");
//check if random local storage is not empty
if (backgroudLocalStorge !== null) {
    if (backgroudLocalStorge === "true") {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }
    //remove active class from all spans
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    });
    if (backgroudLocalStorge === "true") {
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    } else {
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }
}


// Toggle Spin Class On Icon
document.querySelector(".toggle-settings").onclick = function () {
    // Toggle Class Fa-spin For Rotation On Self
    document.querySelector(".fa-gear").classList.toggle("fa-spin");

    // Toggle Class Open On Main Settings Box
    document.querySelector(".settings-box").classList.toggle("open");
};
//switch colors
const colorsLi = document.querySelectorAll(".colors-list li");
//loop on all list items
colorsLi.forEach((li) => {
    //click on every list items
    li.addEventListener("click", (e) => {

        //set color on root
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        //set color on local storage
        localStorage.setItem("color_option", e.target.dataset.color);
        handleActive(e);
    });
});
//switch random background options
const randomBackEl = document.querySelectorAll(".random-backgrounds span");
//loop on all spans
randomBackEl.forEach((span) => {
    //click on every span
    span.addEventListener("click", (e) => {
        handleActive(e);
        if (e.target.dataset.background === 'yes') {
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option", true);

        }
        else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    });
});

//select landing page element
let landingPage = document.querySelector(".landing-page");

//get array of images
let imagesArray = ["img1.webp", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg"];


//function to randomize img
function randomizeImgs() {
    if (backgroundOption === true) {

        backgroundInterval = setInterval(() => {

            //get random number
            let randomNumber = Math.floor(Math.random() * imagesArray.length);

            //change background image 
            landingPage.style.backgroundImage = 'url("imjs/' + imagesArray[randomNumber] + '")';

        }, 1000);
    }
}

randomizeImgs();


//select skill selector

let ourskills = document.querySelector(".skills");

window.onscroll = function () {
    //skills offset top
    let skillsOffsetTop = ourskills.offsetTop;
    //skills outer hight
    let skillsOuterhight = ourskills.offsetHeight;
    //window hight
    let windowHight = this.innerHeight;
    //window scroll top
    let windowScrollTop = this.pageYOffset;

    //if scroll top is greater than skills top
    if (windowScrollTop > skillsOffsetTop + skillsOuterhight - windowHight) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
};

//create popup wuth the image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener("click", (e) => {

        //create overlay element
        let overlay = document.createElement("div");
        //add class to overlay
        overlay.className = "popup-overlay";
        //append overlay to the body
        document.body.appendChild(overlay);
        //create the popup box
        let popupBox = document.createElement("div");
        //add class to popup box
        popupBox.className = "popup-box";

        if (img.alt !== null) {
            //create heading
            let imgHeading = document.createElement("h3");

            //create text for heading
            let imgText = document.createTextNode(img.alt);

            //add text to heading
            imgHeading.appendChild(imgText);

            //add heading to popupbox
            popupBox.appendChild(imgHeading);
        }
        //create the image
        let popupImage = document.createElement("img");
        //add class to popup box
        popupImage.src = img.src;
        //add image to popupbox
        popupBox.appendChild(popupImage);
        //append popupbox to the body
        document.body.appendChild(popupBox);

        //create the close span
        let closeButton = document.createElement("span");

        //create text for close button
        let closeButtonText = document.createTextNode("x");

        //add text to close button
        closeButton.appendChild(closeButtonText);

        //add class to close button
        closeButton.className = "close-button";

        //add close button to popupbox
        popupBox.appendChild(closeButton);

    });

});

//close popup
document.addEventListener("click", function (e) {
    if (e.target.className == 'close-button') {
        //remove the popup
        e.target.parentNode.remove();
        //remove the overlay
        document.querySelector(".popup-overlay").remove();

    }
})


//select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

//select all links
const allLinks = document.querySelectorAll(".links a");

function scrollToSection(elements) {
    elements.forEach(ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });

        });

    });

}

scrollToSection(allBullets);
scrollToSection(allLinks);


//handle active state

function handleActive(ev) {
    
    //remove active class from all children
    ev.target.parentElement.querySelectorAll('.active').forEach(element => {
        
        element.classList.remove('active');
        
    });
    //add active class on self
    ev.target.classList.add('active');
}

//show or hide bullets
let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets-option");

if(bulletLocalItem !== null){
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    });
    if(bulletLocalItem === 'block'){
        bulletsContainer.style.display = 'block';
        document.querySelector(".bullets-option .yes") .classList.add('active')
    }
    else{
        bulletsContainer.style.display = 'none';
        document.querySelector(".bullets-option .no") .classList.add('active')
    }
        
}
bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if(span.dataset.display === `show`){
            bulletsContainer.style.display = `block`;
            
            localStorage.setItem("bullets-option" , 'block')
        }
        else{
            bulletsContainer.style.display = `none`;
            localStorage.setItem("bullets-option" , 'none')
        }
        handleActive(e);
    });
});
            

//rest button
document.querySelector(".reset-options").onclick = function () {
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets-option");
    
    //reload page
    window.location.reload();
    
};

//toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
    //stop propagation
    e.stopPropagation();
    //toggle class "menu-active" on button
    this.classList.toggle("menu-active");
    //toggle class "open" on links
    tLinks.classList.toggle("open");
};

//click anywhere outside menu and toggle button
document.addEventListener("click", (e) => {
    if (e.target !== toggleBtn && e.target !== tLinks){

        //check if menu is open
        if (tLinks.classList.contains("open")) {
            //toggle class "menu-active" on button
    toggleBtn.classList.toggle("menu-active");
    //toggle class "open" on links
    tLinks.classList.toggle("open");
        }

    }
    
});

//stop propagation on menu
tLinks.onclick = function (e) {
    e.stopPropagation();
};