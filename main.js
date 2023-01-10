const headerBtn = document.querySelector('.js-button')
const modal = document.querySelector('.js-modal')
const modalClose = document.querySelector('.js-close')
const modalContainer = document.querySelector('.modal-container')
headerBtn.onclick = function (){
    modal.classList.add('open')
}
modalClose.onclick = function(){
    modal.classList.remove('open')
}
modal.onclick =function(){
    modal.classList.remove('open')
}
modalContainer.onclick = function(event){
    event.stopPropagation()
}

// Slider
window.addEventListener("load",function(){
    const slider = document.querySelector(".slider")
    const sliderMain = document.querySelector(".slider-main")
    const sliderItems = document.querySelectorAll(".slider-item")
    const nextBtn = document.querySelector(".slider-next")
    const prevBtn = document.querySelector(".slider-prev")
    const dotItem = document.querySelectorAll(".slider-dot-item")
    const sliderItemWidth = sliderItems[0].offsetWidth;
    const slidesLength = sliderItems.length  
    let positionX = 0
    let index = 0
    nextBtn.onclick = function(){
        handleChangeSlide(1)
    }
    prevBtn.onclick = function(){
        handleChangeSlide(-1)
    }
    function handleChangeSlide(direction){
        if(direction === 1){
            
            if(index >= slidesLength - 1) {
                index = slidesLength - 1
                return;
            }
            positionX = positionX - sliderItemWidth
            sliderMain.style = `transform: translateX(${positionX}px)`
            index++
        }
        else if(direction === -1){
            
            if(index <= 0) {
                
                return;
            }
            positionX = positionX + sliderItemWidth
            sliderMain.style = `transform: translateX(${positionX}px)`
            index--
        }
    }
})
var i = 0
const changeImage = function(){
    var imgs = ["./assets/image/banner3.jpg","./assets/image/banner1.jpg","./assets/image/banner4.jpg"]
    document.getElementById('img').src = imgs[i]
    i++
    if(i > 2){
        i = 0
    }
}
setInterval(changeImage,3000)