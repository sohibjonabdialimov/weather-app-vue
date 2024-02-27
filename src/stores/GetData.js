import axios from "axios";
import {
  defineStore
} from "pinia";
import {
  ref
} from "vue";

export const useGetDataStore = defineStore('getData', () => {
  const information = ref(null);
  const city = ref("toshkent")

  async function getDataFunction() {
    let city_info = JSON.parse(localStorage.getItem("city_information"));

    const {
      data
    } = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${city_info.lat}&lon=${city_info.lon}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
    );
    console.log(data);
    if (data) {

      const localOffset = new Date().getTimezoneOffset() * 60000;
      const utc = data.current.dt * 1000 + localOffset;
      data.currentTime =
        utc + 1000 * data.timezone_offset;

      data.hourly?.forEach((hour) => {
        const utc = hour.dt * 1000 + localOffset;
        hour.currentTime = utc + 1000 * data.timezone_offset;
      });
      city.value = localStorage.getItem("city");
      information.value = data;
      localStorage.setItem("data", JSON.stringify(information.value));
    }
  }

  return {
    information,
    city,
    getDataFunction
  }
})