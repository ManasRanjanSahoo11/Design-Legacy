const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});

function firstPageAnimation() {
    gsap.from('#nav', {
        y: -10,
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })

    gsap.to('.doundingelem', {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: 0.2
    })

    gsap.from('#herofooter', {
        y: -10,
        opacity: 0,
        ease: "expo.inOut",
        delay: 0, // Changed delay to a positive value
        duration: 1.5
    });
}


let timeout;

function circleSkew() {
    //define default scale value
    let xscale = 1;
    let yscale = 1;

    let xprev = 0;
    let yprev = 0;

    window.addEventListener('mousemove', (details) => {
        clearTimeout(timeout)

        let xdiff = details.clientX - xprev;
        let ydiff = details.clientY - yprev;

        xscale = gsap.utils.clamp(.8, 1.2, xdiff)
        yscale = gsap.utils.clamp(.8, 1.2, ydiff)

        xprev = details.clientX
        yprev = details.clientY

        circleMouseFollower(xscale, yscale)

        timeout = setTimeout(() => {
            document.querySelector('#minicircle').style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(1, 1)`
        }, 100)
    });
}

function circleMouseFollower(xscale, yscale) {
    window.addEventListener('mousemove', (details) => {
        document.querySelector('#minicircle').style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(${xscale}, ${yscale})`
    })
}

circleSkew()
circleMouseFollower();
firstPageAnimation()


document.querySelectorAll(".elem").forEach((elem) => {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener('mousemove', (details) => {

        let diff = details.clientY - elem.getBoundingClientRect().top;
        diffrot = details.clientX - rotate;
        rotate = details.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: details.clientX,
            rotation: gsap.utils.clamp(-20, 20, diffrot * 0.8)
        })
    })
})

document.querySelectorAll(".elem").forEach((elem) => {
    elem.addEventListener('mouseleave', (details) => {  
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5
        })
    })
})
