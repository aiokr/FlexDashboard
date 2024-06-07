import { useAuthUser } from "@/libs/supabaseClient";
const getSession = useAuthUser().getSession;
const sessionData = await getSession();

const isLoggedIn = ref(false);

if (sessionData.session !== null) {
  isLoggedIn.value = true;
}


console.log(sessionData)
export default defineNuxtRouteMiddleware((to, from) => {

  if (isLoggedIn.value === false) {
    return navigateTo('/login')
  } else {
    console.log('You are logged in!')
  }
})