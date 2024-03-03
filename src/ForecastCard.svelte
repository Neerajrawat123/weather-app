<script>
  import date from "date-and-time";
  import { isSameDay } from "./util";
  export let data, dt, weather;
  console.log(weather)
  const time = date.format(new Date(dt), 'hh:mm A')
  const now = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
const isToday = isSameDay(now , dt)

const src = `src/assets/${weather}.svg`

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
