<script>
   export let data, type
    console.log(data, type)
</script>
<div class="text-2xl w-40 h-40 px-2 bg-white/0 shadow-lg rounded-lg backdrop-blur">
    {#if type === 'temperature'}
    <img class= 'w-20' src="src\assets\temperature.svg" alt="" /> 
    <span class='text-gray-200'>{type}</span>
  <p class="text-white">
    {Math.round(((data - 273.15) * 9) / 5 + 32)}°F ({Math.round(
      data - 273.15
    )}°C)
  </p>
  
  {:else if type === 'wind'}
  <img class= 'w-20' src="src\assets\wind.svg" alt="" /> 
  <span class='text-gray-200'>{type}</span>
  <p class="text-white">
  {data}
</p>

{:else if type === 'humidity'}
<img class= 'w-20' src="src\assets\humidity.svg" alt="" /> 
<span class='text-gray-200'>{type}</span>
<p class="text-white">
{data}%
</p>
{:else}
<img class= 'w-20' src="src\assets\clouds.svg" alt="" /> 
<span class='text-gray-200'>{type}</span>
<p class="text-white">
{data}%
</p>

{/if}
</div>
