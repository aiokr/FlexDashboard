import { useAuthUser } from "@/libs/supabaseClient";
import { ref } from 'vue';

// 定义一个异步函数来处理获取会话和登录状态的逻辑
async function setupAuth() {
  const getSession = useAuthUser().getSession;
  const sessionData = await getSession();

  const isLoggedIn = ref(false);

  if (sessionData.session !== null) {
    isLoggedIn.value = true;
  }

  console.log(sessionData);

  return isLoggedIn;
}

export default async function defineNuxtRouteMiddleware() {
  const isLoggedIn = await setupAuth();
  // 确保在中间件中等待 setupAuth 完成
  if (isLoggedIn.value === false) {
    return navigateTo('/login');
  } else {
    console.log('You are logged in!');
  }
}