anime.timeline({loop: true})
    .add({
        targets: '.anime-text .animate',
        scale: [14,1],
        opacity: [0,1],
        easing: "easeOutCirc",
        duration: 800,
        delay: (el, i) => 800 * i
    }).add({
        targets: '.anime-text .animate',
        opacity: 0,
        duration: 3000,
        easing: "easeOutExpo",
        delay: 1000
    
});



//eventlistener to handle 'get started'
const getStarted = () => {
    document.location.replace('/login');
};

document.querySelector('.start-btn').addEventListener('click', getStarted);