import create from 'zustand';
import * as projectsApis from '../apis/projectsApis'
import { UserStoryType } from './UserStoriesContext';
interface projectType {
    id?: string
    title: string
    description: string
    users?: string[]
    userStories?: UserStoryType[]
}
type ProjectContextType = {
    loading: boolean
    data: projectType[]
    targetItem: projectType
    formModalView: boolean
    toggleFormModalView: (open: boolean) => void
    fetchAll: () => void
    getById: (itemId: string) => void
    createItem: (payload: projectType) => void
    updateItem: (itemId: string, payload: projectType) => void
    deleteItem: (itemId: string) => void
    joinUser: (itemId: string, userIds: string[]) => void
    removeUser: (itemId: string, userIds: string[]) => void
    selectItem: (item: projectType) => void
}
const ProjectsContext = create<ProjectContextType>((set, get) => ({
    loading: false,
    data: [],
    targetItem: undefined,
    formModalView: false,
    toggleFormModalView: (open: boolean) => {
        set({formModalView: open})
    },
    fetchAll: async () => {
        set({ loading: true })
        try {
            const res = await projectsApis.getAll()
            set({ data: (res?.data?.data as projectType[])?.reverse() })
        } catch (error) {
            
        }
        set({ loading: false })
    },

    getById: async (itemId: string) => {
        set({ loading: true })
        try {
            const res = await projectsApis.getById(itemId)
            set({ targetItem: res?.data?.data })
        } catch (error) {
            
        }
        set({ loading: false })
    },
    createItem: async (payload: projectType) => {
        set({ loading: true })
        try {
            await projectsApis.createItem(payload)
            get().fetchAll()
        } catch (error) {
            
        }
        set({ loading: false })
    },
    updateItem: async (itemId: string, payload: projectType) => {
        set({ loading: true })
        try {
            await projectsApis.updateItem(itemId, payload)
            get().fetchAll()
        } catch (error) {
            
        }
        set({ loading: false })
    },
    deleteItem: async (itemId: string) => {
        set({ loading: true })
        try {
            await projectsApis.deleteItem(itemId)
            get().fetchAll()
        } catch (error) {
            
        }
        set({ loading: false })
    },
    joinUser: async (itemId: string, userIds: string[]) => {
        set({ loading: true })
        try {
            await projectsApis.joinUser(itemId, userIds)
            get().fetchAll()
        } catch (error) {
            
        }
        set({ loading: false })
    },
    removeUser: async (itemId: string, userIds: string[]) => {
        set({ loading: true })
        try {
            await projectsApis.removeUser(itemId, userIds)
            get().fetchAll()
        } catch (error) {
            
        }
        set({ loading: false })
    },
    selectItem: (item: projectType) => {
        set({ targetItem: item })
    },
}));

export default ProjectsContext;