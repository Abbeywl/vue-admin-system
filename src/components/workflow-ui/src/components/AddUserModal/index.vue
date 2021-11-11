<template>
  <div>
    <a-modal
      :title="(addType=='user') ? '添加用户' : '添加角色'"
      :visible="visible"
      :confirm-loading="confirmLoading"
      :width="660"
      ok-text="确认"
      cancel-text="取消"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-transfer
        class="tree-transfer"
        :data-source="dataSource"
        :target-keys="targetKeys"
        :render="item => item.title"
        :locale="{ itemUnit: '项', itemsUnit: '项', notFoundContent: '列表为空', searchPlaceholder: '请输入搜索内容' }"
        :show-select-all="false"
        @change="onChange"
      >
        <template
          slot="children"
          slot-scope="{ props: { direction, selectedKeys }, on: { itemSelect } }"
        >
          <a-tree
            v-if="direction === 'left'"
            blockNode
            checkable
            checkStrictly
            defaultExpandAll
            :checkedKeys="[...selectedKeys, ...targetKeys]"
            :treeData="userdata"
            @check="
                (_, props) => {
            onChecked(_, props, [...selectedKeys, ...targetKeys], itemSelect);
            }
        "
        @select="
            (_, props) => {
            onChecked(_, props, [...selectedKeys, ...targetKeys], itemSelect);
            }
        "
        />
        </template>
      </a-transfer>
    </a-modal>
  </div>
</template>
<script>
var treeData = [
  { key: 'userdata', title: 'userdata' },
  {
    key: '设计单位专业负责人',
    title: '设计单位专业负责人',
    children: [
      { key: '设计单位项目经理', title: '设计单位项目经理' },
      { key: 'BIM技术服务单位平台信息管理员', title: 'BIM技术服务单位平台信息管理员' },
    ],
  },
  { key: 'BIM技术服务单位项目经理', title: 'BIM技术服务单位项目经理' },
];

const transferDataSource = [];

function flatten(list = []) {
  list.forEach(item => {
    transferDataSource.push(item);
    flatten(item.children);
  });
}
flatten(JSON.parse(JSON.stringify(treeData)))

function isChecked(selectedKeys, eventKey) {
  return selectedKeys.indexOf(eventKey) !== -1;
}

function handleTreeData(data, targetKeys = []) {
  data.forEach(item => {
    // item['disabled'] = targetKeys.includes(item.key);
    item.disabled = targetKeys.includes(item.key);
    if (item.children) {
      handleTreeData(item.children, targetKeys);
    }
  });
  return data;
}

export default {
  props: {
    visible: {
      type: Boolean,
    },
  },
  data() {
    return {
      confirmLoading: false,
      targetKeys: ['设计单位专业负责人'], // 右边选中值
      dataSource: transferDataSource,
      userdata: treeData,
      addType: 'user'
    };
  },
  computed: {
    treeData() {
      return handleTreeData(treeData, this.targetKeys);
    },
  },
  mounted() {
  },
  methods: {
    getAddType(type, _targetKeys) {
      console.log('触发', type, _targetKeys)
      this.targetKeys = _targetKeys
      this.addType = type
      switch (type) {
        case "role" :
          this.userdata = treeData;
          break;
        case "user" :
          this.userdata = [
            { key: '张胜男', title: '张胜男' },
            {
              key: '夏挺帅',
              title: '夏挺帅',
              children: [
                { key: '李书福', title: '李书福' },
                { key: '司傅', title: '司傅' },
              ],
            },
            { key: '孙菲菲', title: '孙菲菲' },
          ];
          break;
        default:
          break;
      }
      flatten(JSON.parse(JSON.stringify(this.userdata)))
    },
    handleOk(e) {
      this.confirmLoading = true;
      setTimeout(() => {
        // this.visible = false;
        this.confirmLoading = false;
      }, 2000);
      // 传给父组件最终选中值
      this.$emit("selectFun", true, this.targetKeys, this.addType)
    },
    handleCancel(e) {
      this.$emit("selectFun", false, "", this.addType)
    },
    onChange(targetKeys) {
      this.targetKeys = [...new Set(targetKeys)];
      console.log('Target Keys:', targetKeys);
    },
    onChecked(_, e, checkedKeys, itemSelect) {
      const { eventKey } = e.node;
      itemSelect(eventKey, !isChecked(checkedKeys, eventKey));
    },
  },

};
</script>
<style scoped>
.tree-transfer .ant-transfer-list:first-child {
  width: 50%;
  flex: none;
}
</style>