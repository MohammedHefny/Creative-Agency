//add class open to open and close the settings box and make the gear spin
settingsBox = document.querySelector(".settings-box")
wheel = document.querySelector(".wheel")
gear = document.querySelector(".gear")
wheel.onclick = function(){
    settingsBox.classList.toggle("open")
    gear.classList.toggle("fa-spin")
        //when settings box is opened and you want to open the toggle menu then close the toggle menu 
        if(settingsBox.classList.contains("open") && list.classList.contains("pop-up")){
            list.classList.remove("pop-up")
        toggleMenu.classList.remove("active")

        }
}

// click on color to make the color changes and added to the local storage
colors = document.querySelectorAll(".colors-list li")
colors.forEach(function(e){
    e.addEventListener("click",function(e){
    document.documentElement.style.setProperty("--main-color",e.currentTarget.dataset.color)
    window.localStorage.setItem("color",e.currentTarget.dataset.color)
    colors.forEach(function(e){
        e.classList.remove("active")
    })
    e.currentTarget.classList.add("active")
})
})
if(window.localStorage.getItem("color") !== null){
    document.documentElement.style.setProperty("--main-color",window.localStorage.getItem("color"))
    colors.forEach(function(e){
        e.classList.remove("active")
        if(e.dataset.color === window.localStorage.getItem("color")){
            e.classList.add("active")
        }
    })
}
//click on toggle menu to show or hide the landing icon
toggleMenu = document.querySelector(".toggle-menu")
list = document.querySelector(".landing .container .holder ul")
toggleMenu.onclick = function(e){
    list.classList.toggle("pop-up")
    toggleMenu.classList.toggle("active")
    //when settings box is opened and you want to open the toggle menu then close the settings box
    if(settingsBox.classList.contains("open") && list.classList.contains("pop-up")){
        settingsBox.classList.remove("open")
        gear.classList.remove("fa-spin")
    }
}
//do you want a random background 
let play = true;
// let stop;
landing = document.querySelector(".landing")
let imgs = ["pexels-steve-johnson-1266808.jpg","pexels-steve-johnson-1509534.jpg","pexels-pixabay-316093.jpg","pexels-pixabay-327509.jpg","pexels-pixabay-268941.jpg"]
landing.style.backgroundImage = 'url("Images/'+imgs[0]+'")'
function randomize (){
    if(play === true){
        stop = setInterval(function(){
            Random = Math.floor(Math.random()*imgs.length)
            landing.style.backgroundImage = 'url("Images/'+imgs[Random]+'")'
        },1000)
    }
}
//click yes for random pics or no
random = document.querySelectorAll(".option span")
imagesList = document.querySelector(".background-box .images-list")

random.forEach(function(e){
    e.addEventListener("click",function(e){
        random.forEach(function(e){
            e.classList.remove("active")
        })
        e.currentTarget.classList.add("active")
        window.localStorage.setItem("random",e.currentTarget.dataset.opt)

    if(e.currentTarget.dataset.opt === "yes"){
        play = true
        randomize ()
        imagesList.style.display = "none"
    }else{
        play = false
        clearInterval(stop)
        imagesList.style.display = "flex"

    }

})
})

if(window.localStorage.getItem("random") !== null){
    random.forEach(function(e){
        e.classList.remove("active")
        if(window.localStorage.getItem("random") === e.dataset.opt  && window.localStorage.getItem("random") === "yes" ){
            document.querySelector(".background-box .option .yes").classList.add("active")
            play = true
            randomize ()
            imagesList.style.display = "none"
        }else if (window.localStorage.getItem("random") === e.dataset.opt  && window.localStorage.getItem("random") === "no" ){
            document.querySelector(".background-box .option .no").classList.add("active")
            imagesList.style.display = "flex"
        }
    })
}
// if you dont want to make photos random then a popup menu will appear to choose from it
images = document.querySelectorAll(".background-box .images-list img")
images.forEach((e)=>{
    e.addEventListener("click",(e)=>{
        landing.style.backgroundImage = 'url("Images/'+e.currentTarget.dataset.img+'")'
        window.localStorage.setItem("img",e.currentTarget.dataset.img)
        images.forEach((e)=>{
            e.classList.remove("active")
        })
        e.currentTarget.classList.add("active")
    })
})
if(window.localStorage.getItem("img") !== null){
    landing.style.backgroundImage = 'url("Images/'+window.localStorage.getItem("img")+'")'    
    images.forEach((e)=>{
        e.classList.remove("active")
        if(e.dataset.img === window.localStorage.getItem("img")){
            e.classList.add("active")
        }
    })
}

