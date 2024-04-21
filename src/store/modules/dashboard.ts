import { store } from '@/store'
import { dashboardFilterType } from './types'
import { defineStore } from 'pinia'
import dayjs from 'dayjs'

export const useDashboardStore = defineStore({
  id: 'pure-dashboard',
  state: (): dashboardFilterType => ({
    query: {
      from: dayjs().startOf('month').format('YYYY-MM-DD'),
      to: dayjs().format('YYYY-MM-DD'),
      groupBy: []
    }
  }),
  getters: {
    getQuery (state: dashboardFilterType) {
      return state.query
    }
  },
  actions: {
    setFrom(from: string){
      this.query.from = from
    },
    setTo(to: string){
      this.query.to = to
    }
  }
})

export function useDashboardStoreHook () {
  return useDashboardStore(store)
}
