import create from 'zustand';
import * as SprintsApis from '../apis/sprintsApis';
export interface SprintType {
    id?: string
    projectId?: string
    title: string
    start: string
    end: string
}
type SprintsContextType = {
    loading: boolean
    data: SprintType[]
    targetItem: SprintType
    formModalView: boolean
    toggleFormModalView: (open: boolean) => void
    fetchAll: (projectId) => void
    getById: (itemId: string) => void
    createItem: (payload: SprintType) => void
    updateItem: (itemId: string, payload: SprintType) => void
    deleteItem: (itemId: string) => void
    selectItem: (item: SprintType) => void
}
const SprintsContext = create<SprintsContextType>((set) => ({
    loading: false,
    data: [],
    targetItem: undefined,
    formModalView: false,
    toggleFormModalView: (open: boolean) => {
        set({ formModalView: open })
    },
    fetchAll: async (projectId) => {
        set({ loading: true })
        try {
            const res = await SprintsApis.getAll(projectId)
            set({ data: (res?.data?.data as SprintType[])?.reverse() })
        } catch (error) {

        }
        set({ loading: false })
    },

    getById: async (itemId: string) => {
        set({ loading: true })
        try {
            const res = await SprintsApis.getById(itemId)
            set({ targetItem: res?.data?.data })
        } catch (error) {

        }
        set({ loading: false })
    },
    createItem: async (payload: SprintType) => {
        set({ loading: true })
        try {
            await SprintsApis.createItem(payload)
        } catch (error) {

        }
        set({ loading: false })
    },
    updateItem: async (itemId: string, payload: SprintType) => {
        set({ loading: true })
        try {
            await SprintsApis.updateItem(itemId, payload)
        } catch (error) {

        }
        set({ loading: false })
    },
    deleteItem: async (itemId: string) => {
        set({ loading: true })
        try {
            await SprintsApis.deleteItem(itemId)
        } catch (error) {

        }
        set({ loading: false })
    },
    selectItem: (item: SprintType) => {
        set({ targetItem: item })
    },
}));

export default SprintsContext;