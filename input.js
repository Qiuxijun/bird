 var Typestr=["发型","连衣裙","外套","上衣","下装","袜子","鞋子","发饰","帽子","耳饰","项链","项圈","手饰","手套","手持物","特殊物品",]
 var Rankstr=["闪耀","非凡","稀有","普通"]
 var Powerstr=["典雅","清新","甜美","性感","帅气"]
 var Rank=0;Type=0;Power=0;FileByte=50
 var Tip=new Array();TempTip=new Array();templist=new Array();
 var Cloth=new Array();
 var file=""
 var newdata=1
 window.onload=function(){		 
   viewmode=(window.location+'=').split('=')[1];
   newdata=parseInt((window.location+'=1=').split('=')[2])
  
	 Load()
	  for(var i=1;i<=5;i++){
	    var div = document.getElementById('PowerButton'+i.toString());
		div.innerHTML="<div class=\"Tip\" id=\"Tip"+i.toString()+"\"></div>"
	  }
		loadMultiply(false)
		SetData()
	 TypeClick(1)
	 if (viewmode>=2){
		 for(var i=0;i<=document.getElementsByClassName("ViewMode").length-1;i++){
		   document.getElementsByClassName("ViewMode")[i].style.display='none'
		 }
	 }
	 if (viewmode==3){
		 for(var i=0;i<=document.getElementsByClassName("ViewMode2").length-1;i++){
		   document.getElementsByClassName("ViewMode2")[i].style.display='none'
		 }
		 document.getElementById("sx").options.add(new Option("使用说明", -1))
		 for(var j=3;j>=1;j--){
			 for(var i=1;i<=BuildSum;i++){
				if(Build[i][0]==j){document.getElementById("sx").options.add(new Option(Build[i][1], i))}
			 }
		 }
		 document.getElementById("sx").options.add(new Option("无理念套装", 0))
		 
	 } 
	 
	 
 }
 
 function TypeClick(index){
	 if(index!=Type) { 
	  for(var i=1;i<=16;i++){
	    var div = document.getElementById('TypeButton'+i.toString());
        div.style.backgroundImage = 'url(image/button3.jpg)';
	  }
	    var div = document.getElementById('TypeButton'+index.toString());
        div.style.backgroundImage = 'url(image/button2.jpg)'; 
		Type=index
		Rank=0
		RankClick(1)
	 }
 }
  function RankClick(index){
	if(index!=(6-Rank)) {  
	  for(var i=1;i<=4;i++){
	    var div = document.getElementById('RankButton'+i.toString());
        div.style.opacity=0.2
	  }
	    var div = document.getElementById('RankButton'+index.toString());
        div.style.opacity=1
		Rank=6-index
		Power=0
        ReSetTip()
		PowerClick(1)
	}
 }
   function PowerClick(index){  
     if(index!=(Power-2)) {
	  for(var i=1;i<=5;i++){
	    var div = document.getElementById('PowerButton'+i.toString());
        div.style.backgroundImage = 'url(image/'+i.toString()+'2.png)';
	  }
	    var div = document.getElementById('PowerButton'+index.toString());
        div.style.backgroundImage = 'url(image/'+index.toString()+'.png)';
		Power=index+2
	    Tip[index]=3
		SetTip()
		Show(Type,Rank,Power)
		Tip[index]=2
	 }
 }
 
  function ReSetTip(){
	 for(var i=1;i<=5;i++){
		 if(Show(Type,Rank,i+2)<1 || (Rank==2)){Tip[i]=2}else{Tip[i]=1}
	 } 
  }
  
  
  function SetTip(){
	  for(var i=1;i<=5;i++){
		  if(TempTip[i]!=Tip[i]){
document.getElementById('Tip'+i.toString()).style.backgroundImage = 'url(image/Tip'+Tip[i].toString()+'.png)'
           TempTip[i]=Tip[i]
		  }
	  }
  }
  
 function GetMainPower(index){
	 var maxint=3;
	 for(var i=4;i<=7;i++){
		  if (Data[index][i]>Data[index][maxint]){
			  maxint=i
			  }
	 }
	 return maxint
 }
 
  function Show(type,rank,power){
	  var TypetoType=[1,2,3,4,5,6,7,8.1,8.2,9,10,14.3,11,12,13,14]
	  type=TypetoType[type-1]
	  
	if(viewmode==2){ 
	  	power=document.getElementById("sx").value
		if(power==''){power=3}
	}
	  
	if(viewmode==1){
		var ihtml='<table border="1" cellspacing="0"><tr><th>服饰清单</th><th>是否拥有</th></tr>',listsum=0,c='234, 242, 250'
			for(var i=0;i<=DataSum-1;i++){
			   if (Data[i][2]>14 && Data[i][2]!=14.3){Data[i][2]=14}
			   if((Data[i][1]==rank) && (Data[i][2]==type) && (GetMainPower(i)==power)){
				listsum=listsum+1;
				if(c=='234, 242, 250'){c='219, 229, 248'}else{c='234, 242, 250'}
				ihtml=ihtml+'<tr onclick=\"set('+i.toString()+')\"><td style="background: rgba('+c+', 0.5)">'+Data[i][0]+'</td><td style="background: rgba('+c+', 0.5)" id=\"id'+i.toString()+'\"><img src="image/'+(Cloth[i]==1?"g":"r")+'.png" width="32" height="40" /></td></tr>'
			   }
			}
		document.getElementById("ShowList").innerHTML=(listsum>0?"":"没有")+Rankstr[5-Rank] +'品质、'	+Powerstr[Power-3]+'属性的'+Typestr[Type-1]+(listsum>0?ihtml:"")
	}//第一种浏览模式

	if(viewmode==2){
		document.getElementById("ShowList").innerHTML='数据加载中，请稍候……<select onchange="Show(Type,Rank,1)" id="sx"></select>'
		templist=[];
		var ihtml='<table border="1" cellspacing="0"><tr><th>服饰清单</th><th>是否拥有</th></tr>',listsum=0,c='234, 242, 250'
			for(var i=0;i<=DataSum-1;i++){
			   if(Data[i][2]>14 && Data[i][2]!=14.3){Data[i][2]=14}
			   if(Data[i][2]==type){
				listsum=listsum+1;
				templist[listsum]=i
			   }
			}
			var temp;
			for(var i=1; i<=listsum;i++)
			{
				for(var j=i+1;j<=listsum;j++)
				{
					 if(Data[templist[i]][power]<Data[templist[j]][power])
					  {
						 temp=templist[i];
						 templist[i]=templist[j];
						 templist[j]=temp;
					   }
				 }
			}
			
			temp=0
			for(var i=1; i<=listsum;i++){
				if(c=='234, 242, 250'){c='219, 229, 248'}else{c='234, 242, 250'}
				temp=temp+Cloth[templist[i]]
				ihtml=ihtml+'<tr onclick=\"set('+templist[i].toString()+')\"><td style="background: rgba('+c+', 0.5)">'+Data[templist[i]][0]+(Data[templist[i]][0].substr(Data[templist[i]][0].length-1,1)!="*"?' ('+Data[templist[i]][power].toString()+Powerstr[power-3]+')':"")+'</td><td style="background: rgba('+c+', 0.5)" id=\"id'+templist[i].toString()+'\"><img src="image/'+(Cloth[templist[i]]==1?"g":"r")+'.png" width="32" height="40" /></td></tr>'
			}
				document.getElementById("ShowList").innerHTML='所有'+Typestr[Type-1]+'(已收集'+temp.toString()+"/"+listsum.toString()+')，按<select onchange="Show(Type,Rank,1)" id="sx"></select>排序'+ihtml+"</table>"
				for(var i=0; i<=4;i++){document.getElementById("sx").options.add(new Option(Powerstr[i], i+3))}
				
				document.getElementById("sx").options[power-3].selected=true;
	}//第二种浏览模式
	
	
	if(viewmode==3){
		var Strlist=['【原色】<button onclick="SetAll(0,1)">已集齐</button>','【复苏＆重构】<button onclick="SetAll(1,1)">已复苏</button><button onclick="SetAll(1,0)">未培养</button>','【散件】<button onclick="SetAll(2,1)">全收集</button><font size=1>(若没有这套理念，请设散件全收集)</font>'],listsum=0,index
		var iHTML="",tz=parseInt(document.getElementById("sx").value)
		if(isNaN(tz)){tz=-1}
		if(tz>0){
			for(var j=0;j<=2;j++){
				iHTML=iHTML+'<p>'+Strlist[j]+'</p><p>'
				for(var i=0;i<=Build[tz][4+j].length-1;i++){
					if(i%4==0){
						listsum=listsum+1
						iHTML=iHTML+(i==0?'':'</p>')+'<p>'
					}
					index=Build[tz][4+j][i]
					iHTML=iHTML+'<img style="opacity:'+((Cloth[index]==1 || index==-1)?"1":"0.2")+'" src="http://pztcb8nht.bkt.clouddn.com\\'+index.toString()+'.png" width="60" height="72" class="Pic" onclick=set('+index.toString()+') id="Pic'+index.toString()+'"/>'
				}
				iHTML=iHTML+'</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>'
			}
		}else{
			iHTML="<p>无理念套装的服饰中有220件普通服饰和12件稀有服饰。我们推荐您将它们全部设置为已拥有，以节约录入时间。别担心，在以后的计算过程中，若您发现某件服饰是您未拥有的，您可以当场调整。如果您有强迫症，稍后您可以前往<a href='input.html?viewmode=2=1'>自由搭配衣柜</a>页面，按顺序核对各部位服饰的数量。</p><p><button onclick='SetNone()'>点击设置</button></p>"
		}
		if(tz<0){
			iHTML="<p>请打开理念研究所，按配装器顺序点开套装，然后点开左上角的<font color='blue'>部件一览</font>的放大镜图标按钮。</p><p>每一套的部件一览在配装器的位置顺序与游戏内是完全一致的！您可以盯着游戏内图标的左下角的<font color='red'>“已拥有”</font>来点击图片进行录入，同时配合<font color='blue'>按钮</font>进行批量录入。</p><p>录入过程中，请<font color='red'>忽略妆容</font>！</p><p>配装器页面里，图片透明表示未拥有，图片不透明则表示您已拥有。</p><p>如果您发现您<font color='red'>缺少</font>某套理念，说明您没有收集这套服装里的任何一件配件。这种情况下，我们建议您将散件设为全收集，然后再跳过这一套套装。</p><p>部分图标我们暂未收录，后续会进行维护，敬请谅解。</p>"
		}
			document.getElementById("ShowType3").innerHTML=iHTML
	}//第三种浏览模式
	return listsum;
 }
 
 
 function set(index){
	var temp=0,listsum=0;
	if(index<0){return;}
	Cloth[index]=1-Cloth[index]
		if(viewmode==3){
			temp=document.getElementById("Pic"+index.toString())
			temp.style.opacity=(Cloth[index]==1?1:0.2)
			
		}else{
			document.getElementById("id"+index.toString()).innerHTML='<img src="image/'+(Cloth[index]==1?"g":"r")+'.png" width="32" height="40" />'
			if(viewmode==2){Show(Type,Rank,Power)}
		}
		
		Save()
 }
 function Save(){
	var subfile=""
      for(var j=0;j<=DataSum-1;j++){
		  subfile=subfile+Cloth[j].toString()
	  }
	 localStorage.setItem("synnxjpzq", subfile)
 }
 
  function Load(){
	  try{
   for(var i=0;i<=1000;i++){  
		  templist[i]=-1
   }
	file=localStorage.getItem("synnxjpzq")
	if(file==null || file==""){throw("A")}
	if (file.length!=DataSum){//需要维护
      alert("您现在的衣柜数据版本是"+version[file.length][0]+"，最新的版本是"+version[DataSum][0]+"，点击确定进行更新，新增服饰默认未拥有")
		for(var i=0;i<=file.length-1;i++){
			Cloth[i]=parseInt(file.substr(i,1))
		}
		
		for(var i=file.length;i<=DataSum-1;i++){
			Cloth[i]=0
			}
		Save()
		return;
	}
    for(var i=0;i<=DataSum-1;i++){
		Cloth[i]=parseInt(file.substr(i,1))
		if(isNaN(Cloth[i])){throw("A")}
	}
	
	  }catch(err){
	 for(var i=0;i<=(DataSum-1);i++){
		 Cloth[i]=newdata
		 if(Data[i][1]==2){Cloth[i]=1}
		 if(Data[i][0].substr(Data[i][0].length-1,1)=="*"){Cloth[i]=0}
	 }
	 		 Save()
	  }
 }
 
	function getindexbyname(name,arr){
		var temp=version[arr.length][1].split("/")
		for(var i=1;i<=arr.length;i++){
			if(temp[i-1]==name){return i-1}
		}
		return -1
	}

