// 选择元素
var txt=document.querySelector('.content');
var search=document.querySelector('.search');
var random=document.querySelector('.random');

var radio=document.querySelectorAll('.radio');
var radioTxt=document.querySelectorAll('.radio-txt');

var ul=document.querySelector('ul.result');
var zhul=document.querySelector('div.box .zh-result');
var enul=document.querySelector('div.box .en-result');

var hot=document.querySelector('div.header button.hot');
var notice=document.querySelector('div.notice');
var point=document.querySelector('div.point');

var apiurl;
var zhurl='https://zh.wikipedia.org/w/api.php';
var enurl='https://en.wikipedia.org/w/api.php';
apiurl=zhurl;
var pagelink;
var zhlink='http://zh.wikipedia.org/wiki?curid=';
var enlink='http://en.wikipedia.org/wiki?curid=';
pagelink=zhlink;
// 搜索词条（标题，描述（话题），摘要，缩略图，链接,字数，最新更新时间）


//维基搜索
txt.onkeydown=function(e){
	var e=e||event;
	if(e.keyCode==13){
		search.click();
	}
};

search.onclick=function(){
	var keyword=txt.value;
	isadd=20;
	remove();
	if(keyword){
		if(radio[2].checked){
			bothResult(keyword);
		}else{
			ajax({
				type:'get',
				asyn:true,
				url:apiurl,
				data:'?origin=*&format=json&action=query&prop=description|extracts|pageimages|revisions&&exchars=200&exintro=true&explaintext=true&piprop=thumbnail&pithumbsize=200&rvprop=timestamp&generator=search&gsrsearch='+keyword,

				funSucc:function(str){
					var apidata=JSON.parse(str);
					notice.innerHTML='为您搜到的结果：'
					if(!apidata.error && apidata.query){
						var page=apidata.query.pages;
						for(var attr in page){
							var li=document.createElement('li');
							if(page[attr].thumbnail){
								var pic=page[attr].thumbnail.source;	
							}else{
								var pic='';
							}
							var title=page[attr].title;
							if(page[attr].description){
								var subTitle='&nbsp;&nbsp;&nbsp;&nbsp;——'+page[attr].description;
							}else{
								var subTitle='';
							}
							var content=page[attr].extract;
							var update=page[attr].revisions[0].timestamp;
							var re=/T[\w:]+/g;
							update=update.replace(re,'');
							var link=page[attr].pageid;
							li.className='li-style';
							li.innerHTML='<a href="'+pagelink+link+'" target="_blank"><div class="img"><img src="'+pic+'"></div><h3>   '+title+'</h3><h4>'+subTitle+'</h4><br/><p class="info">'+content+'</p><p class="time">update：'+update+'</p></a>';
							ul.appendChild(li);
						}
					}else{

						var li=document.createElement('li');
						li.className='li-style';
						li.innerHTML='<h4>找不到和&nbsp;<b>'+keyword+'</b>&nbsp;相匹配的结果</h4><br/><p>请确认您输入的关键词是否正确。您可以在维基百科创建词条:&nbsp;<b>'+keyword+'</b><p>';
						ul.appendChild(li);
					}
					
				},
				funFail:function(error){
					alert('出现错误。\n请求状态：'+error[0]+'服务器状态：'+error[1]);
				}
			});	
		}
	}else{
		notice.innerHTML='为您搜到结果：'
		var li=document.createElement('li');
		li.className='li-style';
		li.innerHTML='<h4>请输入要查询的关键字！</h4>';
		ul.appendChild(li);
	}

	return ishot=false;
};

