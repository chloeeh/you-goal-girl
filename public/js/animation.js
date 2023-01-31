anime.timeline({loop: true})
    .add({
        targets: '.ml15 .animate',
        scale: [14,1],
        opacity: [0,1],
        easing: "easeOutCirc",
        duration: 800,
        delay: (el, i) => 800 * i
    }).add({
        targets: '.ml15',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
    
});

//eventlistener to handle 'get started'
const getStarted = () => {
    document.location.replace('/');
};

document.querySelector('#logout').addEventListener('click', logout);