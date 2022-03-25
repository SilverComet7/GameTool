

export async function getInitialState() {
  // const { userId, fole } = await getCurrentRole();
  return {
    name: 'ChrisWang', // 默认 layout 导航右上角展示的用户名字段
    avatar:'',  // 默认 layout 导航右上角展示的用户头像字段
    children: [{ name: '登出' }]
  };
}
