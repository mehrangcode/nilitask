import create from 'zustand';
import * as ItemsApis from '../apis/itemsApis'
export interface ItemType {
    id?: string
    userStoryId: string
    userId: string
    title: string
    description: string
    businessValue: number
    type: number
    status: number
    discussions?: {
        id: string,
        userId: string
        message: string,
        createDate: string
    }[]
}
interface MessageType {
    id: string
    message: string
}
type ItemsContextType = {
    loading: boolean
    data: ItemType[]
    targetItem: ItemType
    formModalView: boolean
    toggleFormModalView: (open: boolean) => void
    setData: (data: ItemType[]) => void
    getById: (itemId: string) => void
    createItem: (payload: ItemType) => void
    updateItem: (itemId: string, payload: ItemType) => void
    deleteItem: (itemId: string) => void
    changeItemStatus: (itemId: string, status: number) => void
    saveNewMessage: (itemId: string, payload: MessageType) => void
    updateMessage: (itemId: string, messageId: string, payload: MessageType) => void
    deleteMessage: (itemId: string, messageId: string) => void
    selectItem: (item: ItemType) => void
}
const ItemsContext = create<ItemsContextType>((set, get) => ({
    loading: false,
    data: [],
    targetItem: undefined,
    formModalView: false,
    toggleFormModalView: (open: boolean) => {
        set({ formModalView: open })
    },
    setData: (data) => {
        set({ data })
    },
    getById: async (itemId: string) => {
        set({ loading: true })
        try {
            const res = await ItemsApis.getById(itemId)
            set({ targetItem: res?.data?.data })
        } catch (error) {

        }
        set({ loading: false })
    },
    createItem: async (payload: ItemType) => {
        set({ loading: true })
        try {
            await ItemsApis.createItem(payload)
        } catch (error) {

            set({ loading: false })
        }
    },
    updateItem: async (itemId: string, payload: ItemType) => {
        set({ loading: true })
        try {
            await ItemsApis.updateItem(itemId, payload)
            set({ loading: false })
        } catch (error) {

            set({ loading: false })
        }
    },
    deleteItem: async (itemId: string) => {
        set({ loading: true })
        try {
            await ItemsApis.deleteItem(itemId)
            set({ loading: false })
        } catch (error) {

            set({ loading: false })
        }
    },
    changeItemStatus: async (itemId: string, status: number) => {
        set({ loading: true })
        try {
            await ItemsApis.changeItemStatus(itemId, status)
            get().getById(itemId)
        } catch (error) {
            set({ loading: false })
        }
    },
    saveNewMessage: async (itemId: string, payload: MessageType) => {
        set({ loading: true })
        try {
            await ItemsApis.saveNewMasseage(itemId, payload)
            get().getById(itemId)
        } catch (error) {
            set({ loading: false })
        }
    },
    updateMessage: async (itemId: string, messageId: string, payload: MessageType) => {
        set({ loading: true })
        try {
            await ItemsApis.updateMasseage(itemId, messageId, payload)
            get().getById(itemId)
        } catch (error) {
            set({ loading: false })
        }
    },
    deleteMessage: async (itemId: string, messageId: string) => {
        set({ loading: true })
        try {
            await ItemsApis.deleteMasseage(itemId, messageId)
            get().getById(itemId)
        } catch (error) {
            set({ loading: false })
        }
    },
    selectItem: (item: ItemType) => {
        set({ targetItem: item })
    },
}));

export default ItemsContext;