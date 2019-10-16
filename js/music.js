window.onload = function() {
	function Music() {

		this.musiclist = [{
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

		this.bg = document.getElementsByClassName('bg')[0];
		this.audio = document.getElementsByTagName('audio')[0];
		this.off = document.getElementsByClassName('off')[0];
		this.next = document.getElementsByClassName('next')[0];
		this.prev = document.getElementsByClassName('prev')[0];
		this.Sia = document.getElementsByClassName('Sia')[0];
		this.song_name = document.getElementsByClassName('song_name')[0];
		this.singer = document.getElementsByClassName('singer')[0];
		this.t_line = document.getElementsByClassName('t-line')[0];
		this.line2 = document.getElementsByClassName('line2')[0];
		this.t_focus = document.getElementsByClassName('t-focus')[0];
		this.s_bg = document.getElementsByClassName('s-bg')[0];
		this.endTime = document.getElementById('endTime');
		this.startTime = document.getElementById('startTime');
		this.width = this.t_line.offsetWidth;
		this.flag = false;
		this.ind = 0;
		this.posX = {};

		this.init();
	}

	Music.prototype = {
		constructor: Music,

		init: function() {

			this.bindEvent();

		},

		bindEvent: function() {
			this.play();
			this.switchover();
			this.over();
			this.moveFocus();
			this.showStartTime();
		},

		//播放、暂停
		play: function() {
			var _this = this;
			this.off.onclick = function() {
				if (_this.audio.paused) {
					_this.audio.play();
					this.classList.add('icon-zanting4');
					_this.s_bg.classList.add('play');
					_this.s_bg.classList.remove('pause');
					_this.flag = false;
				} else {
					_this.audio.pause();
					_this.s_bg.classList.add('pause');
					this.classList.remove('icon-zanting4');
					_this.flag = true;
				}
			}
		},


		switchover: function() {
			var _this = this;

			//上一首
			this.prev.onclick = function() {
				_this.ind--;
				_this.flag = true;
				if (_this.ind < 0) {
					_this.ind = _this.musiclist.length - 1;
				}
				_this.audio.setAttribute('src', _this.musiclist[_this.ind].urls);
				_this.bg.style.background = `url(${_this.musiclist[_this.ind].bgs})`;
				_this.Sia.style.background = `url(${_this.musiclist[_this.ind].bgs})`;
				_this.song_name.innerHTML = _this.musiclist[_this.ind].song_name;
				_this.singer.innerHTML = _this.musiclist[_this.ind].singer;

			}

			//下一首
			this.next.onclick = function() {
				_this.frmotNextPlay();
			}

			this.audio.onended = function() {
				_this.frmotNextPlay();
			}
		},

		//进入下一首处理函数
		frmotNextPlay: function() {
			var _this = this;
			_this.ind++;
			_this.flag = true;
			if (_this.ind > _this.musiclist.length - 1) {
				_this.ind = 0;
			}
			_this.audio.setAttribute('src', _this.musiclist[_this.ind].urls);
			_this.bg.style.background = `url(${_this.musiclist[_this.ind].bgs})`;
			_this.Sia.style.background = `url(${_this.musiclist[_this.ind].bgs})`;
			_this.song_name.innerHTML = _this.musiclist[_this.ind].song_name;
			_this.singer.innerHTML = _this.musiclist[_this.ind].singer;
		},

		//播放完成之后处理函数
		over: function() {
			var _this = this;
			this.audio.oncanplaythrough = function() {
				if (_this.flag) { //开关
					this.play();
					_this.bg.style.background = `url(${_this.musiclist[_this.ind].bgs})`;
					_this.Sia.style.background = `url(${_this.musiclist[_this.ind].bgs})`;
					_this.s_bg.classList.add('play');
					_this.s_bg.classList.remove('pause');
					_this.off.classList.add('icon-zanting4');
				}

				//显示总时长
				_this.endTime.innerHTML = _this.frmotTime2(this.duration);
			}
		},

		//处理时间函数1
		frmotTime1: function(n) {
			return n = n > 9 ? n : '0' + n;
		},

		//处理时间函数2
		frmotTime2: function(t) {

			return this.frmotTime1(Math.floor(t / 60)) + ':' + this.frmotTime1(Math.floor(t % 60));
			console.log(this.frmotTime1)
		},

		//拖动进度条
		moveFocus: function() {
			var _this = this;

			this.t_focus.ontouchstart = function(e) {
				_this.posX.start = e.touches[0].pageX - this.offsetLeft;
			}

			this.t_focus.ontouchmove = function(e) {
				_this.posX.end = e.touches[0].pageX - _this.posX.start;

				if (_this.posX.end < 0) {
					_this.posX.end = 0;
				} else if (_this.posX.end > _this.width) {
					_this.posX.end = _this.width;
				}

				if (_this.posX.end < _this.width) {
					var newTime = _this.posX.end / _this.width * _this.audio.duration;
					_this.audio.currentTime = newTime;
					_this.changeWidth(newTime, _this.audio.duration);
					return false;
				}
			}
		},

		//进度条以及开始时间处理函数
		changeWidth: function(current, duration) {
			//显示当前播放时间	
			this.startTime.innerText = this.frmotTime2(current);
			var t_width = current / duration * this.width;
			this.line2.style.width = t_width + 'px';
		},

		//显示当前播放时间
		showStartTime: function() {
			var _this = this;
			this.audio.ontimeupdate = function() {
				_this.changeWidth(this.currentTime, this.duration);
			}
		}
	}

	new Music();
}