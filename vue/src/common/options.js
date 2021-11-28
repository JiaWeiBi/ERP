// 账号等级
export const levelOptions = [
  { key: 1, display_name: '超级管理员' },
  { key: 10, display_name: '管理员' },
  { key: 100, display_name: '员工' }
]
export const levelMap = {
  'SuperAdmin': 1,
  'Admin': 10,
  'Employee': 100
}

// 品类大项
export const productionOptions = [
  { key: 1, display_name: '大家具' },
  { key: 2, display_name: '灯具' }
]
export const productionMap = {
  Furniture: 1,
  Lamps: 2,
  CurtainFabricCarpet: 3,
  HangingPictures: 4,
  Accessories: 5
}

// 合作方式
export const cooporateTypeOptions = [
  { id: 1, name: '战略合作' }
]
