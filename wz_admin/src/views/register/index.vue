<template>
  <div class="lg-container">
    <el-container>
      <el-header>
        <div class="w1200">
          <div class="logoBox">
            <div class="logo">
              <img src="@/assets/logo_.png" alt="">
            </div>
            <h2>注册账号</h2>
          </div>
          <!-- <div class="serviceBox">
            客服热线：400-052-5256
          </div> -->
        </div>
      </el-header>
      <el-main>
        <el-form
          id="lgRegister"
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户类型：" prop="emp_type" style="width: 250px;display: inline-block;">
            <el-select v-model="ruleForm.emp_type" style="width: 160px;" size="small" placeholder>
              <el-option label="企业" value="1" />
              <el-option label="医疗机构" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="" label-width="0" prop="company_type" style="width: 250px;margin-left: 40px;display: inline-block;">
            <el-select v-if="ruleForm.emp_type == 1" v-model="ruleForm.company_type" style="width: 160px;" size="small" placeholder>
              <el-option v-for="item in options1" :key="item.category_code" :label="item.label" :value="item.category_code" />
            </el-select>
            <el-select v-else v-model="ruleForm.company_type" style="width: 160px;" size="small" placeholder>
              <el-option v-for="item in options2" :key="item.category_code" :label="item.label" :value="item.category_code" />
            </el-select>
          </el-form-item>
          <el-form-item v-if="ruleForm.emp_type == 2" label="机构性质：" prop="org_type">
            <el-radio-group v-model="ruleForm.org_type">
              <el-radio label="1">民营</el-radio>
              <el-radio label="2">公立</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="ruleForm.org_type == 1" label="营利性质：" prop="gain_type">
            <el-radio-group v-model="ruleForm.gain_type">
              <el-radio label="1">营利</el-radio>
              <el-radio label="2">非营利</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="单位名称：" prop="company_name">
            <el-input v-model="ruleForm.company_name" placeholder="请输入营业执照上的名称" size="small" />
          </el-form-item>
          <el-form-item label="登陆账号：" prop="login_name">
            <el-input v-model="ruleForm.login_name" placeholder="登录名" size="small" />
          </el-form-item>
          <el-form-item label="设置密码：" prop="login_pwd">
            <el-input v-model="ruleForm.login_pwd" placeholder="请输入密码" size="small" />
          </el-form-item>
          <el-form-item label="确认密码：" prop="login_confirmpwd">
            <el-input v-model="ruleForm.login_confirmpwd" placeholder="请再次输入密码" size="small" />
          </el-form-item>
          <el-form-item label="联系人：" prop="link_man">
            <el-input v-model="ruleForm.link_man" placeholder="请输入您的真实姓名" size="small" />
          </el-form-item>
          <el-form-item label="手机号码：" prop="link_phone">
            <el-input v-model="ruleForm.link_phone" placeholder="请填写11位有效手机号" size="small" />
          </el-form-item>
          <!-- <el-form-item label="验证码：" prop="qrCode">
            <el-input
              v-model="ruleForm.qrCode"
              class="qrCode"
              style="width: 200px;margin-right: 10px;"
              placeholder="请输入6位验证码"
              size="small"
            />
            <el-button :disabled="isDisabled" size="small" style="width: 110px;" @click="getQrCode">{{ content }}</el-button>
          </el-form-item> -->
          <el-form-item label="业务邀请码：">
            <el-input v-model="ruleForm.invitation_code" size="small" />
          </el-form-item>
          <el-form-item label prop="isAgreement">
            <el-checkbox id="agreement" v-model="isAgreement">已阅读并同意</el-checkbox><span class="agree" @click="onAgreement">《云蜂云服注册协议》</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" :disabled="!isAgreement" @click="submitForm('ruleForm')">注册用户</el-button>
            <router-link to="/login" class="goLogin">已有账户？请登录</router-link>
          </el-form-item>
        </el-form>
      </el-main>
      <el-footer>
        <!-- <p>Copyright © 2014-2019 Hangzhou AEK. All Rights Reserved浙ICP备13028265号互联网药品信息服务资格证书(浙)－经营性－2015－0002</p> -->
      </el-footer>
    </el-container>
    <el-dialog
      id="agreementBox"
      title="注册协议"
      :visible.sync="centerDialogVisible"
      width="800px"
      center
    >
      <div>
        <p style="text-align:left;" class="MsoNormal"><span style="font-size:9px;"><strong><span style="color:#000000;">【审慎阅读】</span></strong><span style="color:#3e3e3e;">您在申请注册流程中点击同意前，应当认真阅读以下协议。</span><strong><span style="color:#000000;"><u>请您务必审慎阅读、充分理解协议中相关条款内容，其中包括：</u></span></strong></span></p>
        <p style="text-align:left;" class="MsoNormal"><span style="font-size:9px;"><span style="color:#3e3e3e;">1、</span><strong><u><span style="color:#000000;">与您约定免除或限制责任的条款；</span></u></strong></span></p>
        <p style="text-align:left;" class="MsoNormal"><span style="font-size:9px;"><span style="color:#3e3e3e;">2、</span><strong><u><span style="color:#000000;">与您约定法律适用和管辖的条款；</span></u></strong></span></p>
        <p style="text-align:left;" class="MsoNormal"><span style="font-size:9px;"><span style="color:#3e3e3e;">3、</span><strong><u><span style="color:#000000;">其他以粗体下划线标识的重要条款。</span></u></strong></span></p>
        <p style="text-align:left;" class="MsoNormal"><span style="color:#3e3e3e;"><span style="font-size:9px;">如您对协议有任何疑问，可向平台客服咨询。</span></span></p>
        <p style="text-align:left;" class="MsoNormal"><span style="font-size:9px;"><strong><span style="color:#000000;">【特别提示】</span></strong><span style="color:#3e3e3e;">当您按照注册页面提示填写信息、阅读并同意协议且完成全部注册程序后，即表示您已充分阅读、理解并接受协议的全部内容。如您因平台服务与云蜂发生争议的，适用《云蜂平台服务协议》处理。如您在使用平台服务过程中与其他用户发生争议的，依您与其他用户达成的协议处理。</span></span>
        </p>
        <p style="text-align:left;" class="MsoNormal"><strong><u><span style="color:#000000;"><span style="font-size:9px;">阅读协议的过程中，如果您不同意相关协议或其中任何条款约定，您应立即停止注册程序。</span></span></u></strong></p>
        <p class="MsoNormal" />
        <p class="MsoNormal" />
        <p style="text-align:center; margin-top: 20px;" class="p" align="center"><strong><span style="font-size:18px; ">云蜂平台服务协议</span></strong> </p>
        <p style="text-align:center;" class="p" align="center"><span style="font-size:10px;">版本生效日期：2019年08月11日</span></p>
        <p class="p" />
        <p class="17"> <strong>提示条款</strong></p>
        <p class="p"><span style="font-size:14px;">欢迎您与各云蜂平台经营者（详见定义条款）共同签署本《云蜂平台服务协议》（下称“本协议”）并使用云蜂平台服务！</span></p>
        <p class="p" />
        <p class="p"><span style="font-size:14px;">本协议为《云蜂服务协议》修订版本，自本协议发布之日起，云蜂平台各处所称“云蜂服务协议”均指本协议。</span></p>
        <p class="p" />
        <p class="p"><span style="font-size:14px;">各服务条款前所列索引关键词仅为帮助您理解该条款表达的主旨之用，不影响或限制本协议条款的含义或解释。为维护您自身权益，建议您仔细阅读各条款具体表述。</span>
        </p>
        <p class="p" />
        <p class="p"><strong>【审慎阅读】</strong><span style="font-size:14px;">您在申请注册流程中点击同意本协议之前，应当认真阅读本协议。</span><strong><u>请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款。免除或者限制责任的条款将以粗体下划线标识，您应重点阅读。</u></strong><span style="font-size:14px;">如您对协议有任何疑问，可向云蜂平台客服咨询。</span></p>
        <p class="p" />
        <p class="p"><strong>【签约动作】</strong><span style="font-size:14px;">当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，即表示您已充分阅读、理解并接受本协议的全部内容，并与云蜂达成一致，成为云蜂平台“用户”。</span><strong><u>阅读本协议的过程中，如果您不同意本协议或其中任何条款约定，您应立即停止注册程序。</u></strong>
        </p>
        <p class="p" />
        <p class="17"><strong>一、</strong> <strong>定义</strong></p>
        <p class="p" />
        <p class="p"><strong>云蜂平台</strong><span style="font-size:14px;">：指包括云蜂网（域名为</span> <span style="font-size:14px;">www.yunfen.com）。</span></p>
        <p class="p" />
        <p class="p"><strong>云蜂</strong><span style="font-size:14px;">：云蜂平台经营者的单称或合称，包括云蜂网经营者云蜂云服（杭州）科技有限公司。</span></p>
        <p class="p" />
        <p class="p"><strong>云蜂平台服务</strong><span style="font-size:14px;">：云蜂基于互联网，以包含云蜂平台网站、客户端等在内的各种形态（包括未来技术发展出现的新的服务形态）向您提供的各项服务。</span></p>
        <p class="p" />
        <p class="p"><strong>云蜂平台规则</strong><span style="font-size:14px;">：包括在所有云蜂平台规则频道内已经发布及后续发布的全部规则、解读、公告等内容以及各平台在帮派、论坛、帮助中心内发布的各类规则、实施细则、产品流程说明、公告等。</span>
        </p>
        <p class="p" />
        <p class="p"><strong>同一用户</strong><span style="font-size:14px;">：使用同一身份认证信息或经云蜂排查认定多个云蜂账户的实际控制人为同一人的，均视为同一用户。</span></p>
        <p class="p" />
        <p class="17"><strong>二、</strong> <strong>协议范围</strong></p>
        <p class="p" />
        <p class="p"><strong>2.1&nbsp;签约主体</strong></p>
        <p class="p" />
        <p class="p"><strong>【平等主体】</strong><span style="font-size:14px;">本协议由您与云蜂平台经营者共同缔结，本协议对您与云蜂平台经营者均具有合同效力。</span>
        </p>
        <p class="p" />
        <p class="p"><strong>【主体信息】</strong><span style="font-size:14px;">云蜂平台经营者是指经营云蜂平台的各法律主体，您可随时查看云蜂平台各网站首页底部公示的证照信息以确定与您履约的云蜂主体。本协议项下，</span><strong><u>云蜂平台经营者可能根据云蜂平台的业务调整而发生变更，变更后的云蜂平台经营者与您共同履行本协议并向您提供服务，云蜂平台经营者的变更不会影响您本协议项下的权益。云蜂平台经营者还有可能因为提供新的云蜂平台服务而新增，如您使用新增的云蜂平台服务的，视为您同意新增的云蜂平台经营者与您共同履行本协议。发生争议时，您可根据您具体使用的服务及对您权益产生影响的具体行为对象确定与您履约的主体及争议相对方。</u></strong>
        </p>
        <p class="p" />
        <p class="p"><strong>2.2补充协议</strong></p>
        <p class="p" />
        <p class="p"><span style="font-size:14px;">由于互联网高速发展，您与云蜂签署的本协议列明的条款并不能完整罗列并覆盖您与云蜂所有权利与义务，现有的约定也不能保证完全符合未来发展的需求。因此，</span><strong><u>云蜂平台<span style=""><span>法律声明</span></span>及</u><span style=""><span>隐私权政策</span></span><u>、云蜂平台规则均为本协议的补充协议，与本协议不可分割且具有同等法律效力。如您使用云蜂平台服务，视为您同意上述补充协议。</u></strong>
        </p>
        <p class="p" />
        <p class="17"><strong>三、</strong> <strong>账户注册与使用</strong></p>
        <p class="p" />
        <p class="p"><strong>3.1&nbsp;用户资格</strong></p>
        <p class="p" />
        <p class="p"><span style="font-size:14px;">您确认，在您开始注册程序使用云蜂平台服务前，您应当具备中华人民共和国认证的医疗器械经营许可证以及相关法律规定的行为相适应的民事行为能力。</span></p>
        <p class="p"><span style="font-size:14px;">此外，您还需确保您不是任何国家、国际组织或者地域实施的贸易限制、制裁或其他法律、规则限制的对象，否则您可能无法正常注册及使用云蜂平台服务。</span></p>
        <p class="p" />
        <p class="p"><strong>3.2&nbsp;账户说明</strong></p>
        <p class="p" />
        <p class="p"><strong>【账户获得】</strong><span style="font-size:14px;">当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，您可获得云蜂平台账户并成为云蜂平台用户。</span></p>
        <p class="p"><span style="font-size:14px;">云蜂平台只允许每位用户使用一个云蜂平台账户。如有证据证明或云蜂根据云蜂平台规则判断您存在不当注册或不当使用多个云蜂平台账户的情形，云蜂平台可采取冻结或关闭账户、取消订单、拒绝提供服务等措施，如给云蜂平台及相关方造成损失的，您还应承担赔偿责任。</span>
        </p>
        <p class="p" />
        <p class="p"><strong>【账户使用】</strong><span style="font-size:14px;">您有权使用您设置或确认的云蜂会员名、邮箱、手机号码（以下简称“账户名称”）及您设置的密码（账户名称及密码合称“账户”）登录云蜂平台。</span></p>
        <p class="p"><span style="font-size:14px;">由于您的云蜂账户关联您的公司信息及云蜂平台商业信息，您的云蜂账户仅限本公司使用。未经云蜂平台同意，您直接或间接授权第三方使用您云蜂账户或获取您账户项下信息的行为无效。如云蜂根据云蜂平台规则中约定的违约认定程序及标准判断您云蜂账户的使用可能危及您的账户安全及/或云蜂平台信息安全的，云蜂平台可拒绝提供相应服务或终止本协议。</span>
        </p>
        <p class="p" />
        <p class="p"><strong>【账户转让】</strong><span style="font-size:14px;">由于用户账户关联用户信用信息，仅当有法律明文规定、司法裁定或经云蜂同意，并符合云蜂平台规则规定的用户账户转让流程的情况下，您可进行账户的转让。您的账户一经转让，该账户项下权利义务一并转移。</span><strong><u>除此外，您的账户不得以任何方式转让，否则云蜂平台有权追究您的违约责任，且由此产生的一切责任均由您承担。</u></strong>
        </p>
        <p class="p" />
        <p class="p"><strong>【资质认证】</strong><span style="font-size:14px;">作为云蜂平台经营者，为使您更好地使用云蜂平台的各项服务，保障您的账户安全，云蜂可要求您按公司要求及我国法律规定完成资质认证。</span></p>
        <p class="p" />
        <p class="p"><strong>3.3&nbsp;注册信息管理</strong></p>
        <p class="p" />
        <p class="p"><strong>3.3.1&nbsp;真实合法</strong></p>
        <p class="p"><strong>【信息真实】</strong><span style="font-size:14px;">在使用云蜂平台服务时，您应当按云蜂平台页面的提示准确完整地提供您的信息（包括您的姓名及电子邮件地址、联系电话、联系地址等），以便云蜂或其他用户与您联系。</span><strong><u>您了解并同意，您有义务保持您提供信息的真实性及有效性。</u></strong>
        </p>
        <p class="p" />
        <p class="p"><strong>【会员名的合法性】<u>您设置的云蜂会员名不得违反国家法律法规及云蜂网规则关于会员名的管理规定，否则云蜂可回收您的云蜂会员名。</u></strong><span style="font-size:14px;">云蜂会员名的回收不影响您以邮箱、手机号码登录云蜂平台并使用云蜂平台服务。</span></p>
        <p class="p" />
        <p class="p"><strong>3.3.2&nbsp;更新维护</strong></p>
        <p class="p"><span style="font-size:14px;">您应当及时更新您提供的信息，在法律有明确规定要求云蜂作为平台服务提供者必须对部分用户（如平台卖家等）的信息进行核实的情况下，云蜂将依法不时地对您的信息进行检查核实，您应当配合提供最新、真实、完整、有效的信息。</span>
        </p>
        <p class="p">
          <strong><u>如云蜂按您最后一次提供的信息与您联系未果、您未按云蜂的要求及时提供信息、您提供的信息存在明显不实或行政司法机关核实您提供的信息无效的，您将承担因此对您自身、他人及云蜂造成的全部损失与不利后果。云蜂可向您发出询问或要求整改的通知，并要求您进行重新认证，直至中止、终止对您提供部分或全部云蜂平台服务，云蜂对此不承担责任。</u></strong>
        </p>
        <p class="p" />
        <p class="p"><strong>3.4&nbsp;账户安全规范</strong></p>
        <p class="p" />
        <p class="p"><strong>【账户安全保管义务】</strong><span style="font-size:14px;">您的账户为您自行设置并由您保管，云蜂任何时候均不会主动要求您提供您的账户密码。因此，建议您务必保管好您的账户，并确保您在每个上网时段结束时退出登录并以正确步骤离开云蜂平台。</span>
        </p>
        <p class="p"><strong><u>账户因您主动泄露或因您遭受他人攻击、诈骗等行为导致的损失及后果，云蜂并不承担责任，您应通过司法、行政等救济途径向侵权行为人追偿。</u></strong></p>
        <p class="p" />
        <p class="p"><strong>【账户行为责任自负】</strong><span style="font-size:14px;">除云蜂存在过错外，</span><strong><u>您应对您账户项下的所有行为结果（包括但不限于在线签署各类协议、发布信息、购买商品及服务及披露信息等）负责。</u></strong>
        </p>
        <p class="p" />
        <p class="p"><strong>【日常维护须知】</strong><span style="font-size:14px;">如发现任何未经授权使用您账户登录云蜂平台或其他可能导致您账户遭窃、遗失的情况，建议您立即通知云蜂，并授权云蜂将该信息同步给平台。</span><strong><u>您理解云蜂对您的任何请求采取行动均需要合理时间，且云蜂应您请求而采取的行动可能无法避免或阻止侵害后果的形成或扩大，除云蜂存在法定过错外，云蜂不承担责任。</u></strong>
        </p>
        <p class="p" />
        <p class="17"><strong>四、</strong> <strong>云蜂平台服务及规范</strong></p>
        <p class="p" />
        <p class="p"><strong>【服务概况】</strong><span style="font-size:14px;">您有权在云蜂平台上享受店铺管理、商品及/或服务的销售与推广、商品及/或服务的购买与评价、交易争议处理等服务。云蜂提供的服务内容众多，具体您可登录云蜂平台浏览。</span>
        </p>
        <p class="p" />
        <p class="p"><strong>4.1&nbsp;店铺管理</strong></p>
        <p class="p" />
        <p class="p"><strong>【店铺创建】</strong><span style="font-size:14px;">通过在云蜂网创建店铺，您可发布商品及服务信息并与其他用户达成交易。</span></p>
        <p class="p"><strong><u>基于云蜂网管理需要，您理解并认可，同一用户在云蜂网仅能开设一家店铺，云蜂可关闭您在云蜂网同时开设的其他店铺。</u></strong></p>
        <p class="p" />
        <p class="p"><strong>【店铺转让】</strong><span style="font-size:14px;">由于店铺与账户的不可分性，店铺转让实质为店铺经营者账户的转让，店铺转让的相关要求与限制请适用本协议3.2条账户转让条款。</span></p>
        <p class="p" />
        <p class="p"><strong>【店铺关停】</strong><span style="font-size:14px;">如您通过下架全部商品短暂关停您的店铺，</span><strong><u>您应当对您店铺关停前已达成的交易继续承担发货、退换货及质保维修、维权投诉处理等交易保障责任。</u></strong>
        </p>
        <p class="p"><strong><u>在您的店铺连续六周无出售中的商品的情况下，云蜂也可依据云蜂网规则关停您的店铺。</u></strong></p>
        <p class="p"><span style="font-size:14px;">依据上述约定关停店铺均不会影响您已经累积的信用。</span></p>
        <p class="p" />
        <p class="p"><strong>4.2商品及/或服务的销售与推广</strong></p>
        <p class="p" />
        <p class="p"><strong>【商品及/或服务信息发布】</strong><span style="font-size:14px;">通过云蜂提供的服务，您有权通过文字、图片、视频、音频等形式在云蜂平台上发布商品及/或服务信息、招揽和物色交易对象、达成交易。</span></p>
        <p class="p" />
        <p class="p"><strong>【禁止销售范围】</strong><span style="font-size:14px;">您应当确保您对您在云蜂平台上发布的商品及/或服务享有相应的权利，</span><strong><u>您不得在云蜂平台上销售以下商品及/或提供以下服务：</u></strong>
        </p>
        <p class="p"><strong><u>（一）国家禁止或限制的；</u></strong></p>
        <p class="p"><strong><u>（二）侵犯他人知识产权或其它合法权益的；</u></strong></p>
        <p class="p"><strong><u>（三）云蜂平台规则、公告、通知或各平台与您单独签署的协议中已明确说明不适合在云蜂平台上销售及/或提供的。</u></strong></p>
        <p class="p" />
        <p class="p"><strong>【交易秩序保障】</strong><span style="font-size:14px;">您应当遵守诚实信用原则，确保您所发布的商品及/或服务信息真实、与您实际所销售的商品或提供的服务相符，并在交易过程中切实履行您的交易承诺。</span></p>
        <p class="p"><span style="font-size:14px;">您应当维护云蜂平台市场良性竞争秩序，不得贬低、诋毁竞争对手，不得干扰云蜂平台上进行的任何交易、活动，不得以任何不正当方式提升或试图提升自身的信用度，不得以任何方式干扰或试图干扰云蜂平台的正常运作。</span>
        </p>
        <p class="p" />
        <p class="p"><strong>【促销及推广】</strong><span style="font-size:14px;">您有权自行决定商品及/或服务的促销及推广方式，云蜂亦为您提供了形式丰富的促销推广工具。</span><strong><u>您的促销推广行为应当符合国家相关法律法规及云蜂平台的要求。</u></strong>
        </p>
        <p class="p" />
        <p class="p"><strong>【依法纳税】<u>依法纳税是每一个公民、企业应尽的义务，您应对销售额/营业额超过法定免征额部分及时、足额地向税务主管机关申报纳税。</u></strong></p>
        <p class="p" />
        <p class="p"><strong>4.3商品及/或服务的购买与评价</strong></p>
        <p class="p" />
        <p class="p"><strong>【商品及/或服务的购买】</strong><span style="font-size:14px;">当您在云蜂平台购买商品及/或服务时，请您务必仔细确认所购商品的品名、价格、数量、型号、规格、尺寸或服务的时间、内容、限制性要求等重要事项，并在下单时核实您的联系地址、电话、收货人等信息。</span><strong><u>如您填写的收货人非您本人，则该收货人的行为和意思表示产生的法律后果均由您承担。</u></strong>
        </p>
        <p class="p"><span style="font-size:14px;">您的购买行为应当基于真实的消费需求，不得存在对商品或服务实施恶意购买、恶意维权等扰乱云蜂平台正常交易秩序的行为。基于维护云蜂平台交易秩序及交易安全的需要，</span><strong><u>云蜂发现上述情形时可主动执行关闭相关交易订单等操作。</u></strong>
        </p>
        <p class="p" />
        <p class="p"><strong>【评价】</strong><span style="font-size:14px;">您有权在云蜂平台提供的评价系统中对与您达成交易的其他用户商品及/或服务进行评价。</span>
        </p>
        <p class="p"><span style="font-size:14px;">您的所有评价行为应遵守云蜂平台规则的相关规定，评价内容应当客观真实，不应包含任何污言秽语、色情低俗、广告信息及法律法规与本协议列明的其他禁止性信息；您不应以不正当方式帮助他人提升信用或利用评价权利对其他用户实施威胁、敲诈勒索。</span><strong><u>云蜂可按照云蜂平台规则的相关规定对您实施上述行为所产生的评价信息进行删除或屏蔽。</u></strong>
        </p>
        <p class="p" />
        <p class="p"><strong>4.4交易争议处理</strong></p>
        <p class="p" />
        <p class="p"><strong>【交易争议处理途径】</strong><span style="font-size:14px;">您在云蜂平台交易过程中与其他用户发生争议的，您或其他用户中任何一方均有权选择以下途径解决：</span></p>
        <p class="p"><span style="font-size:14px;">（一）与争议相对方自主协商；</span></p>
        <p class="p"><span style="font-size:14px;">（二）使用云蜂平台提供的争议调处服务；</span></p>
        <p class="p"><span style="font-size:14px;">（三）请求消费者协会或者其他依法成立的调解组织调解；</span></p>
        <p class="p"><span style="font-size:14px;">（四）向有关行政部门投诉；</span></p>
        <p class="p"><span style="font-size:14px;">（五）根据与争议相对方达成的仲裁协议（如有）提请仲裁机构仲裁；</span></p>
        <p class="p"><span style="font-size:14px;">（六）向人民法院提起诉讼。</span></p>
        <p class="p" />
        <p class="p"><strong>【平台调处服务】</strong><span style="font-size:14px;">如您依据云蜂平台规则使用云蜂平台的争议调处服务，则表示您认可并愿意履行云蜂平台的客服或大众评审员（“调处方”）作为独立的第三方根据其所了解到的争议事实并依据云蜂平台规则所作出的调处决定（包括调整相关订单的交易状态、判定将争议款项的全部或部分支付给交易一方或双方等）。在云蜂平台调处决定作出前，您可选择上述（三）、（四）、（五）、（六）途径（下称“其他争议处理途径”）解决争议以中止云蜂平台的争议调处服务。</span>
        </p>
        <p class="p"><strong><u>如您对调处决定不满意，您仍有权采取其他争议处理途径解决争议，但通过其他争议处理途径未取得终局决定前，您仍应先履行调处决定。</u></strong></p>
        <p class="p" />
        <p class="p"><strong>4.5费用</strong></p>
        <p class="p" />
        <p class="p"><span style="font-size:14px;">云蜂为云蜂平台向您提供的服务付出了大量的成本，除云蜂平台明示的收费业务外，云蜂向您提供的服务目前是免费的。如未来云蜂向您收取合理费用，云蜂会采取合理途径并以足够合理的期限提前通过法定程序并以本协议第八条约定的方式通知您，确保您有充分选择的权利。</span>
        </p>
        <p class="p" />
        <p class="p"><strong>4.6责任限制</strong></p>
        <p class="p" />
        <p class="p">
          <strong>【不可抗力及第三方原因】<u>云蜂依照法律规定履行基础保障义务，但对于下述原因导致的合同履行障碍、履行瑕疵、履行延后或履行内容变更等情形，云蜂并不承担相应的违约责任：</u></strong></p>
        <p class="p"><strong><u>（一）因自然灾害、罢工、暴乱、战争、政府行为、司法行政命令等不可抗力因素；</u></strong></p>
        <p class="p"><strong><u>（二）因电力供应故障、通讯网络故障等公共服务因素或第三人因素；</u></strong></p>
        <p class="p"><strong><u>（三）在云蜂已尽善意管理的情况下，因常规或紧急的设备与系统维护、设备与系统故障、网络信息与数据安全等因素。</u></strong></p>
        <p class="p" />
        <p class="p"><strong>【海量信息】</strong><span style="font-size:14px;">云蜂仅向您提供云蜂平台服务，您了解云蜂平台上的信息系用户自行发布，且可能存在风险和瑕疵。云蜂将通过依法建立相关检查监控制度尽可能保障您在云蜂平台上的合法权益及良好体验。同时，</span><strong><u>鉴于云蜂平台具备存在海量信息及信息网络环境下信息与实物相分离的特点，云蜂无法逐一审查商品及/或服务的信息，无法逐一审查交易所涉及的商品及/或服务的质量、安全以及合法性、真实性、准确性，对此您应谨慎判断。</u></strong>
        </p>
        <p class="p" />
        <p class="p"><strong>【调处决定】</strong><span style="font-size:14px;">您理解并同意，在争议调处服务中，云蜂平台的客服、大众评审员并非专业人士，仅能以普通人的认知对用户提交的凭证进行判断。因此，</span><strong><u>除存在故意或重大过失外，调处方对争议调处决定免责。</u></strong>
        </p>
        <p class="p" />
        <p class="17"><strong>五、</strong> <strong>用户信息的保护及授权</strong></p>
        <p class="p" />
        <p class="p"><strong>5.1信息的保护</strong></p>
        <p class="p" />
        <p class="p"><span style="font-size:14px;">云蜂非常重视用户信息（即能够独立或与其他信息结合后识别用户身份的信息）的保护，在您使用云蜂提供的服务时，您同意云蜂按照在云蜂平台上公布的隐私权政策收集、存储、使用、披露和保护您的信息。</span><strong><u>如平台网站或客户端未设独立隐私权政策但使用了云蜂网账号登陆相应网站或客户端的，为保护您的隐私权，我们将参照适用云蜂网隐私权政策的要求对您的信息进行收集、存储、使用、披露和保护。</u></strong><span style="font-size:14px;">云蜂希望通过隐私权政策向您清楚地介绍云蜂对您信息的处理方式，因此云蜂建议您完整地阅读隐私权政策，以帮助您更好地保护您的隐私权。</span></p>
        <p class="p" />
        <p class="p"><strong>5.2信息的保证与授权</strong></p>
        <p class="p" />
        <p class="p"><strong>【信息的发布】</strong><span style="font-size:14px;">您声明并保证，您对您所发布的信息拥有相应、合法的权利。否则，</span><strong><u>云蜂可对您发布的信息依法或依本协议进行删除或屏蔽。</u></strong>
        </p>
        <p class="p" />
        <p class="p"><strong>【禁止性信息】<u>您应当确保您所发布的信息不包含以下内容：</u></strong></p>
        <p class="p"><strong><u>（一）违反国家法律法规禁止性规定的；</u></strong></p>
        <p class="p"><strong><u>（二）政治宣传、封建迷信、淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；</u></strong></p>
        <p class="p"><strong><u>（三）欺诈、虚假、不准确或存在误导性的；</u></strong></p>
        <p class="p"><strong><u>（四）侵犯他人知识产权或涉及第三方商业秘密及其他专有权利的；</u></strong></p>
        <p class="p"><strong><u>（五）侮辱、诽谤、恐吓、涉及他人隐私等侵害他人合法权益的；</u></strong></p>
        <p class="p"><strong><u>（六）存在可能破坏、篡改、删除、影响云蜂平台任何系统正常运行或未经授权秘密获取云蜂平台及其他用户的数据、个人资料的病毒、木马、爬虫等恶意软件、程序代码的；</u></strong>
        </p>
        <p class="p"><strong><u>（七）其他违背社会公共利益或公共道德或依据相关云蜂平台协议、规则的规定不适合在云蜂平台上发布的。</u></strong></p>
        <p class="p" />
        <p class="p"><strong>【授权使用】</strong><span style="font-size:14px;">对于您提供、发布及在使用云蜂平台服务中形成的除信息外的文字、图片、视频、音频等信息，</span><strong><u>在法律规定的保护期限内您免费授予云蜂及其关联公司获得全球排他的许可使用权利及再授权给其他第三方使用并可以自身名义对第三方侵权行为取证及提起诉讼的权利。您同意云蜂及其关联公司存储、使用、复制、修订、编辑、发布、展示、翻译、分发您的信息或制作其派生作品，并以已知或日后开发的形式、媒体或技术将上述信息纳入其它作品内。</u></strong>
        </p>
        <p class="p"><span style="font-size:14px;">为方便您使用平台等其他相关服务，</span><strong><u>您授权云蜂将您在账户注册和使用云蜂平台服务过程中提供、形成的信息传递给平台等其他相关服务提供者，或从平台等其他相关服务提供者获取您在注册、使用相关服务期间提供、形成的信息。</u></strong>
        </p>
        <p class="p" />
        <p class="17"><strong>六、</strong> <strong>用户的违约及处理</strong></p>
        <p class="p" />
        <p class="p"><strong>6.1&nbsp;违约认定</strong></p>
        <p class="p" />
        <p class="p"><span style="font-size:14px;">发生如下情形之一的，视为您违约：</span></p>
        <p class="p"><span style="font-size:14px;">（一）使用云蜂平台服务时违反有关法律法规规定的；</span></p>
        <p class="p"><span style="font-size:14px;">（二）违反本协议或本协议补充协议（即本协议第2.2条）约定的。</span></p>
        <p class="p"><span style="font-size:14px;">为适应电子商务发展和满足海量用户对高效优质服务的需求，您理解并同意，</span><strong><u>云蜂可在云蜂平台规则中约定违约认定的程序和标准。如：云蜂可依据您的用户数据与海量用户数据的关系来认定您是否构成违约；您有义务对您的数据异常现象进行充分举证和合理解释，否则将被认定为违约。</u></strong>
        </p>
        <p class="p" />
        <p class="p"><strong>6.2&nbsp;违约处理措施</strong></p>
        <p class="p" />
        <p class="p"><strong>【信息处理】</strong><span style="font-size:14px;">您在云蜂平台上发布的信息构成违约的，</span><strong><u>云蜂可根据相应规则立即对相应信息进行删除、屏蔽处理或对您的商品进行下架、监管。</u></strong>
        </p>
        <p class="p" />
        <p class="p"><strong>【行为限制】</strong><span style="font-size:14px;">您在云蜂平台上实施的行为，或虽未在云蜂平台上实施但对云蜂平台及其用户产生影响的行为构成违约的，云蜂</span><strong><u>可依据相应规则对您执行账户扣分、限制参加营销活动、中止向您提供部分或全部服务、划扣违约金等处理措施。如您的行为构成根本违约的，云蜂可查封您的账户，终止向您提供服务。</u></strong>
        </p>
        <p class="p" />
        <p class="p"><strong>【中信电子钱包账户处理】</strong><span style="font-size:14px;">当您违约的同时存在欺诈、售假、盗用他人账户等特定情形或您存在危及他人交易安全或账户安全风险时，</span><strong><u>云蜂会依照您行为的风险程度指示中信银行对您的中信电子钱包采取取消收款、资金止付等强制措施。</u></strong>
        </p>
        <p class="p" />
        <p class="p"><strong>【处理结果公示】<u>云蜂可将对您上述违约行为处理措施信息以及其他经国家行政或司法机关生效法律文书确认的违法信息在云蜂平台上予以公示。</u></strong></p>
        <p class="p" />
        <p class="p"><strong>6.3赔偿责任</strong></p>
        <p class="p" />
        <p class="p">
          <strong><u>如您的行为使云蜂及/或其关联公司遭受损失（包括自身的直接经济损失、商誉损失及对外支付的赔偿金、和解款、律师费、诉讼费等间接经济损失），您应赔偿云蜂其关联公司的上述全部损失。</u></strong>
        </p>
        <p class="p"><strong><u>如您的行为使云蜂或其关联公司遭受第三人主张权利，云蜂及其关联公司可在对第三人承担金钱给付等义务后就全部损失向您追偿。</u></strong></p>
        <p class="p" />
        <p class="p"><strong>6.4特别约定</strong></p>
        <p class="p" />
        <p class="p"><strong>【商业贿赂】</strong><span style="font-size:14px;">如您向云蜂及其关联公司的雇员或顾问等提供实物、现金、现金等价物、劳务、旅游等价值明显超出正常商务洽谈范畴的利益，则可视为您存在商业贿赂行为。</span><strong><u>发生上述情形的，云蜂可立即终止与您的所有合作并向您收取违约金及赔偿金</u></strong><span style="font-size:14px;">，该等金额以云蜂因您的贿赂行为而遭受的经济损失和商誉损失作为计算依据。</span></p>
        <p class="p" />
        <p class="p">
          <strong>【关联处理】<u>如您因严重违约导致云蜂终止本协议时，出于维护平台秩序及保护消费者权益的目的，云蜂及其关联公司可对与您在其他协议项下的合作采取中止甚或终止协议的措施，并以本协议第八条约定的方式通知您。</u></strong>
        </p>
        <p class="p">
          <strong><u>如云蜂与您签署的其他协议及云蜂及其关联公司与您签署的协议中明确约定了对您在本协议项下合作进行关联处理的情形，则云蜂出于维护平台秩序及保护消费者权益的目的，可在收到指令时中止甚至终止协议，并以本协议第八条约定的方式通知您。</u></strong>
        </p>
        <p class="p" />
        <p class="17"><strong>七、</strong> <strong>协议的变更</strong></p>
        <p class="p" />
        <p class="p"><span style="font-size:14px;">云蜂可根据国家法律法规变化及维护交易秩序、保护消费者权益需要，不时修改本协议、补充协议，变更后的协议、补充协议（下称“变更事项”）将通过法定程序并以本协议第八条约定的方式通知您。</span>
        </p>
        <p class="p"><span style="font-size:14px;">如您不同意变更事项，您有权于变更事项确定的生效日前联系云蜂反馈意见。如反馈意见得以采纳，云蜂将酌情调整变更事项。</span></p>
        <p class="p">
          <strong><u>如您对已生效的变更事项仍不同意的，您应当于变更事项确定的生效之日起停止使用云蜂平台服务，变更事项对您不产生效力；如您在变更事项生效后仍继续使用云蜂平台服务，则视为您同意已生效的变更事项。</u></strong>
        </p>
        <p class="p" />
        <p class="17"><strong>八、</strong> <strong>通知</strong></p>
        <p class="p" />
        <p class="p"><strong>8.1有效联系方式</strong></p>
        <p class="p"><span style="font-size:14px;">您在注册成为云蜂平台用户，并接受云蜂平台服务时，您应该向云蜂提供真实有效的联系方式（包括您的电子邮件地址、联系电话、联系地址等），对于联系方式发生变更的，您有义务及时更新有关信息，并保持可被联系的状态。</span>
        </p>
        <p class="p"><span style="font-size:14px;">您在注册云蜂平台用户时生成的用于登陆云蜂平台接收站内信、系统消息也作为您的有效联系方式。</span></p>
        <p class="p"><strong><u>云蜂将向您的上述联系方式的其中之一或其中若干向您送达各类通知，而此类通知的内容可能对您的权利义务产生重大的有利或不利影响，请您务必及时关注。</u></strong></p>
        <p class="p"><span style="font-size:14px;">您有权通过您注册时填写的手机号码或者电子邮箱获取您感兴趣的商品广告信息、促销优惠等商业性信息；</span><strong><u>您如果不愿意接收此类信息，您有权通过云蜂提供的相应的退订功能进行退订。</u></strong>
        </p>
        <p class="p" />
        <p class="p"><strong>8.2&nbsp;通知的送达</strong></p>
        <p class="p"><span style="font-size:14px;">云蜂通过上述联系方式向您发出通知，其中以电子的方式发出的书面通知，包括但不限于在云蜂平台公告，向您提供的联系电话发送手机短信，向您提供的电子邮件地址发送电子邮件，向您的账号发送系统消息以及站内信信息，在发送成功后即视为送达；以纸质载体发出的书面通知，按照提供联系地址交邮后的第五个自然日即视为送达。</span>
        </p>
        <p class="p"><span style="font-size:14px;">对于在云蜂平台上因交易活动引起的任何纠纷，您同意司法机关（包括但不限于人民法院）可以通过手机短信、电子邮件等现代通讯方式或邮寄方式向您送达法律文书（包括但不限于诉讼文书）。您指定接收法律文书的手机号码、电子邮箱等联系方式为您在云蜂平台注册、更新时提供的手机号码、电子邮箱联系方式，司法机关向上述联系方式发出法律文书即视为送达。您指定的邮寄地址为您的法定联系地址或您提供的有效联系地址。</span>
        </p>
        <p class="p"><span style="font-size:14px;">您同意司法机关可采取以上一种或多种送达方式向您达法律文书，司法机关采取多种方式向您送达法律文书，送达时间以上述送达方式中最先送达的为准。</span></p>
        <p class="p"><span style="font-size:14px;">您同意上述送达方式适用于各个司法程序阶段。如进入诉讼程序的，包括但不限于一审、二审、再审、执行以及督促程序等。</span></p>
        <p class="p"><span style="font-size:14px;">你应当保证所提供的联系方式是准确、有效的，并进行实时更新。如果因提供的联系方式不确切，或不及时告知变更后的联系方式，使法律文书无法送达或未及时送达，由您自行承担由此可能产生的法律后果。</span>
        </p>
        <p class="p" />
        <p class="17"><strong>九、</strong> <strong>协议的终止</strong></p>
        <p class="p" />
        <p class="p"><strong>9.1&nbsp;终止的情形</strong></p>
        <p class="p" />
        <p class="p"><strong>【用户发起的终止】</strong><span style="font-size:14px;">您有权通过以下任一方式终止本协议：</span></p>
        <p class="p"><span style="font-size:14px;">（一）在满足云蜂网的账户注销条件时注销您的账户的；</span></p>
        <p class="p"><span style="font-size:14px;">（二）变更事项生效前您停止使用并明示不愿接受变更事项的；</span></p>
        <p class="p"><span style="font-size:14px;">（三）您明示不愿继续使用云蜂平台服务，且符合云蜂网终止条件的。</span></p>
        <p class="p" />
        <p class="p"><strong>【云蜂发起的终止】</strong><span style="font-size:14px;">出现以下情况时，云蜂可以本协议第八条的所列的方式通知您终止本协议：</span></p>
        <p class="p"><span style="font-size:14px;">（一）您违反本协议约定，云蜂依据违约条款终止本协议的；</span></p>
        <p class="p"><span style="font-size:14px;">（二）您盗用他人账户、发布违禁信息、骗取他人财物、售假、扰乱市场秩序、采取不正当手段谋利等行为，云蜂依据云蜂平台规则对您的账户予以查封的；</span></p>
        <p class="p"><span style="font-size:14px;">（三）除上述情形外，因您多次违反云蜂平台规则相关规定且情节严重，云蜂依据云蜂平台规则对您的账户予以查封的；</span></p>
        <p class="p"><span style="font-size:14px;">（四）您的账户被云蜂依据本协议回收的；</span></p>
        <p class="p"><span style="font-size:14px;">（五）您云蜂平台有欺诈、发布或销售假冒伪劣/侵权商品、侵犯他人合法权益或其他严重违法违约行为的；</span></p>
        <p class="p"><span style="font-size:14px;">（六）其它应当终止服务的情况。</span></p>
        <p class="p" />
        <p class="p"><strong>9.2&nbsp;协议终止后的处理</strong></p>
        <p class="p" />
        <p class="p"><strong>【用户信息披露】<u>本协议终止后，除法律有明确规定外，云蜂无义务向您或您指定的第三方披露您账户中的任何信息。</u></strong></p>
        <p class="p" />
        <p class="p"><strong>【云蜂权利】</strong><span style="font-size:14px;">本协议终止后，云蜂仍享有下列权利：</span></p>
        <p class="p"><span style="font-size:14px;">（一）继续保存您留存于云蜂平台的本协议第五条所列的各类信息；</span></p>
        <p class="p"><span style="font-size:14px;">（二）对于您过往的违约行为，云蜂仍可依据本协议向您追究违约责任。</span></p>
        <p class="p" />
        <p class="p">
          <strong>【交易处理】<u>本协议终止后，对于您在本协议存续期间产生的交易订单，云蜂可通知交易相对方并根据交易相对方的意愿决定是否关闭该等交易订单；如交易相对方要求继续履行的，则您应当就该等交易订单继续履行本协议及交易订单的约定，并承担因此产生的任何损失或增加的任何费用。</u></strong>
        </p>
        <p class="17" />
        <p class="p"><strong>十、</strong> <strong>法律适用、管辖与其他</strong></p>
        <p class="p" />
        <p class="p"><strong>【法律适用】<u>本协议之订立、生效、解释、修订、补充、终止、执行与争议解决均适用中华人民共和国大陆地区法律；如法律无相关规定的，参照商业惯例及/或行业惯例。</u></strong>
        </p>
        <p class="p" />
        <p class="p"><strong>【管辖】<u>您因使用云蜂平台服务所产生及与云蜂平台服务有关的争议，由云蜂与您协商解决。协商不成时，任何一方均可向被告所在地有管辖权的人民法院提起诉讼。</u></strong></p>
        <p class="p" />
        <p class="p"><strong>【可分性】</strong><span style="font-size:14px;">本协议任一条款被视为废止、无效或不可执行，该条应视为可分的且并不影响本协议其余条款的有效性及可执行性。</span></p>
        <p class="p" />
        <p class="p" />
        <p class="MsoNormal" />
        <p class="MsoNormal" />
        <p style="text-align:center;" class="p" align="center"><strong><span style="color:#000000;"><span style="font-size:18px;">隐私权政策</span></span></strong></p>
        <p style="text-align:right;text-indent:2em;" class="p" align="right" />
        <p style="text-align:right;text-indent:2em;" class="p" align="right"><span style="font-size:14px;"><span style="color:#000000;">最近更新日期：</span>2019<span style="color:#000000;">年</span>8<span style="color:#000000;">月</span>11<span style="color:#000000;">日</span></span></p>
        <p style="text-align:right;text-indent:2em;" class="p" align="right" />
        <p class="p"><strong><span style="color:#000000;"><span style="font-size:14.5px;">提示条款</span></span></strong></p>
        <p style="text-indent:2em;" class="p" />
        <p style="text-indent:2em;" class="p"><span style="font-size:14px;"><span style="color:#000000;">您的信任对我们非常重要，我们深知公司信息对您的重要性，我们将按法律法规要求，采取相应安全保护措施，尽力保护您的公司信息安全可控。鉴于此，云蜂网服务提供者（或简称“我们”）制定本《隐私权政策》（下称“本政策</span>&nbsp;/<span style="color:#000000;">本隐私权政策”）并提醒您：</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">本政策适用于云蜂网提供的所有产品和服务。</span><strong><u>如我们及关联公司（范围详见定义部分）的产品或服务中使用了云蜂网提供的产品或服务（例如使用云蜂平台账户登录）但未设独立隐私权政策的，则本政策同样适用于该部分产品或服务。我们及关联公司就其向您提供的产品或服务单独设立有隐私权政策的，则相应产品或服务适用相应隐私权政策。</u></strong></span>
        </p>
        <p class="p"> <span style="color:#000000;"><span style="font-size:14px;">需要特别说明的是，</span><strong><u>本政策不适用于其他第三方向您提供的服务，也不适用于云蜂网中已另行独立设置隐私权政策的产品或服务。</u></strong><span style="font-size:14px;">例如云蜂网上的卖家依托云蜂网向您提供服务时，您向卖家提供的个人信息不适用本政策。</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><strong><u>在使用云蜂网各项产品或服务前，请您务必仔细阅读并透彻理解本政策，特别是以粗体/粗体下划线标识的条款，您应重点阅读，在确认充分理解并同意后再开始使用。</u></strong></span><span style="font-size:14px;"><span style="color:#000000;">如对本政策内容有任何疑问、意见或建议，您可通过云蜂网提供的各种</span>联系方式<span style="color:#000000;">与我们联系。</span></span></p>
        <p class="p" />
        <p class="p"><strong><span style="color:#000000;"><span style="font-size:14.5px;">第一部分</span></span></strong>
          <strong><span style="color:#000000;"><span style="font-size:14.5px;">定义</span></span></strong></p>
        <p class="p"><br></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><strong>云蜂网：</strong></span><span style="font-size:14px;"><span style="color:#000000;">指云蜂网（域名为</span>www.yunfen.com<span style="color:#000000;">）网站及云蜂客户端。</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><strong>云蜂网服务提供者：</strong><span style="font-size:14px;">指云蜂网的互联网信息及软件技术服务提供者云蜂云服（杭州）科技有限公司。</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><strong>公司信息：</strong><span style="font-size:14px;">指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定公司或者反映特定公司活动情况的各种信息。</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><strong>敏感信息：</strong>指</span><span style="font-size:14px;"><span style="color:#000000;">包括身份证件号码、个人生物识别信息、银行账号、财产信息、行踪轨迹、交易信息、</span>14</span><span style="color:#000000;"><span style="font-size:14px;">岁以下（含）儿童信息等的个人信息（我们将在本隐私权政策中对具体个人敏感信息以</span><strong>粗体</strong><span style="font-size:14px;">进行显著标识）。</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><strong>个人信息删除：</strong><span style="font-size:14px;">指在实现日常业务功能所涉及的系统中去除个人信息的行为，使其保持不可被检索、访问的状态。</span></span></p>
        <p class="p" />
        <p class="p"><strong><span style="color:#000000;"><span style="font-size:14.5px;">第二部分</span></span></strong>
          <strong><span style="color:#000000;"><span style="font-size:14.5px;">隐私权政策</span></span></strong></p>
        <p style="text-indent:2em;" class="p" />
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">本隐私权政策部分将帮助您了解以下内容：</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">一、我们如何收集和使用您的信息</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">二、我们如何使用Cookie和同类技术</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">三、我们如何共享、转让、公开披露您的信息</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">四、我们如何保护您的信息</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">五、您如何管理您的信息</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">六、我们如何处理未成年人的信息</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">七、您的信息如何在全球范围转移</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">八、本隐私权政策如何更新</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">九、如何联系我们</span></span></p>
        <p class="p" />
        <p class="p"><strong><span style="color:#000000;">一、&nbsp;我们如何收集和使用您的信息</span></strong></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">在您使用我们的产品及/或服务时，我们需要/可能需要收集和使用的您的个人信息包括如下两种：</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">1、</span></span><strong>为实现向您提供我们产品及/或服务的基本功能，您须授权我们收集、使用的必要的信息。如您拒绝提供相应信息，您将无法正常使用我们的产品及/或服务；</strong>
        </p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">2、</span></span><strong>为实现向您提供我们产品及/或服务的附加功能，您可选择授权我们收集、使用的信息。如您拒绝提供，您将无法正常使用相关附加功能或无法达到我们拟达到的功能效果，但并不会影响您正常使用我们产品及/或服务的基本功能。</strong>
        </p>
        <p style="text-indent:2em;" class="p"><strong><u>您理解并同意：</u></strong></p>
        <p style="text-indent:2em;" class="p">
          <strong>1、<u>我们致力于打造多样的产品和服务以满足您的需求。因我们向您提供的产品和服务种类众多，且不同用户选择使用的具体产品/服务范围存在差异，相应的，基本/附加功能及收集使用的个人信息类型、范围等会有所区别，请以具体的产品/服务功能为准</u>；</strong>
        </p>
        <p style="text-indent:2em;" class="p">
          <strong>2、<u>为给您带来更好的产品和服务体验，我们在持续努力改进我们的技术，随之我们可能会不时推出新的或优化后的功能，可能需要收集、使用新的个人信息或变更个人信息使用目的或方式。对此，我们将通过更新本政策、弹窗、页面提示等方式另行向您说明对应信息的收集目的、范围及使用方式，并为您提供自主选择同意的方式，且在征得您明示同意后收集、使用</u>。</strong><span style="font-size:14px;"><span style="color:#000000;">在此过程中，如果您有任何疑问、意见或建议的，您可通过云蜂网提供的各种</span>联系方式<span style="color:#000000;">与我们联系，我们会尽快为您作出解答。</span></span></p>
        <p style="text-indent:2em;" class="p"><br></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">我们会为实现本政策下述的各项功能，收集和使用您的个人信息：</span></span></p>
        <p style="text-indent:2em;" class="p"><strong><span style="color:#000000;">（一）&nbsp;帮助您成为我们的会员</span></strong></p>
        <p style="text-indent:2em;" class="p"><strong><span style="color:#000000;">1、基础会员服务</span></strong></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">我们通过云蜂平台账户为您提供基础会员服务。为注册成为会员并使用我们的会员服务，您需要提供</span><strong>手机号码、拟使用的会员名和密码</strong><span style="font-size:14px;">用于创建云蜂平台账户。如果您仅需使用浏览、搜索服务，您不需要注册成为我们的会员及提供上述信息。</span></span></p>
        <p style="text-indent:2em;" class="p"><strong><u><span style="color:#000000;">对于需要通过云蜂平台账户才能使用的服务，我们可能会根据您提供的上述信息校验您的会员身份，确保我们是在为您本人提供服务。</span></u></strong>
        </p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">我们会根据您的会员账户使用情况及平台设置的会员等级计算规则确定您当前的会员等级，并为您提供相应会员等级所对应的基本权益。</span></span></p>
        <p style="text-indent:2em;" class="p"><br></p>
        <p style="text-indent:2em;" class="p"><strong><span style="color:#000000;"><span style="font-size:14px;">2</span>、附加会员服务</span></strong></p>
        <p style="text-indent:2em;" class="p"><span style="font-size:14px;">实人认证：您可以根据认证要求向我们提供相应的</span><strong>身份信息（身份证、护照、户口本及其他身份证件信息）</strong><span style="font-size:14px;">以完成认证。</span></p>
        <p style="text-indent:2em;" class="p"><span style="font-size:14px;"><span style="color:#000000;">授权登录：</span>我们可能经您同意后向第三方共享您的账户信息（头像、昵称及其他页面提示的信息），使您可以便捷地实现第三方账户的注册或登录。此外，我们可能会根据您的授权从第三方处获取您的第三方账户信息，并与您的云蜂平台账户进行绑定，使您可通过第三方账户直接登录、使用我们的产品及/或服务。我们将在您授权同意的范围内使用您的相关信息。</span>
        </p>
        <p style="text-indent:2em;" class="p"><strong><u><span style="color:#000000;">其他会员角色服务：如果您申请注册成为卖家、服务商或其他存在额外身份认证要求的会员角色，您需主动向我们提供身份信息及/或企业相关信息，用于您身份及特殊会员角色获取资格的核验、登记、公示及其他我们明确告知的目的。</span></u></strong>
        </p>
        <p style="text-indent:2em;" class="p"><br></p>
        <p style="text-indent:2em;" class="p"><strong><u><span style="color:#000000;">3、账户信息展示：如果您已拥有云蜂平台账户，我们可能会在云蜂平台服务中显示您的上述信息，以及您在云蜂平台上或与云蜂平台账户相关联的产品和服务中执行的操作，包括通过云蜂平台账户集中展示您的个人资料、优惠权益、交易订单。我们会尊重您对云蜂平台服务和云蜂平台账户设置所做的选择。</span></u></strong>
        </p>
        <p style="text-indent:2em;" class="p"><br></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">（二）</span></span>
          <span style="color:#000000;"><strong>为您提供商品或服务信息展示</strong></span></p>
        <p style="text-indent:2em;" class="p"><span style="font-size:14px;">在您使用我们服务过程中，为识别账号异常状态、了解产品适配性、向您提供更契合您需求的页面展示和搜索结果，我们可能会自动收集您的使用情况并存储为网络日志信息，包括：</span>
        </p>
        <p class="p"><span style="font-size:14px;">&nbsp; &nbsp;
          设备信息：我们会根据您在软件安装及/或使用中的具体操作，接收并记录您所使用的设备相关信息（包括设备型号、操作系统版本、设备设置、唯一设备标识符、设备环境等软硬件特征信息）、设备所在位置相关信息（包括您授权的GPS位置以及WLAN接入点、蓝牙和基站等传感器信息）。</span>
        </p>
        <p style="text-indent:2em;" class="p"><span style="font-size:14px;">服务日志信息：当您使用我们的网站或客户端提供的产品或服务时，我们会自动收集您对我们服务的详细使用情况，作为服务日志保存，包括浏览、点击查看、搜索查询、收藏、添加至购物车、交易、售后、关注分享信息、发布信息，以及IP地址、浏览器类型、电信运营商、使用语言、访问日期和时间。</span>
        </p>
        <p style="text-indent:2em;" class="p"><strong><u>请注意，单独的设备信息、服务日志信息是无法识别特定自然人身份的信息。</u></strong><span style="font-size:14px;">如果我们将这类非个人信息与其他信息结合用于识别特定自然人身份，或者将其与个人信息结合使用，则在结合使用期间，这类非个人信息将被视为个人信息，除取得您授权或法律法规另有规定外，我们会将这类信息做匿名化、去标识化处理。</span>
        </p>
        <p style="text-indent:2em;" class="p">
          <strong><u>为向您提供更便捷、更符合您个性化需求的信息展示、搜索及推送服务，我们会根据您的设备信息和服务日志信息，提取您的偏好特征，并基于特征标签产出间接人群画像，用于展示、推送信息和可能的商业广告。</u></strong>
        </p>
        <p style="text-indent:2em;" class="p"><span style="font-size:14px;">如果您不想接受我们给您发送的商业广告，您可通过短信提示回复退订或我们提供的其他方式进行退订或关闭。在您使用我们提供的站内搜索服务时，我们也同时提供了不针对您个人特征的选项。</span>
        </p>
        <p style="text-indent:2em;" class="p"><span style="font-size:14px;">此外，我们也会为了不断改进和优化上述的功能来使用您的上述信息。</span></p>
        <p style="text-indent:2em;" class="p"><br></p>
        <p style="text-indent:2em;" class="p"><strong><span style="color:#000000;">（三）</span></strong>
          <strong>为您提供收藏、加购、关注与分享功能</strong></p>
        <p style="text-indent:2em;" class="p"><span style="font-size:14px;">在您浏览我们网站或客户端的过程中，您可以选择对感兴趣的商品及/或服务进行收藏、添加至购物车、与您感兴趣的商家/品牌/其他会员建立关注关系、通过我们提供的功能组件向其他第三方分享信息。在您使用上述功能的过程中，我们会收集包括您的收藏及添加购物车的记录、关注关系、分享历史在内的服务日志信息用于实现上述功能及<span style="color:#000000;">其他我们明确告知的目的</span>。</span></p>
        <p style="text-indent:2em;" class="p"><br></p>
        <p style="text-indent:2em;" class="p"><span style="font-size:14px;">（四）帮</span><strong>助您完成下单及订单管理</strong></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">当您在我们的产品及/或服务中订购具体商品及/或服务时，我们会通过系统为您生成购买该商品及/或服务的订单。在下单过程中,您需至少提供您的</span><strong>收货人姓名、收货地址、收货人联系电话</strong><span style="font-size:14px;">，同时该订单中会载明您所购买的商品及/或服务信息、具体订单号、订单创建时间、您应支付的金额，我们收集这些信息是为了帮助您顺利完成交易、保障您的交易安全、查询订单信息、提供客服与售后服务及其他我们明确告知的目的。</span></span>
        </p>
        <p style="text-indent:2em;" class="p"><span style="font-size:14px;">您可以通过云蜂网为其他人订购商品及/或服务，您需要提供该实际订购人的前述个人信息。</span></p>
        <p style="text-indent:2em;" class="p"><span style="font-size:14px;">为便于您了解查询订单信息并对订单信息进行管理，我们会收集您在使用我们服务过程中产生的订单信息用于向您展示及便于您对订单进行管理。</span> </p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">您可额外填写/选择包括</span><strong>其他联系电话</strong></span><span style="font-size:14px;"><span style="color:#000000;">、收货时间在内的更多附加信息以确保商品或服务的准确送达</span>。</span></p>
        <p style="text-indent:2em;" class="p" />
        <p style="text-indent:2em;" class="p"><strong><span style="color:#000000;">（五）&nbsp;帮助您完成支付&nbsp;</span></strong></p>
        <p style="text-indent:2em;" class="p"><span style="font-size:14px;">为完成订单支付，您需要提供</span><strong>中信电子钱包</strong><span style="font-size:14px;">并选择付款方式，</span><strong>我们会将您的云蜂平台账户会员名、对应的中信电子钱包、订单支付相关信息及其他反洗钱法律要求的必要信息与中信银行共享。如您选择由其他金融机构为您提供支付服务的，我们还会将您的包括银行卡号、有效期在内的银行卡支付必要信息与您选择的相应金融机构共享。</strong>
        </p>
        <p style="text-indent:2em;" class="p"><span style="font-size:14px;"><span style="color:#000000;">为</span>使我们及时获悉并确认您的<span style="color:#000000;">支付进度及状态，为您提供售后与争议解决服务，您同意我们可自您所选择的交易对象、中信银行或您选择的其他金融机构处收集与支付进度相关信息。</span></span>
        </p>
        <p style="text-indent:2em;" class="p"><br></p>
        <p style="text-indent:2em;" class="p"><strong><span style="color:#000000;">（六）&nbsp;帮助向您完成商品或服务的交付</span></strong></p>
        <p style="text-indent:2em;" class="p">
          <span style="font-size:14px;"><span style="color:#000000;">为保证您购买的商品及</span>/</span><span style="color:#000000;"><span style="font-size:14px;">或服务能够顺利、安全、准确送达，我们会向为云蜂平台提供物流信息系统和技术服务第三方物流信息公司披露</span><strong>订单相关配送信息，</strong></span><span style="font-size:14px;"><span style="color:#000000;">并由其根据商品及</span>/<span style="color:#000000;">或服务提供主体的指定向相应的物流配送主体同步相关配送信息。您知晓并同意相应物流配送主体不可避免地获知及使用您的配送信息，用于完成交付目的。</span></span>
        </p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">为使我们及时获悉并确认交付进度及状态，向您提供售后与争议解决服务，您同意我们可自物流相关服务主体处收集与交付进度相关信息。</span></span>
        </p>
        <p style="text-indent:2em;" class="p"><br></p>
        <p style="text-indent:2em;" class="p"><strong><span style="color:#000000;">（七）&nbsp;客服及争议处理</span></strong></p>
        <p style="text-indent:2em;" class="p"><span style="font-size:14px;">当您与我们联系或提出售中售后、争议纠纷处理申请时，为了保障您的账户及系统安全，</span><strong><u>我们需要您提供必要的个人信息以核验您的会员身份。</u></strong>
        </p>
        <p style="text-indent:2em;" class="p"><strong><u>为便于与您联系、尽快帮助您解决问题或记录相关问题的处理方案及结果，我们可能会保存您<span style="color:#000000;">与我们</span>的通信/通话记录及相关内容（包括账号信息、订单信息、您为了证明相关事实提供的其他信息，或您留下的联系方式信息），如果您针对具体订单进行咨询、投诉或提供建议的，我们会使用您的账号信息和订单信息。</u></strong>
        </p>
        <p style="text-indent:2em;" class="p"><span style="font-size:14px;">为了提供服务及改进服务质量的合理需要，我们还可能使用的您的其他信息，包括您与客服联系时您提供的相关信息，您参与问卷调查时向我们发送的问卷答复信息。</span>
        </p>
        <p class="p"><strong><span style="color:#000000;">&nbsp;&nbsp;（八）&nbsp;为您提供评论、问答等信息公开发布功能</span></strong></p>
        <p style="text-indent:2em;" class="p"><span style="font-size:14px;">您可通过我们为您提供的评论、分享及其他信息发布功能公开发布信息，包括作为会员可发布图文/视频/直播内容、发表评价及问答内容，以及作为卖家发布商品及/或服务相关信息、店铺相关信息。</span>
        </p>
        <p style="text-indent:2em;" class="p"><span style="font-size:14px;">我们可能会根据您的会员类型及网络日志信息判断您是否可享受对应功能权限。</span></p>
        <p style="text-indent:2em;" class="p"><strong><u><span style="color:#000000;">请注意，您公开发布的信息中可能会涉及您或他人的个人信息甚至个人敏感信息，如您在评价时选择上传包含个人信息的图片。请您更加谨慎地考虑，是否在使用我们的服务时共享甚至公开分享相关信息。</span></u></strong>
        </p>
        <p class="p" />
        <p class="p"><strong><span style="color:#000000;">&nbsp; （九）&nbsp;为您提供安全保障</span></strong></p>
        <p style="text-indent:2em;" class="p"><span style="font-size:14px;">为提高您使用我们及我们关联公司、合作伙伴提供服务的安全性，保护您或其他用户或公众的人身财产安全免遭侵害，更好地预防钓鱼网站、欺诈、网络漏洞、计算机病毒、网络攻击、网络侵入等安全风险，更准确地识别违反法律法规或云蜂网相关协议规则的情况，我们可能使用或整合您的会员信息、交易信息、设备信息、服务日志信息以及我们关联公司、合作伙伴取得您授权或依据法律共享的信息，来综合判断您账户及交易风险、进行身份验证、检测及防范安全事件，并依法采取必要的记录、审计、分析、处置措施。</span>
        </p>
        <p class="p" />
        <p class="p"> <strong><span style="color:#000000;"><span style="font-size:14px;">（十）</span></span></strong>
          <strong><span style="color:#000000;">为您提供其他附加服务</span></strong></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">为向您提供更便捷、更优质、个性化的产品及/或服务，努力提升您的体验，我们在向您提供的以下附加服务中可能会收集和使用您的个人信息。</span><strong><u>如果您不提供这些信息，不会影响您使用云蜂网的浏览、搜索等基本服务，</u></strong><span style="font-size:14px;">但您可能无法获得这些附加服务给您带来的用户体验。这些附加服务包括：</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">1、基于位置信息的个性化推荐服务：我们会在您开启位置权限后访问获取您的位置信息，根据您的位置信息为您提供更契合您需求的页面展示、产品及/或服务，比如向您推荐附近的优惠信息。</span></span>
        </p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">2、基于相机/摄像头的附加服务：您可在开启相机/摄像头权限后使用该功能进行扫码用于登录、购物、领取优惠信息，拍摄照片或视频用于评价、分享。</span></span>
        </p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">3、基于相册（图片库/视频库）的图片/视频访问及上传的附加服务：您可在开启相册权限后使用该功能上传您的照片/图片/视频，以实现更换头像、发表评论/分享、拍照购物或与客服沟通提供证明等功能</span></span><strong><span style="color:#000000;">。</span><u>我们可能会通过您所上传的照片/图片来识别您需要购买的商品或服务，或使用包含您所上传照片或图片的评论信息。</u></strong></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">4、基于麦克风的语音技术相关附加服务：您可在开启麦克风权限后使用麦克风，或与客服联系，在这些功能中我们会收集您的</span><strong>录音内容</strong><span style="font-size:14px;">以识别您的购物需求，或响应您的客服及争议处理等需求。请您知晓，</span></span><strong><u><span style="color:#000000;">即使您已同意开启麦克风权限，我们也仅会在</span>您主动点击客户端内麦克风图标或录制视频时通过麦克风获取语音信息。</u></strong></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">5、基于通讯录信息的附加服务：我们将在您开启通讯录权限后收集您的</span><strong>通讯录信息</strong><span style="font-size:14px;">使您在购物时可以更便利地取用您通讯录内的联系人信息，无需再手动输入；此外，为提升您在使用我们产品及/或服务过程中的社交互动分享乐趣，与您认识的人分享购物体验，在经您同意的前提下，我们也可能对您联系人的姓名和电话号码进行加密收集，帮助您判断您的通讯录联系人是否同为我们的会员进而在云蜂网为你们的交流建立联系，同时，会员可选择开启或关闭好友隐私权限决定自己是否可被其他会员通过手机号码搜索、联系。</span></span>
        </p>
        <p style="text-indent:2em;" class="p"><span style="font-size:14px;">6、基于日历的附加服务：在您开启我们可读取/写入您日历的权限后，我们将收集您的日历信息用于向您提供购物或领取权益相关记录及提醒。</span></p>
        <p style="text-indent:2em;" class="p" />
        <p style="text-indent:2em;" class="p"><span style="font-size:14px;">您理解并同意，上述附加服务可能需要您在您的设备中开启您的位置信息</span> <span style="font-size:14px;">（地理位置）、摄像头（相机）、相册（图片库）、麦克风（语音）、通讯录及/或日历的访问权限，以实现这些权限所涉及信息的收集和使用。</span><strong><u>请您注意，您开启任一权限即代表您授权我们可以收集和使用相关个人信息来为您提供对应服务，您一旦关闭任一权限即代表您取消了授权，我们将不再基于对应权限继续收集和使用相关个人信息，也无法为您提供该权限所对应的服务。但是，您关闭权限的决定不会影响此前基于您的授权所进行的信息收集及使用。</u></strong>
        </p>
        <p class="p" />
        <p class="p"><strong>（十一）其他</strong></p>
        <p style="text-indent:2em;" class="p"><strong><u>1、若你提供的信息中含有其他用户的信息，在向云蜂网提供这些信息之前，您需确保您已经取得合法的授权。</u></strong></p>
        <p style="text-indent:2em;" class="p">
          <strong><u>2、若我们将信息用于本政策未载明的其他用途，或者将基于特定目的收集而来的信息用于其他目的，或者我们主动从第三方处获取您的个人信息，均会事先获得您的同意。</u></strong></p>
        <p style="text-indent:2em;" class="p"><span style="font-size:14px;">若我们从第三方处间接获取您的信息的，<span style="color:#000000;">我们会在收集前明确以书面形式要求该第三方在已依法取得您同意后收集个人信息，并向您告知共享的信息内容，且涉及敏感信息的在提供给我们使用前需经过您的明确确认，要求第三方对个人信息来源的合法性和合规性作出承诺，如第三方有违反行为的，我们会明确要求对方承担相应法律责任；同时，我们的专业安全团队对个人信息会进行安全加固（包括敏感信息报备、敏感信息加密存储、访问权限控制等）。我们会使用不低于我们对自身用户个人信息同等的保护手段与措施对间接获取的个人信息进行保护。</span></span>
        </p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">3、征得授权同意的例外</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">您充分理解并同意，我们在以下情况下收集、使用您的个人信息无需您的授权同意，且我们可能不会响应您提出的更正/修改、删除、注销、撤回同意、索取信息的请求：</span></span>
        </p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">（1）与国家安全、国防安全有关的；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">（2）与公共安全、公共卫生、重大公共利益有关的；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">（3）与犯罪侦查、起诉、审判和判决执行等司法或行政执法有关的；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">（4）出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">（5）您自行向社会公众公开的个人信息；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">（6）从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道。</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">（7）根据与您签订和履行相关协议或其他书面文件所必需的；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">（8）用于维护所提供的产品及/或服务的安全稳定运行所必需的，例如发现、处置产品及/或服务的故障；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">（9）为合法的新闻报道所必需的；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">（10）学术研究机构基于公共利益开展统计或学术研究所必要，且对外提供学术研究或描述的结果时，对结果中所包含的个人信息进行去标识化处理的；</span></span>
        </p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">（11）法律法规规定的其他情形。</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">请知悉，根据适用的法律，若我们</span><strong><u>对信息采取技术措施和其他必要措施进行处理，使得数据接收方无法重新识别特定个人且不能复原</u></strong><span style="font-size:14px;">，或我们可能会对收集的信息进行去标识化地研究、统计分析和预测，用于改善云蜂网的内容和布局，为商业决策提供产品或服务支撑，以及改进我们的产品和服务，</span><strong><u>则此类处理后数据的使用无需另行向您通知并征得您的同意</u></strong><span style="font-size:14px;">。</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">4、如我们停止运营云蜂网产品或服务，我们将及时停止继续收集您个人信息的活动，将停止运营的通知以逐一送达或公告的形式通知您，并对我们所持有的与已关停业务相关的个人信息进行删除或匿名化处理。</span></span>
        </p>
        <p style="text-indent:2em;" class="p" />
        <p style="text-indent:2em;" class="p"><strong><span style="color:#000000;">二、我们如何使用</span>Cookie<span style="color:#000000;">和同类技术</span></strong></p>
        <p style="text-indent:2em;" class="p"><br></p>
        <p style="text-indent:2em;" class="p"><strong><span style="color:#000000;">（一）</span>Cookie</strong></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">为确保网站正常运转、为您获得更轻松的访问体验、向您推荐您可能感兴趣的内容，我们会在您的计算机或移动设备上存储Cookie、Flash
          Cookie，或浏览器（或关联应用程序）提供的其他通常包含标识符、站点名称以及一些号码和字符的本地存储（统称“Cookie”）。借助于
          Cookie，网站能够存储您的偏好或购物车内的商品等数据。</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><strong><u>如果您的浏览器或浏览器附加服务允许，您可修改对Cookie的接受程度或拒绝我们的Cookie。</u></strong><span style="font-size:14px;">有关详情，请参见
          AboutCookies.org。但如果您这么做，在某些情况下可能会影响您安全访问我们的网站，且可能需要在每一次访问我们的网站时更改用户设置。</span></span></p>
        <p style="text-indent:2em;" class="p"><br></p>
        <p style="text-indent:2em;" class="p"><strong><span style="color:#000000;">（二）</span>Cookie同类技术</strong></p>
        <p style="text-indent:2em;" class="p"><span style="font-size:14px;"><span style="color:#000000;">除</span>&nbsp;Cookie<span style="color:#000000;">外，我们还会在网站上使用网站信标、像素标签、ETag等其他同类技术。</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">例如，我们向您发送的电子邮件可能含有链接至我们网站内容的地址链接，如果您点击该链接，我们则会跟踪此次点击，帮助我们了解您的产品或服务偏好，以便于我们主动改善客户服务体验。网站信标通常是一种嵌入到网站或电子邮件中的透明图像。借助于电子邮件中的像素标签，我们能够获知电子邮件是否被打开。如果您不希望自己的活动以这种方式被追踪，则可以随时从我们的寄信名单中退订。</span></span>
        </p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">ETag（实体标签）是在互联网浏览器与互联网服务器之间背后传送的HTTP协议标头，可代替Cookie。ETag可以帮助我们避免不必要的服务器负载，提高服务效率，节省资源、能源，同时，我们可能通过ETag来记录您的身份，以便我们可以更深入地了解和改善我们的产品或服务。</span><strong><u>大多数浏览器均为用户提供了清除浏览器缓存数据的功能，您可以在浏览器设置功能中进行相应的数据清除操作。</u></strong><span style="font-size:14px;">但请注意，如果停用ETag，您可能无法享受相对更佳的产品或服务体验。</span></span></p>
        <p class="p" />
        <p style="text-indent:2em;" class="p"><strong><span style="color:#000000;">三、我们如何共享、转让、公开披露您的信息</span></strong></p>
        <p style="text-indent:2em;" class="p"><br></p>
        <p style="text-indent:2em;" class="p"><strong><span style="color:#000000;">（一）共享</span></strong></p>
        <p class="p"> <span style="color:#000000;"><span style="font-size:14px;">我们不会与云蜂网服务提供者以外的公司、组织和个人共享您的个人信息，但以下情况除外：</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">1、在法定情形下的共享：我们可能会根据法律法规规定、诉讼、争议解决需要，或按行政、司法机关依法提出的要求，对外共享您的个人信息。</span></span>
        </p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">2、在获取明确同意的情况下共享：获得您的明确同意后，我们会与其他方共享您的个人信息。</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">3、在您主动选择情况下共享：您通过云蜂平台购买商品或服务，我们会根据您的选择，将您的订单信息中与交易有关的必要信息共享给相关商品或服务的提供者，以实现您的交易及售后服务需求。</span></span>
        </p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">4、与关联公司间共享：</span><strong><u>为便于我们基于云蜂平台账户向您提供产品和服务，推荐您可能感兴趣的信息，识别会员账号异常，保护云蜂网关联公司或其他用户或公众的人身财产安全免遭侵害，您的信息可能会与我们的关联公司和/或其指定的服务提供商共享。</u></strong><span style="font-size:14px;">我们只会共享必要的信息，且受本隐私政策中所声明目的的约束，如果我们共享您的敏感信息或关联公司改变信息的使用及处理目的，将再次征求您的授权同意。</span></span>
        </p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">5、与授权合作伙伴共享：</span><strong><u>我们可能委托授权合作伙伴为您提供某些服务或代表我们履行职能，</u></strong><span style="font-size:14px;">我们仅会出于本隐私权政策声明的合法、正当、必要、特定、明确的目的共享您的信息，授权合作伙伴只能接触到其履行职责所需信息，且不得将此信息用于其他任何目的。</span></span>
        </p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">目前，我们的授权合作伙伴包括以下类型：</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">（1）广告、分析服务类的授权合作伙伴。除非得到您的许可，否则我们不会将您的个人身份信息与提供广告、分析服务的合作伙伴共享。我们会委托这些合作伙伴处理与广告覆盖面和有效性相关的信息，但不会提供您的个人身份信息，或者我们将这些信息进行去标识化处理，以便它不会识别您个人。这类合作伙伴可能将上述信息与他们合法获取的其他数据相结合，以执行我们委托的广告服务或决策建议。</span></span>
        </p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">（2）供应商、服务提供商和其他合作伙伴。我们将信息发送给支持我们业务的供应商、服务提供商和其他合作伙伴，这些支持包括受我们委托提供的技术基础设施服务、分析我们服务的使用方式、衡量广告和服务的有效性、提供客户服务、支付便利或进行学术研究和调查。</span></span>
        </p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">我们会对授权合作伙伴获取有关信息的应用程序接口（API）、软件工具开发包（SDK）进行严格的安全检测，并与授权合作伙伴约定严格的数据保护措施，令其按照我们的委托目的、服务说明、本隐私权政策以及其他任何相关的保密和安全措施来处理个人信息。</span></span>
        </p>
        <p style="text-indent:2em;" class="p"><br></p>
        <p style="text-indent:2em;" class="p"><strong><span style="color:#000000;">（二）转让</span></strong></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">我们不会将您的信息转让给任何公司、组织和个人，但以下情况除外：</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">1、在获取明确同意的情况下转让：获得您的明确同意后，我们会向其他方转让您的个人信息；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">2、在云蜂网服务提供者发生合并、收购或破产清算情形，或其他涉及合并、收购或破产清算情形时，如涉及到个人信息转让，我们会要求新的持有您个人信息的公司、组织继续受本政策的约束，否则我们将要求该公司、组织和个人重新向您征求授权同意。</span></span>
        </p>
        <p style="text-indent:2em;" class="p"><br></p>
        <p style="text-indent:2em;" class="p"><strong><span style="color:#000000;">（三）公开披露</span></strong></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">我们仅会在以下情况下，公开披露您的信息：</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">1、获得您明确同意或基于您的主动选择，我们可能会公开披露您的个人信息；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">2、</span><strong><u>如果我们确定您出现违反法律法规或严重违反云蜂平台相关协议及规则的情况，或为保护云蜂平台用户或公众的人身财产安全免遭侵害，我们可能依据法律法规或征得您同意的情况下披露关于您的信息</u></strong><span style="font-size:14px;">，包括相关违规行为以及云蜂平台已对您采取的措施。例如，若您因出售假冒商品而严重违反云蜂规则，我们可能会公开披露您的店铺认证主体信息与违规情况。</span></span>
        </p>
        <p style="text-indent:2em;" class="p"><br></p>
        <p class="p"> <strong><span style="color:#000000;">（四）共享、转让、公开披露个人信息时事先征得授权同意的例外</span></strong></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">以下情形中，共享、转让、公开披露您的个人信息无需事先征得您的授权同意：</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">1、与国家安全、国防安全有关的；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">2、与公共安全、公共卫生、重大公共利益有关的；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">3、与犯罪侦查、起诉、审判和判决执行等司法或行政执法有关的；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">4、出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">5、您自行向社会公众公开的个人信息；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">6、从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道。</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">请知悉，根据适用的法律，若我们</span><strong><u>对信息采取技术措施和其他必要措施进行处理，使得数据接收方无法重新识别特定个人且不能复原，则此类处理后数据的共享、转让、公开披露无需另行向您通知并征得您的同意</u></strong><span style="font-size:14px;">。</span></span></p>
        <p style="text-indent:2em;" class="p" />
        <p style="text-indent:2em;" class="p"><strong><span style="color:#000000;">&nbsp;四、我们如何保护您的信息</span></strong></p>
        <p style="text-indent:2em;" class="p"><span style="font-size:14px;"><span style="color:#000000;">（一）我们已采取符合业界标准、合理可行的安全防护措施保护您的信息，防止个人信息遭到未经授权访问、公开披露、使用、修改、损坏或丢失。例如，在您的浏览器与服务器之间交换数据时受</span>&nbsp;SSL<span style="color:#000000;">协议加密保护；我们同时对云蜂网网站提供</span>HTTPS<span style="color:#000000;">协议安全浏览方式；我们会使用加密技术提高个人信息的安全性；我们会使用受信赖的保护机制防止个人信息遭到恶意攻击；我们会部署访问控制机制，尽力确保只有授权人员才可访问个人信息；以及我们会举办安全和隐私保护培训课程，加强员工对于保护个人信息重要性的认识。</span></span>
        </p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">（二）我们有行业先进的以数据为核心、围绕数据生命周期进行的数据安全管理体系，从组织建设、制度设计、人员管理、产品技术等方面多维度提升整个系统的安全性。</span></span>
        </p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">（三）我们会采取合理可行的措施，尽力避免收集无关的个人信息。</span><strong><u>我们只会在达成本政策所述目的所需的期限内保留您的个人信息，除非法律有强制的存留要求，</u></strong>例如《中华人民共和国电子商务法》要求商品和服务信息、交易信息保存时间自交易完成之日起不少于三年。而我们判断前述期限的标准包括：</span>
        </p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;">1、完成与您相关的交易目的、维护相应交易及业务记录、应对您可能的查询或投诉；</span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;">2、保证我们为您提供服务的安全和质量；</span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;">3、您是否同意更长的留存期间；</span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;">4、是否存在保留期限的其他特别约定。</span></p>
        <p style="text-indent:2em;" class="p"><strong><u><span style="color:#000000;">在您的个人信息超出保留期间后，我们会根据适用法律的要求删除您的个人信息，或使其匿名化处理。</span></u></strong></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">（四）互联网并非绝对安全的环境，使用云蜂平台服务时，</span><strong><u>我们强烈建议您不要使用非云蜂平台推荐的通信方式发送您的信息。</u></strong><span style="font-size:14px;">您可以通过我们的服务建立联系和相互分享。当您通过我们的服务创建交流、交易或分享时，您可以自主选择沟通、交易或分享的对象，作为能够看到您的交易内容、联络方式、交流信息或分享内容等相关信息的第三方。</span></span>
        </p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">在使用云蜂网服务进行网上交易时，您不可避免地要向交易对方或潜在的交易对方披露自己的个人信息，如</span><strong>联络方式</strong><span style="font-size:14px;">或</span><strong>联系地址</strong><span style="font-size:14px;">。请您妥善保护自己的个人信息，仅在必要的情形下向他人提供。如您发现自己的个人信息尤其是您的账户或密码发生泄露，请您立即联络云蜂网客服，以便我们根据您的申请采取相应措施。</span></span>
        </p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">请注意，您在使用我们服务时自愿共享甚至公开分享的信息，可能会涉及您或他人的个人信息甚至个人敏感信息。请您更加谨慎地考虑，是否在使用我们的服务时共享甚至公开分享相关信息。</span></span>
        </p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">请使用复杂密码，协助我们保证您的账号安全。我们将尽力保障您发送给我们的任何信息的安全性。如果我们的物理、技术或管理防护设施遭到破坏，导致信息被非授权访问、公开披露、篡改或毁坏，导致您的合法权益受损，我们将承担相应的法律责任。</span></span>
        </p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">（五）我们将不定期更新并公开安全风险、个人信息安全影响评估报告等有关内容，您可通过云蜂网公告方式获得。</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">（六）在不幸发生个人信息安全事件后，我们将按照法律法规的要求向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。事件相关情况我们将以邮件、信函、电话、推送通知等方式告知您，难以逐一告知个人信息主体时，我们会采取合理、有效的方式发布公告。</span></span>
        </p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">同时，我们还将按照监管部门要求，上报个人信息安全事件的处置情况。</span></span></p>
        <p class="p" />
        <p style="text-indent:2em;" class="p"><strong><span style="color:#000000;">五、您如何管理您的信息</span></strong></p>
        <p style="text-indent:2em;" class="p"><br></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">您可以通过以下方式访问及管理您的信息：</span></span></p>
        <p style="text-indent:2em;" class="p"><br></p>
        <p style="text-indent:2em;" class="p"><strong><span style="color:#000000;">（一）查询、更正和补充您的信息</span></strong></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">您有权查询、更正或补充您的信息。您可以通过以下方式自行进行：</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">1、登录云蜂网，进入“我的云蜂”首页，点击个人账户设置后查询、更正个人资料及个人账户相关信息；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">2、登录云蜂网并选择联系客服寻求帮助，协助您查询、更正或补充您的信息。</span></span></p>
        <p style="text-indent:2em;" class="p"><br></p>
        <p style="text-indent:2em;" class="p"><strong><span style="color:#000000;">（二）删除您的信息</span></strong></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">您可以通过“（一）查询、更正和补充您的信息”中列明的方式删除您的部分信息。</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">在以下情形中，您可以向我们提出删除个人信息的请求：</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">1、如果我们处理个人信息的行为违反法律法规；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">2、如果我们收集、使用您的个人信息，却未征得您的明确同意；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">3、如果我们处理信息的行为严重违反了与您的约定；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">4、如果您不再使用我们的产品或服务，或您主动注销了账号；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">5、如果我们永久不再为您提供产品或服务。</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">若我们决定响应您的删除请求，我们还将同时尽可能通知从我们处获得您的个人信息的主体，并要求其及时删除（除非法律法规另有规定，或这些主体已独立获得您的授权）。</span></span>
        </p>
        <p style="text-indent:2em;" class="p"><strong><u><span style="color:#000000;">当您或我们协助您删除相关信息后，因为适用的法律和安全技术，我们可能无法立即从备份系统中删除相应的信息，我们将安全地存储您的个人信息并将其与任何进一步处理隔离，直到备份可以清除或实现匿名。</span></u></strong>
        </p>
        <p style="text-indent:2em;" class="p"><br></p>
        <p style="text-indent:2em;" class="p"><strong><span style="color:#000000;">（三）改变您授权同意的范围</span></strong></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">每个业务功能需要一些基本的个人信息才能得以完成（见本隐私权政策“第一部分”）。</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">当您收回同意后，我们将不再处理相应的个人信息。</span><strong><u>但您收回同意的决定，不会影响此前基于您的授权而开展的个人信息处理。</u></strong></span>
        </p>
        <p style="text-indent:2em;" class="p"><br></p>
        <p style="text-indent:2em;" class="p"><strong><span style="color:#000000;">（四）注销您的账户</span></strong></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">您可以通过以下方式申请注销您的账户：</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">1、登录手机云蜂客户端，通过“我的云蜂-设置-账户与安全-注销账户”提交账户注销申请；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">2、登录云蜂网并选择联系客服寻求帮助，协助您申请注销您的账户。</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">在您主动注销账户之后，我们将停止为您提供产品或服务，根据适用法律的要求删除您的个人信息，或使其匿名化处理。</span></span></p>
        <p style="text-indent:2em;" class="p"><br></p>
        <p style="text-indent:2em;" class="p"><strong><span style="color:#000000;">（五）约束信息系统自动决策</span></strong></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">在某些业务功能中，我们可能仅依据信息系统、算法等在内的非人工自动决策机制做出决定。如果这些决定显著影响您的合法权益，您有权要求我们做出解释，我们也将在不侵害云蜂网商业秘密或其他用户权益、社会公共利益的前提下提供申诉方法。</span></span>
        </p>
        <p style="text-indent:2em;" class="p"><br></p>
        <p style="text-indent:2em;" class="p"><strong><span style="color:#000000;">（六）响应您的上述请求</span></strong></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">为保障安全，您可能需要提供书面请求，或以其他方式证明您的身份。我们可能会先要求您验证自己的身份，然后再处理您的请求。</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="font-size:14px;"><span style="color:#000000;">我们将在</span>15<span style="color:#000000;">天内做出答复。如您不满意，还可以通过云蜂网客服发起投诉。</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">对于您合理的请求，我们原则上不收取费用，但对多次重复、超出合理限度的请求，我们将酌情收取一定费用。对于与您的身份不直接关联的信息、无端重复信息，或者需要过多技术手段（例如，需要开发新系统或从根本上改变现行惯例）、给他人合法权益带来风险或者不切实际的请求，我们可能会予以拒绝。</span></span>
        </p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">在以下情形中，按照法律法规要求，我们将无法响应您的请求：</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">1、与国家安全、国防安全有关的；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">2、与公共安全、公共卫生、重大公共利益有关的；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">3、与犯罪侦查、起诉、审判和执行判决等有关的；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">4、有充分证据表明个人信息主体存在主观恶意或滥用权利的；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">5、响应您的请求将导致您或其他个人、组织的合法权益受到严重损害的；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">6、涉及商业秘密的。</span></span></p>
        <p class="p" />
        <p style="text-indent:2em;" class="p"><strong><span style="color:#000000;">六、我们如何处理未成年人的信息</span></strong></p>
        <p style="text-indent:2em;" class="p"><strong><u><span style="color:#000000;">在电子商务活动中我们推定您具有相应的民事行为能力。如您为未成年人，我们要求您请您的父母或监护人仔细阅读本隐私权政策，并在征得您的父母或监护人同意的前提下使用我们的服务或向我们提供信息。</span></u></strong>
        </p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">对于经父母或监护人同意使用我们的产品或服务而收集未成年人个人信息的情况，我们只会在法律法规允许、父母或监护人明确同意或者保护未成年人所必要的情况下使用、共享、转让或披露此信息。</span></span>
        </p>
        <p style="text-indent:2em;" class="p" />
        <p style="text-indent:2em;" class="p"><strong><span style="color:#000000;">七、您的信息如何在全球范围转移</span></strong></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">我们在中华人民共和国境内运营中收集和产生的个人信息，存储在中国境内，以下情形除外：</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">1、适用的法律有明确规定；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">2、获得您的明确授权；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">3、您通过互联网进行跨境交易等个人主动行为。</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">针对以上情形，我们会确保依据本隐私权政策对您的信息提供足够的保护。</span></span></p>
        <p class="p" />
        <p style="text-indent:2em;" class="p"><strong><span style="color:#000000;">八、本隐私权政策如何更新</span></strong></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">我们的隐私权政策可能变更。</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="font-size:14px;"><span style="color:#000000;">未经您明确同意，我们不会限制您按照本隐私权政策所应享有的权利。我们会在</span>专门页面<span style="color:#000000;">上发布对隐私权政策所做的任何变更。</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">对于重大变更，我们还会提供更为显著的通知（包括我们会通过云蜂网公示的方式进行通知甚至向您提供弹窗提示）。</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">本政策所指的重大变更包括但不限于：</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">1、我们的服务模式发生重大变化。如处理个人信息的目的、处理的个人信息类型、个人信息的使用方式等；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">2、我们在控制权等方面发生重大变化。如并购重组等引起的信息控制者变更等；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">3、个人信息共享、转让或公开披露的主要对象发生变化；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">4、您参与个人信息处理方面的权利及其行使方式发生重大变化；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">5、我们负责处理个人信息安全的责任部门、联络方式及投诉渠道发生变化；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">6、信息安全影响评估报告表明存在高风险。</span></span></p>
        <p style="text-indent:2em;" class="p" />
        <p style="text-indent:2em;" class="p"><strong><span style="color:#000000;">九、如何联系我们</span></strong></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">您可以通过以下方式与我们联系，我们将在15天内回复您的请求：</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">1、如对本政策内容有任何疑问、意见或建议，您可通过云蜂网客服在线客服与我们联系；</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="font-size:14px;"><span style="color:#000000;">2、如发现个人信息可能被泄露，您可以通过</span>110<span style="color:#000000;">投诉举报；</span></span>
        </p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">如果您对我们的回复不满意，特别是您认为我们的个人信息处理行为损害了您的合法权益，</span><strong><u>您还可以通过向被告住所地有管辖权的法院提起诉讼来寻求解决方案。</u></strong></span>
        </p>
        <p class="MsoNormal" />
        <p class="MsoNormal" />
        <p class="MsoNormal" />
        <p style="text-align:center; margin-top: 20px;" class="p" align="center"><strong><span style="color:#000000;"><span style="font-size:18px;">法律声明</span></span></strong></p>
        <p style="text-align:right;text-indent:2em;" class="p" align="right" />
        <p style="text-align:right;text-indent:2em;" class="p" align="right"> <span style="color:#000000;"><span style="font-size:14px;">生效日期：2019年8月11日</span></span></p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">权利归属</span></span></p>
        <p style="text-indent:2em;" class="p" />
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">除非云蜂网另行声明，云蜂网推出的所有官方产品、技术、软件、程序、数据及其他信息（包括文字、图标、图片、照片、音频、视频、图表、色彩组合、版面设计等）的所有权利（包括著作权、商标权、专利权、商业秘密及其他相关权利）均归云蜂及/或其关联公司所有。未经云蜂及/或其关联公司事先许可，任何人擅自使用上述内容和信息，可能会侵犯云蜂及/或其关联公司的权利，我公司将会追究侵权者的法律责任。如有宣传、展示等任何使用需要，您务必取得云蜂及/或其关联公司的事先许可。</span></span>
        </p>
        <p style="text-indent:2em;" class="p" />
        <p style="text-indent:2em;" class="p"><strong><span style="color:#000000;">责任限制</span></strong></p>
        <p class="p" />
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">鉴于云蜂网提供的信息发布服务属于电子公告牌（BBS）性质，云蜂网上的店铺、商品信息（包括但不限于店铺名称、公司名称、联系人及联络信息、产品的描述和说明、相关图片、视频等）由用户自行提供并上传，由用户对其提供并上传的信息承担相应法律责任。云蜂网服务提供者对此另有约定的，将在相关的协议或其他法律文本中与您进行明确。</span></span>
        </p>
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">云蜂网转载的作品（包括论坛内容）出于传递更多信息之目的，并不意味我们赞同其观点或已经证实其内容的真实性。</span></span></p>
        <p style="text-indent:2em;" class="p" />
        <p style="text-indent:2em;" class="p"><strong><span style="color:#000000;">知识产权保护</span></strong></p>
        <p class="p" />
        <p style="text-indent:2em;" class="p"><span style="color:#000000;"><span style="font-size:14px;">我们尊重知识产权，反对并打击侵犯知识产权的行为。知识产权权利人若认为云蜂网内容（包括但不限于云蜂网用户发布的商品信息）侵犯其合法权益的，可以相关途径进行投诉，我们将在收到知识产权权利人合格通知后依据相应的法律法规以及平台规则及时处理。</span></span>
        </p>
        <p style="text-align:justify;" class="p" align="justify" />
        <p class="p" />
        <p class="MsoNormal" />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { register } from '@/api/user'
