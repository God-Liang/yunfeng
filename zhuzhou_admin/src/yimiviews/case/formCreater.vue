<template>
  <div calss='wrap' style='height: 100%; background:#f0f2f5; padding: 20px;'>
    <div class="formCreater" style='height: 100%; overflow: auto;'>
      <div class="addForm">
        <el-form :label-width="'100px'" style='padding:20px; border: 1px solid #ddd;' ref="addForm" :model="addForm" :inline=true>
          <el-form-item label="表单分类">
            <dict-select
              v-model="addForm.type"
              aria-placeholder=""
              style="width:217px;"
              dict-code="bdlx"
            ></dict-select>
          </el-form-item>
          <el-form-item label="表单功能">
            <dict-select
              v-model="addForm.functionType"
              aria-placeholder=""
              style="width:217px;"
              dict-code="bdgn"
            ></dict-select>
          </el-form-item>
          <el-form-item label="表单名称">
            <el-input v-model="addForm.name" style='width: 217px;'></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style='display: flex;'>
        <div style="flex: 1;  background:#fff; margin: 20px 20px 0 0">
          <el-form :label-width="'100px'" class="b-a" :label-position="'top'" :disabled=true>
            <draggable :clone="cloneData" :list="form_list" :options="dragOptions1" >
              <transition-group class="form-list-group" type="transition" :name="'flip-list'" tag="div">
                <renders v-for="(element,index) in form_list" :key="index" :ele="element.ele" :obj="element.obj || {}"></renders>
              </transition-group>
            </draggable>
          </el-form>
        </div>
        <div style="flex: 1;  background:#fff; margin-top: 20px">
          <el-form ref="formValidate" class="b-a" :label-width="'100px'" :model="formData" @submit.native.prevent :label-position="'top'" :disabled=true style='padding-bottom: 76px;'>
            <el-alert title="警告提示的文案" type="warning" description="未绑定数据字典控件无效" show-icon>
            </el-alert>
            <draggable :list="sortable_item" :options="dragOptions2">
              <transition-group class="form-list-group" type="transition" :name="'flip-list'" tag="div">
                <renders @handleRemoveEle="removeEle" @handleConfEle="confEle" @changeVisibility="changeVisibility" v-for="(element,index) in sortable_item" :key="index" :index="index" :ele="element.ele" :obj="element.obj || {}" :data="formData" @handleChangeVal="val => handleChangeVal(val,element)" :sortableItem="sortable_item" :config-icon="true">
                </renders>
              </transition-group>
            </draggable>
          </el-form>
          <div style='margin: -56px 0 0 20px;'>
            <el-button type="primary" v-if="id==='0'" @click="handleSubmit()">新建表单</el-button>
            <el-button type="primary" v-else @click="handleSubmit()">完成编辑</el-button>
            <el-button type="ghost" @click="handleReset()" style="margin-left: 8px">清空表单</el-button>
          </div>
        </div>
      </div>
      <el-dialog :visible.sync="showModal" :title="'配置' + modalFormData.modalTitle + '属性'" :mask-closable="false" id="lg_modal">
        <el-form class="form_content" :label-width="'130px'" :model="modalFormData" ref="modalFormData">
          <el-form-item label="控件名称：" v-if="typeof modalFormData.label != 'undefined'" >
            <el-input v-model="modalFormData.label" placeholder="请输入控件名称" style = 'width: 200px;'></el-input>
          </el-form-item>
          <el-form-item label="使用接口路径：" v-if='modalFormData.type === "radio" || modalFormData.type === "checkbox" || modalFormData.items'>
            <el-radio-group id="lg_group" v-model="modalFormData.useDictionary" style="margin-top:7px;">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="接口地址：" v-if="modalFormData.useDictionary === 1">
            <el-input v-model="modalFormData.urlData" placeholder="请输入接口地址" style = 'width: 200px;'></el-input>
            <el-button type="primary" @click="handleDataDictChange" v-loading="testLoading">测试</el-button><br>
            <span :class="resultStatus ? 'lg_green' : 'lg_red'">{{testResult}}</span>
            <!-- <el-select v-model="modalFormData.dict" filterable @change="handleDataDictChange"> -->
              <!-- value绑定json字符串的原因是，需要用到parent_name，当handleDataDictChange触发，赋值到modalFormData  -->
              <!-- <el-option :disabled="dataDictSelected.indexOf(item.id) >= 0" v-for="item in dataDictList" :value="JSON.stringify({
                id: item.id, parent_name: item.parent_name, label: item.label})" :key="item.id">{{ item.label }}</el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item label="name属性：" v-if="typeof modalFormData.name != 'undefined'" >
            <el-input v-model="modalFormData.name" placeholder="" style = 'width: 200px;'></el-input>
          </el-form-item>

          <el-form-item v-if='modalFormData.useDictionary === 0 ? (modalFormData.type === "radio" || modalFormData.type === "checkbox" || modalFormData.items) : false'>
            <div id="itemList" v-for="(domain, index) in modalFormData.items" :key="domain.label_value">
              <span class="itemName">选项{{index}}：</span>
              <el-input v-model="domain.label_name" style = 'width: 200px;margin-right:5px;'></el-input>
              <el-button @click.prevent="removeDomain(domain)">删除</el-button>
            </div>
          </el-form-item>
          <el-form-item v-if='modalFormData.useDictionary === 0 ? (modalFormData.type === "radio" || modalFormData.type === "checkbox" || modalFormData.items) : false'>
            <el-button @click="addDomain">新增选项</el-button>
          </el-form-item>

          <el-form-item label="关联数据：" v-if="typeof modalFormData.relation != 'undefined'">
            <!-- 当绑定name并且当前relationList存在数据时候才可以关联字段 -->
            <el-checkbox :disabled="!modalFormData.name || !relationList.length" v-model="modalFormData.relation">是否关联字段</el-checkbox>
          </el-form-item>
          <el-form-item label="关联配置：" v-if="typeof modalFormData.relation != 'undefined' && modalFormData.relation">
            <el-select v-model="modalFormData.relation_name" class="inline-block" style="width: 150px" @on-change="_=>modalFormData.relation_value = ''">
              <el-option :disabled="item.obj.name == modalFormData.name" v-for="(item,index) in relationList" :key="index" :value="item.obj.name">{{item.obj.label}}</el-option>
            </el-select>
            <p class="inline-block padder-sm">等于</p>
            <el-select v-model="modalFormData.relation_value" class="inline-block" style="width: 150px">
              <el-option v-for="(item,index) in relationValue" :key="index" :value="item.label_value">{{item.label_name}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="placeholder：" v-if="typeof modalFormData.placeholder != 'undefined'">
            <el-input v-model="modalFormData.placeholder" placeholder="请输入placeholder" style = 'width: 200px;'></el-input>
          </el-form-item>
          <el-form-item label="最大长度：" v-if="typeof modalFormData.maxLength != 'undefined'">
            <el-input-number v-model="modalFormData.maxLength" placeholder="请输入文本限制最大长度">
            </el-input-number>
          </el-form-item>
          <el-form-item label="最大限制：" v-if="typeof modalFormData.maxSize != 'undefined'">
            <el-input-number :formatter="value => `${value}kb`" :parser="value => value.replace('kb', '')" v-model="modalFormData.maxSize" placeholder="请输入上传文件最大限制">
            </el-input-number>
          </el-form-item>
          <el-form-item label="上边距：" v-if="typeof modalFormData.marginTop != 'undefined'">
            <el-input-number :formatter="value => `${value}px`" :parser="value => value.replace('px', '')" v-model="modalFormData.marginTop" placeholder="请输入标签上边距">
            </el-input-number>
          </el-form-item>
          <el-form-item label="下边距：" v-if="typeof modalFormData.marginBottom != 'undefined'">
            <el-input-number :formatter="value => `${value}px`" :parser="value => value.replace('px', '')" v-model="modalFormData.marginBottom" placeholder="请输入标签下边距">
            </el-input-number>
          </el-form-item>
          <el-form-item label="详细地址：" v-if="typeof modalFormData.details_address != 'undefined'">
            <el-checkbox v-model="modalFormData.details_address">是否需要详细地址</el-checkbox>
          </el-form-item>
          <el-form-item label="是否必填：" v-if="typeof modalFormData.require != 'undefined'">
            <el-checkbox v-model="modalFormData.require">必填</el-checkbox>
          </el-form-item>
          <el-form-item label="校验错误：" v-if="typeof modalFormData.ruleError != 'undefined'">
            <el-input v-model="modalFormData.ruleError" placeholder="请输入校验错误提示" style = 'width: 200px;'></el-input>
          </el-form-item>
          <el-form-item label="是否多选：" v-if="typeof modalFormData.multiple != 'undefined' && modalFormData.type != 'address'">
            <el-checkbox v-model="modalFormData.multiple">多选</el-checkbox>
          </el-form-item>
          <el-form-item label="时间格式：" v-if="typeof modalFormData.format != 'undefined'">
            <el-radio-group id="lg_group" v-model="modalFormData.format">
              <el-radio label="yyyy年MM月dd日"></el-radio>
              <el-radio label="yyyy-MM-dd HH:mm"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="行内元素：" v-if="typeof modalFormData.inlineBlock != 'undefined'">
            <el-checkbox v-model="modalFormData.inlineBlock">是</el-checkbox>
          </el-form-item>
          <el-form-item label="显示行数：" v-if="typeof modalFormData.maxRows != 'undefined'">
            <el-slider v-model="modalFormData.maxRows" :min="2" :max="10"></el-slider>
          </el-form-item>
          <el-form-item label="标题大小：" v-if="typeof modalFormData.level != 'undefined'">
            <el-input-number :max="6" :min="1" v-model="modalFormData.level"></el-input-number>
          </el-form-item>
          <el-form-item label="字体颜色：" v-if="typeof modalFormData.color != 'undefined'">
            <el-color-picker v-model="modalFormData.color" />
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button type="text" @click="handleCancel">取消</el-button>
          <el-button type="primary" :loading="modalFormData.loading" @click="handleOk">确定</el-button>
        </div>
      </el-dialog>
      <!-- 预览 -->
      <el-dialog :visible.sync="renderShow">
        <div>
          <render :template_form='template_form' @closeRenderShow="closeRenderShow"></render>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import render from '@/formCreater/components/render'
import form_list from '@/formCreater/components/custom_form/FormList'
import { urlGetData } from '@/api/formCreater/formCreater'
import { readForm, postForm } from '@/api/knowledgeManage/followupForm'
import DictSelect from '@/views/form/dictSelect'
export default {
  components: { draggable, render, DictSelect },
  mounted() {
    this.id = this.$route.params.id
    if (this.id > 0) {
      readForm(this.id).then(res => {
        if (res.data.code === 200) {
          for (const key in this.addForm) {
            if (this.addForm.hasOwnProperty(key)) {
              this.addForm[key] = res.data.info[key]
            }
          }
          this.addForm.id = this.id
          this.sortable_item = JSON.parse(res.data.info.content || '[]')
        }
      })
    }
  },
  data() {
    return {
      addForm: {
        type: null,
        functionType: null,
        name: null
      },
      form_list: form_list,
      sortable_item: [],
      showModal: false,
      // 深拷贝对象，防止默认空对象被更改
      // 颜色选择器bug，对象下color不更新
      modalFormData: {
        color: '',
        loading: false
      },
      formData: {},
      dataDict: [],
      saveDictValue: {},
      // preview
      renderShow: false,
      template_form: [],
      domains: [],
      id: '',
      testLoading: false,
      testResult: '',
      resultStatus: false
    }
  },
  methods: {
    // 单选或多选  添加 删除 选项
    removeDomain(item) {
      var index = this.modalFormData.items.indexOf(item)
      if (index !== -1) {
        this.modalFormData.items.splice(index, 1)
      }
    },
    addDomain() {
      this.modalFormData.items.push({
        label_name: '',
        label_value: Date.now()
      })
    },
    closeRenderShow() {
      this.renderShow = false
    },
    // 克隆表单提交事件
    handleSubmit() {
      // 表单内容的 schema .  可以通过formSchema 的数据动态生成表单，这个是要保存到后台的
      const formSchema = JSON.stringify(this.sortable_item.filter(v => {
        return !!v.obj.name
      }))
      if (!this.addForm.functionType || !this.addForm.name || !this.addForm.type) {
        this.$message({
          showClose: true,
          message: '表单分类、表单功能、表单名称都不能为空',
          type: 'warning'
        })
        return false
      }
      if (formSchema === '[]') {
        this.$message({
          showClose: true,
          message: '无有效控件,如已有控件,请在控件设置name属性',
          type: 'warning'
        })
        return false
      }
      const query = Object.assign({}, this.addForm, { content: formSchema })
      postForm(query).then(res => {
        if (res.data.code === 200) {
          localStorage.setItem('template_form', formSchema)
          this.$message({
            message: '生成表单成功！',
            type: 'success'
          })
          this.$root.closeTag()
        }
      })
    },
    // 清空克隆表单
    handleReset() {
      this.sortable_item = []
    },
    // modal内数据字典选项发生改变触发事件
    // handleDataDictChange(val) {
    //   // 数据加载中，禁止modal_submit提交按钮
    //   this.$set(this.modalFormData, 'loading', true)
    //   this.modalFormData = Object.assign({}, this.modalFormData, {
    //     loading: false,
    //     parent_name: this.domains.parent_name
    //   })
    // },
    // modal内数据字典选项发生改变触发事件
    handleDataDictChange() {
      // 数据加载中，禁止modal_submit提交按钮
      this.testLoading = true
      urlGetData(this.modalFormData.urlData).then(res => {
        if (!res.data.code) {
          this.$message({
            message: '接口格式不正确',
            type: 'info'
          })
          return false
        }
        if (res.data.code === 200) {
          const item = JSON.parse(res.data.items)
          this.modalFormData = Object.assign({}, this.modalFormData, {
            items: item
          })
          this.testResult = '通过'
          this.resultStatus = true
        } else {
          this.testResult = res.data.msg || res.data.message
          this.resultStatus = false
        }
        this.testLoading = false
      }).catch(err => {
        this.testResult = err.message
        this.resultStatus = false
        this.testLoading = false
        return
      })
    },
    // 控件回填数据
    handleChangeVal(val, element) {
      this.$set(this.formData, element.obj.name, val)
    },
    // https://github.com/SortableJS/Vue.Draggable#clone
    // 克隆,深拷贝对象
    cloneData(original) {
      // 添加一个modal标题
      original.obj.modalTitle = original.obj.label || ''
      // 深拷贝对象，防止默认空对象被更改
      return JSON.parse(JSON.stringify(original))
    },
    // modal点击确定执行事件
    handleOk() {
      // this.handleDataDictChange()
      if (this.modalFormData.useDictionary === 0) {
        this.modalFormData.urlData = null
      }
      if (this.modalFormData.urlData) {
        if (this.resultStatus === false) {
          this.modalFormData.urlData = null
          this.modalFormData.items = []
        }
      }
      const index = this.modalFormData.listIndex
      this.modalFormData.dict = JSON.stringify(this.saveDictValue)
      this.sortable_item[index].obj = Object.assign({},
        this.sortable_item[index].obj,
        this.modalFormData
      )
      this.handleCancel()
    },
    // modal点击取消执行事件，清空当前modal内容
    handleCancel() {
      this.showModal = false
      setTimeout(_ => {
        this.modalFormData = {
          color: '',
          loading: false
        }
      }, 500)
    },
    // 显示modal,配置被克隆控件
    confEle(index) {
      const list_temp = Object.assign({}, this.sortable_item[index])
      for (const i in list_temp.obj) {
        this.modalFormData[i] = list_temp.obj[i]
      }
      // 配置项中未找到color，删除modalFormData中自带color属性
      if (!list_temp.obj['color']) delete this.modalFormData.color
      // 设置被配置控件的index，便于完成配置找到相应对象赋值
      this.modalFormData.listIndex = index
      // Vue 不能检测到对象属性的添加或删除
      this.modalFormData = Object.assign({}, this.modalFormData)
      this.showModal = true
    },
    // 删除克隆控件
    removeEle(index) {
      const name = this.sortable_item[index].obj.name
      this.sortable_item.splice(index, 1)
      if (!name) return
      for (const i in this.sortable_item) {
        // 当relation为true并且关联字段被确认
        if (this.sortable_item[i].obj.relation && this.sortable_item[i].obj.relation_name === name) {
          this.$set(this.sortable_item[i].obj, 'relation', false)
          this.$set(this.sortable_item[i].obj, 'relation_name', '')
          this.$set(this.sortable_item[i].obj, 'relation_value', '')
          break
        }
      }
    },
    // 更改当前渲染字段是否显示
    changeVisibility(index, visibility) {
      this.$set(this.sortable_item[index].obj, 'visibility', visibility)
    }
  },
  watch: {
    showModal(val) {
      if (!val) {
        this.handleCancel()
      }
    }
  },
  computed: {
    // 数据字典已选择项
    dataDictSelected() {
      return this.sortable_item.map(v => {
        const obj = JSON.parse(v.obj.dict || '{}')
        return obj.id || -1
      })
    },
    // 对应控件的数据字典
    dataDictList() {
      return this.dataDict.filter(v => {
        return v.type === this.modalFormData.type
      })
    },
    // 拖拽表单1
    dragOptions1() {
      return {
        animation: 0,
        ghostClass: 'ghost',
        // 分组
        group: {
          name: 'shared',
          pull: 'clone',
          revertClone: false
        },
        // 禁止拖动排序
        sort: false
      }
    },
    // 拖拽表单2
    dragOptions2() {
      return {
        animation: 0,
        ghostClass: 'ghost',
        group: {
          // 只允许放置shared的控件,禁止pull
          put: ['shared']
        }
      }
    },
    // 被关联字段列表
    relationList() {
      // 只有type内三项可作为被关联字段
      const type = ['select', 'radio', 'checkbox']
      const arr = this.sortable_item.filter(k => {
        return type.indexOf(k.ele) >= 0 && !!k.obj.name
      })
      return arr
    },
    // 被关联字段数据
    relationValue() {
      const name = this.modalFormData.relation_name
      let items = []
      if (!name) return items
      for (const i in this.sortable_item) {
        if (this.sortable_item[i].obj.name === name) {
          items = this.sortable_item[i].obj.items
        }
      }
      return items
    }
  }
}
</script>
<style lang = 'scss'>
.addForm {
  background: #fff;
}
.inline {
  display: inline-block;
}

.m-l-lg {
  margin-left: 30px;
}

.wrapper {
  padding: 15px;
}

.inline-block {
  display: inline-block;
}

.padder-sm {
  padding-right: 10px;
  padding-left: 10px;
}

.b-a {
  border: 1px solid #ccc;
  background: #fff;
  padding: 20px;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.form-list-group {
  min-height: 300px;
  padding: 20px !important;
}

/* 设置items下所有鼠标样式为 move */

.items,
.items * {
  cursor: move;
}

/* 配置按钮默认位置 */

/* 例如P Hr Title按钮 */

.items .item-icon {
  transition: all 2s ease;
  position: absolute;
  top: -18px;
  right: 0px;
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}

/* form控件下配置按钮位置 */

.ivu-form-item.items .item-icon {
  top: -25px;
}

/* 配置按钮样式 */

.item-icon i {
  cursor: pointer !important;
  margin-right: 5px;
}

.items:hover .item-icon {
  transition: inherit;
  opacity: 1;
  max-height: 50px;
}

/* 提交按钮下方无 margin-bottom */

.form_content .ivu-form-item:last-child {
  margin-bottom: 0;
}

/* 表单校验选项样式 */

.ivu-form-item-required .ivu-form-item-label:before {
  content: "";
}

.items.sortable-items-required .ivu-form-item-label:before {
  content: "*";
  display: inline-block;
  margin-right: 4px;
  line-height: 1;
  font-family: SimSun;
  font-size: 12px;
  color: #ed3f14;
}
#lg_group{
  display: flex;
  flex-wrap: wrap;
  label{
    margin:5px 30px 5px 0 !important;
  }
}
/* 添加选项 */
#itemList{
  margin-left:-100px;
  display:flex;
  margin-bottom:22px;

}
#itemList .itemName {
  display:inline-block;
  width:88px;
  text-align:right;
  margin-right:12px;
}
.lg_red{
  color:red;
}
.lg_green{
  color:rgb(28, 192, 159);
}
#lg_modal .el-dialog{
  min-width: 550px;
}
</style>