// select skills selector
let ourSkills = document.querySelector(".our-skills");
window.onscroll = function(){
    //skills offset top
    let skillOffsetTop = ourSkills.offsetTop;
    // console.log(skillOffsetTop)
    //skills outer height (height including offset and padding)
    let skillsOuterHeight = ourSkills.offsetHeight
    // console.log(skillsOuterHeight)
//window height (height of window)
let windowHeight = this.innerHeight
// console.log(windowHeight) 
//window scroll top (the part that you scrolled)
let windowScrollTop = this.pageYOffset;
// console.log(windowScrollTop) 
if(windowScrollTop > (skillOffsetTop + skillsOuterHeight - windowHeight)){
    // console.log("skills section reached")
    let allSkills = document.querySelectorAll(".skill .dad span")
    // console.log(allSkills)
    allSkills.forEach((skill)=>{
        skill.style.width = skill.dataset.progress
    })
} else{
    let allSkills = document.querySelectorAll(".skill .dad span")

    allSkills.forEach((skill)=>{
        skill.style.width = 0
    })
}
}
//gallery (click on a photo for a full view)
gallery = document.querySelectorAll(".gallery .photos img")
photos = document.querySelector(".gallery ")
gallery.forEach((e)=>{
    e.addEventListener("click",(e)=>{
        //  the overlay
        let overlay = document.createElement("div")
        overlay.className = "overlay"
        document.body.appendChild(overlay)
        // the new image will appear
        let newImg = document.createElement("img")
        let holder = document.createElement("div")
        newImg.className = "img"
        holder.className = "image"
        newImg.setAttribute("src",e.currentTarget.src)
        holder.appendChild(newImg)
        document.body.appendChild(holder)
        // the closing menu
        let close = document.createElement("div")
        close.className = "close"
        close.appendChild(document.createTextNode("X"))
        holder.appendChild(close)
        // add the source as a alt as a title for the image
        holder.prepend(document.createTextNode(e.currentTarget.alt))
        if(e.currentTarget.alt === ""){
            
            holder.prepend(document.createTextNode("Unnamed Photo"))
        }
        // click on the X to close the image and overlay 
        close.addEventListener("click",(e)=>{
            e.target.parentNode.remove()
            overlay.remove()
        })
    })
})

// click on the toggle menu to be scrolled to the target 
link = document.querySelectorAll(".landing ul li a ")
bullet = document.querySelectorAll(".nav-bullets .bullet ")
function scrollToSomewhere (element){
    element.forEach((e)=>{
        e.addEventListener("click",(e)=>{
            e.preventDefault()
            document.querySelector(e.currentTarget.dataset.section).scrollIntoView({
                behavior: "smooth"
            })
        })
    })
}
scrollToSomewhere(link)
scrollToSomewhere(bullet)

gears = document.querySelector(".wheel i")
optionBox = document.querySelector(".settings-box .option-box")

// click any where but the toggle menu to close the toggle menu
document.addEventListener("click",(e)=>{
    // click any where but the toggle menu to close the toggle menu
    if(e.target !== list && e.target !== toggleMenu ){
        if(toggleMenu.classList.contains("active")){
            // console.log("this is it")
            list.classList.toggle("pop-up")
            toggleMenu.classList.toggle("active")
        }
    }
// click any where but the settings menu to close the settings menu
if(e.target !== settingsBox && e.target !== gears){
    if(settingsBox.classList.contains("open")){
        settingsBox.classList.toggle("open")
        gear.classList.toggle("fa-spin")

    } 
}
})
settingsBox.onclick = function(e){
    e.stopPropagation()
}
list.onclick = function(e){
    e.stopPropagation()
}
toggleMenu.onclick = function (e){
    e.stopPropagation()
    toggleMenu.classList.toggle("active")
    // toggle class "open" on links
    list.classList.toggle("pop-up")
}


toggleMenu.onclick = function(e){
    list.classList.toggle("pop-up")
    toggleMenu.classList.toggle("active")
    //when settings box is opened and you want to open the toggle menu then close the settings box
    if(settingsBox.classList.contains("open") && list.classList.contains("pop-up")){
        settingsBox.classList.remove("open")
        gear.classList.remove("fa-spin")
    }
}

