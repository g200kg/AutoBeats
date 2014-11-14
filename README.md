AutoBeats
=========

***AutoBeats*** is a Auto Composer written in JavaScript.
***AutoBeats*** generates and play music automatically. It just need a song title and optionally BPM.
***AutoBeats*** has no file dependencies. You can simply embed to your page. All sounds are generated via Web Audio API.

### Browser support
Chrome is required.

### DEMO
#### [AutoBeats Demo Page with Visualizer](http://g200kg.github.com/AutoBeats/)
#### [AutoBeats Simple Demo Page](http://g200kg.github.com/AutoBeats/simple.html)
#### [GLSL Shader Demo with AutoBeats sound](http://g200kg.github.com/AutoBeats/planets.html)

### Usage
Include 'autobeats.js' in your HTML:

```
	<script src="autobeats.js"></script>
```

Create Instance and start in your JavaScript:

```
	beats = new AutoBeats("song title");
	beats.start();
```

Set Title (means change song):

```
	beats.setTile("new song");
```

Set Bpm (if you need to force the BPM):

```
	beats.setBpm(bpm);
```

Combine to your Web Audio App:

```
	// create AutoBeats instance with specified audio context and output node
	beats = new AutoBeats("song title", 0, audiocontext, destination);
```

### Functions

#### AutoBeats(title,bpm,audioctx,destination)  
 constructor of AutoBeats  

Parameter|Type|Description
---|---|---
title|string|Song title. This string determine the sequences.
bpm|number|Song speed (BPM). if 0, it will be automatically decided.
audioctx|object|Web Audio API's Audio Context object. if null, will be created internally.
destination|object|Sound output node. It will be used in conjunction with audioctx.

#### AutoBeats.start()  
 Start playing.

#### AutoBeats.stop()  
 Stop playing.

#### AutoBeats.setTitle(title)  
 Update song title. Playing song will be changed.  

#### AutoBeats.getTitle()  
 Get current Title.

#### AutoBeats.setBpm(bpm)  
 Update song speed.

#### AutoBeats.getBpm()  
 Get current Bpm.

---
## WebComponent version 'AutoBeats-Player' is also available

***AutoBeats-Player*** is a WebComponent that encapsulating ***AutoBeats*** function,
that register a HTML tag ***&lt;autobeats-player&gt;***.

### AutoBeats-Player Demo
[autobeats-player-test.html](http://g200kg.github.com/AutoBeats/autobeats-player-test.html)


### AutoBeats-Player Usage

* Load '[Polymer](js/polymer.min.js)' : &lt;script src="js/polymer.min.js"&gt;&lt;/script&gt;
* Load '[AutoBeats](js/autobeats.js)' : &lt;script src="js/autobeats.js"&gt;&lt;/script&gt;
* Import '[AutoBeats-Player](webcomponents/autobeats-player.html)' : &lt;link rel="import" href="webcomponents/autobeats-player.html"&gt;
* Use 'autobeats-player' tag : &lt;autobeats-player title="TestSong"&gt;&lt;/autobeats-player&gt;

### AutoBeats-Player Tag Attributes
Attributes	| Description
---			|---
title		| Song Title. This string determine the song sequence.
bpm			| Song BPM. if '0'(default) , automatically decided.
autostart	| '0' (default) : do nothing, '1' : auto play start</td></tr>
edittitle	| '0' : disable title edit, '1'(default) : enable title edit</td></tr>
editbpm		| '0' : disable bpm edit, '1'(default) : enable bpm edit</td></tr>

### Control from JavaScript
***AutoBeats-Player*** Element has following API:  

Function		| Description
---				|---
start()			| Play start
stop()			| Play stop
setTitle(title)	| Update song title
setBpm(bpm)		| Update BPM
getTitle()		| Get current song title
getBpm()		| Get current song BPM

For example:  
HTML:  
```
	<autobeats-player id="ab"></autobeats>
```
JavaScript:  
```
	document.getElementById("ab").setTitle("new song");
```

---
## License
 MIT License
