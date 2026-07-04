import SearchBox from "./SearchBox"
import InfoBox from "./InfoBox"
import "./WeatherApp.css"
import { useState } from "react"
export default function WeatherApp(){
    const [WeatherInfo,setWeatherInfo]= useState({});
    function getCity(data){
        setWeatherInfo(()=>{
            return data;
        })
    }
return <>
<SearchBox getCity={getCity}/>
<InfoBox info={WeatherInfo}/></>
}