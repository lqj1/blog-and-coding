function remSize() {
  // 获取当前设备的宽度
  // 设计稿一般是根据iphone，也就是 750，手机的分辨率一般是一半 375
  var deviceWidth = document.documentElement.clientWidth || window.innerWidth;
  if (deviceWidth >= 750) {
    deviceWidth = 750;
  }
  if (deviceWidth <= 320) {
    deviceWidth = 320;
  }
  // 由于按照 750，所以除以750之后，使得 rem 就等价于 100px
  document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
  // 设计稿是 750px，手机是一半的宽度，那么就是375px
  // 1rem == 100px 的设计稿宽度，则表示一半的宽度就是 3.75rem，字体大小就是 50px

  // 设计body的字体大小
  document.querySelector('body').style.fontSize = 0.3 + 'rem';
}
remSize();
// 当窗口发生变化时调用函数
window.onresize = function() {
  remSize();
};
