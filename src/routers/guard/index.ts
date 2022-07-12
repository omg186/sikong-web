import { Router } from 'vue-router'
import { createPermissionGuard } from './permission-guard'

export function setupRouterGuard(router: Router) {
  createPermissionGuard(router)
}
