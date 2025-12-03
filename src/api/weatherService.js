import {
  BehaviorSubject,
  debounceTime,
  switchMap,
  interval,
  startWith,
  map,
  combineLatest,
} from "rxjs";
import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// Stream de la ciudad ingresada
export const ciudad$ = new BehaviorSubject("Lima");

// Llamada a WeatherAPI con pronóstico de 5 días
function fetchClima(ciudad) {
  return axios
    .get(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${ciudad}&days=5&aqi=no`
    )
    .then((r) => r.data)
    .catch(() => null);
}

// Stream principal: clima reactivo
export const clima$ = combineLatest([
  ciudad$.pipe(debounceTime(500)),
  interval(10000).pipe(startWith(0)), // refresca cada 10s
]).pipe(
  map(([ciudad]) => ciudad),
  switchMap((ciudad) => fetchClima(ciudad))
);
