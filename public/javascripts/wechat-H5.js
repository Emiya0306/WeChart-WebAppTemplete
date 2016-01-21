function webchat (app, height, width) {
  this.target = app;
  this.height = height;
  this.width = width;
  this.page = 0;
  webchat.moved = false;
  this.init();
}

webchat.prototype.resizePage = function () {
  for (var i = 0; i < this.target.children.length; i++) {
    this.target.children[i].style.width = this.width + 'px';
    this.target.children[i].style.height = this.height + 'px';
  }
  this.bindTouchEvent(this.target);
};

webchat.prototype.bindTouchEvent = function (target) {
  target.addEventListener('touchstart', this.startHandler);
  target.addEventListener('touchmove', this.moveHandler);
  target.addEventListener('touchend', this.endHandler);
};

webchat.prototype.init = function () {
  this.resizePage();
};

webchat.prototype.movePage = function (index) {
  webchat.page = index;
  this.target.style.webkitTransform = 'translate3d(0, ' + (webchat.page * (-webchat.height)) + 'px' + ', 0)';
};

webchat.prototype.startHandler = function (event) {
  event.initEvent()
  this.startTime = Date.now();
  this.startX = event.touches[0].clientX;
  this.startY = event.touches[0].clientY;
};

webchat.prototype.moveHandler = function (event) {
  event.preventDefault();
  this.moveTime = Date.now();
  this.moveX = event.touches[0].clientX - this.startX;
  this.moveY = event.touches[0].clientY - this.startY;
  this.style.webkitTransform = 'translate3d(0, ' + (webchat.page * (-webchat.height) + this.moveY) + 'px' + ', 0)';
  webchat.moved = true;
};

webchat.prototype.endHandler = function (event) {
  this.endTime = Date.now();
  if (webchat.moved) {
    event.preventDefault();
  }
  if (this.moveY > 150 && webchat.page > 0) {
    webchat.page --;
  } else if (this.moveY < -150 && webchat.page < webchat.target.children.length - 1) {
    webchat.page ++;
  }
  this.style.webkitTransform = 'translate3d(0, ' + (webchat.page * (-webchat.height)) + 'px' + ', 0)';
  if(event && event.preventDefault){
    window.event.returnValue = true;
  }
};
