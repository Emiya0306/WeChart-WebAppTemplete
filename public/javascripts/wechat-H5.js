function webchat (app, height, width, method, effect) {
  this.target = app;
  this.height = height;
  this.width = width;
  this.method = method;
  this.effect = effect;
  this.page = 0;
  webchat.moved = false;
  this.init();
}

webchat.prototype.init = function () {
  this.resizePage();
  this.setMethod();
};

webchat.prototype.resizePage = function () {
  for (var i = 0; i < this.target.children.length; i++) {
    this.target.children[i].style.width = this.width + 'px';
    this.target.children[i].style.height = this.height + 'px';
    if (this.effect != 'cut-in') {
      this.target.children[i].style.webkitTransition = 'visibility 0.2s ease-out, opacity 0.2s ease-out';
      this.target.children[i].style.position = 'absolute';
      this.target.children[i].style.opacity = '0';
      this.target.children[i].style.visibility = 'hidden';
    }
  }
  this.target.children[this.page].style.opacity = '1';
  this.target.children[this.page].style.visibility = 'visible';
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
  target.addEventListener('touchstart', this.startHandler);
  target.addEventListener('touchmove', this.moveHandler);
  target.addEventListener('touchend', this.endHandler);
};

webchat.prototype.movePage = function (x, y) {
  switch (webchat.effect) {
    case 'fade-out':
      // var page = this.target.children;
      // for (var i = 0; i < page.length; i++) {
      //   // page[i].style.display = 'none';
      //   page[i].style.opacity = '0';
      //   page[i].style.webkitTransition = 'visibility 0.2s ease-out, opacity 0.2s ease-out';
      // }
      // // page[webchat.page].style.display = 'block';
      // page[webchat.page].style.opacity = '1';
      break;
    case 'cut-in':
    default:
      this.target.style.webkitTransform = 'translate3d(' + x + 'px, ' + y + 'px' + ', 0)';
      break;
  }
};

webchat.prototype.changePage = function (index) {
  webchat.page = index;
  switch (webchat.effect) {
    case 'fade-out':
      var page = this.target.children;
      for (var i = 0; i < page.length; i++) {
        page[i].style.opacity = '0';
        this.target.children[i].style.visibility = 'hidden';
      }
      page[webchat.page].style.opacity = '1';
      this.target.children[this.page].style.visibility = 'visible';
      break;
    case 'cut-in':
    default:
      this.target.style.webkitTransform = 'translate3d(0, ' + (webchat.page * (-webchat.height)) + 'px' + ', 0)';
      break;
  }
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
  webchat.movePage(0, webchat.page * (-webchat.height) + this.moveY);
  webchat.moved = true;
};

webchat.prototype.endHandler = function (event) {
  this.endTime = Date.now();
  if (webchat.moved) {
    event.preventDefault();
    if (this.moveY > 120 && webchat.page > 0) {
      webchat.page --;
    } else if (this.moveY < -120 && webchat.page < webchat.target.children.length - 1) {
      webchat.page ++;
    }
    webchat.changePage(webchat.page);
  }
  if(event && event.preventDefault){
    window.event.returnValue = true;
  }
};
