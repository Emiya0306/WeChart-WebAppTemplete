var webchat = function (opts) {
  this.target = opts.target ? opts.target : document.getElementsByTagName('body')[0];
  this.width = opts.width ? opts.width : document.body.clientWidth;
  this.height = opts.height ? opts.height : document.body.clientHeight;
  this.method = opts.method ? opts.method : 'touchmove';
  this.effect = opts.effect ? opts.effect : 'cut-in';
  this.direction = opts.direction ? opts.direction : 'y-index';
  this.moveThreshold = opts.moveThreshold ? opts.moveThreshold : 120;
  this.page = 0;
  this.moved = false;
  this.offset = 0;
  this.frontPage = 0;
  this.init();
}

webchat.prototype.init = function () {
  if (this.method != 'cut-in') {
    this.initPage();
  }
  this.setMethod();
};

webchat.prototype.initPage = function () {
  for (var i = 0; i < this.target.children.length; i++) {
    this.target.children[i].style.webkitTransition = '';
    this.target.children[i].style.visibility = 'hidden';
    this.target.children[i].style.opacity = '0';
    this.target.children[i].style.position = 'absolute';
    this.target.children[i].style.webkitTransition = 'visibility 0.2s ease-out, opacity 0.2s ease-out';
  }
  this.target.children[this.page].style.visibility = 'visible';
  this.target.children[this.page].style.opacity = '1';
};

webchat.prototype.setMethod = function () {
  switch (this.method) {
    case 'clickmove': break;
    case 'touchmove':
    default:
      this.bindTouchEvent(this.target);
      break;
  }
};

webchat.prototype.bindTouchEvent = function (target) {
  target.addEventListener('touchstart', this.startHandler.bind(this));
  target.addEventListener('touchmove', this.moveHandler.bind(this));
  target.addEventListener('touchend', this.endHandler.bind(this));
};

webchat.prototype.startHandler = function (event) {
  this.startTime = Date.now();
  this.startX = event.touches[0].clientX;
  this.startY = event.touches[0].clientY;
  this.target.style.webkitTransition = '';
  for (var i = 0; i < this.target.children.length; i++) {
    this.target.children[i].style.webkitTransition = '';
  }
};

webchat.prototype.moveHandler = function (event) {
  event.preventDefault();
  this.moveTime = Date.now();
  this.moveX = event.touches[0].clientX - this.startX;
  this.moveY = event.touches[0].clientY - this.startY;
  if (this.direction == 'y-index') {
    this.movePage(0, this.page * (-this.height) + this.moveY);
    this.offset = this.moveY;
  } else {
    this.movePage(this.page * (-this.width) + this.moveX, 0);
    this.offset = this.moveX;
  }
  this.moved = true;
};

webchat.prototype.endHandler = function (event) {
  this.endTime = Date.now();
  if (this.moved) {
    event.preventDefault();
    this.frontPage = this.page;
    if (this.offset > this.moveThreshold && this.page > 0) {
      this.page --;
    } else if (this.offset < -this.moveThreshold && this.page < this.target.children.length - 1) {
      this.page ++;
    }
    this.changePage(this.page);
  }
  if(event && event.preventDefault){
    window.event.returnValue = true;
  }
};

webchat.prototype.movePage = function (x, y) {
  switch (this.effect) {
    case 'fade-out':
      break;
    case 'cut-in':
    default:
      this.target.style.webkitTransform = 'translate3d(' + x + 'px, ' + y + 'px' + ', 0)';
      break;
  }
};

webchat.prototype.changePage = function (index) {
  this.page = index;
  switch (this.effect) {
    case 'fade-out':
      this.target.children[this.frontPage].style.webkitTransition = 'visibility 0.2s ease-out, opacity 0.2s ease-out';
      this.target.children[this.frontPage].style.visibility = 'hidden';
      this.target.children[this.frontPage].style.opacity = '0';
      this.target.children[this.page].style.webkitTransition = 'visibility 0.2s ease-out, opacity 0.2s ease-out';
      this.target.children[this.page].style.visibility = 'visible';
      this.target.children[this.page].style.opacity = '1';
      break;
    case 'cut-in':
    default:
      this.target.style.webkitTransition = 'transform 0.2s ease-out';
      if (this.direction == 'y-index') {
        this.target.style.webkitTransform = 'translate3d(0, ' + (this.page * (-this.height)) + 'px' + ', 0)';
      } else {
        this.target.style.webkitTransform = 'translate3d(' + (this.page * (-this.width)) + 'px, 0 , 0)';
      }
      break;
  }
};
