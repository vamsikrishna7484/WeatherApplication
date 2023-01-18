import React,{useEffect,useState} from 'react'
import Weather from './components/Weather.js'
import { Dimmer, Loader } from 'semantic-ui-react';
import Skeleton from '@material-ui/lab/Skeleton';




function App() {
  const style={
    cursor:"pointer"
  }
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(`https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&APPID=de7713d525060b61eb2a89de31538ad7`)
      .then(res => res.json())
      .then(result => {
        setData(result)
        console.log(result);
      });
    }
    fetchData();
  }, [lat,long]);

  return (
    <div className="App">
      {(typeof data.main != 'undefined') ? (
        <Weather weatherData={data}/>
      ): (
        <div style={style}>
          <Dimmer active>
            <Loader>Loading....please wait</Loader>
          </Dimmer>
            {/* <i className="amazon massive icon"></i> */}
          {/* <Skeleton variant="rect"  height={400}/> */}

       </div>
     )}
 </div>

  );
}

export default App
