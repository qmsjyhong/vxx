const router = [
  {
    name: 'index',
    path: '/',
    meta: {
      params: []
    },
    component: () => import('../pages/index')
  },
  {
    name: 'window', // 快速选择
    path: '/window',
    component: () => import('../pages/window')
  },
  {
    name: 'scene', // 载入/保存场景
    path: '/scene',
    component: () => import('../pages/scene')
  },
  {
    name: 'info', // 站点logo
    path: '/info',
    component: () => import('../pages/info')
  },
  {
    name: 'scenarist', // 编导
    path: '/scenarist',
    component: () => import('../pages/scenarist/scenarist')
  },
  {
    name: 'quality', // 高级设置
    path: '/quality',
    component: () => import('../pages/scenarist/quality')
  },
  {
    name: 'window-border', // 边框
    path: '/window-border',
    component: () => import('../pages/scenarist/window-border')
  },
  {
    name: 'interception', //源截取
    path: '/interception',
    component: () => import('../pages/scenarist/interception')
  },
  {
    name: 'scenarist-layout',
    path: '/scenarist-layout',
    component: () => import('../pages/scenarist/scenarist-layout')
  },
  {
    name: 'devices',
    path: '/devices',
    component: () => import('../pages/devices')
  }
];

export default router;
