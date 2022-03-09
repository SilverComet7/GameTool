import { defineConfig } from 'umi';
// import CSI from 'csijs';

// // 示例：自定义上报
// const csi = new CSI({
//     feID: '', // 项目id，日志区分项目使用
//     report: (lines) =>  {
//         // todo 自定义你的上报逻辑
//         console.log('error lins', lines);
//     },
// });
export default defineConfig({
  mfsu: {},
  layout: {

  },
  nodeModulesTransform: {
    type: 'none',
  },
  history: { type: 'hash' },
  routes: [
    {
      path: '/system', component: '@/layouts', name: '系统管理', routes: [
        // { path: '/', component: '@/pages/index', name: '角色配置' },
        { path: '/admins', name: '管理员配置', component: '@/pages/system-setting/admins' }
      ]
    }, {
      path: '/', component: '@/layouts', name: '指令', routes: [{
        path: '/user-search', component: '@/pages/command/index', name: '用户查询/指令',
      }]
    },
    { path: '/login', component: '@/pages/login' }
  ],
  fastRefresh: {},
});
