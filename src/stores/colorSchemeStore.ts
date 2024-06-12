import { defineStore } from 'pinia'

export const useColorSchemeStore = defineStore('colorScheme', {
  state: () => ({
    mode: 'system', // system, light or dark
  }),
  actions: {
    initializeMode() {
      this.mode = localStorage.getItem('colorScheme') || 'light';
    },
    toggleMode(value: string) {
      if (value === 'light') {
        document.documentElement.classList.remove('dark');
      } else if (value === 'dark') {
        document.documentElement.classList.add('dark');
      }
      this.mode = value;
      localStorage.setItem('colorScheme', value);
    }
  }
})