import axios from "axios";
import {
  defineStore
} from "pinia";
import {
  ref
} from "vue";

export const useLatLongStore = defineStore('latlon', () => {
  const lat = ref(0);
  const lon = ref(0);
  const name = ref("");

  async function getNameFunction() {
    let city = localStorage.getItem("city") || "toshkent";
    const {
      data
    } = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=9dd86907fe501cec50da3d087e4e9dc0`
    );
    if (data.length) {
      lat.value = data[0]?.lat
      lon.value = data[0]?.lon
      name.value = data[0]?.name

      localStorage.setItem("city_information", JSON.stringify({
        lat: lat.value,
        lon: lon.value,
        name: name.value
      }));
    }
  }

  return {
    lat,
    lon,
    name,
    getNameFunction
  }
})