function bothResult(keyword){
	ajax({
			type:'get',
			asyn:true,
			url:zhurl,
			data:'?origin=*&format=json&action=query&prop=description|extracts|pageimages|revisions&&exchars=200&exintro=true&explaintext=true&piprop=thumbnail&pithumbsize=100&rvprop=timestamp&generator=search&gsrsearch='+keyword,

			funSucc:function(str){
				var apidata=JSON.parse(str);
				notice.innerHTML='为您搜到的结果：'
				if(!apidata.error && apidata.query){
					var page=apidata.query.pages;
					for(var attr in page){
						var li=document.createElement('li');
						if(page[attr].thumbnail){
							var pic=page[attr].thumbnail.source;	
						}else{
							var pic='';
						}
						var title=page[attr].title;
						if(page[attr].description){
							var subTitle='&nbsp;&nbsp;&nbsp;&nbsp;——'+page[attr].description;
						}else{
							var subTitle='';
						}
						var content=page[attr].extract;
						var update=page[attr].revisions[0].timestamp;
						var re=/T[\w:]+/g;
						update=update.replace(re,'');
						var link=page[attr].pageid;
						li.className='zh-li';
						li.innerHTML='<a href="http://zh.wikipedia.org/wiki?curid='+link+'" target="_blank"><div class="img"><img src="'+pic+'"></div><h3>   '+title+'</h3><h4>'+subTitle+'</h4><br/><p class="info">'+content+'</p><p class="time">update：'+update+'</p></a>';
						zhul.appendChild(li);
					}
				}else{

					var li=document.createElement('li');
					li.className='zh-li';
					li.innerHTML='<h4>找不到和&nbsp;<b>'+keyword+'</b>&nbsp;相匹配的结果</h4><br/><p>请确认您输入的关键词是否正确。您可以在维基百科创建词条:&nbsp;<b>'+keyword+'</b><p>';
					zhul.appendChild(li);
				}
				
			},
			funFail:function(error){
				alert('出现错误。\n请求状态：'+error[0]+'服务器状态：'+error[1]);
			}
		});	
	ajax({
			type:'get',
			asyn:true,
			url:enurl,
			data:'?origin=*&format=json&action=query&prop=description|extracts|pageimages|revisions&&exchars=200&exintro=true&explaintext=true&piprop=thumbnail&pithumbsize=100&rvprop=timestamp&generator=search&gsrsearch='+keyword,

			funSucc:function(str){
				var apidata=JSON.parse(str);
				notice.innerHTML='为您搜到的结果：'
				if(!apidata.error && apidata.query){
					var page=apidata.query.pages;
					for(var attr in page){
						var li=document.createElement('li');
						if(page[attr].thumbnail){
							var pic=page[attr].thumbnail.source;	
						}else{
							var pic='';
						}
						var title=page[attr].title;
						if(page[attr].description){
							var subTitle='&nbsp;&nbsp;&nbsp;&nbsp;——'+page[attr].description;
						}else{
							var subTitle='';
						}
						var content=page[attr].extract;
						var update=page[attr].revisions[0].timestamp;
						var re=/T[\w:]+/g;
						update=update.replace(re,'');
						var link=page[attr].pageid;
						li.className='en-li';
						li.innerHTML='<a href="http://en.wikipedia.org/wiki?curid='+link+'" target="_blank"><div class="img"><img src="'+pic+'"></div><h3>   '+title+'</h3><h4>'+subTitle+'</h4><br/><p class="info">'+content+'</p><p class="time">update：'+update+'</p></a>';
						enul.appendChild(li);
					}
				}else{

					var li=document.createElement('li');
					li.className='en-li';
					li.innerHTML='<h4>找不到和&nbsp;<b>'+keyword+'</b>&nbsp;相匹配的结果</h4><br/><p>请确认您输入的关键词是否正确。您可以在维基百科创建词条:&nbsp;<b>'+keyword+'</b><p>';
					enul.appendChild(li);
				}
				
			},
			funFail:function(error){
				alert('出现错误。\n请求状态：'+error[0]+'服务器状态：'+error[1]);
			}
		});	
}
//数据分析
// apidata.query   //页面内容
'https://en.wikipedia.org/w/api.php?action=query&origin=*&generator=search&format=json&gsrnamespace=0&prop=pageimages|extracts&exintro=true&pilimit=10&pithumbsize=100&exsentences=2&gsrsearch='

