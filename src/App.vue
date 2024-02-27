<script setup>
import Home from "./pages/Home.vue";
import Loading from "./components/Loading.vue";
import { onMounted } from "vue";
import { useLatLongStore } from "./stores/LatLong";
import { useGetDataStore } from "./stores/GetData";
let { getNameFunction } = useLatLongStore();
let { getDataFunction } = useGetDataStore();
onMounted(async () => {
  if (!localStorage.getItem("city")) {
    localStorage.setItem("city", "toshkent");
    await getNameFunction();
  }

  await getDataFunction();
});
</script>

<template>
  <div>
    <Suspense>
      <template #default>
        <Home />
      </template>
      <template #fallback>
        <Loading />
      </template>
    </Suspense>
  </div>
</template>

<style scoped></style>
