<template>
  <div class="confirmWrap" v-loading="loading" :element-loading-text="loadText">
    <div slot="footer" class="dialog-footer clearfix">
      <div style="float: left; line-height: 32px;padding-left: 12px;">
        患者交接
        <!-- <span style="color: #999;font-size:12px;">基本信息补充与手术信息确认</span> -->
      </div>
      <div style="float: right;">
        <el-upload
          class="upload-demo"
          style="display: inline-block;margin-right: 10px;"
          :action="action"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :file-list="fileList"
        >
          <el-button type="primary" class="buttonRadius sumbitColor">上传</el-button>
        </el-upload>
        <el-button type="warning" class="buttonRadius saveColor" @click="downloadMsg">下载</el-button>
        <el-button type="danger" class="buttonRadius auditColor" @click="doPrint">打印</el-button>
      </div>
    </div>
    <div id="body"></div>
    <div class="registrationBox">
      <div style="width: 890px;padding: 15px 22px;">
        <p style="margin:0pt; orphans:0; text-align:center; line-height:32px;">
          <span style="font-family:宋体; font-size:18pt; font-weight:bold;">手术患者交接登记表</span>
        </p>
        <p style="font-size:10.5pt; line-height:150%; margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:13px;">科室</span>
          <span
            style="font-family:宋体; font-size:12px; border-bottom:1px solid #333;text-align:center; min-width:50px;display:inline-block;line-height: 12px;"
          >{{handoverForm.visitDepartment}}</span>
          <span style="font-family:宋体; font-size:13px;">床号</span>
          <span
            style="font-family:宋体; font-size:12px; border-bottom:1px solid #333;text-align:center; min-width:50px;display:inline-block;line-height: 12px;"
          >{{handoverForm.bedNumber}}</span>
          <span style="font-family:宋体; font-size:13px;">姓名</span>
          <span
            style="font-family:宋体; font-size:12px; border-bottom:1px solid #333;text-align:center; min-width:50px;display:inline-block;line-height: 12px;"
          >{{handoverForm.patientName}}</span>
          <span style="font-family:宋体; font-size:13px;">住院号</span>
          <span
            style="font-family:宋体; font-size:12px; border-bottom:1px solid #333;text-align:center; min-width:50px;display:inline-block;line-height: 12px;"
          >{{handoverForm.inHospNo}}</span>
          <span style="font-family:宋体; font-size:13px;">手术日期</span>
          <span
            style="font-family:宋体; font-size:12px; border-bottom:1px solid #333;text-align:center; min-width:80px;display:inline-block;line-height: 12px;"
          >{{handoverForm.schedule | fmtYMD}}</span>
          <span style="font-family:宋体; font-size:13px;">离开病房时间</span>
          <span
            style="font-family:宋体; font-size:12px; border-bottom:1px solid #333;text-align:center; min-width:80px;display:inline-block;line-height: 12px;"
          >{{handoverForm.visitDepartment}}</span>
          <span style="font-family:宋体; font-size:13px;">入手术室时间</span>
          <span
            style="font-family:宋体; font-size:12px; border-bottom:1px solid #333;text-align:center; min-width:80px;display:inline-block;line-height: 12px;"
          >{{handoverForm.visitDepartment}}</span>
          <span style="font-family:宋体; font-size:10.5pt"></span>
        </p>
        <p style="font-size:10.5pt; line-height:150%; margin:0pt 0pt 7.8pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:13px;">出手术室</span>
          <span style="font-family:Calibri; font-size:13px;">/PACU</span>
          <span style="font-family:宋体; font-size:13px;">时间：</span>
          <span
            style="font-family:宋体; font-size:12px; border-bottom:1px solid #333;text-align:center; min-width:100px;display:inline-block;line-height: 12px;"
          >{{handoverForm.visitDepartment}}</span>
          <span style="font-family:宋体; font-size:13px;">到病房时间</span>
          <span
            style="font-family:宋体; font-size:12px; border-bottom:1px solid #333;text-align:center; min-width:100px;display:inline-block;line-height: 12px;"
          >{{handoverForm.visitDepartment}}</span>
        </p>
        <table cellspacing="0" cellpadding="0" style="border-collapse:collapse; margin-left:0pt;">
          <tr style="height:18.15pt">
            <td
              rowspan="2"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.8pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">项目</span>
              </p>
            </td>
            <td
              colspan="2"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:156.6pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">内容</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">病区</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">医辅部</span>
              </p>
            </td>
            <td
              colspan="3"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:240.3pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">麻醉手术中心</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">病区</span>
              </p>
            </td>
          </tr>
          <tr style="height:18.15pt">
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">药名</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.95pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">数量</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">准备护士</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">运送人员</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.95pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">接待护士（接）</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">巡回护士（送）</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">复苏室（送）</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">护士（接）</span>
              </p>
            </td>
          </tr>
          <tr style="height:18.15pt">
            <td
              rowspan="2"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.8pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">术中药品</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.95pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.95pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:18.15pt">
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.95pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.95pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:18.15pt">
            <td
              colspan="2"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:156.45pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">影像资料（张数）</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.95pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.95pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:18.15pt">
            <td
              colspan="2"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:156.45pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">病 历</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.95pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.95pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:18.15pt">
            <td
              colspan="2"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:156.45pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">腕 带</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.95pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.95pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:18.15pt">
            <td
              colspan="2"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:156.45pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">体表标示</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.95pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.95pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:18.15pt">
            <td
              colspan="3"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:240.2pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span
                  style="font-family:宋体; font-size:10.5pt"
                >宣教（不可戴隐形眼镜、金属发夹、饰品、不可化妆、涂指甲油、贵重物品自行保管）</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.95pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:18.15pt">
            <td
              rowspan="2"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.8pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">活动假牙</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.95pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">有</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.95pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:18.15pt">
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.95pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">无</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.95pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:18.15pt">
            <td
              rowspan="2"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.8pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">皮肤</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.95pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">完好</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.95pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:18.15pt">
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.95pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">破损</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.95pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:18.15pt">
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.8pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">镇痛泵</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.95pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.95pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:18.15pt">
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.8pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">尿管</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.95pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.95pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:18.15pt">
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.8pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">引流管</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.95pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.95pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:18.15pt">
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.8pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">其他</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.95pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.95pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:18.15pt">
            <td
              colspan="2"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:156.55pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">签名</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.95pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:72.85pt"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:0pt">
            <td style="width:83.6pt; border:none"></td>
            <td style="width:83.75pt; border:none"></td>
            <td style="width:83.75pt; border:none"></td>
            <td style="width:83.7pt; border:none"></td>
            <td style="width:83.7pt; border:none"></td>
            <td style="width:83.75pt; border:none"></td>
            <td style="width:83.65pt; border:none"></td>
            <td style="width:83.7pt; border:none"></td>
            <td style="width:83.65pt; border:none"></td>
          </tr>
        </table>
        <p style="font-size:10.5pt; line-height:150%; margin:7.8pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:10.5pt">注：①病历、腕带、体表标示、皮肤栏在</span>
          <span style="font-family:宋体; font-size:10.5pt">相应位置打“</span>
          <span style="font-family:Arial; font-size:10.5pt">√</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >”，皮肤如有破损需记录。②此表由病区准备手术护士夹在病历中，手术室等科室人员核对，如有疑问立即核实。③病人出院后，此表由病房保存一年。</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { read, saveAttach } from '@/api/optReady/handover'
