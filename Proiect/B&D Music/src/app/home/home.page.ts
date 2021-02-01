import { hostViewClassName } from '@angular/compiler';
import {Howl} from 'howler'
import { Component, ViewChild } from '@angular/core';
import { IonRange } from '@ionic/angular';
export interface Track{
  name: string;
  path: string;
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  slideOpts = {
    initialSlide: 3,
    slidesPerView: 4,
    centeredSlides: true,
    speed: 400
  };
  playlist: Track[] = [
{
  name: 'David Zowie - House Every Weekend',
  path: './assets/mp3/David Zowie - House Every Weekend.mp3'
},
{
  name: 'Dani Mocanu Jay Maly Costi - BELLA',
  path: './assets/mp3/Dani Mocanu Jay Maly Costi - BELLA.mp3'
},
{
  name: 'Diplo & SIDEPIECE - On My Mind',
  path: './assets/mp3/Diplo & SIDEPIECE - On My Mind.mp3'
}
  ];
  activateTrack: Track=null;
  player: Howl = null;
  isPlaying = false;
  progress=0;
  @ViewChild('range',{static:false}) range:IonRange;
  constructor() {}
start(track: Track)
{
if(this.player)
{
  this.player.stop ();
}
this.player = new Howl(
{
  src: [track.path],
  html5:true,
  onplay: () =>{
    this.isPlaying = true;
    this.activateTrack = track;
    this.updateProgess();
  },
  onend: () =>{
    console.log('onend');
  }
});
this.player.play();
}

togglePlayer(pause)
{
this.isPlaying = !pause;
  if(pause)
  {
    this.player.pause();
  }else{
    this.player.play();
  }
}

next()
{
  let index= this.playlist.indexOf(this.activateTrack);
  if(index!= this.playlist.length-1)
  {
    this.start(this.playlist[index+1]);
  }else
  {
  this.start(this.playlist[0]);
  }
}
prev()
{
let index=this.playlist.indexOf(this.activateTrack);
if(index>0)
{
  this.start(this.playlist[index-1]);

}else{
  this.start(this.playlist[this.playlist.length-1]);
}
}
seek()
{
let newValue = +this.range.value;
let duration= this.player.duration();
this.player.seek(duration *(newValue/100));
}
updateProgess()
{
let seek= this.player.seek();
this.progress=(seek/this.player.duration())*100 || 0;
setTimeout(() =>{
  this.updateProgess();
},1000)
}
}
