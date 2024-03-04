<script lang="ts">
  import thermoMeterLogo from './assets/temperature.svg'
  import humidityLogo from './assets/humidity.svg'
  import windLogo from './assets/wind.svg'
  import cloudsLogo from './assets/Clouds.svg'

   export let data: number, type: String;
</script>
<div class="text-2xl w-40 h-40 px-2 bg-white/0 shadow-lg rounded-lg backdrop-blur">
    {#if type === 'temperature'}
    <img class= 'w-20' src={thermoMeterLogo} alt="" /> 
    <span class='text-gray-200'>{type}</span>
  <p class="text-white">
    {Math.round(((data - 273.15) * 9) / 5 + 32)}°F ({Math.round(
      data - 273.15
    )}°C)
  </p>
  
  {:else if type === 'wind'}
  <img class= 'w-20' src={windLogo} alt="" /> 
  <span class='text-gray-200'>{type}</span>
  <p class="text-white">
  {data}
</p>

{:else if type === 'humidity'}
<img class= 'w-20' src={humidityLogo} alt="" /> 
<span class='text-gray-200'>{type}</span>
<p class="text-white">
{data}%
</p>
{:else}
<img class= 'w-20' src={cloudsLogo} alt="" /> 
<span class='text-gray-200'>{type}</span>
<p class="text-white">
{data}%
</p>

{/if}
</div>
