import create from 'zustand';
import * as UserStoriesApis from '../apis/userStoriesApis'
import { ItemType } from './ItemsContext';
export interface UserStoryType {
    id?: string
    sprintId: string
    userId: string
    title: string
    items?: ItemType[]
    description: string
    businessValue: number
    status: number
}
interface MessageType {
    id: string
    message: string
}
type UserStoriesContextType = {
    loading: boolean
    data: UserStoryType[]
    targetItem: UserStoryType
    formModalView: boolean
    toggleFormModalView: (open: boolean) => void
    setData: (data: UserStoryType[]) => void
    getById: (itemId: string) => void
    createItem: (payload: UserStoryType) => void
    updateItem: (itemId: string, payload: UserStoryType) => void
    deleteItem: (itemId: string) => void
    changeItemStatus: (itemId: string, status: number) => void
    saveNewMessage: (itemId: string, payload: MessageType) => void
    updateMessage: (itemId: string, messageId: string, payload: MessageType) => void
    deleteMessage: (itemId: string, messageId: string) => void
    selectItem: (item: UserStoryType) => void
}
const UserStoriesContext = create<UserStoriesContextType>((set, get) => ({
    loading: false,
    data: [],
    targetItem: undefined,
    formModalView: false,
    toggleFormModalView: (open: boolean) => {
        set({ formModalView: open })
    },
    setData: (data) => {
        set({ data: (data || []).reverse() })
    },
    getById: async (itemId: string) => {
        set({ loading: true })
        try {
            const res = await UserStoriesApis.getById(itemId)
            set({ targetItem: res?.data?.data })
        } catch (error) {

        }
        set({ loading: false })
    },
    createItem: async (payload: UserStoryType) => {
        set({ loading: true })
        try {
            await UserStoriesApis.createItem(payload)
        } catch (error) {

            set({ loading: false })
        }
    },
    updateItem: async (itemId: string, payload: UserStoryType) => {
        set({ loading: true })
        try {
            await UserStoriesApis.updateItem(itemId, payload)
            set({loading: false})
        } catch (error) {

            set({ loading: false })
        }
    },
    deleteItem: async (itemId: string) => {
        set({ loading: true })
        try {
            await UserStoriesApis.deleteItem(itemId)
            set({loading: false})
        } catch (error) {

            set({ loading: false })
        }
    },
    changeItemStatus: async (itemId: string, status: number) => {
        set({ loading: true })
        try {
            await UserStoriesApis.changeItemStatus(itemId, status)
            get().getById(itemId)
        } catch (error) {
            set({ loading: false })
        }
    },
    saveNewMessage: async (itemId: string, payload: MessageType) => {
        set({ loading: true })
        try {
            await UserStoriesApis.saveNewMasseage(itemId, payload)
            get().getById(itemId)
        } catch (error) {
            set({ loading: false })
        }
    },
    updateMessage: async (itemId: string, messageId: string, payload: MessageType) => {
        set({ loading: true })
        try {
            await UserStoriesApis.updateMasseage(itemId, messageId, payload)
            get().getById(itemId)
        } catch (error) {
            set({ loading: false })
        }
    },
    deleteMessage: async (itemId: string, messageId: string) => {
        set({ loading: true })
        try {
            await UserStoriesApis.deleteMasseage(itemId, messageId)
            get().getById(itemId)
        } catch (error) {
            set({ loading: false })
        }
    },
    selectItem: (item: UserStoryType) => {
        set({ targetItem: item })
    },
}));

export default UserStoriesContext;