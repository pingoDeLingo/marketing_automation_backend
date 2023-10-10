<template>
  <div class="flex justify-center items-center h-screen bg-gray-200">
    <form @submit.prevent="registerUser" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          E-post:
        </label>
        <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" required>
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Parool:
        </label>
        <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" required>
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Registreeri
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    registerUser() {
      // Siin peaks lisama koodi, mis saadab e-posti ja parooli MYSQL-i
      this.$router.push('/dashboard');
    }
  }
}
</script>