// 随便看看
random.onclick=function(){
	txt.value='';
	isadd=20;
	remove();
	if(radio[2].checked){
		bothRandom();
	}else{
		ajax({
			type:'get',
			asyn:true,
			url:apiurl,
			data:'?origin=*&format=json&action=query&generator=random&grnlimit=5&prop=description|extracts|pageimages|revisions&exchars=200&exintro=true&explaintext=true&piprop=thumbnail&pithumbsize=200&rvprop=timestamp',

			funSucc:function(str){
				notice.innerHTML='随机找到5个词条：'
				var apidata=JSON.parse(str);
				var page=apidata.query.pages;
				for(var attr in page){
					var li=document.createElement('li');
					if(page[attr].thumbnail){
						var pic=page[attr].thumbnail.source;	
					}else{
						var pic='';
					}
					var title=page[attr].title;
					if(page[attr].description){
						var subTitle='&nbsp;&nbsp;&nbsp;&nbsp;——'+page[attr].description;
					}else{
						var subTitle='';
					}
					var content=page[attr].extract;
					var update=page[attr].revisions[0].timestamp;
					var re=/T[\w:]+/g;
					update=update.replace(re,'');
					var link=page[attr].pageid;
					li.className='li-style';
					li.innerHTML='<a href="'+pagelink+link+'" target="_blank"><div class="img"><img src="'+pic+'"></div><h3>   '+title+'</h3><h4>'+subTitle+'</h4><br/><p class="info">'+content+'</p><p class="time">update：'+update+'</p></a>';
					ul.appendChild(li);
				}	
			},
			funFail:function(error){
				alert('出现错误。\n请求状态：'+error[0]+'服务器状态：'+error[1]);
			}
		});
		
	}

	return ishot=false;
}

function bothRandom(){
	ajax({
		type:'get',
		asyn:true,
		url:zhurl,
		data:'?origin=*&format=json&action=query&generator=random&grnlimit=5&prop=description|extracts|pageimages|revisions&exchars=200&exintro=true&explaintext=true&piprop=thumbnail&pithumbsize=100&rvprop=timestamp',

		funSucc:function(str){
			notice.innerHTML='随机找到5个词条：'
			var apidata=JSON.parse(str);
			var page=apidata.query.pages;
			for(var attr in page){
				var li=document.createElement('li');
				if(page[attr].thumbnail){
					var pic=page[attr].thumbnail.source;	
				}else{
					var pic='';
				}
				var title=page[attr].title;
				if(page[attr].description){
					var subTitle='&nbsp;&nbsp;&nbsp;&nbsp;——'+page[attr].description;
				}else{
					var subTitle='';
				}
				var content=page[attr].extract;
				var update=page[attr].revisions[0].timestamp;
				var re=/T[\w:]+/g;
				update=update.replace(re,'');
				var link=page[attr].pageid;
				li.className='zh-li';
				li.innerHTML='<a href="http://zh.wikipedia.org/wiki?curid='+link+'" target="_blank"><div class="img"><img src="'+pic+'"></div><h3>   '+title+'</h3><h4>'+subTitle+'</h4><br/><p class="info">'+content+'</p><p class="time">update：'+update+'</p></a>';
				zhul.appendChild(li);
			}	
		},
		funFail:function(error){
			alert('出现错误。\n请求状态：'+error[0]+'服务器状态：'+error[1]);
		}
	});

	ajax({
		type:'get',
		asyn:true,
		url:enurl,
		data:'?origin=*&format=json&action=query&generator=random&grnlimit=5&prop=description|extracts|pageimages|revisions&exchars=200&exintro=true&explaintext=true&piprop=thumbnail&pithumbsize=100&rvprop=timestamp',

		funSucc:function(str){
			notice.innerHTML='随机找到5个词条：'
			var apidata=JSON.parse(str);
			var page=apidata.query.pages;
			for(var attr in page){
				var li=document.createElement('li');
				if(page[attr].thumbnail){
					var pic=page[attr].thumbnail.source;	
				}else{
					var pic='';
				}
				var title=page[attr].title;
				if(page[attr].description){
					var subTitle='&nbsp;&nbsp;&nbsp;&nbsp;——'+page[attr].description;
				}else{
					var subTitle='';
				}
				var content=page[attr].extract;
				var update=page[attr].revisions[0].timestamp;
				var re=/T[\w:]+/g;
				update=update.replace(re,'');
				var link=page[attr].pageid;
				li.className='en-li';
				li.innerHTML='<a href="http://en.wikipedia.org/wiki?curid='+link+'" target="_blank"><div class="img"><img src="'+pic+'"></div><h3>   '+title+'</h3><h4>'+subTitle+'</h4><br/><p class="info">'+content+'</p><p class="time">update：'+update+'</p></a>';
				enul.appendChild(li);
			}	
		},
		funFail:function(error){
			alert('出现错误。\n请求状态：'+error[0]+'服务器状态：'+error[1]);
		}
	});	
}

