<script lang="ts">
  import date from "date-and-time";
  import { isSameDay } from "./util";
  import cloudLogo from '/assets/Clouds.svg'
  import thunderStromLogo from '/assets/temperature.svg'
  import sunnyLogo from '/assets/sunny.svg'

  export let data: number, dt: string, weather: String;

  const time = date.format(new Date(dt), 'hh:mm A')
  const now = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
const isToday = isSameDay(now , dt)
let src = ''

if (weather === 'Clouds') {
  src = cloudLogo
  
} else if(weather === 'thunderstrom') {
src = thunderStromLogo
  
}else{
  src = sunnyLogo
}



</script>

<div class=" w-32 h-32 max-h-max flex p-1 flex-col items-center bg-white/0 shadow-lg rounded-lg backdrop-blur">
  <img
    src={src}
    class="h-2/5 text-center"
    alt=""
  />
  <span class="text-sm ">{Math.round(data - 273.15)}°C</span>
  <span>{isToday ? 'today' : 'Tomorrow'}</span>
  <span>{time}</span>
</div>
