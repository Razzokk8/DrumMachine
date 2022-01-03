import './App.scss';
import React from 'react'

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

const soundsName = {
  heaterKit: "Heater Kit",
  smoothPianoKit: "Smooth Piano Kit"
};

const soundsGroup = {
  heaterKit: bankOne,
  smoothPianoKit: bankTwo
}

const KeyboardKey = ( { power, play, sound: { id, keyTrigger, url, keyCode } } ) => {
 

  React.useEffect(()=> {
    console.log(url)
    const handleKeydown = (e) => {
    
    if(e.keyCode === keyCode){
      play(keyTrigger, id, url)
    }
  }
      document.addEventListener("keydown", handleKeydown) 
  return () => {
      document.removeEventListener("keydown", handleKeydown) 
  }
  });

  return (
    <button value='test' id={keyCode} className='drum-pad' onClick={() => play(keyTrigger, id, url)} > 
      <audio className='clip' id={ keyTrigger } src={url} />
      { keyTrigger }
    </button>
  )
}

const Keyboard = ({ play, sounds, power }) => (
  <div className='keyboard'>
  { power 
   ? sounds.map((sound) => <KeyboardKey  sound={sound} play={play} power={power} /> )
   : sounds.map((sound) => <KeyboardKey  sound={{...sound, url : '#' }} play={play} power={power}/> )
   }
  </div>
)

const BankControle = ({ id, name, changeSoundBank, volume, handleVolumeChange, power, off, setSounds }) => (

  <div className='controle'>
  <button id='acc' onClick={off}>{ power ? "ON" : "OFF"}</button>
  <div id='display'>
  <h2 className='dline1'>{name}</h2>
    <h2 className='dline2'>{id}</h2>
    </div>
    <button id='bcc' onClick={changeSoundBank} >BANK 1/2</button>
    <input max='1' 
            min='0' 
            step='0.01' 
            type='range' 
            value={volume} 
            onChange={handleVolumeChange} />
    <h2 className='dline3'>Volume: {Math.round(volume * 100)}</h2>
  </div>
)

const Credit = () => (
  <div className='credit'>
    <a href='https://www.freecodecamp.org/riccardolimiti' target="_blank">Riccardo Limiti &copy; 2021</a>
  </div>
)

const App = () => {
  const [power, setPower] = React.useState(true);
  const [volume, setVolume] = React.useState(0.75);
  const [soundName, setSoundName ] = React.useState("");
  const [soundType, setSoundType] = React.useState("heaterKit");
  const [sounds, setSounds] = React.useState(soundsGroup[soundType]);

  const offFunction = () => {
    setPower(!power)     
  }
  const handleVolumeChange = e => {  
    setVolume(e.target.value)
  }

  const styleActiveKey = (audio) => {
    audio.parentElement.style.backgroundColor = "#000000"
    audio.parentElement.style.color = "#ffffff"
  }

  const deactivateAudio = (audio) => {
    setTimeout(() => {
    audio.parentElement.style.backgroundColor = "#ffffff"
    audio.parentElement.style.color = "#000000"
    }, 200)
  }

  const play = (keyTrigger, sound, url) => {
    setSoundName(sound)
    const audio = document.getElementById(keyTrigger)
    styleActiveKey(audio)
    if(url !== '#'){
      audio.currentTime = 0
      audio.play()
      deactivateAudio(audio)
    } 
  }
  const changeSoundBank = () => {
    setSoundName('')
    if (soundType === "heaterKit"){
      setSoundType("smoothPianoKit")
      setSounds(soundsGroup.smoothPianoKit)
    } else {
      setSoundType("heaterKit")
      setSounds(soundsGroup.heaterKit)
    }
  }

  const setKeyVolume = () => {
    const audios = sounds.map(sound => document.getElementById(sound.keyTrigger))
    console.log(audios)
    audios.forEach(audio => {
      if(audio){
        console.log(audio)
        audio.volume = volume
      }
    })
  }

  React.useEffect(()=> {
    setKeyVolume()
  })

  return (
  <div id='drum-machine'>
   
    <div className='wrapper'>

    <Keyboard play={ play } sounds={sounds} power={power} />

    <BankControle off={offFunction} power={power}
    volume={volume} handleVolumeChange={handleVolumeChange} 
    id={soundName} name={soundsName[soundType]} changeSoundBank={changeSoundBank}/>
    
    <Credit />

    </div>
  </div>
  )
}

export default App;
