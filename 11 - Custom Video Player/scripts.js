(function(){
    const videoViewer = document.querySelector('.viewer');
    const playButton = document.querySelector('.toggle');
    const playbackSlider = document.querySelector('input[name=playbackRate]');
    const volumeSlider = document.querySelector('input[name=volume]');
    const progressBar = document.querySelector('.progress__filled');
    const skip = document.querySelectorAll('[data-skip]');    
    const scrubber = document.querySelector('.progress');
    const toggle = document.querySelector('.toggle');

    let playing = false;
    
    const updateProgressBar = () => {        
        const seconds = videoViewer.duration;
        const progress = Math.round(videoViewer.currentTime);
        const percentage = ( progress / seconds) * 100;

        progressBar.style.flexBasis = `${percentage}%`;
    };

    const volume = () => {
        const volume = volumeSlider.value;
        videoViewer.volume = volume;
    };

    const playRate = () => {
        const speed = playbackSlider.value;
        videoViewer.playbackRate = speed;
    };

    const togglePlayPause = () => {
        // (playing) ? videoViewer.pause() : videoViewer.play();
        // playing = !playing;

        const method = videoViewer.paused ? 'play' : 'pause';
        videoViewer[method]();   
    };

    function updateButton() {
        const icon = this.paused ? '►' : '❚ ❚';        
        toggle.textContent = icon;
    }

    const videoSkip = (e) => {
        // const amountToSkip = e.target.dataset.skip;
        // if (amountToSkip === '- 10') {
        //     videoViewer.currentTime = (videoViewer.currentTime - 10);
        // } else if (amountToSkip === '+ 25') {
        //     videoViewer.currentTime = (videoViewer.currentTime + 25);
        // }
        videoViewer.currentTime += parseFloat(e.target.dataset.skip);
        updateProgressBar();
    };    

    const scrubberClick = (e) => {
        var barWidth = scrubber.clientWidth;        
        var clickOffset = e.offsetX;               
        const percentage = Math.round((clickOffset / barWidth) * 100);
        const seconds = videoViewer.duration;
        const secondsPercent = (seconds / 100);

        videoViewer.currentTime = percentage * secondsPercent;
        progressBar.style.flexBasis = `${percentage}%`;        
    };

    videoViewer.addEventListener('play', updateButton);
    videoViewer.addEventListener('pause', updateButton);
    videoViewer.addEventListener('click', togglePlayPause);
    playButton.addEventListener('click', togglePlayPause);
    playbackSlider.addEventListener('change', playRate);
    volumeSlider.addEventListener('change', volume);
    skip.forEach(el => {el.addEventListener('click', videoSkip)});
    scrubber.addEventListener('click', scrubberClick);

    window.setInterval(updateProgressBar, 1000);
})();

// https://javascript30.com/account/access/5889f86cbaecf135b3fa7086/view/25a2e75e68
// 21:12

// implement click and drag on srubber. also update maths for scrubber.
