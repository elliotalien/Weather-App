import React, { useEffect, useState ,useRef} from "react";
import search_icon from "../assets/search.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_API_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: data.weather[0].icon,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    search("kerala");
  }, []);

  return (
    <div className="place-self-center p-10  flex flex-col items-center ">
      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for a city..."
          className="h-[50px] border-none outline-none rounded-[40px] pl-[25px] text-[#626262] bg-[#ebfffc] text-[18px]"
        />
        <img
          src={search_icon}
          alt="search"
          className="w-[50px] h-[50px] p-[15px] rounded-[50%] bg-[#ebfffc] cursor-pointer"
          onClick={()=>{
            search(inputRef.current.value);
          }}
        />
      </div>

      {weatherData && (
        <>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
            alt="weather icon"
            className="w-[150px] my-[30px]"
          />
          <p className="text-[#ebfffc] text-[80px] leading-[1]">{weatherData.temperature}°c</p>
          <p className="text-[#ebfffc] text-[40px]">{weatherData.location}</p>

          {/* weather details  */}

          <div className="w-full flex items-center justify-between mt-[40px] ">
            <div className="flex items-start gap-3 text-[22px]">
              <img
                src={humidity_icon}
                alt="humidity"
                className="w-[26px] mt-[10px]"
              />
              <div>
                <p className="text-[#ffff] text-[30px]">{weatherData.humidity}%</p>
                <span className="text-[#ffff] text-[16px] block">Humidity</span>
              </div>
            </div>
            <div className="flex items-start gap-3 text-[22px]">
              <img src={wind_icon} alt="wind" className="w-[26px] mt-[10px]" />
              <div>
                <p className="text-[#ffff] text-[30px]">{weatherData.windSpeed} km/h</p>
                <span className="text-[#ffff] text-[16px] block ">Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
