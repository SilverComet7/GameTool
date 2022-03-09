import React, { useRef } from 'react';
import { PlusOutlined,  } from '@ant-design/icons';
import { Button, Tag, Space, Menu, Dropdown } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { ProFormDigitRange, ProFormSelect } from '@ant-design/pro-form';
import { commandRequest, request } from '@/api/base';

export const RenderSeverList =  (props:any) => {

return (<ProFormSelect
  label='选择区服'
  width='sm'
  name='serverId'
  fieldProps={{value:props.sid}}
  request={
    async () => {
     const  result  =  await  request.get(`/proxy/${props.cid}/server`)
     return result.data.map((item: any)=>({label:item.serverName,value:item.serverId}))
    }
  }
/>)
}
RenderSeverList.defaultProps = {
  cid:18
}
export interface UserInfo {
  /** 服务器id */

  serverId: number ;
  /** 昵称 */

  nickName?: string;

  guildId?: string;
  /** 头像 */

  avatar?: string;

  avatarFrame?: string;
  /** sdk账号 */

  account?: string;
  /** 渠道号 */

  channelId: string
  /** 渠道自定义参数  或者sdk需要的参数 */
  channelParam: { [key: string]: string | number }

  createTime: number ;
  /** 上次登录时间 */

  lastLoginTime: number ;
  /** 离线时间 */

  offlineTime: number ;

  nickChangeTimes: number ;
  /** 等级变更时间点，排行榜需要 */

  levelChangeTme: number ;
  /** vip等级版本号，如果版本号不相同，根据VIP总经验，校准当前等级和经验 */

  vipLevelVersion?: string;
  /** [公告编号]  */
  bulletinVersions: { [id: string]: string }
  // 账号信息， 包括系统、IP、包名等，可扩展
  extInfo: Map<string, string>;
  /** 上次离开公会时间 */

  lastLeaveGuildTime: number ;
  /** 离开公会次数 */

  leaveGuildCount: number ;
  /** 转会次数 */

  transferCount: number ;
  // 被封禁到什么时候

  forbiddenUntil: number ;

  _id: string;
}





const getColumns = (props:any)=>{
  const columns: ProColumns<UserInfo>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      dataIndex: 'serverId',
      hideInTable:true,
      initialValue: 1,
      renderFormItem: (_, { type, defaultRender,   ...rest }, form) => {
        return  <RenderSeverList    />
      },
    },
    {
      title: '用户查询',
      dataIndex:'account',
      hideInTable:true,
    },
    {
      title: '账户名称',
      dataIndex:'account',
      hideInSearch:true,
    },
    {
      title: '用户Id',
      dataIndex: 'userId',
      search:false,
      copyable: true,
      ellipsis: true,
      tip: '标题过长会自动收缩',
    },
    {
      title: '用户等级',
      dataIndex: 'level',
      search: {
        transform: (value) => {
          return {
            startLevel: value[0],
            endLevel: value[1],
          };
        },
      },
      renderFormItem:()=><ProFormDigitRange
      separator="-"
      separatorWidth={60}
      />
    },
    {
      title: 'vip等级',
      dataIndex: 'vipLevel',
      search: {
        transform: (value) => {
          return {
            startVipLevel: value[0],
            endVipLevel: value[1],
          };
        },
      },
      renderFormItem:()=><ProFormDigitRange
      separator="-"
      separatorWidth={60}
      />
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
        >
          编辑
        </a>,
        <a onClick={()=> props.myEvent({user:record, keyName:'Command'})} >
          查看
        </a>,
        <TableDropdown
          key="actionGroup"
          onSelect={() => action?.reload()}
          menus={[
            { key: 'copy', name: '复制' },
            { key: 'delete', name: '删除' },
          ]}
        />,
      ],
    },
  ];
  return columns
}


export default (props: any) => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<UserInfo>
      columns={getColumns(props)}
      actionRef={actionRef}
      request={async (params = {}, sort, filter) => {
        // console.log(params,sort, filter);
        const {  current: page, serverId, ...rest } = params
        const result = await commandRequest('/gm/command/common/18',{  model: 'accountManager',
        action: 'queryMany',
        serverIds:[serverId],
        data:{
          searchNickname:true,
          page,
          ...rest
        }
        });
        return {
          data:result.data.items,
          total:result.data.count,
        }
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
        defaultCollapsed:false
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
            };
          }
          return values;
        },
        ignoreRules: false,
      }}
      pagination={{
        pageSize: 10,
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary">
          新建
        </Button>,
      ]}
    />
  );
};