//热门词条
//热门话题、词条 最近的热门话题、搜索
// https://zh.wikipedia.org/w/api.php?action=help&modules=query%2Bmostviewed
//list=mostviewed
var ishot=false;
hot.onclick=function(){
	txt.value='';
	isadd=20;
	remove();
	if(radio[2].checked){
		bothHot('0');
	}else{
		hotpage('0');
	}
	return ishot=true;
};

isadd=20;
window.onscroll=function(){
	if(ishot){
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		var clientHeight=document.documentElement.clientHeight;
		var bodyHeight=document.body.offsetHeight;
		var dis=bodyHeight-scrollTop-clientHeight;
		if(!radio[2].checked){
			if(dis<5&&isadd<501){
				isadd+=20;
				hotpage(isadd);
			}	
		}
	}	
};


// document.onclick=function(){
// 	bothHot();
// }

function hotpage(ctupage){
	ajax({
		type:'get',
		asyn:true,
		url:apiurl,
		data:'?origin=*&format=json&action=query&generator=mostviewed&prop=description|extracts|pageimages|revisions&exchars=200&exintro=true&explaintext=true&piprop=thumbnail&pithumbsize=200&rvprop=timestamp&gpvimlimit=20&gpvimoffset='+ctupage,

		funSucc:function(str){
			var apidata=JSON.parse(str);
			var page=apidata.query.pages;
			notice.innerHTML='为您找到近日热门词条：'
			for(var attr in page){
				var title=page[attr].title;

				//排除wikipedia分类条目
				if(title.indexOf('Wikipedia')!=-1||title.indexOf('Category')!=-1||title.indexOf('Special')!=-1){
					continue;
				}
				var li=document.createElement('li');
				if(page[attr].thumbnail){
					var pic=page[attr].thumbnail.source;	
				}else{
					var pic='';
				}
				if(page[attr].description){
					var subTitle='&nbsp;&nbsp;&nbsp;&nbsp;——'+page[attr].description;
				}else{
					var subTitle='';
				}
				var content=page[attr].extract;
				var update=0;
				// if(page[attr].revisions[0]){
				// 	var update=page[attr].revisions[0].timestamp;
				// 	var re=/T[\w:]+/g;
				// 	update=update.replace(re,'');
				// }
				var link=page[attr].pageid;
				li.className='li-style';
				li.innerHTML='<a href="'+pagelink+link+'" target="_blank"><div class="img"><img src="'+pic+'"></div><h3>   '+title+'</h3><h4>'+subTitle+'</h4><br/><p class="info">'+content+'</p><p class="time">update：'+update+'</p></a>';
				ul.appendChild(li);
			}
		},
		funFail:function(error){
			alert('出现错误。\n请求状态：'+error[0]+'服务器状态：'+error[1]);
		}
	});
}

