//获取动态属性
function getAttr(ele,attr){
	if(ele.currentStyle){
		return ele.currenStyle[attr];
	}else{
		return getComputedStyle(ele,false)[attr];
	}
}

//完美运动框架
function move(ele,json,fun){
	clearInterval(ele.timer);
	ele.timer=setInterval(function(){
		var stop=true;
		for(var attr in json){
			var cur;
			if(attr=='opacity'){
				cur=Math.round(parseFloat(getAttr(ele,attr))*100);
			}else{
				cur=parseInt(getAttr(ele,attr));
			}
			var iTarget=json[attr];

			var speed=(iTarget-cur)/4;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);

			if(cur!=iTarget){
				stop=false;
			}

			if(attr=='opacity'){
				cur+=speed;
				ele.style.opacity=cur/100;
				ele.style.filter='alpha(opacity:'+cur+')';
			}else{
				ele.style[attr]=cur+speed+'px';
			}
		}
		if(stop){
			clearInterval(ele.timer);
			if(fun){fun()};
		}
	},30);
}

//滚动条专用运动函数
var scrollTimer=null;
function scrollMove(cur,iTarget){
	clearInterval(scrollTimer);
    scrollTimer=setInterval(function(){
		var speed=(iTarget-cur)/4;
		speed=speed>0?Math.ceil(speed):Math.floor(speed);
		if(cur==iTarget){
			clearInterval(scrollTimer);
		}else{
			document.body.scrollTop=cur+speed;

		}
    },30);
}


//导航页添加效果
var logo=document.querySelector('.nav div.logo');
var hello=document.querySelector('.nav div.hello');
var nav=document.getElementsByClassName('nav')[0];

logo.onmouseover=function(){
	hello.style.height=0;
	hello.style.width=150+'px';
	hello.style.left=70+'px';
	hello.style.display='block';
	move(hello,{height:100,lineHeight:100,opacity:100},function(){
		move(hello,{height:70,lineHeight:70},function(){
			move(hello,{height:100,lineHeight:100})
		})
	});
};
logo.onmouseout=function(){
	move(hello,{height:0,opacity:0});
}


document.onmousemove=function(e){
	var e=e||event;
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	if(scrollTop<648){
		nav.style.top=0;
	}else{
		if(e.clientY<100 &&nav.offsetTop==-40){
			move(nav,{top:0});
		}else if(e.clientY>100 && nav.offsetTop==0){
			move(nav,{top:-40});
		}
	}

};


//添加页面吸附滚动效果
var cover=document.querySelector('div.cover');
// window.onscroll=function(){
// 	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
// 	var coverH=cover.offsetTop;
// 	var scro=document.body||document.documentElement;
// 	if(scrollTop>200){
// 		scrollMove(scrollTop,600);
// 	}
// };

var info=document.querySelector('div.info');
document.onscroll=function(e){
	var e=e||event;
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	if(scrollTop==600){
		document.body.scrollTop=648;
	}
	if(scrollTop==1748){
		document.body.scrollTop=1831;
	}
};


// info页面添加特效
var imgL=document.querySelector('div.info .contact .contact-li.left');
var imgM=document.querySelector('div.info .contact .contact-li.middle');
var imgR=document.querySelector('div.info .contact .contact-li.right');
var imgTop=imgL.offsetTop;

imgL.onmouseover=imgM.onmouseover=imgR.onmouseover=function(){
	move(this,{top:(imgTop-10)});
};
imgL.onmouseout=imgM.onmouseout=imgR.onmouseout=function(){
	move(this,{top:imgTop});
};



// photo页添加轮播效果
var photoBox=document.querySelector('div.photo .photo-box');
var photoLi=document.querySelectorAll('div.photo .photo-box .photo-box-li');
var back=document.querySelector('div.photo .back');
var next=document.querySelector('div.photo .next');

photoBox.style.width=photoLi[0].offsetWidth*photoLi.length*2+'px';
photoBox.innerHTML+=photoBox.innerHTML;

back.onclick=function(){
	switch(photoBox.offsetLeft){
		case 0:
			move(photoBox,{left:-540});
			break;
		case -540:
			move(photoBox,{left:-540*2});
			break;
		case -540*2:
			move(photoBox,{left:-540*3});
			break;
		case -540*3:
			move(photoBox,{left:-540*4});
			break;
	}
	if(photoBox.offsetLeft==-540*4){
		photoBox.style.left=0;
		move(photoBox,{left:-540});
	}
	
};

next.onclick=function(){
	switch(photoBox.offsetLeft){
		case -540*4:
			move(photoBox,{left:-540*3});
			break;
		case -540*3:
			move(photoBox,{left:-540*2});
			break;
		case -540*2:
			move(photoBox,{left:-540});
			break;
		case -540:
			move(photoBox,{left:0});
			break;
		case 0:
			photoBox.style.left=-540*4+'px';
			move(photoBox,{left:-540*3});
			break;
	}
};

//禁止双击按钮选中文字
back.onselectstart=next.onselectstart=function(){
	return false;
}