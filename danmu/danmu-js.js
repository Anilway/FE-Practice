//弹幕颜色数据
var colorData=[
	"rgb(0,255,0)","rgb(255,0,255)","rgb(0,255,255)","rgb(0,0,128)","rgb(128,128,0)",
	"rgb(255,165,0)","rgb(255,215,0)","rgb(0,128,0)","rgb(80,80,80)","rgb(255,0,0)",
	"rgb(0,0,255)","rgb(255,192,203)","rgb(128,0,128)","rgb(255,255,0)","rgb(128,0,0)",
	"rgb(0,0,0)","rgb(165,42,42)","rgb(0,255,255)","rgb(0,0,139)","rgb(0,139,139)",
	"rgb(169,169,169)","rgb(0,100,0)","rgb(189,183,107)","rgb(139,0,139)","rgb(85,107,47)",
	"rgb(255,140,0)","rgb(153,50,204)","rgb(139,0,0)","rgb(233,150,122)","rgb(148,0,211)",
	"rgb(75,0,130)","rgb(240,230,140)","rgb(173,216,230)","rgb(224,255,255)","rgb(144,238,144)",
	"rgb(211,211,211)","rgb(255,182,193)","rgb(255,255,224)","rgb(255,0,255)","rgb(128,0,128)",
	"rgb(192,192,192)","rgb(255,255,255)","rgb(240,255,255)","rgb(245,245,220)"
];


// 获取dom元素
var send=document.getElementById('send');
var clear=document.getElementById('clear');
var chatText=document.getElementById('chatText');
var screen=document.getElementById('screen');
var arr=[];//本地存放弹幕数据，随机调用
var randomTimer=null;//初始化定时器

//创建野狗云SDK实例对象
//创建数据库引用
var config={syncURL:'https://wd2316081297knupaj.wilddogio.com/'}
wilddog.initializeApp(config);
var ref=wilddog.sync().ref();

//单击发送，将数据上传到数据库
send.onclick=function(){
	if(chatText.value!==''){
		ref.child('danmu/massage').push(chatText.value);
	}
	if(chatText.value!=='' && randomTimer==null){
		randomTimer=setInterval(randomBar,3000);

	}
	chatText.value='';
};
//文本框中按回车键触发发送按钮
chatText.onkeydown=function(e){
	var e=e||event;
	if(e.keyCode==13){
		send.click();
	}
};

//单击清空，清空数据库,删除随机弹幕,清空屏幕弹幕
clear.onclick=function(){
	ref.child('danmu/massage').remove();
	clearInterval(randomTimer);
	console.log(randomTimer);
	randomTimer=null;
	var arrNode=[];
	for(var i=0;i<screen.children.length;i++){
		arrNode[i]=screen.children[i];
	}
	for(var j=0;j<arrNode.length;j++){
		screen.removeChild(arrNode[j]);
	}
	arr=[];
};

//关闭页面或刷新时，清空数据库
//算了，没必要
// window.onunload = function()
// {
//     return clear.click();
// }


//监听数据库，实时更新弹幕
ref.child('danmu/massage').on('child_added',function(snapshot){
	var chatMassage=snapshot.val();
	arr.push(chatMassage);
	var chatBar=document.createElement('div');
	chatBar.innerHTML=chatMassage;
	addStyle(chatBar);
	addMove(chatBar);
});

//每三秒随机生成一条弹幕
function randomBar(){
	var index=Math.round(Math.random()*(arr.length-1));
	var chatBar=document.createElement('div');
	chatBar.innerHTML=arr[index];
	addStyle(chatBar);
	addMove(chatBar);
}


//监听数据库，如果有人清屏，则清楚本地存放的弹幕数据
//不妥，应避免本地操作影响到其他用户
// ref.child('danmu/massage').on('child_removed',function(){
// 	// clearInterval(randomTimer);
// 	arr=[];
// });


//生成弹幕样式数据（json出口，可以扩展数据）
function getStyle(ele){
	//弹幕通用样式
	ele.className='chatBar-style';
	//弹幕颜色
	var index=Math.round(Math.random()*(colorData.length-1));
	var color=colorData[index];
	
	screen.appendChild(ele);
	//弹幕据顶部距离
	var t=Math.round(Math.random()*(screen.offsetHeight-ele.offsetHeight));
	//弹幕据右端距离
	var r=0;
	var h1=ele.offsetWidth;
	var h2=screen.offsetWidth*0.3;
	if(h2-h1>=0){
		r=Math.round((h2-h1)*Math.random());
	}else{
		r=Math.round(h2-h1-Math.random()*h2)
	}
	return {
		textColor:color,
		top:t,
		right:r
	};
}

//添加弹幕样式
function addStyle(ele){
	ele.style.color=getStyle(ele).textColor;
	ele.style.top=getStyle(ele).top+'px';
	ele.style.right=getStyle(ele).right+'px';
}


//获取动态属性函数
function getAttr(ele,attr){
	if(ele.currentStyle){
		return ele.currentStyle[attr];
	}else{
		return getComputedStyle(ele,false)[attr];
	}
}

//弹幕运动函数(可以使用完美运动框架扩展更多功能)
function addMove(ele){
	clearInterval(ele.timer);
	ele.speed=Math.round(Math.random()*5+1);
	ele.timer=setInterval(function(){
		var iTarget=screen.offsetWidth+10;
		var cur=parseInt(getAttr(ele,'right'));
		if(iTarget-cur<ele.speed){
			clearInterval(ele.timer);
			screen.removeChild(ele);
		}else{
			ele.style.right=cur+ele.speed+'px';
		}
	},30);
}