import create from 'zustand';
import { fetchAllUsers, login, register } from '../apis/authApis';
interface userAuthPayload {
    userName: string
    password: string
}
type IState = {
    loading: boolean
    isAuth: boolean
    users: any[]
    fetchAll: () => void
    setIsAuth: (status: boolean) => void
    userLogin: (payload: userAuthPayload) => void
    userRegister: (payload: userAuthPayload) => void
}
const AuthContext = create<IState>((set, get) => ({
    loading: false,
    isAuth: false,
    users: [],
    fetchAll: async () => {
        set({ loading: true })
        try {
            const res = await fetchAllUsers()
            set({ users: res?.data?.data })
        } catch (error) {

        }
        set({ loading: false })

    },
    setIsAuth: (status) => {
        set({ isAuth: status })
    },
    userLogin: async (payload) => {
        set({ loading: true })
        try {
            const res = await login(payload)
            if (res?.data) {
                localStorage.setItem("app-token", res.data.data)
                // set({ isAuth: true })
                window.location.reload()
            }
        } catch (error) {

            set({ loading: false })

        }
    },
    userRegister: async (payload) => {
        set({ loading: true })
        try {
            await register(payload)
            get().userLogin(payload)
        } catch (error) {

            set({ loading: false })

        }
    }
}));

export default AuthContext;