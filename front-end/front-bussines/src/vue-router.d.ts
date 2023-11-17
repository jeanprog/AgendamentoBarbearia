export {}

declare module 'vue-router' {
  interface RouteMeta {
    authRequired?: boolean
    unauthRequired?: boolean
  }
}