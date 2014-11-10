AutoBeats
=========

<b>AutoBeats</b> is a Auto Composer written in JavaScript.
<b>AutoBeats</b> generates and play music automatically. It just need a song title and optionally BPM.  
<b>AutoBeats</b> has no file dependencies. You can simply embed to your page. All sounds are generated via Web Audio API.

Chrome is needed.

## Usage
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

## DEMO
#### [AutoBeats Demo Page with Visualizer](http://g200kg.github.com/AutoBeats/)
#### [AutoBeats Simple Demo Page](http://g200kg.github.com/AutoBeats/simple.html)

## License
 MIT License
