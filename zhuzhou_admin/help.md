## 分页

```html
 <complex-table 
        :columnsType= '"index"' 
        :list = 'tableList1' 
        :totalList = 'totalList1' 
        :theadList = "appointmentConfirmConst.theadList1" 
        :operationButtons = 'appointmentConfirmConst.operationButtons1' 
        @getSelectArr = 'getSelectArr' 
        @getListByPagination = 'getTableList1' 
        @operationEvent0 = 'operationEvent1_0' 
        @operationEvent1 = 'operationEvent1_1' 
        @operationEvent2 = 'operationEvent1_2' >
      </complex-table>
```

```javascript
// 通过点击分页获取数据
getTableList1(listQuery) {
  this.listQuery.page = listQuery.page
  this.listQuery.limit = listQuery.limit
  getTableList(this.listQuery).then( (res) => {
    this.tableList1 = res.data.data
  })
}
// 删除 或  取消 时   防止该页最后一条数据删除后 不获取上一页的数据
cancel(id).then( (res) => {
  if (this.tableList1.length === 1) {
    this.listQuery.page = (this.listQuery.page - 1 <= 0 ? 1 : this.listQuery.page - 1)
  }
  this.getTableList1(this.listQuery)
})

````
## 确认按钮不滚动
```html
<div class='confirmWrap'>
    <div slot="footer" class="dialog-footer clearfix">
        <div  style="float: left; 
                  line-height: 32px;
                  padding-left: 12px;">
        </div>
    </div>
    <div class="box scrollWrap" ref= 'appMain'>
    </div>
</div>
```

```javascript
mounted(){
  this.setAppMainHeight()
}
setAppMainHeight() {
        const bodyHeight = document.body.offsetHeight
        const appMainHeight = bodyHeight - 180
        this.$refs.appMain.style.height = appMainHeight + 'px'
      }
```
```css
 .scrollWrap{
      min-height: 100%;
      overflow: auto;
    }
```
## 多个组件 表单的验证 
  #### (预约登记)
```javascript
子组件
  submit() {
    let validFlag = false
    this.$refs['treatmentInfoForm'].validate((valid) => {
      if (valid) {
        validFlag = true
      }
    })
    return validFlag
  }

```
```html
父组件 提交时 需要 判断多个子组件中表单是否填写完整
<treatment-info
  ref = 'treatmentInfo'>
</treatment-info>
```
```javascript
submitForm(formName) {
  const treatmentValid = this.$refs.treatmentInfo.submit()
  this.$refs[formName].validate((valid) => {
    if (valid && treatmentValid) {
      // to do success
    }else{
      // to do err
    }
}
```
