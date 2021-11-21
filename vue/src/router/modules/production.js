import Layout from '@/layout'

export default {
  path: '/production',
  component: Layout,
  name: 'production',
  meta: {
    title: '品类',
    icon: 'tree-table'
  },
  children: [
    {
      path: 'furniture',
      name: 'furniture',
      meta: { title: '大家具', icon: 'tree-table' },
      component: () => import('@/views/production/furniture/index'),
      children: [
        {
          path: 'category',
          component: () => import('@/views/production/furniture/category'),
          name: 'furniture_category',
          meta: { title: '分类', icon: 'list' }
        },
        {
          path: 'company',
          component: () => import('@/views/production/furniture/company'),
          name: 'furniture_company',
          meta: { title: '供应商', icon: 'people' }
        }
      ]
    },
    {
      path: 'lamps',
      component: () => import('@/views/production/lamps/index'),
      name: 'lamps',
      meta: { title: '灯具', icon: 'tree-table' },
      children: [
        {
          path: 'category',
          component: () => import('@/views/production/lamps/category'),
          name: 'lamps_category',
          meta: { title: '分类', icon: 'list' }
        },
        {
          path: 'company',
          component: () => import('@/views/production/lamps/company'),
          name: 'lamps_company',
          meta: { title: '供应商', icon: 'people' }
        }
      ]
    },
    {
      path: 'curtain_fabric_carpet',
      component: () => import('@/views/production/curtain_fabric_carpet/index'),
      name: 'curtain_fabric_carpet',
      meta: { title: '窗帘布艺地毯', icon: 'tree-table' },
      children: [
        {
          path: 'category',
          component: () => import('@/views/production/curtain_fabric_carpet/category'),
          name: 'curtain_fabric_carpet_category',
          meta: { title: '分类', icon: 'list' }
        },
        {
          path: 'company',
          component: () => import('@/views/production/curtain_fabric_carpet/company'),
          name: 'curtain_fabric_carpet_company',
          meta: { title: '供应商', icon: 'people' }
        }
      ]
    },
    {
      path: 'hanging_pictures',
      component: () => import('@/views/production/hanging_pictures/index'),
      name: 'hanging_pictures',
      meta: { title: '挂画', icon: 'tree-table' },
      children: [
        {
          path: 'category',
          component: () => import('@/views/production/hanging_pictures/category'),
          name: 'hanging_pictures_category',
          meta: { title: '分类', icon: 'list' }
        },
        {
          path: 'company',
          component: () => import('@/views/production/hanging_pictures/company'),
          name: 'hanging_pictures_company',
          meta: { title: '供应商', icon: 'people' }
        }
      ]
    },
    {
      path: 'accessories',
      component: () => import('@/views/production/accessories/index'),
      name: 'accessories',
      meta: { title: '饰品', icon: 'tree-table' },
      children: [
        {
          path: 'category',
          component: () => import('@/views/production/accessories/category'),
          name: 'accessories_category',
          meta: { title: '分类', icon: 'list' }
        },
        {
          path: 'company',
          component: () => import('@/views/production/accessories/company'),
          name: 'accessories_company',
          meta: { title: '供应商', icon: 'people' }
        }
      ]
    }
  ]
}
