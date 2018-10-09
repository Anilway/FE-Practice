window.onload=function(){
	var welcome=document.getElementsByClassName('welcome')[0];
	var date=new Date();
	var year=date.getFullYear();
	var month=date.getMonth()+1;
	var day=date.getDate();
	function add(num){
		if(num<10){
			return '0'+num;
		}else{
			return ''+num;
		}
	}

	var str='今天是'+year+'年'+add(month)+'月'+add(day)+'日，欢迎您！'
	welcome.innerHTML=str;
	console.log(str);
};