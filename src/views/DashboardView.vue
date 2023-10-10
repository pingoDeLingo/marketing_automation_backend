<template>
  <div>
    <h1>Tere tulemast {{ kasutajaNimi }}</h1>

    <!-- Sõnumi vorm -->
    <form @submit.prevent="saadaSobrale">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Sinu e-post:
        </label>
        <input v-model="sinuEmail" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" required>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="sisu">
          Kirjuta sõnum:
        </label>
        <textarea v-model="sonum" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="sisu" rows="4" required></textarea>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="saajaEmail">
          Saaja e-post:
        </label>
        <input v-model="saajaEmail" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="saajaEmail" type="email" required>
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Saada
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kasutajaNimi: 'John', // Siia lisage tegeliku kasutaja nimi
      sinuEmail: '',
      sonum: '',
      saajaEmail: '',
    };
  },
  methods: {
    saadaSobrale() {
      // Siin võite kasutada Vue komponendi andmeid saatesõnumi koostamiseks
      const email = this.sinuEmail;
      const sõnum = this.sonum;
      const saajaEmail = this.saajaEmail;

      // Saada e-kiri kasutades teie eelistatud meetodit või teenust (nt. Axios või email.js)
      // Näiteks:
      const emailSaadetud = `E-post saadetud:
Sinu e-post: ${email}
Sõnum: ${sõnum}
Saaja e-post: ${saajaEmail}`;
      alert(emailSaadetud);

      // Tühjendage väljad pärast saatmist
      this.sinuEmail = '';
      this.sonum = '';
      this.saajaEmail = '';
    },
  },
};
</script>