function TapChange(lr){
	if (viewmode==1){
	if(lr==2){
        if (Power<7){PowerClick(Power-1);location.href="#Button1";return;}
        if ((Power==7) && (Rank>2)){RankClick(7-Rank);location.href="#Button1";return;}	 
        if ((Power==7) && (Rank==2) && (Type<16)){TypeClick(Type+1);location.href="#Button1"}	 	
    }else{
        if (Power>3){PowerClick(Power-3);return;}
        if ((Power==3) && (Rank<5)){RankClick(5-Rank);PowerClick(5);location.href="#Button1";return;}	 
        if ((Power==3) && (Rank==5) && (Type>1)){TypeClick(Type-1);RankClick(4);PowerClick(5);location.href="#Button1"}	 	 
	}
	}
	
	if (viewmode==2){
		if(lr==2){
			if (Type<16){TypeClick(Type+1);location.href="#Button1"}
		}else{
			if (Type>1){TypeClick(Type-1);location.href="#Button1"}
		}
	}
	
	if (viewmode==3){
		document.getElementById("sx").options[document.getElementById("sx").selectedIndex+(lr==2?1:-1)].selected=true;
		Show(0,0,0)
		location.href="#Button1"
	}	
	
}

function SetAll(index,state){
	var tz=parseInt(document.getElementById("sx").value)
				for(var m=0;m<=Build[tz][4+index].length-1;m++){
					if(Build[tz][4+index][m]!=-1){Cloth[Build[tz][4+index][m]]=state}
				}
	Show(0,0,0)
	Save()
}

function SetNone(){
	for(var i=0;i<=DataSum-1;i++){
		var tz=SearchBuild(i);
		if(tz==0){
		 Cloth[i]=1
		}
	}
		Save()
		alert("设置成功！")
}