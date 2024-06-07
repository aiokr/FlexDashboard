import { ref } from "vue";
import { createClient } from '@supabase/supabase-js'

console.log(import.meta.env.VITE_SUPABASE_URL)
export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

const user = ref(null);

type UserInfoType = {
  id?: string;
  email: string;
  password: string;
  user_metadata?: {
    full_name: string;
    avatar_url: string;
  };
  [key: string]: any; // 为了支持...meta，允许任意额外的键值对
};

export function useAuthUser() {

  // login with email and password
  const login = async ({ email, password }: UserInfoType) => {
    const { data, error }: any = await supabase.auth.signInWithPassword(
      { email, password }
    ).then(() => { window.location.replace('/') });
    console.log(data)
    if (error) throw error;
    return data;
  };

  const loginWithSocialProvider = (provider: any) => { }; // login with social provider
  const logout = async () => { }; // logout

  // check if user is logged in
  const isLoggedIn = () => {
    return !!user.value;
  };

  // register with email and password
  const register = async ({ email, password, ...meta }: UserInfoType): Promise<UserInfoType | null> => {
    console.log(email)
    const { user, error }: any = await supabase.auth.signUp(
      { email, password }
    ).then((res) => { window.location.replace('/user/verify-email') });

    if (error) throw error;
    return user;
  };

  const update = async (data: any) => { }; // update user profile
  const sendPasswordRestEmail = async (email: string) => { }; // send password reset email

  // get session
  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error;
    return data;
  }


  return {
    getSession,
    user,
    login,
    loginWithSocialProvider,
    isLoggedIn,
    logout,
    register,
    update,
    sendPasswordRestEmail,
  };
}
