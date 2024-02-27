<script setup>
import { useLatLongStore } from "../stores/LatLong";
import { useGetDataStore } from "../stores/GetData";
let { getNameFunction } = useLatLongStore();
let { getDataFunction } = useGetDataStore();

async function handleChange(e) {
  if (e.target.value) {
    localStorage.setItem("city", e.target.value);
    await getNameFunction();
    await getDataFunction();
  }
}
</script>

<template>
  <select
    @change="handleChange"
    id="countries"
    class="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[200px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-lg"
  >
    <option selected disabled>Hududni tanlang</option>
    <option value="toshkent">Toshkent shahri</option>
    <option value="andijon">Andijon</option>
    <option value="namangan">Namangan</option>
    <option value="sirdaryo">Sirdaryo</option>
    <option value="qashqadaryo">Qashqadaryo</option>
    <option value="navoiy">Navoiy</option>
    <option value="buxoro">Buxoro</option>
  </select>
</template>

<style scoped></style>
