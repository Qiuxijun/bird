var Tag=["无","保暖","清凉","居家","户外","校园","制服","礼服","休闲","云端","废墟","妮妮尔","浪漫","幻想","知性","时尚","简约"]
var Setstr={1:["发型"],2:["连衣裙"],3:["外套"],4:["上衣"],5:["下装"],6:["袜子"],7:["鞋子"],8.1:["头饰"],8.2:["帽子"],9:["耳饰"],10:["项链"],11:["手饰"],12:["手套"],13:["手持物"],14.1:["特殊"],14.2:["特殊"],14.3:["项圈"],14.4:["特殊"],14.5:["特殊"],14.6:["特殊"]}
var TecStr=["见习学徒","造型助理","搭配达人","设计新锐","品牌精英","高级顾问"]
var TecStr2=["","无","经典洞察者","风格收藏家","细节雕刻师","边界反叛者"]
var Tec=[59,59,59,59,59,59,58]
function getTecMultiply(index){//获得搭配学院的倍率
	var Multiply=[0,5.2,7,8.7,10.4,11,11.7];
	var sum=3;
	var level=Tec[index-1]
	if(index==7){sum=-106.8}
		for(var j=1;j<=Math.floor(level/10);j++){
			sum=sum+Multiply[j]*9
		}	
		sum=sum+Multiply[Math.floor(level/10)+1]*((level%10)-1)
		sum=sum.toFixed(1)
	return (sum<0?0:sum)/100;	
}

function setMultiply(){//保存选项
	var subfile=""
      for(var j=1;j<=7;j++){
		  subfile=subfile+document.getElementById("Tec"+j.toString()).value+"/"
	  }
	  
      for(var j=1;j<=BuildSum;j++){
		 if(Build[j][2]!=parseInt(document.getElementById("ResLevel"+j.toString()).value)){
		  Build[j][2]=parseInt(document.getElementById("ResLevel"+j.toString()).value)
			var temp=Math.floor((Build[j][2]-1)/20)+1
			if(Build[j][3]!=temp){PowerClicks(j,temp-Build[j][3])}
		 }
		  subfile=subfile+Build[j][2].toString()+"/"+Build[j][3].toString()+"/" 
	  }
	 localStorage.setItem("synnxjxs", subfile)
}	

function loadMultiply(input){//加载选项
	var subfile=localStorage.getItem("synnxjxs")
	try{
		if (subfile==null || subfile==""){throw('err')}
		var sp=subfile.split("/")
		for(var j=1;j<=(BuildSum-(sp.length-8)/2);j++){
			sp.push("1")
			sp.push("1")
		}
		
		for(var j=1;j<=7;j++){
			Tec[j-1]=sp[j-1]
			if(isNaN(Tec[j-1])){Tec[j-1]=1}
			if(input){
				var ops=document.getElementById("Tec"+j.toString()).options
				for(var i=0;i<=ops.length-1;i++){
					if (ops[i].value==sp[j-1]){document.getElementById("Tec"+j.toString()).options[i].selected=true;break;}
				}
		}
		}
		for(var j=1;j<=BuildSum;j++){
			Build[j][2]=sp[j*2+5]
			if(isNaN(Build[j][2])){Build[j][2]=1}
			Build[j][3]=sp[j*2+6]
			if(isNaN(Build[j][3])){Build[j][3]=1}
		}
		
		for(var j=1;j<=BuildSum;j++){
			if(input){
				document.getElementById("ResLevel"+j.toString()).options[Build[j][2]-1].selected=true
			}
		}
			
	}catch(err){if(input==false){alert("未检测到本地有搭配学院和理念研究所的数据，请注意录入！")}else{setMultiply()}}  
}	

function ShowBuild(index){
	var temp=Build[index][1]+"包括：\n"
	var t;
	var LNStr=['【原件】','【染色】','【散件】']
	for(var j=0;j<=2;j++){
		temp=temp+LNStr[j]+"：\n"
		for(var i=0;i<=Build[index][j+4].length-1;i++){
			t=Build[index][j+4][i]
			if(t!=-1){temp=temp+Data[t][0]+"、"}
		}
		temp=temp.substr(0,temp.length-1)+"\n"
	}
	alert(temp)
}

 function PowerClicks(index,v){
	Build[index][3]=parseInt(Build[index][3])+v
		if(Build[index][3]<1){Build[index][3]=1}
		if(Build[index][3]>4){Build[index][3]=4}
		document.getElementById("Power"+index.toString()).innerHTML='<img src="image/d.png" width="20" height="20" onclick="PowerClicks('+index.toString()+',-1)"/>'+Build[index][3]+'<img src="image/u.png" width="20" height="20" onclick="PowerClicks('+index.toString()+',1)"/>'
		if(v!=0){setMultiply()}
 }


function SetData(){
	var TypetoTec=[0,2,1,6,1,1,3,4,5],temp=0,mp=0,tz=0//,xyd=[0,0,0]
	var TypeMultiplyA={3:[30,50,12.5,25,25,7.5,12.5,7.52],4:[42,70,17.5,35,35,10.5,17.5,10.5],5:[54,90,0,45,45,13.5,22.5,13.5]}
	var TypeMultiplyB={3:[15.58,26,6.78,13,13,3.84,6.48,3.84],4:[21.56,36,8.96,18,18,5.73,8.99,5.37],5:[27.59,45.95,0,22.98,22.98,6.88,11.47,6.86]}

	for(var i=0;i<=DataSum-1;i++){
		mp=GetMainPower(i)
		tz=SearchBuild(i);
		//if(tz==0){
		//	xyd[Data[i][1]-2]=xyd[Data[i][1]-2]+1
		//	if(Data[i][1]==4){console.log(Data[i][0])}
		//}
			
		for(var j=3;j<=7;j++){
			Data[i][j]=Math.floor(Data[i][j]*(1+getTecMultiply(TypetoTec[(Data[i][2]>8?8:Data[i][2])])+getTecMultiply(7)))
				if(tz!=0){
					temp=(mp==j)?TypeMultiplyA[parseInt(Build[tz][0])+2][(Data[i][2]>8?8:Data[i][2])-1]:TypeMultiplyB[parseInt(Build[tz][0])+2][(Data[i][2]>8?8:Data[i][2])-1]
					temp=temp*(Build[tz][2]-1)*(Build[tz][3]*0.05+0.95);
					Data[i][j]=Data[i][j]+temp
				}
			Data[i][j]=Math.floor(Data[i][j])
		}
	}	
	//console.log(xyd)
}

function SearchBuild(index){
	for(var j=1;j<=BuildSum;j++){
		for(var i=4;i<=6;i++){
			if (Build[j][i].length>0){
				for(var m=0;m<=Build[j][i].length-1;m++){
					if(Build[j][i][m]==index){return j;}
				}
			}
		}
	}
	return 0;
}

function GetMainPower(index){
	var temp=3;
		for(var i=4;i<=7;i++){
			if (Data[index][i]>Data[index][temp]){temp=i}
		}
	return temp;	
}