import { category } from '@/api/common'
export default {
  data() {
    // const validateIsAgree = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error('请先勾选注册协议'))
    //   }
    // }
    const validateConfirmPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码!'))
      } else {
        if (value !== this.ruleForm.login_pwd) {
          callback(new Error('两次密码不一致!'))
        } else {
          callback()
        }
      }
    }
    return {
      ruleForm: {
        emp_type: '',
        company_type: '',
        org_type: '',
        gain_type: '',
        company_name: '',
        login_name: '',
        login_pwd: '',
        login_confirmpwd: '',
        link_man: '',
        link_phone: '',
        invitation_code: ''
      },
      isAgreement: false,
      rules: {
        emp_type: [
          { required: true, message: '请选择用户类型!', trigger: 'change' }
        ],
        company_type: [
          { required: true, message: '请选择用户类型!', trigger: 'change' }
        ],
        org_type: [
          { required: true, message: '请选择机构性质!', trigger: 'change' }
        ],
        gain_type: [
          { required: true, message: '请选择营利性质!', trigger: 'change' }
        ],
        company_name: [
          { required: true, message: '请输入单位名称!', trigger: 'blur' }
        ],
        login_name: [
          { required: true, message: '请输入登录名!', trigger: 'blur' }
        ],
        login_pwd: [
          { required: true, message: '请输入密码!', trigger: 'blur' }
        ],
        login_confirmpwd: [
          { required: true, validator: validateConfirmPass, trigger: 'blur' }
        ],
        link_man: [
          { required: true, message: '请输入您真实姓名!', trigger: 'blur' }
        ],
        link_phone: [
          { required: true, message: '请输入您的手机号码!', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '手机号不正确' }
        ]
      },
      content: '获取验证码',
      wait: 10,
      isDisabled: false,
      centerDialogVisible: false,
      options1: [],
      options2: []
    }
  },
  mounted() {
    this.getCategory1()
    this.getCategory2()
  },
  methods: {
    getCategory1() {
      category('company_type_1').then((res) => {
        this.options1 = res.data.list
      })
    },
    getCategory2() {
      category('company_type_2').then((res) => {
        this.options2 = res.data.list
      })
    },
    getQrCode() {
      this.time()
    },
    time() {
      if (this.wait === 0) {
        this.content = '获取验证码'
        this.wait = 60
        this.isDisabled = false
      } else {
        this.isDisabled = true
        this.content = '重新发送(' + this.wait + ')'
        this.wait--
        setTimeout(() => {
          this.time()
        }, 1000)
      }
    },
    submitForm(formName) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          register(this.ruleForm).then(res => {
            if (res.success) {
              this.$message({
                message: '恭喜你，注册成功！',
                type: 'success'
              })
              this.$router.push({ path: '/login' })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    onAgreement() {
      this.centerDialogVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.lg-container {
  height: 100vh;
  min-width: 1200px;
  .el-container {
    height: 100%;
    .el-header {
      height: 90px !important;
      padding: 0;
      box-shadow: 0px 0px 19px 1px rgba(144, 144, 144, 0.1);
      .w1200 {
        width: 1200px;
        margin: 25px auto 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .logoBox {
          height: 40px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .logo {
            width: 100px;
            height: 40px;
            float: left;
            img {
              width: 100%;
              display: inline-block;
            }
          }
          h2 {
            line-height: 40px;
            height: 40px;
            font-size: 24px;
            color: #666666;
            padding-left: 20px;
            border-left: 1px solid #E0E0E0;
            margin-left: 20px;
            font-weight: normal;
          }
        }
        .serviceBox {
          font-size: 16px;
          color: #03a9ac;
        }
      }
    }
    .el-footer {
      width: 100%;
      height: 120px !important;
      background: #fafafa;
      p {
        color: #999999;
        font-size: 12px;
        line-height: 120px;
        margin: 0;
        text-align: center;
      }
    }
    .el-main {
      height: calc(100% - 210px);
      overflow: auto;
      padding: 0;
      .el-form {
        width: 580px;
        margin: 0 auto;
        padding-top: 50px;
        .el-form-item {
          margin-bottom: 20px;
        }
      }
    }
  }
}
.goLogin {
  color: #03a9ac;
  font-size: 12px;
  height: 32px;
  margin-left: 20px;
  &:hover {
    color: #35babd;
  }
}
.agree {
  color: #03a9ac;
  font-size: 12px;
  cursor: pointer;
}
</style>
<style lang="scss">
#lgRegister {
  .el-form-item__label {
    font-size: 12px;
    font-weight: normal;
  }
  .el-form-item__content {
    width: 400px;
  }
}
#agreement {
  margin-right: 0;
  .el-checkbox__label {
    font-size: 12px;
    font-weight: normal;
  }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #606266;
  }
}
#agreementBox {
  .el-dialog__body {
    border-top: 1px solid #eeeeee;
    height: 500px;
    overflow: auto;
    text-align: left;
    p {
      font-size: 14px;
      margin: 0;
      line-height: 26px;
    }
    span {
      font-size: 14px;
      margin: 0;
      line-height: 26px;
    }
    strong {
      font-size: 14px;
      margin: 0;
      line-height: 26px;
    }
  }
}
</style>
