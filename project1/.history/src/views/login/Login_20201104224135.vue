<template>
  <div class="box">
    <el-card class="card">
      <h2 style="margin-bottom:20px">登录界面</h2>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input
            v-model="ruleForm.code"
            autocomplete="off"
          ></el-input>
          <div v-html="values" @click="clickcode"></div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="resetForm">重置</el-button>
          <el-button type="success" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {
      values:'',
      ruleForm: {
        username: "",
        pass: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        pass: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {},
  methods: {
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    clickcode(){
      this.getdata()
    },
    register() {
      this.$router.push("/register");
    },
    getdata(){
      axios.get('/api/captcha').then(res=>{
        console.log(res.data);
        this.values=res.data
      }).catch(err=>{
        console.log(err);
      })
    },
    login() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // alert("submit!");
          axios
            .post("/api/user/login", {
              username: this.ruleForm.username,
              password: this.ruleForm.pass,
              code:this.ruleForm.code,
              //     username: 用户名
              // - password: 密码
              // - code: 验证码
            })
            .then(res => {
              if (res.data.code === 1) {
                console.log(res.data);
                this.$message.warning(res.data.message);
                this.ruleForm.username = "";
                this.ruleForm.pass = "";
                this.ruleForm.checkPass = "";
              } else if (res.data === 200) {
                console.log(res.data);
                this.$message.success(res.data.message);
                this.$router.push("/");
              } else this.$message("有误");
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          // console.log("error submit!!");
          this.$message.error("错误！");
          this.ruleForm.username = "";
          this.ruleForm.pass = "";
          this.ruleForm.code = "";
        }
      });
    }
  },
  mounted() {
    this.getdata()
  },
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
.box {
  background: url("https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2899993874,1088991247&fm=26&gp=0.jpg");

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card {
  width: 500px;
  padding-right: 20px;
  text-align: center;
}
</style>