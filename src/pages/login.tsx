import ProForm, {
  LoginForm,ProFormText,
} from '@ant-design/pro-form';
import { Button, message, Space } from 'antd';


const LoginFormMy = ()=>
   (  <LoginForm
    title="Github"
    subTitle="全球最大同性交友网站"
    actions={
      <Space>
        其他登录方式
        {/* <AlipayCircleOutlined style={iconStyles} />
        <TaobaoCircleOutlined style={iconStyles} />
        <WeiboCircleOutlined style={iconStyles} /> */}
      </Space>
    }
  >
    <ProFormText
      name="username"
      fieldProps={{
        size: 'large',
        // prefix: <UserOutlined className={'prefixIcon'} />,
      }}
      placeholder={'用户名: admin or user'}
      rules={[
        {
          required: true,
          message: '请输入用户名!',
        },
      ]}
    />
    <ProFormText.Password
      name="password"
      fieldProps={{
        size: 'large',
        // prefix: <LockOutlined className={'prefixIcon'} />,
      }}
      placeholder={'密码: ant.design'}
      rules={[
        {
          required: true,
          message: '请输入密码！',
        },
      ]}
    />
  </LoginForm>)


export default LoginFormMy
