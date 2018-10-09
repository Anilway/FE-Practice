//选择元素
var btn=document.getElementsByClassName('btn')[0];
var quote=document.getElementsByClassName('quote')[0];
var quoteFrom=document.getElementsByClassName('quoteFrom')[0];
var mark=document.getElementById('mark');
var body=document.body;
var wechat=document.getElementsByClassName('wechat')[0];
var weibo=document.getElementsByClassName('weibo')[0];


//背景颜色数据
var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

//点击按钮，异步刷新语录
btn.onclick=function(){
	move(quote,{opacity:0});
	move(quoteFrom,{opacity:0},function(){
		getquote();
	});
};

//按回车键刷新语录
document.onkeydown=function(e){
	var e=e||event;
	if(e.keyCode==13||40||32){
		btn.click();
	}
};


//获取随机语录
	function getquote(){
		ajax({
			url:'https://sslapi.hitokoto.cn/?encode=json',
			GET:true,
			asyn:true,
			funSucc:function(str){
				var content=JSON.parse(str);	
				quote.innerHTML=content.hitokoto;
				move(quote,{opacity:100});
				if(content.from==""){
					quoteFrom.innerHTML='';
				}else{
					var re=/《|》/g;
					content.from=content.from.replace(re,'');
					quoteFrom.innerHTML='<span>——&nbsp;&nbsp;</span>'+'《'+content.from+'》';
					move(quoteFrom,{opacity:100});
					//innerHTML渲染完成之后改变背景颜色;
					bgColor();
				}
			},
			funFail:function(){
				alert('服务器错误：'+xhr.status+'。\n'+'请重新加载页面。')
			}
		});
	}

//更改背景颜色
function bgColor(){
	var index=Math.round(Math.random()*colors.length-1);
	var randomColor=colors[index];
	body.style.background=btn.style.background=wechat.style.background=weibo.style.background=randomColor;	
}


//微信分享
var wshare=document.getElementById('wshare');
wechat.onclick=function(){
	wshare.click();
	var wclose=document.getElementById('jiathis_weixin_close');
	wechat.onmouseout=function(){
		wclose.click();
	}
}

//初始化ajax对象
var xhr=null;
//ajax函数
function ajax(json){
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}else{
		xhr=new ActiveXObject("Microsoft.XMLHTTP");
	}
	if(json.GET==true &&json.POST==undefined){
		xhr.open('GET',json.url,json.asyn);
		xhr.send();
	}else if(json.POST==true &&json.GET==undefined){
		xhr.open('POST',json.url,json.asyn);
		xhr.send();
	}else{
		alert('请选择正确的HTTP方法：GET or POST！');
	}

    xhr.onreadystatechange=function(){
    	if(xhr.readyState==4){
    		if(xhr.status==200){
    			json.funSucc(xhr.responseText);
    		}else{
    			if(json.funFail){
    				json.funFail();
    			}
    		}
    	}
    };
}

//获取动态属性函数
function getAttr (ele,attr){
	if(ele.currenStyle){
		return ele.currenStyle[attr];
	}else{
		return getComputedStyle(ele,false)[attr];
	}
}

//添加运动框架
function move(ele,json,fun){
	clearInterval(ele.timer);
	ele.timer=setInterval(function(){
		var stop=true;
		for(var attr in json){
			var iTarget=json[attr];
			var cur=0;
			if(attr=='opacity'){
				cur=Math.round(parseFloat(getAttr(ele,attr)*100));
			}else{
				cur=parseInt(getAttr(ele,attr));
			}
			var speed=(iTarget-cur)/10;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(cur!=iTarget){
				stop=false;
			}

			if(attr=='opacity'){
				cur+=speed;
				ele.style.opacity=cur/100;
				ele.style.filter='alpha(opacity:'+cur+')';
			}else{
				ele.style.attr=cur+speed+'px';
			}
		}
		if(stop){
			clearInterval(ele.timer);
			if(fun){fun()};
		}
	},30);
}
