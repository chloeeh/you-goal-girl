anime.timeline({loop: true})
    .add({
        targets: '.anime-text .animate',
        scale: [14,1],
        opacity: [0,1],
        easing: "easeOutCirc",
        duration: 600,
        delay: (el, i) => 600 * i
    }).add({
        targets: '.anime-text .animate',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
    
});

//eventlistener to handle 'get started'
const getStarted = () => {
    document.location.replace('/login');
};

document.querySelector('.start-btn').addEventListener('click', getStarted);