import chirpSound from "../assets/sounds/owlbear.wav";
import coinSound from "../assets/sounds/coins.wav";
import paperSound from "../assets/sounds/paper.wav";
import teleportSound from "../assets/sounds/teleport.wav";
import whooshSound from "../assets/sounds/whoosh.wav";
import crunchSound from "../assets/sounds/crunch.wav";
import portalSound from "../assets/sounds/portal.wav";
import fallSound from "../assets/sounds/fall.wav";
import splatSound from "../assets/sounds/splat.wav";
import safeSound from "../assets/sounds/safe.wav";
import gasSound from "../assets/sounds/gas.wav";
import brambleSound from "../assets/sounds/brambles.wav";
import labSound from "../assets/sounds/wubwub.wav";
import bangSound from "../assets/sounds/bang.wav";
import poleSound from "../assets/sounds/pole.wav";
import towerSound from "../assets/sounds/tower-fall.wav";
import lockSound from "../assets/sounds/lock.wav";
import stepsSound from "../assets/sounds/footsteps.wav";

const soundMap = {
  "/page2": lockSound,
  "/page3": fallSound,
  "/page4": bangSound,
  "/page5": whooshSound,
  "/page11": crunchSound,
  "/page13": portalSound,
  "/page16": paperSound,
  "/page17": chirpSound,
  "/page18": teleportSound,
  "/page19": coinSound,
  "/page20": brambleSound,
  "/page22": labSound,
  "/page23": towerSound,
  "/page24": gasSound,
  "/page25": poleSound,
  "/page21": stepsSound,
  "/page27": stepsSound,
};

export function playPageSound(pathname, feat) {
  let audioList = [];

  if (pathname === "/page9") {
    const soundToPlay = feat ? safeSound : splatSound;
    let audio = new Audio(soundToPlay);
    audio.volume = 1;
    audio.play();
    audioList.push(audio);
  } else if (soundMap[pathname]) {
    let audio = new Audio(soundMap[pathname]);
    audio.volume = 1;
    audio.play();
    audioList.push(audio);
  }

  return audioList;
}

export function cleanupAudio(audioList) {
  audioList.forEach((audio) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  });
}
