import { useState, useEffect } from 'react';
import axios from 'axios';
import { WeatherNameWithIcon } from './weather_names';
import { format } from 'date-fns';
// import { weatherNames } from './weather_names';
const weatherClient = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});

const openMeteoApiBase = 'https://api.open-meteo.com/v1/forecast';

const locationList = [
  { enName: 'nagoya', jpName: '名古屋', lat:35.180, lon:136.907},
  { enName: 'tokyo', jpName: '東京', lat: 35.689, lon: 139.692 },
  { enName: 'osaka', jpName: '大阪', lat: 34.686, lon: 135.520 },
  { enName: 'saga', jpName: '佐賀', lat: 33.249, lon: 130.300 },
  { enName: 'komaki', jpName: '小牧市', lat:35.28, lon:136.92}
];

/* APIコールロジックを関数として分割 */
// 気象データ取得
const getWeatherData = async(location) => {
  return await weatherClient.get(openMeteoApiBase, {
    params: {
      timezone: location.tz,  // 新しく追加したタイムゾーンのデータを使う
      latitude: location.lat,
      longitude: location.lon,
      hourly: [
        'weather_code'
      ].join(',')
    }
  });
}



function App() {
  const [location, setLocation ] = useState(locationList[0]);
  const [weatherInfo, setWeatherInfo] = useState([]);

  /* 下記追加 */
  const dateFmt = 'yyyy-MM-dd';
  const gotDates = weatherInfo.map((info) => format(new Date(info.datetime), dateFmt));
  const dateList = Array.from(new Set(gotDates));
  const [selectedDate, setSelectedDate] = useState(format(new Date(), dateFmt));
  const weatherInfoOnCurrentDate = weatherInfo.filter((info) => {
    return format(new Date(info.datetime), dateFmt) === selectedDate
  });
  /* ここまで */
  const formatDate = (date) => date.replace(/^\d{4}-/, '').replace(/-/g, '/');

  /* 下記追加 */
  // 地点選択時のアクション
  const onChangeLocation = (event) => {
    const currentLocationData = locationList.find((lo) => event.target.value === lo.enName);
    setLocation(currentLocationData);
  }
  /* ここまで */
 /* 下記追加 */
  // 日付選択時アクション
  const onClickDate = (event) => {
    if (event.target.value !== selectedDate) {  // 同じ日付を選択した場合は処理しない
      setSelectedDate(event.target.value);  // 選択した日付をstateにセットします
    }
  }
  /* ここまで */
 /* 下記追加 */
  // 選択されている日付にのみクラス"selected-date"を足す
  const checkDateButtonClassName = (date) => {
    return [
      'date-button',
      date === selectedDate ? 'selected-date' : null
    ].join(' ')
  }
  /* ここまで */






  useEffect(() => {
    (async() => {
      try {
        // APIコールし気象情報取得
        /* const res = await weatherClient.get(
          `${openMeteoApiBase}?timezone=Asia/Tokyo&latitude=${location.lat}&longitude=${location.lon}&hourly=weather_code`
        ); */
        /* 下記追加 */
        const res = await getWeatherData(location);
        /* ここまで */
        const weatherData = res.data.hourly;
        const weatherDataByTime = weatherData.time.map((time, index) => {
          return {
            datetime: time,
            weatherCode: weatherData.weather_code[index]
          }
        }, {});
        setWeatherInfo(weatherDataByTime);       
      } catch (error) {
        alert(error.message);
      }
    })();
  }, [location])

  return (
    <div>
      <div className='center-item'>
        <select id='location-select' onChange={onChangeLocation}>
          {/* locationListの要素数分の選択肢を出します */}
          {locationList.map((lo) => (
            <option key={lo.enName} value={lo.enName}>{lo.jpName}</option>
          ))}
        </select>
      </div>
      <h1 className='center-item'>{location.jpName} の天気</h1>
      <div className='center-item'>
        {dateList.map((date) => (
          <button
            key={date}
            className={checkDateButtonClassName(date)}
            value={date}
            onClick={onClickDate}
          >
            {formatDate(date)}
          </button>
        ))}
      </div>
      {/* ここまで */}      
      <div className='center-item'> 
       <table id='weather-table' border={1}>
         <tbody>
           {/* 下記でmap処理に渡していた定数を変更します。 weatherInfo => weatherInfoOnCurrentDate  */}

            
           {weatherInfoOnCurrentDate.map((info) => (
             <tr key={info.datetime}>
              <td>
                {format(new Date(info.datetime), 'MM/dd - HH:mm')}
              </td>
              <td>
                {/* {weatherNames[info.weatherCode]} */}
                <WeatherNameWithIcon weatherCode={info.weatherCode} />
              </td>
             </tr>         

            ))}
         </tbody>
        </table>
      </div>
  </div>    
  );
}

export default App;
