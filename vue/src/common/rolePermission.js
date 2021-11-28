import store from '@/store'
// 角色校验
export function roleCheck(rolesLevel) {
  const role = store.getters.roleLevel
  if (Array.isArray(rolesLevel)) {
    return rolesLevel.includes(role)
  } else if (Number.isInteger(rolesLevel)) {
    return role <= rolesLevel
  } else {
    return false
  }
}
