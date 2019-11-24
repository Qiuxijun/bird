var LevelA={//心阶关卡主tag系数
	1:[0,0.15,0.6],
	2:[0,0.15,0.6],
	3:[0,0.05,0.2,0.3,0.6],
	4:[0,0.05,0.2,0.3,0.6],
	5:[0,0.05,0.2,0.3,0.6],
	6:[0,0.05,0.2,0.3,0.6],
	7:[0,0.05,0.15,0.18,0.25,0.35,0.6],
	8:[0,0.05,0.15,0.18,0.25,0.35,0.6],
	9:[0,0.05,0.15,0.2,0.4]
}
var LevelB={//心阶关卡副tag系数
	1:[0,0.1,0.4],
	2:[0,0.1,0.4],
	3:[0,0.1,0.4],
	4:[0,0.1,0.4],
	5:[0,0.05,0.15,0.2,0.4],
	6:[0,0.05,0.15,0.2,0.4],
	7:[0,0.05,0.15,0.2,0.4],
	8:[0,0.05,0.15,0.2,0.4],
	9:[0]
}
var All,resultusing,TempDelet=[];
var Cloth=new Array();
var result="",resultscore=0,Runtimes=0,RunTime=5;
var tag1=0,tag2=0;
var TypeList=[1,2,3,4,5,6,7,8.1,8.2,9,10,11,12,13,14.1,14.2,14.3,14.4,14.5,14.6];
var SetIndex=[0,2,4,5,1,7,6,8,8,8,8,8,3]//十二位置按分数比重排序，分别是：连衣裙、上衣、下装、发型、鞋子、袜子、饰品1~5、外套


   window.onload=function(){//界面初始化
   var temp=""
	for(var j=0;j<=16;j++){
		if(j==1){temp=temp+'<optgroup label="彩色Tag">'}
		if(j==12){temp=temp+'</optgroup><optgroup label="浅色Tag">'}
        temp=temp+"<option value=\""+j.toString()+"\">"+Tag[j]+"</option>"
	} 
	document.getElementById("Tag1").innerHTML=temp+"</optgroup>"
	document.getElementById("Tag2").innerHTML=temp+"</optgroup>"	
	
			try{//读取衣柜数据
			var file=localStorage.getItem("synnxjpzqini")
			if(file==null){file="1/1/0/0/"}
				temp=file.split("/")
				document.getElementById("Level").options[temp[0]-1].selected=true
				document.getElementById("Power").options[temp[1]-1].selected=true
				document.getElementById("Tag1").options[temp[2]].selected=true
				document.getElementById("Tag2").options[temp[3]].selected=true
			var file=localStorage.getItem("synnxjpzq")
				if(file==null || file==""){throw("err")}
				if (file.length<DataSum){//需要维护
					alert("数据库已更新，需要前往图鉴界面进行维护。")
				}
				for(var i=0;i<=file.length-1;i++){
					Cloth[i]=parseInt(file.substr(i,1))
					if(isNaN(Cloth[i])){throw("err")}
				}
			}catch(err){
				alert("未检测到本地有衣柜的数据，请先录入衣柜数据！")
			}
	loadMultiply(false);	
  }
  
    function Set(power){
		All={1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[]};//先加载衣柜数组
	  for(var i=0;i<=DataSum-1;i++){
		if (Cloth[i]==1){
		 for(var j=0;j<=TypeList.length-1;j++){
			if(TypeList[j]==Data[i][2]){
				All[(TypeList[j]>8?8:TypeList[j])].push(i);
				break;
			}
		 }
	    }
	  }
	  var temp;//再对衣柜数组进行排序
	  for(var n=0;n<=7;n++){
       for(var i=0; i<All[n+1].length;i++){
        for(var j=i+1;j<All[n+1].length;j++){
          if(Data[All[n+1][i]][power+2]<Data[All[n+1][j]][power+2]){
              temp=All[n+1][i];
              All[n+1][i]=All[n+1][j];
              All[n+1][j]=temp;
            }
         }
        }
      } 
	}

    function Run(){
		if(Cloth.length<=0){alert("未检测到本地有衣柜的数据，请先录入衣柜数据！");return;}
		var ihtml='<table border="1" cellspacing="0"><tr><th>部位</th><th>名称</th><th>未拥有</th></tr>'
		var sumscore=0;
		var temp1=JSON.parse(JSON.stringify(Data))
		var temp2=Cloth.concat()
		resultusing={1:[],2:[],3:[],4:[],5:[]};
		tag1=parseInt(document.getElementById("Tag1").value)
		tag2=parseInt(document.getElementById("Tag2").value)
			if(document.getElementById("Level").value==9){tag2=-1}
		SetData()
		//以上是初始化数据
		try{
			for(var j=1;j<=5;j++){document.getElementById("Result"+j.toString()).innerHTML=""} 
			alert("计算即将开始，可能会造成0~40秒的卡顿，卡顿时间与关卡和Tag常见程度有关。计算时，请勿触碰其他按钮，以免造成额外卡顿。")
			for(Runtimes=1;Runtimes<=(document.getElementById("Level").value==9?1:RunTime);Runtimes++){
				resultscore=0
				Set(parseInt(document.getElementById("Power").value))
				Solve(1,[0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]);//核心递归
				sumscore=sumscore+resultscore;//计算总分
				document.getElementById("Result"+Runtimes.toString()).innerHTML="第"+Runtimes.toString()+"次搭配（"+resultscore.toString()+"分，Tag："+CheckTagSum(resultusing[Runtimes],tag1)+"+"+CheckTagSum(resultusing[Runtimes],tag2)+"）"+((Runtimes!=RunTime && parseInt(document.getElementById("Level").value)<8)?'<button onclick="NextLevel('+Runtimes.toString()+')">下一关</button>':'')+ihtml+HTMLresult(resultusing[Runtimes],1)+"<td style='background: rgba(195,221,255,0.4)'>美甲</td><td style='background: rgba(195,221,255,0.4)'>请记得带上美甲！</td><td style='background: rgba(195,221,255,0.4)'>：）</td></table>"//HTML
					for(var i=1;i<=12;i++){
						if(resultusing[Runtimes][i]!=-1){Cloth[resultusing[Runtimes][i]]=0}
					}	
			}
			document.getElementById("Result").innerHTML="主Tag："+Tag[tag1]+"，副Tag："+Tag[(tag2<0?0:tag2)]+"。总搭配分："+Math.round(sumscore).toString()
			document.getElementById("exp").innerHTML="点击服饰名字可查看详情"
			Data=JSON.parse(JSON.stringify(temp1))
			Cloth=temp2.concat()
			
			alert("计算完成！"+(tag1==tag2?"\n温馨提醒：您使用了两个一样的Tag！":""))
		}catch(err){alert("计算好像出了点问题，请反馈以下消息："+err.message)}
		}
	
	function Solve(set,using){
		var level=parseInt(document.getElementById("Level").value)
		var sub=SubArr(using,set-1)
		var tag1sumchecked=CheckTagSum(sub,tag1)
		var tag2sumchecked=CheckTagSum(sub,tag2)
		
		if(set==13){//递归边界，返回搭配得分
			    if (getscore(using)>resultscore){
				   resultscore=getscore(using)
				   resultusing[Runtimes]=using.concat()
			    }
			return;	
		}
		
		if(set==12){
			//console.log("a")
		}
		
			using[set]=-1//清理传址传回来的值
			if((tag1sumchecked>=(LevelA[level].length-1) || tag2sumchecked>=(LevelB[level].length-1)) && document.getElementById("Check2").checked==true){
				for(var i=0; i<=All[SetIndex[set]].length-1;i++){
					var tag1checked=CheckTag(All[SetIndex[set]][i],tag1)
					var tag2checked=CheckTag(All[SetIndex[set]][i],tag2)
					if((tag1checked==false && tag2checked==false) && CheckMutex(All[SetIndex[set]][i],sub) && Canuse(All[SetIndex[set]][i],sub)){
						//无tag、最高分条件、互斥条件、部位可用条件
						using[set]=All[SetIndex[set]][i];
						break;
					}	
				}
			}else{
				for(var i=0; i<=All[SetIndex[set]].length-1;i++){
					if(CheckMutex(All[SetIndex[set]][i],sub) && Canuse(All[SetIndex[set]][i],sub)){
						//最高分条件、互斥条件、部位可用条件
						using[set]=All[SetIndex[set]][i];
						break;
					}	
				}
			}
			
			Solve(set+(set==1?3:1),using)
				if(using[set]==482){//给少年时光这条裤子开后门
					using[set]=All[SetIndex[set]][i+1];
					Solve(set+(set==1?3:1),using)
				}
			
			using[set]=-1
			if(tag1sumchecked<(LevelA[level].length-1)){
				for(var i=0; i<=All[SetIndex[set]].length-1;i++){
					var tag1checked=CheckTag(All[SetIndex[set]][i],tag1)
					var tag2checked=CheckTag(All[SetIndex[set]][i],tag2)
					if ((tag1checked && tag2checked==false) && CheckMutex(All[SetIndex[set]][i],sub) && Canuse(All[SetIndex[set]][i],sub)){//单Tag1最高分条件、Tag1数量未满足条件、互斥条件、部位可用条件
						using[set]=All[SetIndex[set]][i];
						break;
					}	
				}	
				if(using[set]!=-1 || set==12){Solve(set+(set==1?3:1),using)}
			}
			
			using[set]=-1
			if(tag2sumchecked<(LevelB[level].length-1)){
				for(var i=0; i<=All[SetIndex[set]].length-1;i++){
					var tag1checked=CheckTag(All[SetIndex[set]][i],tag1)
					var tag2checked=CheckTag(All[SetIndex[set]][i],tag2)
					if ((tag1checked==false && tag2checked) && CheckMutex(All[SetIndex[set]][i],sub) && Canuse(All[SetIndex[set]][i],sub)){//单Tag2最高分条件、Tag2数量未满足条件、互斥条件、部位可用条件
						using[set]=All[SetIndex[set]][i];
					break;
					}	
				}	
				if(using[set]!=-1 || set==12){Solve(set+(set==1?3:1),using)}
			}
			
				using[set]=-1
			if((tag2sumchecked<LevelB[level].length-1) || (tag1sumchecked<(LevelA[level].length-1))){
				for(var i=0; i<=All[SetIndex[set]].length-1;i++){
					var tag1checked=CheckTag(All[SetIndex[set]][i],tag1)
					var tag2checked=CheckTag(All[SetIndex[set]][i],tag2)
					if ((tag1checked && tag2checked) && CheckMutex(All[SetIndex[set]][i],sub) && Canuse(All[SetIndex[set]][i],sub)){//双Tag最高分条件、互斥条件、部位可用条件
						using[set]=All[SetIndex[set]][i];
						break;
					}	
				}	
				if(using[set]!=-1 || set==12){Solve(set+(set==1?3:1),using)}
			}
			
			if(set==1){//不使用连衣裙，改为使用上衣下装
				using[set]=-1
				Solve(2,using)
			}
	}
   
	function HTMLresult(arr,mode){//跑HTML格式
		var s="",c,listcount=0
		var xyd=[0,0,"普通","稀有","非凡","闪耀"]
		var sx=["典雅","清新","甜美","性感","帅气"]
		var IndexToType=[0,4,1,12,2,3,6,5,7,8,9,10,11]
		for(var j=1;j<=12;j++){
			if (arr[IndexToType[j]]!=-1){
				listcount=listcount+1
				if(listcount%2==1){c='219, 229, 248'}else{c='234, 242, 250'}
					if(mode==1){
						s=s+'<tr style="background: rgba('+c+', 0.5)" id="list'+Runtimes.toString()+'_'+Data[arr[IndexToType[j]]][2]+'"><td style="background: rgba('+c+', 0.5)">'+Setstr[Data[arr[IndexToType[j]]][2]][0]+'</td><td style="background: rgba('+c+', 0.5)" onclick="alert(\''+Data[arr[IndexToType[j]]][0]+'：'+xyd[Data[arr[IndexToType[j]]][1]]+Setstr[Data[arr[IndexToType[j]]][2]][0]+'，'+sx[parseInt(document.getElementById("Power").value)-1]+'：'+Data[arr[IndexToType[j]]][parseInt(document.getElementById("Power").value)+2].toString()+'，Tag：'+Tag[Data[arr[IndexToType[j]]][8]]+'、'+Tag[Data[arr[IndexToType[j]]][10]]+'，所属理念：'+GetBuild(arr[IndexToType[j]])+'。\')">'+Data[arr[IndexToType[j]]][0]+' ('+Data[arr[IndexToType[j]]][parseInt(document.getElementById("Power").value)+2].toString()+')</td><td style="background: rgba('+c+', 0.5)"><button onclick="ReRun('+arr[IndexToType[j]].toString()+')">Re</button></td></tr>'
					}else{
						s=s+'<tr style="background: rgba('+c+', 0.5)"><td style="background: rgba('+c+', 0.5)">'+Setstr[Data[arr[IndexToType[j]]][2]][0]+'</td><td style="background: rgba('+c+', 0.5)" onclick="">'+Data[arr[IndexToType[j]]][0]+'</td><td style="background: rgba('+c+', 0.5)">'+Data[arr[IndexToType[j]]][parseInt(document.getElementById("Power").value)+2].toString()+'</td></tr>'
					}
			}
		} 
		return s;
    } 
   
	function getscore(arr){//计算一套搭配的得分
		var level=parseInt(document.getElementById("Level").value)
		var power=parseInt(document.getElementById("Power").value)
		var s=0;tag1sum=0;tag2sum=0
			for(var j=1;j<=12;j++){
				if(CheckTag(arr[j],tag1)){tag1sum=tag1sum+(j==1?2:1)}
	            if(CheckTag(arr[j],tag2)){tag2sum=tag2sum+(j==1?2:1)}
				s=s+(arr[j]>=0?Data[arr[j]][power+2]:0)
			} 
		if (tag1==0){tag1sum=0}
		if (tag2==0){tag2sum=0}
		if (tag1sum>=LevelA[level].length){tag1sum=LevelA[level].length-1}
		if (tag2sum>=LevelB[level].length){tag2sum=LevelB[level].length-1}
		return Math.round((s*(1+LevelA[level][tag1sum]+LevelB[level][tag2sum])))
  }
  
	function CheckTag(index,tag){//检查是否符合Tag，符合返回true，不符合返回false
	   if (index<0){return false}
	   if((Data[index][8]==tag)||(Data[index][10]==tag)){return true;}else{if(tag==0){return true;}else{return false;}}
    }function CheckTagSum(arr,tag){
		var temp=0
		for(var j=1;j<=arr.length-1;j++){if(CheckTag(arr[j],tag)){temp=temp+(j==1?2:1)}} 
		if (tag==0){temp=0}
		return temp;
	}
   
	function CheckMutex(index,arr){//检查某个配件是否在当前搭配中被互斥，被互斥的话返回false，不被互斥返回true
		for(var j=1;j<=arr.length-1;j++){
			if(MutexCheck(index,arr[j])){return false}
		}	
		return true;
	} function MutexCheck(a,b){
		if(typeof(Mutex[a])=='undefined' && typeof(Mutex[b])=='undefined'){return false}
		
		if(typeof(Mutex[a])!='undefined'){
			if(Mutex[a].indexOf(b)>=0){return true}
		}
		
		if(typeof(Mutex[b])!='undefined'){
			if(Mutex[b].indexOf(a)>=0){return true}
		}
		return false
	}	
   
   function Canuse(index,arr){//检查某个饰品的部位是否被占用，占用了返回false，未被占用返回true
	   var TypeLimit={8.1:[true],8.2:[true],9:[true],10:[true],11:[true],12:[true],13:[true],14.1:[true],14.2:[true],14.3:[true],14.4:[true],14.5:[true],14.6:[true]}
	   if (Data[index][2]<8){return true}
	   for(var j=7;j<=(arr.length==13?11:arr.length-1);j++){
		   if (arr[j]!=-1){TypeLimit[Data[arr[j]][2]][0]=false}
	   }   
	   return TypeLimit[Data[index][2]][0]
   } 
   
   function NextLevel(p){
	   for(var j=1;j<=p;j++){//删数据
		   if(resultusing[j].length>0){
				for(var i=1;i<=12;i++){
					if(resultusing[j][i]!=-1){Cloth[resultusing[j][i]]=0;TempDelet.push(resultusing[j][i])}
				}
		   }
	   }
	   document.getElementById("Level").options[parseInt(document.getElementById("Level").value)].selected=true;
	   RunTime=RunTime-p//修改轮次
	   
		for(var j=1;j<=5;j++){//修改UI
			document.getElementById("Result"+j.toString()).innerHTML=""
		} 
			document.getElementById("Result").innerHTML="剩余"+RunTime.toString()+"次搭配"
			document.getElementById("exp").innerHTML="请选择Tag再进行计算！"
		alert("已为您保留未使用的服饰数据，请选择Tag后再次进行计算！")
   }
   
    function ReRun(index){
		var temp=JSON.parse(JSON.stringify(resultusing))	
		var IndexToType=[0,4,1,12,2,3,6,5,7,8,9,10,11]
		
		for(var j=1;j<=5;j++){//保存数据
		   if(resultusing[j].length>0){
				for(var i=1;i<=12;i++){
					if(resultusing[j][i]!=-1){Cloth[resultusing[j][i]]=1}
				}
			}
		}
	    Cloth[index]=0
		if (document.getElementById("Check").checked){
			var subfile=""
			if (TempDelet.length>0){//加载临时删掉的衣服
				for(var j=0;j<=TempDelet.length-1;j++){
					Cloth[TempDelet[j]]=1
				}
			}
			for(var j=0;j<=DataSum-1;j++){
				subfile=subfile+Cloth[j].toString()
			}
			if (TempDelet.length>0){//再将临时删掉的衣服还原
				for(var j=0;j<=TempDelet.length-1;j++){
					Cloth[TempDelet[j]]=0
				}
			}	
			localStorage.setItem("synnxjpzq", subfile)//保存本地文件
		}else{
		   TempDelet.push(index)
		}
	
		alert((document.getElementById("Check").checked?"已为您在衣柜数据中您删去":"已为您暂时移除")+Data[index][0]+"这件服饰，并为您重新进行计算！变动的服饰会以深蓝色背景作为标记。")
		Run()
		
		
		for(var j=1;j<=5;j++){//变色提醒
		   if(resultusing[j].length>0){
				for(var i=0;i<=TypeList.length-1;i++){
					if(SearchSomeType(temp[j],TypeList[i])!=SearchSomeType(resultusing[j],TypeList[i])){
					if(document.getElementById("list"+j.toString()+"_"+TypeList[i].toString())!=null){document.getElementById("list"+j.toString()+"_"+TypeList[i].toString()).style.backgroundColor="blue"}
					}
				}
			}
		}
   }function SearchSomeType(arr,type){
	   for(var j=1;j<=12;j++){
		   if (arr[j]==-1){continue;}
		   if (Data[arr[j]][2]==type){return arr[j]}
	   }
		return -1
   }
   
   function GetBuild(index){
	for(var j=1;j<=BuildSum;j++){
		for(var i=4;i<=6;i++){
			if (Build[j][i].length>0){
				for(var m=0;m<=Build[j][i].length-1;m++){
					if(Build[j][i][m]==index){return Build[j][1];}
				}
			}
		}
	}
	return "无理念套装";
   }
   
	function SubArr(arr,set){
		var temp=[];
		for(var n=0;n<=set;n++){
			temp.push(arr[n])
		}
		return temp;
	}
	
   //如果在看这段文字的您有更好的算法，请与山药主页君联系~

	function SetAllHtml(){
		var ihtml='<table border="1" cellspacing="0"><tr><th>部位</th><th>名称</th><th>分数</th></tr>'
		tag1=parseInt(document.getElementById("Tag1").value)
		tag2=parseInt(document.getElementById("Tag2").value)
		for(Runtimes=1;Runtimes<=5;Runtimes++){
document.getElementById("Result"+Runtimes.toString()).innerHTML="<p>第"+Runtimes.toString()+"次搭配："+resultscore.toString()+"分</p><p>"+Tag[tag1]+"："+CheckTagSum(resultusing[Runtimes],tag1)+"</p><p>"+Tag[tag2]+"："+CheckTagSum(resultusing[Runtimes],tag2)+"</p>"+ihtml+HTMLresult(resultusing[Runtimes],2)+"<td style='background: rgba(195,221,255,0.4)'>美甲</td><td style='background: rgba(195,221,255,0.4)'>请记得带上美甲！</td><td style='background: rgba(195,221,255,0.4)'>：）</td></table>"//HTML
		}
	}