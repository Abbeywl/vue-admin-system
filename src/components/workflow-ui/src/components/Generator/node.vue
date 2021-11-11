<template>
  <div>
    <NodeWrap
      v-if="
        node.type == 'start' ||
        node.type == 'approver' ||
        node.type == 'notifier'
      "
      :node="node"
      @addnode="addnode"
      @delNode="delNode"
    />
    <ConditionNode
      v-if="node.type == 'condition' || node.type == 'conditionShunt'"
      :node.sync="node"
      @addnode="addnode"
      @delConditionNode="delConditionNode"
      @addConditionFactor="addConditionFactor"
    />
    <ShuntNode
      v-if="node.type == 'shunt1'"
      :node.sync="node"
      @addnode="addnode"
      @delConditionNode="delConditionNode"
      @addConditionFactor="addConditionFactor"
    />
    <BranchWrap
      v-if="node.type == 'route' || node.type == 'shunt'"
      :node="node"
      @addnode="addnode"
      @delNode="delNode"
    />
    <BackNode
      v-if="node.type == 'back' || node.type == 'recall'"
      :node="node"
      @addnode="addnode"
      @delNode="delNode"
    />
  </div>
</template>
<script>
import NodeWrap from "./node-wrap";
import ConditionNode from "./condition-node";
import ShuntNode from "../ShuntNode/shunt-node.vue";
import BranchWrap from "./branch-wrap";
import BackNode from "../BackNode";
export default {
  name: "Node",
  components: {
    NodeWrap,
    BranchWrap,
    ConditionNode,
    BackNode,
    ShuntNode,
  },
  props: {
    node: {
      type: Object,
      default: undefined,
    },
  },
  mounted() {},
  methods: {
    addnode(node) {
      // console.log('node 新节点:')
      // console.log(node)
      this.$emit("addnode", node);
    },
    delNode() {
      this.$emit("delNode");
    },
    delConditionNode() {
      this.$emit("delConditionNode");
    },
    addConditionFactor(node) {
      this.$emit("addConditionFactor", node);
      this.node = node;
      // console.log(this.node)
    },
  },
};
</script>
