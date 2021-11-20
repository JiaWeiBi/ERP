import Layout from '@/layout'

export default {
  path: '/company',
  component: Layout,
  redirect: '/company/grade',
  name: 'company',
  meta: {
    title: '供应商',
    icon: 'el-icon-s-help'
  },
  children: [
    // {
    //   path: 'grade',
    //   component: () => import('@/views/company/grade/index'),
    //   name: 'grade',
    //   meta: { title: '评级', icon: 'el-icon-s-help', nocache: true }
    // },
    {
      path: 'info',
      component: () => import('@/views/company/info/index'),
      name: 'info',
      meta: { title: '公司资料', icon: 'el-icon-s-help' }
    }
  ]
}
