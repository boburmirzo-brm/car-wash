import { url } from 'inspector'
import { mainApi } from './index'

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    example: build.query({
      query: (params) => ({
        url:'products',
        methods: "GET",
        params
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useExampleQuery } = extendedApi