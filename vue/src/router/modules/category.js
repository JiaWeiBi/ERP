import Layout from '@/layout'

export default {
  path: '/category',
  component: Layout,
  redirect: '/category/furniture',
  name: 'category',
  meta: {
    title: '品类',
    icon: 'el-icon-s-help'
  },
  children: [
    {
      path: 'furniture',
      component: () => import('@/views/example/create'),
      name: 'furniture',
      meta: { title: '大家具', icon: 'el-icon-s-help' }
    },
    {
      path: 'lamps',
      component: () => import('@/views/example/edit'),
      name: 'lamps',
      meta: { title: '灯具', icon: 'el-icon-s-help' }
    },
    {
      path: 'curtain_fabric_carpet',
      component: () => import('@/views/example/edit'),
      name: 'curtain_fabric_carpet',
      meta: { title: '窗帘布艺地毯', icon: 'el-icon-s-help' }
    },
    {
      path: 'hanging_pictures',
      component: () => import('@/views/example/create'),
      name: 'hanging_pictures',
      meta: { title: '挂画', icon: 'el-icon-s-help' }
    },
    {
      path: 'accessories',
      component: () => import('@/views/example/create'),
      name: 'accessories',
      meta: { title: '饰品', icon: 'el-icon-s-help' }
    }
  ]
}
