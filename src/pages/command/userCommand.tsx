import  { useEffect, useMemo, useRef, useState } from 'react';
import { ProFormDigit, ProFormInstance } from '@ant-design/pro-form';
import { ProFormCascader } from '@ant-design/pro-form';
import ProForm, {
  ProFormText,
} from '@ant-design/pro-form';
import { RenderSeverList } from './userSearch'
import { commandRequest } from '@/api/base';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const gmCmdSelection: any[] = [
  {
    value: 'Set',
    label: '设置指令',
    children: [
      {
        value: 'SetRelicTreasure', label: '设置遗迹寻宝次数', model: 'shenji', action: 'setDurability', sendData: {
          durability: undefined as unknown
        }, render() {
          return <ProFormDigit width="sm" fieldProps={{ onChange: (e) => { this.sendData.durability = e } }} label="次数设置" />
        }
      },
      { value: 'SetEquipTreasure', label: '设置装备宝库已挑战次数', model: 'equipTH', action: 'setChallengeCount' },
      {
        value: 'SetGuildTechnology',
        label: '设置公会科技',
        model: 'guildTech',
        action: 'setTechLevel',
      },
      {
        value: 'SetCustomLevel',
        label: '设置关卡',
        action: 'setCheckpoint',
        render() {
          return <ProFormDigit width="sm" fieldProps={{ onChange: (e) => { this.sendData.durability = e } }} label="次数设置" />
        }
      },
    ],
  },
  {
    value: 'Add',
    label: '添加指令',
    children: [
      {
        value: 'AddItem',
        label: '添加资源',
        model: 'resources',
        action: 'appendResource',
      },
      { value: 'AddHero', label: '添加英雄', model: 'resources', action: 'addHero' },
      { value: 'AddEquip', label: '添加装备', model: 'resources', action: 'addEquip' },
    ],
  },
  {
    value: 'Delete',
    label: '删除指令',
    children: [
      {
        value: 'SubItem',
        label: '删除资源',
        model: 'resources',
        action: 'consumeResource',
      },
      { value: 'SubHero', label: '删除英雄', model: 'resources', action: 'delHero' },
      { value: 'SubEquip', label: '删除装备', model: 'resources', action: 'delEquip' },
    ],
  },
  {
    value: 'Control',
    label: '控制指令',
    children: [
      { value: 'KickOutUser', label: '指定下线', model: 'accountManager', action: 'kickOutOne' },
      { value: 'KickOutAllUser', label: '全部下线', model: 'accountManager', action: 'kickOutAll ', notNeedUser: true },
      { value: 'SkipGuide', label: '跳过新手引导', model: 'guide', action: 'skipGuide' },
      { value: 'RecoverGuide', label: '恢复新手引导', model: 'guide', action: 'resetGuide' },
    ],
  },
  {
    value: 'ReSet',
    label: '重置指令',
    children: [
      { value: 'Resetshenji', label: '重置遗迹寻宝', model: 'shenji', action: 'reset' },
      { value: 'Resetequipth', label: '重置装备宝库', model: 'equipTH', action: 'reset' },
      { value: 'Resetshendian', label: '重置神殿', model: 'shendian', action: 'reset' },
    ],
  },
  {
    value: 'Develop',
    label: '开发指令',
    // todo 使用账户名作为临时权限 后续转role
    role: ['developer', 'ChrisWang', 'jjm'],
    children: [
      {
        value: 'CustomCommand',
        label: '自定义指令',
      },
    ],
  },
];

export default (props) => {
  const formRef = useRef<
    ProFormInstance
  >();
  function setInitProp(props: any) {
    if (props?.user) {
      formRef.current?.setFieldsValue({
        userName: props.user.nickName,
        uid: props.user._id,
        serverId: props.user.serverId
      })
    }
  }

  const [cmpName, setCmpName] = useState();

  let initPropValue = {}
  const changeCmpValue = (e, se: any) => {
    //  setCmpName(se[se.length-1]?.render?.())
    setCmpName(e[e.length - 1])
  }
  const getCmp = useMemo(() => {
    return gmCmdSelection.map(e => e.children).flat().find(item => item.value === cmpName)
  }, cmpName)

  useEffect(() => {
    setInitProp(props)
    return () => {
      formRef.current?.setFieldsValue({})
    }
  }, [props])

  return (
    <ProForm<{
      userName?: string;
      uid?: string;
      serverId?: number;
    }>

      onFinish={async (values) => {
        await waitTime(2000);
        const { action, model, sendData } = getCmp
        const { uid, serverId } = values;
        // console.log(values, getCmp);
        const result = await commandRequest(undefined, {
          model,
          action,
          serverIds: [serverId],
          data: {
            uid,
            ...sendData
          }
        })
      }}
      initialValues={initPropValue}
      layout='horizontal'
      formRef={formRef}
      onValuesChange={(changeValues) => console.log(changeValues)}
      formKey="base-form-use-demo"
      autoFocusFirstInput
    >
      <ProFormText width="sm" name="userName" label="用户名称" />
      <ProFormText width="sm" name="uid" label="用户Id" />
      <RenderSeverList name='serverId'></RenderSeverList>
      <ProFormCascader
        width="sm"
        fieldProps={{ options: gmCmdSelection, onChange: changeCmpValue }}
        label="操作"
      />
      {getCmp?.render ? getCmp?.render() : <></>}
    </ProForm>
  );
};

