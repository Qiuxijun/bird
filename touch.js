var viewmode=1;

function getAngle(angx, angy) {
  return Math.atan2(angy, angx) * 180 / Math.PI;
};

//根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
function getDirection(startx, starty, endx, endy) {
  var angx = endx - startx;
  var angy = endy - starty;
  var result = 0;

  //如果滑动距离太短
  if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
    return result;
  }

  var angle = getAngle(angx, angy);
  if (angle >= -135 && angle <= -45) {
    result = 1;
  } else if (angle > 45 && angle < 135) {
    result = 2;
  } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
    result = 3;
  } else if (angle >= -45 && angle <= 45) {
    result = 4;
  }

  return result;
}

function sliderbackListener(dom){
  //每天学习一点点。
  var startx, starty;
  //获得角度
  //手指接触屏幕
  //alert(document.getElementsByClassName(dom)[0].innerHTML)
  document.getElementsByClassName(dom)[0].addEventListener("touchstart", function(e) {
    startx = e.touches[0].pageX;
    starty = e.touches[0].pageY;
  }, false);
  //手指离开屏幕
  document.getElementsByClassName(dom)[0].addEventListener("touchend", function(e) {
    var endx, endy;
    endx = e.changedTouches[0].pageX;
    endy = e.changedTouches[0].pageY;
    var direction = getDirection(startx, starty, endx, endy);
	if (viewmode==1){
    switch (direction) {
      case 3:
        if (Power<7){PowerClick(Power-1);break;}
        if ((Power==7) && (Rank>2)){RankClick(7-Rank);break;}	 
        if ((Power==7) && (Rank==2) && (Type<14)){TypeClick(Type+1);break;}	 	 
        break;
      case 4:
        if (Power>3){PowerClick(Power-3);break;}
        if ((Power==3) && (Rank<5)){RankClick(5-Rank);PowerClick(5);break;}	 
        if ((Power==3) && (Rank==5) && (Type>1)){TypeClick(Type-1);RankClick(4);PowerClick(5);break;}	 	 
        break;
      default:
    }
	}
  }, false);
}