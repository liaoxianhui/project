<template>
  <div class="box">
    <el-card class="card">
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
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        pass: "",
        checkPass: ""
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
          },
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        checkPass: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            validator: validatePass2,
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
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // alert("submit!");
          axios
            .post("/api/user/register", {
              username: this.ruleForm.username,
              password: this.ruleForm.pass
            })
            .then(res => {
              if (res.data.code === 1) {
                console.log(res.data);
                this.$message.warning(res.data.message);
                this.ruleForm.username = "";
                this.ruleForm.pass = "";
                this.ruleForm.checkPass = "";
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          this.ruleForm.username = "";
          this.ruleForm.pass = "";
          this.ruleForm.checkPass = "";
        }
      });
    }
  },
  mounted() {},
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
  padding-right: 40px;
  padding-top: 20px;
}
</style>