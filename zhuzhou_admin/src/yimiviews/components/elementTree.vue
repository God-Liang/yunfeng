<template>
  <div class="components-container">
    <div class="myTree-container">
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>
      <el-tree
        class="filter-tree myTree"
        :data="data2"
        show-checkbox
        node-key="id"
        :default-expanded-keys="expandedKeys"
        :default-checked-keys="checkedKeys"
        :props="defaultProps"
        :filter-node-method="filterNode"
        ref="tree">
      </el-tree>

      <div class="buttons">
        <!--<el-button @click="getCheckedKeys">通过 key 获取</el-button>-->
        <el-button v-if='roleIdTage'>{{roleId}}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import { getPermissionList } from '@/api/systemManage/permission'
  import { getPermissionsByRoleId } from '@/api/systemManage/role'

  export default {
    name: 'elementTree',
    props: ['roleId'],
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      },
      roleId: function() {
        this.setCheckedKeys()
      }
    },
    created() {
      this.setCheckedKeys()
      this.getPermissionList()
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      getPermissionList() {
        getPermissionList(this.query).then(data => {
          this.data2 = this.handlePermissionList(data.data.value)
        })
      },
      getCheckedKeys() {
        return this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
      },
      setCheckedKeys() {
        const query = {}
        query.roleId = this.roleId
        getPermissionsByRoleId(query).then(response => {
          this.checkedKeys = response.data.value
          this.$refs.tree.setCheckedKeys(this.checkedKeys)
        })
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([])
      },
      resetFilterText() {
        this.filterText = ''
        this.expandedKeys = []
      },
      handlePermissionList(data) {
        const list = [[], [], []]
        for (let i = 0; i < data.length; i++) {
          if (data[i].type === 1) {
            const obj = {}
            obj.id = data[i].id
            obj.label = data[i].title
            obj.children = []
            list[0].push(obj)
          } else if (data[i].type === 2) {
            const obj = {}
            obj.id = data[i].id
            obj.parentId = data[i].parentId
            obj.label = data[i].title
            obj.children = []
            list[1].push(obj)
          } else if (data[i].type === 3) {
            const obj = {}
            obj.id = data[i].id
            obj.parentId = data[i].parentId
            obj.label = data[i].title
            list[2].push(obj)
          }
        }
        for (let i = 0; i < list[0].length; i++) {
          for (let j = 0; j < list[1].length; j++) {
            if (list[1][j].parentId === list[0][i].id) {
              list[0][i].children.push(list[1][j])
            }
          }
        }
        for (let i = 0; i < list[1].length; i++) {
          for (let j = 0; j < list[2].length; j++) {
            if (list[2][j].parentId === list[1][i].id) {
              list[1][i].children.push(list[2][j])
            }
          }
        }
        return list[0]
      }
    },
    data() {
      return {
        query: {
          permission: {}
        },
        expandedKeys: [],
        checkedKeys: [],
        filterText: '',
        data2: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        roleIdTage: false
      }
    }
  }
</script>
<style scoped>
  .myTree{
    margin-top: 10px;
  }
  .myTree-container{
    width: 200px;
  }
  .buttons{
    margin-top: 10px;
    width: 200px;
  }
</style>
