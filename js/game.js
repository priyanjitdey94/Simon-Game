/************************************************
* SIMON 		- Memory game
* Developed by 	- Priyanjit Dey
* Organization	- FusionCharts
*
************************************************/


var Game=function(){
	this.onOff			= 0;
	this.isStrict		= 0;
	
	this.sequence 		= [];
	this.seqIterator 	= 0;
	this.moveNum 		= 0;
	
	this.timerEvents 	= [];
	this.userTimer		= 0;
}

Game.prototype.initialize=function(){
	this.sequence=[];
	this.seqIterator=0;
	this.moveNum=0;

	document.getElementById('bt0').style.backgroundColor="#17e510";
	document.getElementById('bt1').style.backgroundColor="#e51025";
	document.getElementById('bt2').style.backgroundColor="#fff20a";
	document.getElementById('bt3').style.backgroundColor="#2330ea";
}

Game.prototype.switchGame=function(){
	//console.log("switchGame");
	this.disableControl(true);
	if(this.onOff===0){
		this.onOff=1;
		document.getElementById('ledtext').style.color="#ea0707";
	}else{
		this.onOff=0;
		this.clearTimers();
		var localThisObject=this;
		setTimeout(function(){
			localThisObject.initialize();
		},300);
		document.getElementById('ledtext').innerHTML="--";
		document.getElementById('ledtext').style.color="#631313";
	}
}

Game.prototype.clearTimers=function(){
	//console.log("clearTimers");
	var len=this.timerEvents.length;
	console.log("timer length:"+len);
	for(var i=0;i<len;i++){
		clearTimeout(this.timerEvents[i]);
	}
}

Game.prototype.showExclamation=function(str,type){
	//console.log("showExclamation");
	var localThisObject=this;
	this.disableControl(true);
	document.getElementById('ledtext').innerHTML=str;
	setTimeout(function(){
		document.getElementById('ledtext').style.color="#631313";
	},100);
	setTimeout(function(){
		document.getElementById('ledtext').style.color="#ea0707";
	},300);
	setTimeout(function(){
		document.getElementById('ledtext').style.color="#631313";
	},500);
	setTimeout(function(){
		document.getElementById('ledtext').style.color="#ea0707";
		localThisObject.startSequence(type);
	},700);
}

Game.prototype.start=function(){
	//console.log("start");
	this.disableControl(true);
	this.clearTimers();
	this.initialize();
	this.showExclamation("--",1);
}

/*
* 0 : Normal Mode. Add a number and display
* 1 : Strict Mode. Empty the array. Add number. Display
* 2 : Repeat Mode. Only Display.
*/
Game.prototype.startSequence=function(seq){
	//console.log("startSequence");
	this.disableControl(true);
	if(seq===0){
		this.sequence.push(Math.floor(Math.random()*4));
		this.seqIterator++;
		document.getElementById('ledtext').innerHTML=(this.seqIterator<10?'0'+this.seqIterator:this.seqIterator);
		this.display();
	}else if(seq===1){
		this.initialize();
		this.startSequence(0);
	}else if(seq===2){
		this.display();
	}
}

Game.prototype.display=function(){
	//console.log("display");
	document.getElementById('ledtext').innerHTML=this.seqIterator;
	for(var i=0;i<this.seqIterator;i++){
		this.displayHelper(i,this.sequence[i],600);
	}
}

Game.prototype.displayHelper=function(j,id,offset){
	var localThisObject=this;
	var localDocument=document.getElementById('bt'+id);
	var t1,t2;
	
	t1=setTimeout(function(){
		switch(id){
			case 0:localDocument.style.backgroundColor="#89ed91";break;
			case 1:localDocument.style.backgroundColor="#ef8686";break;
			case 2:localDocument.style.backgroundColor="#f4ed89";break;
			case 3:localDocument.style.backgroundColor="#6d75ed";break;
		}
		document.getElementById('soundbutton'+id).play();

		setTimeout(function(){
			switch(id){
				case 0:localDocument.style.backgroundColor="#17e510";break;
				case 1:localDocument.style.backgroundColor="#e51025";break;
				case 2:localDocument.style.backgroundColor="#fff20a";break;
				case 3:localDocument.style.backgroundColor="#2330ea";break;
			}
			if(j===localThisObject.seqIterator-1){
				localThisObject.waitForUser();
			}
		},320);
		//localThisObject.timerEvents.push(t2);

	},(j*700)+offset);
	localThisObject.timerEvents.push(t1);
	
	
}

Game.prototype.waitForUser=function(){
	console.log("waitForUser");
	this.disableControl(false);
	var localThisObject=this;
	localThisObject.userTimer=setTimeout(function(){
		localThisObject.disableControl(true);
		localThisObject.moveNum=0;
		localThisObject.showExclamation("!!",2);
	},10000);
}

Game.prototype.disableControl=function(status){
	//console.log("disableControl");
	for(var i=0;i<4;i++){
		document.getElementById('bt'+i).disabled=status;
	}
}

Game.prototype.toggleStrictMode=function(){
	if(this.isStrict===0){
		this.isStrict=1;
	}else{
		this.isStrict=0;
	}
}

var simon=new Game();