function bothHot(ctupage){
	ajax({
		type:'get',
		asyn:true,
		url:zhurl,
		data:'?origin=*&format=json&action=query&generator=mostviewed&prop=description|extracts|pageimages|revisions&exchars=200&exintro=true&explaintext=true&piprop=thumbnail&pithumbsize=100&rvprop=timestamp&gpvimlimit=20&gpvimoffset='+ctupage,

		funSucc:function(str){
			var apidata=JSON.parse(str);
			var page=apidata.query.pages;
			notice.innerHTML='为您找到近日热门词条：'
			for(var attr in page){
				var title=page[attr].title;

				//排除wikipedia分类条目
				if(title.indexOf('Wikipedia')!=-1||title.indexOf('Category')!=-1||title.indexOf('Special')!=-1){
					continue;
				}
				var li=document.createElement('li');
				if(page[attr].thumbnail){
					var pic=page[attr].thumbnail.source;	
				}else{
					var pic='';
				}
				if(page[attr].description){
					var subTitle='&nbsp;&nbsp;&nbsp;&nbsp;——'+page[attr].description;
				}else{
					var subTitle='';
				}
				var content=page[attr].extract;
				var update=0;
				// if(page[attr].revisions[0]){
				// 	var update=page[attr].revisions[0].timestamp;
				// 	var re=/T[\w:]+/g;
				// 	update=update.replace(re,'');
				// }
				var link=page[attr].pageid;
				li.className='zh-li';
				li.innerHTML='<a href="http://zh.wikipedia.org/wiki?curid='+link+'" target="_blank"><div class="img"><img src="'+pic+'"></div><h3>   '+title+'</h3><h4>'+subTitle+'</h4><br/><p class="info">'+content+'</p><p class="time">update：'+update+'</p></a>';
				zhul.appendChild(li);
			}
		},
		funFail:function(error){
			alert('出现错误。\n请求状态：'+error[0]+'服务器状态：'+error[1]);
		}
	});

	ajax({
		type:'get',
		asyn:true,
		url:enurl,
		data:'?origin=*&format=json&action=query&generator=mostviewed&prop=description|extracts|pageimages|revisions&exchars=200&exintro=true&explaintext=true&piprop=thumbnail&pithumbsize=100&rvprop=timestamp&gpvimlimit=20&gpvimoffset='+ctupage,

		funSucc:function(str){
			var apidata=JSON.parse(str);
			var page=apidata.query.pages;
			notice.innerHTML='为您找到近日热门词条：'
			for(var attr in page){
				var title=page[attr].title;

				//排除wikipedia分类条目
				if(title.indexOf('Wikipedia')!=-1||title.indexOf('Category')!=-1||title.indexOf('Special')!=-1){
					continue;
				}
				var li=document.createElement('li');
				if(page[attr].thumbnail){
					var pic=page[attr].thumbnail.source;	
				}else{
					var pic='';
				}
				if(page[attr].description){
					var subTitle='&nbsp;&nbsp;&nbsp;&nbsp;——'+page[attr].description;
				}else{
					var subTitle='';
				}
				var content=page[attr].extract;
				var update=0;
				// if(page[attr].revisions[0]){
				// 	var update=page[attr].revisions[0].timestamp;
				// 	var re=/T[\w:]+/g;
				// 	update=update.replace(re,'');
				// }
				var link=page[attr].pageid;
				li.className='en-li';
				li.innerHTML='<a href="http://en.wikipedia.org/wiki?curid='+link+'" target="_blank"><div class="img"><img src="'+pic+'"></div><h3>   '+title+'</h3><h4>'+subTitle+'</h4><br/><p class="info">'+content+'</p><p class="time">update：'+update+'</p></a>';
				enul.appendChild(li);
			}
		},
		funFail:function(error){
			alert('出现错误。\n请求状态：'+error[0]+'服务器状态：'+error[1]);
		}
	});
}
//搜索结果语言选择
for(var i=0;i<radio.length;i++){
	radio[i].index=i;
	radioTxt[i].onclick=function(){
		for(var j=0;j<radio.length;j++){
			radioTxt[j].style.color='#A5A5A7';
			radioTxt[j].style.fontWeight='';
		}
		this.style.color='white';
		this.style.fontWeight='bold';
	};
	radio[i].onclick=function(){
		if(this.value=='zh'){
			apiurl=zhurl;
			pagelink=zhlink;
			txt.placeholder='想了解什么';
			search.innerHTML='搜索';
			random.innerHTML='随便看看'
			hot.innerHTML='热门';
			radioTxt[0].innerHTML='中文搜索';
			radioTxt[1].innerHTML='英文搜索';
			radioTxt[2].innerHTML='并列搜索';
		}else if(this.value=='en'){
			apiurl=enurl;
			pagelink=enlink;
			txt.placeholder='what do you want to know';
			search.innerHTML='search';
			random.innerHTML='Random'
			hot.innerHTML='HOT';
			radioTxt[0].innerHTML='Chinese';
			radioTxt[1].innerHTML='English';
			radioTxt[2].innerHTML='ZH-EN';
		}else{
			apiurl=zhurl;//临时使用中文api
		}
		for(var j=0;j<radio.length;j++){
			radioTxt[j].style.color='#A5A5A7';
			radioTxt[j].style.fontWeight='';
		}
		radioTxt[this.index].style.color='white';
		radioTxt[this.index].style.fontWeight='bold';
	};
}


