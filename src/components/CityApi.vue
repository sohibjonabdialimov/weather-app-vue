<template>
  <Suspense>
    <div class="flex flex-col flex-1 items-center">
      <div class="flex flex-col items-center text-white py-12">
        <p class="text-sm mb-12">
          {{
            new Date(newData.information?.currentTime).toLocaleDateString("en-us", {
              weekday: "short",
              day: "2-digit",
              month: "long",
            })
          }}
          {{
            new Date(newData.information?.currentTime).toLocaleTimeString("en-us", {
              timeStyle: "short",
            })
          }}
        </p>
        <p class="text-8xl mb-8">
          {{ Math.round(newData.information?.current?.temp) }}&deg;
        </p>
        <p>
          Feels like
          {{ Math.round(newData.information?.current?.feels_like) }} &deg;
        </p>
        <p class="capitalize">
          {{ newData.information?.current?.weather[0].description }}
        </p>
        <img
          class="w-[150px] h-auto"
          :src="`http://openweathermap.org/img/wn/${newData.information?.current?.weather[0].icon}@2x.png`"
          alt=""
        />
      </div>

      <hr class="border-white border-opacity-10 border w-full" />

      <!-- Hourly Weather -->
      <div class="max-w-screen-md w-full py-12">
        <div class="mx-8 text-white">
          <h2 class="mb-4">Hourly Weather</h2>
          
          <div class="flex gap-10 overflow-x-scroll">
            <div
              v-for="hourData in newData.information?.hourly"
              :key="hourData.dt"
              class="flex flex-col gap-4 items-center"
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

      <!-- Weekly Weather -->
      <div class="max-w-screen-md w-full py-12">
        <div class="mx-8 text-white">
          <h2 class="mb-4">7 Day Forecast</h2>
          <div
            v-for="day in newData.information?.daily"
            :key="day.dt"
            class="flex items-center"
          >
            <p class="flex-1">
              {{
                new Date(day.dt * 1000).toLocaleDateString("en-us", {
                  weekday: "long",
                })
              }}
            </p>
            <img
              class="w-[50px] h-[50px] object-cover"
              :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
              alt=""
            />
            <div class="flex gap-2 flex-1 justify-end">
              <p>H: {{ Math.round(day.temp.max) }}</p>
              <p>L: {{ Math.round(day.temp.min) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #fallback></template>
  </Suspense>
</template>

<script setup>
import { useGetDataStore } from "../stores/GetData";

let newData = useGetDataStore();
</script>