export default {
  name: 'completeConnect',
  data() {
    return {
      handoverForm: {
        patientName: ' ', // 姓名
        bedNumber: '', // 床号
        beforeDiagnosis: '', // 术前诊断
        anesthetistTypeShow: '', // 麻醉方式
        operationName: '', // 手术名称
        wardBedNo: '', // 床号
        inHospNo: '', // 住院号
        visitDepartment: '', // 科室
        schedule: '', // 手术日期
        appointId: ''
      },
      action: this.$store.state.app.BASE_API + '/attachment/upLoadImage',
      fileList: [],
      fileName: '',
      path: '',
      baseApi: '',
      loading: false,
      loadText: ''
    }
  },
  created() {
    this.baseApi = this.$store.state.app.BASE_API
  },
  mounted() {
    if (this.$route.params.id) {
      read(parseInt(this.$route.params.id)).then(res => {
        if (res.data.code === 200) {
          for (const key in this.handoverForm) {
            if (res.data.obj.hasOwnProperty(key)) {
              this.handoverForm[key] = res.data.obj[key]
            }
          }
        }
      })
    }
  },
  methods: {
    doPrint() {
      const printHtml = document.querySelector('.registrationBox').innerHTML
      const wind = window.open('', 'newwindow', 'height=400, width=800, top=100, left=100, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')
      wind.document.body.innerHTML = printHtml
      wind.print()
      return false
    },
    cancel() {
      this.$root.closeTag()
    },
    // 上传成功
    handleAvatarSuccess(res, file) {
      const data = {
        appointId: this.handoverForm.appointId,
        appointStatus: 12,
        attachId: null
      }
      if (res.code === 200) {
        data.attachId = res.attachment.id
        saveAttach(data).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '图片上传成功',
              type: 'success'
            })
          }
          this.loading = false
        })
      }
    },
    // 上传之前
    beforeAvatarUpload(file) {
      this.loading = true
      this.loadText = '图片上传中，请稍等...'
      const isLt2M = file.size / 1024 / 1024 < 30
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 30MB!')
      }
      return isLt2M
    },
    // 下载
    downloadMsg() {
      this.loading = true
      this.loadText = '图片下载中，请稍等...'
      var iframe = document.createElement('iframe')
      iframe.src = this.$store.state.app.BASE_API + '/patientHandOver/readAttach?appointId=' + this.handoverForm.appointId + '&appointStatus=12'
      iframe.style.display = 'none'
      document.body.appendChild(iframe)
      this.loading = false
    }
  }
}
</script>
<style lang="scss" scope>
.confirmWrap {
  height: 100%;
  background-color: #f0f2f5;
  padding: 0 15px 15px;
  .dialog-footer {
    padding: 10px 15px;
    background-color: #fff;
    margin: 0 -15px 15px;
  }
  .registrationBox {
    height: calc(100% - 86px);
    background-color: #fff;
    overflow: auto;
    > div {
      margin: 0 auto;
    }
  }
}

.buttonRadius {
  border-radius: 0;
  width: 90px;
  border: 0;
  color: #fff;
}

.sumbitColor {
  background-color: #0270f5;
}

.saveColor {
  background-color: #f5a623;
}

.auditColor {
  background-color: #ff5555;
}
</style>
