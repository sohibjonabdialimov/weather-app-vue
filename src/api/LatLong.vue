<script>
import { ref } from 'vue'

export default {
  setup() {
    const data = ref({})
    console.log(data);
    return {
      data
    }
  },
  async created() {
    await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${"samarqand"}&appid=9dd86907fe501cec50da3d087e4e9dc0`, {
        method: 'GET' 
    })
      .then(async (response) => {
        const data = await response.json()
        console.log("data", data);
        this.data = data
      })
      .catch((error) => {return error})
  },
}
</script>
