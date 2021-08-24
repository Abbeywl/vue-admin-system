<template>
  <div class="">
    <a-row>
      <a-col :span="18" class="btn_group">
        <a-button @click="showModal" type="primary"> 新增巡检点 </a-button>
        <a-button @click="handleAdd" type=""> 导入EXCEL </a-button>
        <a-button @click="handleAdd" type=""> 下载模板 </a-button>
      </a-col>

      <a-col :span="6" class="search">
        <a-input-search
          placeholder="搜索"
          style="width: 200px"
          @search="onSearch"
        />
      </a-col>
    </a-row>
    <a-row>
      <a-table :columns="columns" :data-source="data">
        <template slot-scope="record" slot="tag">
          <span class="tag">
            <a-tag v-if="record == '文字0'" class="invalid">作废</a-tag>
            <a-tag v-else>正常</a-tag>
          </span>
        </template>
        <template slot="action" slot-scope="record" class="oprea">
          <a :data-id="record.key" class="" @click="operationEdit(record.key)"
            >编辑</a
          >
          <a-divider type="vertical" />
          <a :data-id="record.key" class="" @click="operationDelete(record.key)"
            >删除</a
          >
          <a-divider type="vertical" />
          <a :data-id="record.key" class="" @click="operationCopy(record.key)"
            >复制</a
          >
          <a-divider type="vertical" />
          <a
            :data-id="record.key"
            class=""
            @click="operationDisable(record.key)"
            >查看 QR code</a
          >
        </template>
      </a-table>
    </a-row>
    <a-modal
      :title="modalTitle"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      ok-text="保存"
      cancel-text="取消"
    >
      <k-form-build :value="jsonData" ref="kfb" />
    </a-modal>
  </div>
</template>

<script>
import formJson from "./form.json";

const data = [];
const columns = [
  {
    title: "管理區",
    width: 100,
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  { title: "巡检点名称", dataIndex: "address", key: "13", width: 150 },

  { title: "巡检点编号", dataIndex: "address", key: "1", width: 150 },
  { title: "检查要点", width: 110, dataIndex: "age", key: "age" },
  { title: "签到方式", width: 110, dataIndex: "age", key: "ages" },

  {
    title: "状态",
    dataIndex: "address",
    key: "5",
    width: 150,
    scopedSlots: {
      customRender: "tag",
    },
  },
  {
    title: "操作",
    key: "operation",
    fixed: "right",
    width: 300,
    scopedSlots: { customRender: "action" },
  },
];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `文字${i}`,
  });
}
export default {
  components: {},
  data() {
    return {
      jsonData: formJson,
      data,
      columns,
      visible: false,
      confirmLoading: false,
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      layout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
      },
      modalTitle: "新增巡检点",
    };
  },
  computed: {},
  watch: {},
  methods: {
    onSearch() {},

    handleAdd() {
      console.log(1);
    },
    operationEdit(key) {
      this.modalTitle = "编辑巡检点";
      this.visible = !this.visible;
      console.log(key);
    },
    operationDelete(key) {
      console.log(key);
    },
    operationCopy(key) {
      console.log(key);
    },
    operationDisable(key) {
      console.log(key);
    },
    showModal() {
      this.visible = !this.visible;
      this.modalTitle = "新增巡检点";
    },
    handleOk() {
      this.$refs.kfb
        .getData()
        .then((res) => {
          console.log(res);
          this.confirmLoading = true;
          this.visible = false;
          this.confirmLoading = false;
        })
        .catch((values) => {
          console.log("验证未通过", values);
        });
    },
    handleCancel() {
      this.visible = false;
      this.$refs.kfb.reset();
    },
  },
  created() {},
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
};
</script>
<style lang='less' scoped>
@background_color: #0f99a2;
.btn_group {
  margin-bottom: 16px;
  button {
    margin-right: 12px;
  }
}
.search {
  display: flex;
  flex-direction: row-reverse;
}
/deep/ .ant-table-body {
  overflow-x: auto;
}
.tag {
  span {
    width: 52px;
    text-align: center;
    line-height: 26px;
    color: #fff;
    background: @background_color;
  }
  .invalid {
    color: @background_color;
    background: none;
    border: 1px solid @background_color;
  }
}

//@import url(); 引入公共css类
</style>