function AutoBeats(title,bpm,audioctx,dest){
	function FMO(audioctx,dest,send,params) {
		this.v=[]; this.r=[]; this.Op=[]; this.Gain=[];
		this.h=0;
		this.Pan=audioctx.createPanner();
		this.Pan.panningModel="equalpower";
		this.Send=audioctx.createGain();
		for(var i=0;i<3;++i){
			this.v[i]=params[i*4+1];
			this.r[i]=params[i*4+2];
			this.Op[i]=audioctx.createOscillator();
			this.Gain[i]=audioctx.createGain();
			this.Op[i].type=["sine","sawtooth","square"][params[i*4+3]];
			this.Op[i].frequency.value=params[i*4];
			this.Gain[i].gain.value=0;
			this.Op[i].connect(this.Gain[i]);
			this.Op[i].start(0);
			if(i>0)
				this.Gain[i].connect(this.Op[i-1].frequency);
		}
		this.Gain[0].connect(this.Pan);
		var th=Math.PI*(params[12]-.5);
		this.Pan.setPosition(Math.sin(th),0,-Math.cos(th));
		this.Pan.connect(dest);
		this.Send.gain.value=0.2;
		this.Pan.connect(this.Send);
		this.Send.connect(send);
		this.trig=function(t) {
			for(var i=0;i<3;++i){
				this.Gain[i].gain.cancelScheduledValues(t);
//				this.Gain[i].gain.setValueAtTime(0,t);
//				this.Gain[i].gain.linearRampToValueAtTime(this.v[i],t+0.005);
				this.Gain[i].gain.setValueAtTime(this.v[i],t);
				this.Gain[i].gain.linearRampToValueAtTime(0,t+0.006+this.h*0.075);
			}
		};
		this.setTone=function(f,h){
			this.Op[0].detune.value=f*24;
			this.h=h*0.01;
		}
	};
	function OSC(audioctx,dest,send,params){
		this.Osc=audioctx.createOscillator();
		this.Gain=audioctx.createGain();
		this.Send=audioctx.createGain();
		this.Filter=audioctx.createBiquadFilter();
		this.Pan=audioctx.createPanner();
		this.Osc.connect(this.Filter);
		this.Filter.connect(this.Gain);
		this.Filter.Q.value=15;
		this.Gain.connect(this.Pan);
		this.Pan.connect(dest);
		this.Pan.connect(this.Send);
		this.Send.connect(send);
		this.Send.gain.value=0.3;
		this.Gain.gain.value=0;
		this.Osc.type="square";
		this.Osc.start(0);
		this.oct=params.oct;
		this.cutoff=12;
		this.vol=params.vol;
		this.sus=params.sus;
		var th=Math.PI*(params.pan-.5);
		this.Pan.setPosition(Math.sin(th),0,-Math.cos(th));
		this.note=function(n,v,t){
			var f=440*Math.pow(2,(n-69+this.oct*12)/12);
			this.Osc.frequency.setValueAtTime(f,t);
			this.Filter.frequency.setValueAtTime(f*this.cutoff,t);
			this.Gain.gain.setValueAtTime(v*this.vol,t);
			this.Gain.gain.setTargetAtTime(0,t+0.01,this.sus);
		};
		this.setTone=function(type,cutoff,q,sus){
			this.Osc.type=["sine","sawtooth","square","square"][type];
			this.cutoff=cutoff;
			this.Filter.Q.value=q;
			this.sus=sus;
		};
		this.mute=function(){
			this.Gain.gain.cancelScheduledValues(0);
			this.Gain.gain.value=0;
		}
	};
	this.getSeq=function(k,i){
		return Math.abs(Math.sin(this.h[0]*k*i)*100)|0;
	};
	this.p0="5464546654665466102014245405546640445466546654661020142454057777";
	this.s0=[
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15],
		[0, 2, 4, 5, 7, 9,11,12,14,16,17,19,21,23,24,26],
		[0, 2, 4, 6, 8,10,12,14,16,18,20,22,24,26,28,30],
		[0, 2, 3, 5, 6, 8, 9,11,12,14,15,17,18,20,21,23]
	];
	this.b0=[90,100,120,140,160,180,200,220,240];
	this.play=function(p){
		if(p) this.start();
		else this.stop();
	}
	this.start=function(){
		this.playing=true;
	};
	this.stop=function(){
		this.playing=false;
		this.o1.mute();
		this.o2.mute();
		this.o3.mute();
	};
	this.getBpm=function(){
		return this.bpm;
	};
	this.setBpm=function(bpm){
		this.bpm=bpm;
		this.delay.delayTime.value=30/this.bpm;
	};
	this.getTitle=function(){
		return this.title;
	};
	this.setTitle=function(title){
		if(!title || title.length==0)
			title="Hello, AutoBeats.";
		this.title=title;
		this.h=[];
		this.h[0]=title.length;
		this.h[1]=0;
		this.h[2]=[];
		this.h[3]=[];
		for(var i=0;i<this.h[0];++i)
			this.h[1]+=title.charCodeAt(i);
		for(var i=0;i<16;++i){
			this.h[2][i]=(Math.abs(Math.sin(this.h[0]*2222*i)*100))|0;
			this.h[3][i]=(Math.abs(Math.sin(this.h[0]*1234*i)*100))|0;
		}
		this.bdo.setTone(this.getSeq(10,1),this.getSeq(11,10));
		this.sdo.setTone(this.getSeq(12,1),this.getSeq(13,10));
		this.hho.setTone(this.getSeq(14,1),this.getSeq(15,10));
		this.scale=this.s0[this.getSeq(4,1)&3];
		this.setBpm(this.b0[this.getSeq(this.h[1],4)&7]);
	};
	if(!audioctx){
		AudioContext=window.AudioContext||window.webkitAudioContext;
		audioctx=new AudioContext();
		dest=audioctx.destination;
	}
	this.audioctx=audioctx;
	this.dest=dest;
	this.playing=false;
	this.cur=0;
	this.meas=0;
	this.beat=0;
	this.Comp=audioctx.createDynamicsCompressor();
	this.scrproc=audioctx.createScriptProcessor(2048,1,1);
	this.scrproc.ab=this;
	this.scrproc.connect(this.Comp);
	this.dummyosc=audioctx.createOscillator();
	this.dummyosc.connect(this.scrproc);
	this.dummyosc.start(0);
	this.delay=audioctx.createDelay();
	this.delayFb=audioctx.createGain();
	this.delayFb.gain.value=0.5;
	this.delay.connect(this.Comp);
	this.delay.connect(this.delayFb);
	this.delayFb.connect(this.delay);
	this.Comp.connect(dest);
	this.callback=this.scrproc.onaudioprocess=function(e){
		var ab=this.ab;
		if(!ab.ready||!ab.playing){
			ab.meas=ab.beat=0;
			ab.cur=ab.audioctx.currentTime;
			return;
		}
		var st=0.25*120/ab.bpm;
		var t=ab.audioctx.currentTime;
		while(t>=ab.cur+st-0.1){
			ab.cur+=st;
			var pn=ab.beat&7;
			if(ab.p0[(ab.getSeq(1,ab.meas)&7)*8+pn]&1) ab.bdo.trig(ab.cur);
			if(ab.p0[(ab.getSeq(2,ab.meas)&7)*8+pn]&2) ab.sdo.trig(ab.cur);
			if(ab.p0[(ab.getSeq(3,ab.meas)&7)*8+pn]&4) ab.hho.trig(ab.cur);
			var r1=ab.getSeq(2,ab.meas*2+ab.beat);
			var r2=ab.getSeq(3,ab.meas*2+ab.beat);
			var r3=ab.getSeq(4,ab.meas*2+ab.beat);
			ab.o1.note(ab.scale[(r1&15)]+57,r1&1,ab.cur);
			ab.o2.note(ab.scale[(r2&15)]+57,r2&1,ab.cur);
			ab.o3.note(ab.scale[(r3&15)]+57,r3&1,ab.cur);
			if(++ab.beat>=16){
				ab.beat=0;
				if(++ab.meas>=64)
					ab.meas=0;
				ab.o1.setTone(ab.getSeq(4,ab.meas)&3,(ab.getSeq(5,ab.meas)&15)+4,(ab.getSeq(6,ab.meas)&15)+5,Math.pow(0.9,ab.getSeq(13,ab.meas)&31));
				ab.o2.setTone(ab.getSeq(7,ab.meas)&3,(ab.getSeq(8,ab.meas)&15)+4,(ab.getSeq(9,ab.meas)&15)+5,Math.pow(0.9,ab.getSeq(14,ab.meas)&31));
				ab.o3.setTone(ab.getSeq(10,ab.meas)&3,(ab.getSeq(11,ab.meas)&15)+4,(ab.getSeq(12,ab.meas)&15)+5,Math.pow(0.9,ab.getSeq(15,ab.meas)&31));
			}
		}
	};
	this.bdo=new FMO(audioctx,this.Comp,this.delay,[25,.8,.05,2, 29,400,.01,0, 131,100,.001,0,0.5]);
	this.sdo=new FMO(audioctx,this.Comp,this.delay,[213,.4,.1,0, 123,1900,.6,0, 340,800,.1,0,0.4]);
	this.hho=new FMO(audioctx,this.Comp,this.delay,[2200,.3,.02,0, 423,3120,.5,0, 552,1800,.1,1,.7,0.6]);
	this.o1=new OSC(audioctx,this.Comp,this.delay,{'oct':-2,'vol':0.5,'pan':0.5,'sus':.1});
	this.o2=new OSC(audioctx,this.Comp,this.delay,{'oct':0,'vol':0.3,'pan':0.35,'sus':.1});
	this.o3=new OSC(audioctx,this.Comp,this.delay,{'oct':1,'vol':0.3,'pan':0.65,'sus':.1});
	this.setTitle(title);
	if(bpm)
		this.setBpm(bpm);
	this.ready=true;
	setInterval(this.callback.bind(this.scrproc),100);
}
