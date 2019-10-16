window.onload = function() {
    var musiclist = [{
        song_name: 'if',
        singer: '丁可',
        bgs: 'images/1.jpg',
        urls: 'music/If.mp3',
    }, {
        song_name: '卡布奇诺',
        singer: '6诗人',
        bgs: 'images/2.jpg',
        urls: 'music/卡布奇诺.mp3',
    }, {
        song_name: 'Ket',
        singer: 'Shahzoda,Shoxrux',
        bgs: 'images/3.jpg',
        urls: 'music/Ket.mp3',
    }, {
        song_name: ' さよならの夏~コクリコ坂から~',
        singer: '手嶌葵 ',
        bgs: 'images/4.jpg',
        urls: 'music/さよならの夏~コクリコ坂から.mp3',
    }, {
        song_name: ' Flower Dance',
        singer: 'DJ Okawari ',
        bgs: 'images/5.jpeg',
        urls: 'music/DJ Okawari - Flower Dance.mp3',
    }];

    var bg = document.getElementsByClassName('bg')[0],
        audio = document.getElementsByTagName('audio')[0],
        off = document.getElementsByClassName('off')[0],
        next = document.getElementsByClassName('next')[0],
        prev = document.getElementsByClassName('prev')[0],
        Sia = document.getElementsByClassName('Sia')[0],
        song_name = document.getElementsByClassName('song_name')[0],
        singer = document.getElementsByClassName('singer')[0],
        t_line = document.getElementsByClassName('t-line')[0],
        line2 = document.getElementsByClassName('line2')[0],
        t_focus = document.getElementsByClassName('t-focus')[0],
        s_bg = document.getElementsByClassName('s-bg')[0],
        width = t_line.offsetWidth,
        flag = false,
        ind = 0,
        posX = {};

    //点击播放/暂停
    off.onclick = function() {
        if (audio.paused) {
            audio.play();
            flag = false;
            this.classList.add('icon-zanting4');
            s_bg.classList.add('play');
            s_bg.classList.remove('pause');

        } else {
            audio.pause();
            s_bg.classList.add('pause');
            this.classList.remove('icon-zanting4');
            flag = true;
        }
    };

    //上一首
    prev.onclick = function() {
        ind--;
        flag = true;
        if (ind < 0) {
            ind = musiclist.length - 1;
        }
        audio.setAttribute('src', musiclist[ind].urls);
        bg.style.background = `url(${musiclist[ind].bgs})`;
        Sia.style.background = `url(${musiclist[ind].bgs})`;
        song_name.innerHTML = musiclist[ind].song_name;
        singer.innerHTML = musiclist[ind].singer;
    }

    //下一首
    next.onclick = function() {
        nextplay();
    }

    //自动进入下一首
    audio.onended = function() {
        nextplay()
    }

    function nextplay() {
        ind++;
        flag = true;
        if (ind > musiclist.length - 1) {
            ind = 0;
        }
        audio.setAttribute('src', musiclist[ind].urls);
        bg.style.background = `url(${musiclist[ind].bgs})`;
        Sia.style.background = `url(${musiclist[ind].bgs})`;
        song_name.innerHTML = musiclist[ind].song_name;
        singer.innerHTML = musiclist[ind].singer;
    }

    audio.oncanplaythrough = function() {
        if (flag) { //开关
            this.play();
            bg.style.background = `url(${musiclist[ind].bgs})`;
            Sia.style.background = `url(${musiclist[ind].bgs})`;
            s_bg.classList.add('play');
            s_bg.classList.remove('pause');
            off.classList.add('icon-zanting4');
        }

        endTime.innerText = frmotTime(this.duration);
    }

    function frmot(n) {
        return n = n > 9 ? n : '0' + n;
    }

    function frmotTime(t) {
        return frmot(Math.floor(t / 60)) + ':' + frmot(Math.floor(t % 60));
    }

    // 拖动进度条
    t_focus.ontouchstart = function(e) {
        posX.start = e.touches[0].pageX - this.offsetLeft;
    }

    t_focus.ontouchmove = function(e) {
        posX.end = e.touches[0].pageX - posX.start;

        if (posX.end < 0) {
            posX.end = 0;
        } else if (posX.end > width) {
            posX.end = width;
        }

        if (posX.end < width) {
            var newTime = posX.end / width * audio.duration;
            audio.currentTime = newTime;
            changeWidth(newTime, audio.duration);
            return false;
        }
    }


    function changeWidth(current, duration) {
        startTime.innerText = frmotTime(current);
        var t_width = current / duration * width;
        line2.style.width = t_width + 'px';
    }

    //开始时间
    audio.ontimeupdate = function() {
        changeWidth(this.currentTime, this.duration);
    }
}