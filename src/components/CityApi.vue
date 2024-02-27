<template>
  <Suspense>
    <div class="flex flex-col flex-1 items-center relative">
      <div class="p-12 w-full">
        <div class="relative">
          <div class="flex gap-10">
            <div>
              <p class="font-bold text-4xl drop-shadow-2xl">
                {{ newData.city?.toLocaleUpperCase() }}
              </p>
              <p class="text-lg mb-5 font-semibold">
                {{
                  new Date(newData.information?.currentTime).toLocaleDateString(
                    "en-us",
                    {
                      weekday: "long",
                      day: "2-digit",
                      month: "long",
                    }
                  )
                }}
              </p>
              <p class="text-8xl mb-2">
                {{ Math.round(newData.information?.current?.temp) }}&deg;C
              </p>
              <p class="text-xl">
                Feels like
                {{ Math.round(newData.information?.current?.feels_like) }} &deg;
              </p>
            </div>

            <div>
              <img
                class="w-[180px] h-auto"
                :src="`http://openweathermap.org/img/wn/${newData.information?.current?.weather[0].icon}@2x.png`"
                alt=""
              />
            </div>
          </div>

          <div class="absolute top-0 right-0">
            <SelectCity />
          </div>
        </div>
      </div>

      <hr class="border-white border-opacity-10 border w-full" />

      <div class="p-12 w-full">
        <div class="mx-8">
          <h2 class="mb-4">Soatlar bo'yicha</h2>

          <div class="grid grid-cols-6 gap-3">
            <div
              v-for="hourData in newData.information?.hourly"
              :key="hourData.dt"
              class="flex flex-col gap-0 items-center card border rounded p-5 shadow"
            >
              <p class="whitespace-nowrap text-md">
                {{
                  new Date(hourData.currentTime).toLocaleTimeString("en-us", {
                    hour: "numeric",
                  })
                }}
              </p>
              <img
                class="w-auto h-[50px] object-cover"
                :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
                alt=""
              />
              <p class="text-xl">{{ Math.round(hourData.temp) }}&deg;</p>
            </div>
          </div>
        </div>
      </div>

      <hr class="border-red border-opacity-10 border w-full" />

      <div class="w-full p-12">
        <div class="mx-8">
          <h2 class="mb-4">Hafta kunlari bo'yicha</h2>
          <table
            class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3">Day</th>
                <th scope="col" class="px-6 py-3">Image</th>
                <th scope="col" class="px-6 py-3">Day Temp</th>
                <th scope="col" class="px-6 py-3">Maximal Temp</th>
                <th scope="col" class="px-6 py-3">Minimal Temp</th>
              </tr>
            </thead>
            <tbody v-for="day in newData.information?.daily" :key="day.dt">
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td class="px-6 py-4">
                  {{
                    new Date(day.dt * 1000).toLocaleDateString("en-DE", {
                      month: "long",
                      day: "2-digit",
                      weekday: "long",
                    })
                  }}
                </td>
                <td class="px-6 py-4">
                  <img
                    class="w-[50px] h-[50px] object-cover"
                    :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
                    alt=""
                  />
                </td>
                <td class="px-6 py-4">{{ Math.round(day.temp.day) }}&deg;C</td>
                <td class="px-6 py-4">{{ Math.round(day.temp.max) }}&deg;C</td>
                <td class="px-6 py-4">{{ Math.round(day.temp.min) }}&deg;C</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <template #fallback></template>
  </Suspense>
</template>

<script setup>
import { useGetDataStore } from "../stores/GetData";
import SelectCity from "./SelectCity.vue";

let newData = useGetDataStore();
</script>