// if you want to remove the bullets you have the option
bullet = document.querySelectorAll(".nav-bullets .bullet ")
bulletBox= document.querySelector(".Bullets-box")
bull = document.querySelector(".nav-bullets ")

// console.log(bulletBox)
bulletclose = document.querySelectorAll(".Bullets-box .option button")
bulletclose.forEach((e)=>{
    e.addEventListener("click",(e)=>{
        bulletclose.forEach((e)=>{
            e.classList.remove("active")
        })
        e.currentTarget.classList.add("active")
        // console.log(e.currentTarget.dataset.opt)
        window.localStorage.setItem("bullet",e.currentTarget.dataset.opt)
        if(window.localStorage.getItem("bullet") === "hide"){
            bull.style.display = "none";
        }else{
            bull.style.display = "block";
        }
    })
})
if(window.localStorage.getItem("bullet") !== null){
    bulletclose.forEach((e)=>{
        e.classList.remove("active")
        if(window.localStorage.getItem("bullet") === e.dataset.opt){
            if(window.localStorage.getItem("bullet") === "hide"){
            bull.style.display = "none";
            }
            e.classList.add("active")
        }
    })
}
// reset all option
reset = document.querySelector(".reset-box button")
reset.addEventListener("click",(e)=>{
    // window.localStorage.clear()

// when reset is clicked a popup menu will appear
pop = document.createElement("div")
pop.className = "quit"
yes = document.createElement("button")
yes.className = "yess"
yes.appendChild(document.createTextNode("YES"))
no = document.createElement("button")
no.className = "noo"
no.appendChild(document.createTextNode("NO"))
text = document.createElement("div")
text.className = "text"
text.appendChild(document.createTextNode("are you sure that you want to reset the data"))
pop.appendChild(yes)
pop.appendChild(no)
pop.prepend(text)
document.body.appendChild(pop)
// overlay
let overlay = document.createElement("div")
overlay.className = "overlay"
document.body.appendChild(overlay)

// let x = document.querySelector(".quit button .yess")
document.addEventListener("click",(e)=>{
    if(e.target.classList.value === "yess"){
        console.log(e.target.classList.value)
    window.localStorage.removeItem("random")
    window.localStorage.removeItem("img")
    window.localStorage.removeItem("bullet")
    window.localStorage.removeItem("color")
    window.localStorage.removeItem("fixed")
    window.location.reload()
    }else if (e.target.classList.value === "noo"){
        e.target.parentNode.remove()
        overlay.remove()
    }
})
})

// float toggle menu 
togglespan = document.querySelectorAll(".toggle-menu span")
sad = document.querySelectorAll(".landing .container .holder .active")
console.log(togglespan)
let floatBox = document.querySelectorAll(".float-box .option button")
floatBox.forEach((e)=>{
    // console.log(e)
    e.addEventListener("click",(e)=>{
        floatBox.forEach((e)=>{
            e.classList.remove("active")
        })
        e.currentTarget.classList.add("active")
        window.localStorage.setItem("fixed",e.currentTarget.dataset.float)
        if(e.currentTarget.dataset.float === "show"){
            toggleMenu.style.position = "fixed"
            list.style.position = "fixed"
            toggleMenu.style.zIndex = "1000"
            list.style.zIndex = "1000"
            list.style.backgroundColor = "white"
            toggleMenu.classList.remove("active")

            togglespan.forEach((e)=>{
                e.style.backgroundColor = "white"
            })
            console.log("hello")
        }else{
            toggleMenu.style.position = "absolute"
            list.style.position = "absolute"
            toggleMenu.style.zIndex = "1000"
            list.style.zIndex = "1000"
            list.style.backgroundColor = "white"
            togglespan.forEach((e)=>{
                e.style.backgroundColor = "white"
            })
        }
    })
})
if(window.localStorage.getItem("fixed") !== null){
    floatBox.forEach((e)=>{
        e.classList.remove("active")
        if(window.localStorage.getItem("fixed") === e.dataset.float){
            if(window.localStorage.getItem("fixed") === "show"){
                toggleMenu.style.position = "fixed"
                list.style.position = "fixed"
                toggleMenu.style.zIndex = "1000"
                list.style.zIndex = "1000"
                list.style.backgroundColor = "white"
                toggleMenu.classList.remove("active")
            }
            e.classList.add("active")
        }
    })
} 