<template>
  <nav class="flex items-center justify-between flex-wrap bg-white dark:bg-black p-6">
    <div class="flex items-center flex-shrink-0 text-red mr-6">
      <img src="@/assets/img/logo/light.png" class="h-8 inline-block dark:hidden" />
      <img src="@/assets/img/logo/dark.png" class="h-8 hidden dark:inline-block" />
    </div>
    <div class="block lg:hidden">
      <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
      </button>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto md:flex md:flex-row-reverse">
      <div>
        <button @click="switchTheme()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 inline-block dark:hidden"
            viewBox="0 0 20 20"
            fill="#000000"
          >
            <path
              d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 hidden dark:inline-block"
            viewBox="0 0 20 20"
            fill="#FFFFFF"
          >
            <path
              fill-rule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>
<script>

export default {
  methods:{
    switchTheme(){
      if(localStorage.theme === 'dark'){
        localStorage.theme = 'light'
      }else{
        localStorage.theme = 'dark'
      }
      this.applyTheme();
      console.log("theme to change");
    },
    applyTheme(){
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.querySelector('body').classList.add('dark')
        
      } else {
        document.querySelector('body').classList.remove('dark')
      }
    }
  },
  mounted(){
    this.applyTheme();
  }
}
</script>
