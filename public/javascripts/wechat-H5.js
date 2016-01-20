function webchat (app, height, width) {
  this.target = app;
  this.height = height;
  this.width = width;
  this.page = 0;
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
  this.page = index;
  this.target.style.transform = 'translate3d(0, ' + (webchat.page * (-webchat.height)) + 'px' + ', 0)';
};

webchat.prototype.startHandler = function (event) {
  this.startTime = Date.now();
  this.startX = event.touches[0].clientX;
  this.startY = event.touches[0].clientY;
};

webchat.prototype.moveHandler = function (event) {
  event.preventDefault();
  this.moveTime = Date.now();
  this.moveX = event.touches[0].clientX - this.startX;
  this.moveY = event.touches[0].clientY - this.startY;
  this.style.transform = 'translate3d(0, ' + (webchat.page * (-webchat.height) + this.moveY) + 'px' + ', 0)';
};

webchat.prototype.endHandler = function (event) {
  event.preventDefault();
  if (this.moveY > 150 && webchat.page > 0) {
    webchat.page --;
    alert('page--: ' + webchat.page)
  } else if (this.moveY < -150 && webchat.page < webchat.target.children.length - 1) {
    webchat.page ++;
    alert('page++: ' + webchat.page)
  }
  this.style.transform = 'translate3d(0, ' + (webchat.page * (-webchat.height)) + 'px' + ', 0)';
  alert(this.style.transform)
  this.endTime = Date.now();
};
