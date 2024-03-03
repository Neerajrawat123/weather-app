<!-- App.svelte -->
<script>
// @ts-nocheck

  import Card from './Card.svelte'
  import ForecastCard from './ForecastCard.svelte';
  
  let apiKey = 'a13a02510afc8025839b478c9ddbc909'; // Your API Key here
  let city = '';
  let weatherData = {};
  let forecastData = [];
  let error = '';
  let cnt = 5;
  
  const fetchData = async () => {
    try {
      console.log(city)
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

      const response = await fetch(url);
      const data = await response.json();
      if (data.cod === 200) {
        weatherData = data;
        console.log()
        error = '';
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error(err);
      error = 'Error fetching weather data. Please try again.';
    }
  };

  const fetchForecast = async () => {
   let url =  `https://api.openweathermap.org/data/2.5/forecast?q=${city }&appid=${apiKey}`
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod === '200') {
        forecastData = data.list;
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error(err);
      error = 'Error fetching forecast data. Please try again.';
    }
  };

  const handleSearch = () => {
    fetchData();
    fetchForecast();
  };

  const handleKeydown = ( event) => {
    console.log(event)
  if (event.keyCode === 13) {
    handleSearch()
    
  }
  
  }

 
  
</script>

<main class='flex  sm:w-2/3 flex-col text-white w-full px-8'>
  <h1 class='text-white text-3xl font-semibold'>Weather App</h1>
  <div class="py-8 flex">

    <input type="text" bind:value ={city} on:keydown={handleKeydown} placeholder="Enter city name" class="w-full px-3 font-semibold rounded-md border border-white bg-transparent" required/>

    <button class='px-1' on:click={handleSearch} disabled={city.length == 0}>
      <img  class="w-8 " src="src\assets\search.svg" alt="">
    </button>
  </div>

  {#if error}
    <p>{error}</p>
  {:else if Object.keys(weatherData).length > 0}
    <div>
      {#if Object.entries(weatherData).length > 0}
      <div class="flex px-4  items-center justify-between">
        <div class="flex items-end gap-1">
          <p class="text-white text-5xl font-semibold">
             {Math.round(
              weatherData?.main?.temp- 273.15
            )}°C
          </p>

          <p class="text-2xl ">{weatherData.weather[0].description}</p>
        </div>
         <p class="text-4xl float-right">{weatherData.name}, {weatherData.sys.country}</p>



      </div>

      <div class="flex py-8 gap-3  flex-wrap">

        <Card data = {weatherData?.main?.temp} type='temperature' />  
        <Card data = {weatherData.wind.speed} type='wind' />


        <Card data = {weatherData.main.humidity} type='humidity' />
        <Card data = {weatherData.clouds.all} type='clouds' />


        <!-- <p class="text-2xl w-1/3">Description: {weatherData.weather[0].description}</p>
        <p class="text-2xl w-1/3">Wind: {weatherData.wind.speed} m/s, Direction: {weatherData.wind.deg}°</p>
        <p class="text-2xl w-1/3">Humidity: {weatherData.main.humidity}%</p>
        <p class="text-2xl w-1/3">UV Index: {weatherData.uvi}</p> -->
      </div>
      {/if}
    </div>

    {#if forecastData.length > 0}
      <div>
        <h2>5-Day Forecast</h2>
      <div class="flex wrap gap-2 py-6">

        {#each forecastData.slice(0, 5) as forecast}
        <ForecastCard data={forecast.main.temp} dt= {forecast.dt_txt} weather={forecast.weather[0].main}/>
        {/each}
      </div>

      </div>
    {/if}
  {/if}
</main>

<style>
 
</style>
