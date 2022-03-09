import { Tabs } from 'antd';
import UserSearch from './userSearch'
import UserCommand from './userCommand'
import {  useState } from 'react';
import { commandRequest } from '@/api/base';
const { TabPane } = Tabs;



const searchPages = () => {
  const [actKey,setActKey] = useState('Search')
  const [user,setUser] = useState()
  const getUserInfo = (user) =>{
   return  commandRequest(undefined,{
    model: 'resources',
    action: 'queryAll',
    serverIds:[1],
    data:{
        uid:user._id
      }
    })
  }
  const toTab = (i) => {
    setUser(i.user)
    getUserInfo(i.user)
    setActKey(i.keyName)
  }

  return (<Tabs  type="card" activeKey={actKey} onChange={(key)=>setActKey(key)} >
  <TabPane tab="查询用户" key="Search"  ><UserSearch  myEvent={toTab} /></TabPane>
  <TabPane tab="用户详情" key="Detail">
  </TabPane>
  <TabPane tab="用户指令" key="Command" >
    <UserCommand user={user}></UserCommand>
  </TabPane>
</Tabs>)
}
export default searchPages
