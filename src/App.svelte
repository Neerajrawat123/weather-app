
<script lang="ts">
  import Card from "./Card.svelte";
  import ForecastCard from "./ForecastCard.svelte";
  import searchLogo from "/assets/search.svg"

  let city = "";

  let weatherData:any = {};
  let forecastData:any[] = []; 
  let isLoading = false
  let error = "";
  let cnt = 5;
  console.log()


  const fetchData = async () => {
    try {
      console.log(city);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();
      if (data.cod === 200) {
        weatherData = data;
        console.log();
        error = "";
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error(err);
      error = "Error fetching weather data. Please try again.";
    }
  };

  const fetchForecast = async () => {
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      isLoading = false
      if (data.cod === "200") {
        forecastData = data.list;
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error(err);
      error = "Error fetching forecast data. Please try again.";
    }
  };

  const handleSearch = () => {
    isLoading = true
    fetchData();
    fetchForecast();
  };

  const handleKeydown = (event:KeyboardEvent) => {
    if (event.key === 'Enter') {
      isLoading = true
      handleSearch();
    }
  };

</script>

<main class="flex sm:w-2/3 flex-col text-white w-full px-8">
  <h1 class="text-white text-3xl font-semibold">Weather App</h1>
  <div class="py-8 flex">
    <input
      type="text"
      bind:value={city}
      on:keydown={handleKeydown}
      placeholder="Enter city name"
      class="w-full px-3 font-semibold rounded-md border border-white bg-transparent"
      required
    />

    <button class="px-1" on:click={handleSearch} disabled={city.length == 0}>
      <img class="w-8" src={searchLogo} alt="" />
    </button>
  </div>
  {#if isLoading}
    <div role="status" class="flex justify-center items-center">
      <svg
        aria-hidden="true"
        class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  {/if}

  {#if error}
    <p>{error}</p>
  {:else if Object.keys(weatherData).length > 0}
    <div>
      <div class="flex px-4 items-center justify-between">
        <div class="flex items-end gap-1 flex-col sm:flex-row">
          <p class="text-white text-5xl font-semibold">
            {Math.round(weatherData?.main?.temp - 273.15)}°C
          </p>

          <p class=" text-lg sm:text-2xl">
            {weatherData.weather[0].description}
          </p>
        </div>
        <p class="text-2xl sm:text-4xl float-right">
          {weatherData.name}, {weatherData.sys.country}
        </p>
      </div>

      <div class="flex py-8 gap-3 flex-wrap">
        <Card data={weatherData?.main?.temp} type="temperature" />
        <Card data={weatherData.wind.speed} type="wind" />

        <Card data={weatherData.main.humidity} type="humidity" />
        <Card data={weatherData.clouds.all} type="clouds" />

        <!-- <p class="text-2xl w-1/3">Description: {weatherData.weather[0].description}</p>
        <p class="text-2xl w-1/3">Wind: {weatherData.wind.speed} m/s, Direction: {weatherData.wind.deg}°</p>
        <p class="text-2xl w-1/3">Humidity: {weatherData.main.humidity}%</p>
        <p class="text-2xl w-1/3">UV Index: {weatherData.uvi}</p> -->
      </div>
    </div>
  {/if}

  {#if forecastData.length > 0}
    <div>
      <h2>5-Day Forecast</h2>
      <div class="flex flex-wrap gap-2 py-6">
        {#each forecastData.slice(0, 5) as forecast}
          <ForecastCard
            data={forecast.main.temp}
            dt={forecast.dt_txt}
            weather={forecast.weather[0].main}
          />
        {/each}
      </div>
    </div>
  {/if}
</main>
