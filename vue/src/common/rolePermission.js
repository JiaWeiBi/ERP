import store from '@/store'
// 角色校验
export function roleCheck(rolesLevel) {
  const role = store.getters.roleLevel
  if (Array.isArray(rolesLevel)) {
    return rolesLevel.includes(role)
  } else if (Number.isInteger(rolesLevel)) {
    console.log('1=', rolesLevel, role)
    return role <= rolesLevel
  } else {
    console.log('2=', typeof rolesLevel)
    return false
  }
}