// ajax异步传输函数
function ajax(json){
	notice.innerHTML='';
	var xhr=null;
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}else{
		xhr=new ActiveXObject('Microsoft.XMLHTTP');
	}

	if(json.type='get'){
		xhr.open('get',json.url+json.data,json.asyn);
		xhr.send();
	}else{
		xhr.open('post',json.url,json.asyn);
		xhr.setRequestHeader('content-type','x-www-form-urlencoded');
		xhr.send(json.data);
	}

	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if(xhr.status==200){
				json.funSucc(xhr.responseText);

			}else{
				if(json.funFail){
					json.funFail([xhr.readyState,xhr.status]);
				}
			}
		}
	};
}

// var wait=document.querySelectorAll('.forbidden');
// for(var i=0;i<wait.length;i++){
// 	wait[i].onmouseover=function(){
// 		point.style.display='block';
// 		move1(point,{'opacity':100});
// 	};
// 	wait[i].onmouseout=function(){
// 		move1(point,{'opacity':0});
// 		point.style.display='none';
// 	};
// 	wait[i].onmouseout=function)(){
// 		move1(point,{'width':0,'fontSize':0});
// 	};
// }

function getAttr(ele,attr){
	if(ele.currentStyle){
		return ele.currentStyle[attr];
	}else{
		return getComputedStyle(ele,false)[attr];
	}
}

function move1(ele,json,fun){
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


function remove(){
	var arr=[];
	for(var i=0;i<ul.children.length;i++){
		arr[i]=ul.children[i];
	}
	for(var i=0;i<arr.length;i++){
		ul.removeChild(arr[i]);
	}

	var arrzh=[];
	for(var i=0;i<zhul.children.length;i++){
		arrzh[i]=zhul.children[i];
	}
	for(var i=0;i<arrzh.length;i++){
		zhul.removeChild(arrzh[i]);
	}

	var arren=[];
	for(var i=0;i<enul.children.length;i++){
		arren[i]=enul.children[i];
	}
	for(var i=0;i<arren.length;i++){
		enul.removeChild(arren[i]);
	}
}
// 条目的最近更新日期
// prop=revisions & rvprop=timestamp
// https://zh.wikipedia.org/w/api.php?action=help&modules=query%2Brevisions

// 页面中的的视频内容
// prop=videoinfo 
		// viprop=derivatives 添加可用音频或视频文件的不同格式和质量版本的数组。
// https://zh.wikipedia.org/w/api.php?action=help&modules=query%2Bvideoinfo

// 搜索页面的每日浏览量
// prop=pageviews
// https://zh.wikipedia.org/w/api.php?action=help&modules=query%2Bpageviews




// 高级设置:每次搜索条数、是否纠错索索、中文搜索、英文搜索




//维基百科特色页面
//action=featuredfeed
	//每日图片      feed=potd
	//特色条目      feed=future
	//优质wiki精选  feed=good
	//历史上的今天  feed=onthisday
	//你知道吗？    feed=dyk (do you know?)
	// 源的格式：feedformat ==rss(默认)|atom


// 搜索完后的标签记录。用户可以继续使用
// 中英文切换。英文维基百科和中文维基百科
// 搜索结果中英文对比(比如：中国用中文维基百科搜索和China用英文维基百科搜索对比)


// 添加维基志异
// https://zh.wikipedia.org/wiki/Wikipedia:%E7%B6%AD%E5%9F%BA%E8%AA%8C%E7%95%B0
// 可以通过api获取指定页面的结果。然后放在页面上。


//作为一个基本类别，供用户使用。
// 维基新闻。最近的热门内容，推送到首页。

// 随便看看，给出5条wiki词条和简介