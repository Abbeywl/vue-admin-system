<template>
    <div class="login-wrap">
        <a-row align="middle" type="flex" justify="space-around" class="login_box">
            <a-col :span="24">
                <a-form-model
                    layout="horizontal"
                    ref="ruleForm"
                    :rules="rules"
                    :model="param"
                    @submit="submitForm"
                    @submit.native.prevent
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol"
                >
                    <div class="ms-title">后台管理系统</div>
                    <a-form-model-item label="用户名" prop="UserName" ref="UserName">
                        <a-input v-model="param.UserName" placeholder="用户名">
                            <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
                        </a-input>
                    </a-form-model-item>
                    <a-form-model-item label="密码" prop="Password" ref="Password">
                        <a-input v-model="param.Password" type="password" placeholder="密码">
                            <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
                        </a-input>
                    </a-form-model-item>
                    <a-form-model-item v-bind="formItemLayoutWithOutLabel">
                        <a-button type="primary" html-type="submit" block :disabled="param.UserName === '' || param.Password === ''">
                            登录
                        </a-button>
                    </a-form-model-item>
                </a-form-model>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import { testApi, Login } from '../../api/index';
export default {
    data: function () {
        return {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
            formItemLayoutWithOutLabel: {
                wrapperCol: {
                    xs: { span: 24, offset: 0 },
                    sm: { span: 20, offset: 4 }
                }
            },
            param: {
                UserName: '18393911684',
                Password: 'airport123',
                UserType: 'Staff'
            },
            rules: {
                UserName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                Password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        };
    },
    mounted() {
        this.getDtata();
    },
    methods: {
        getDtata() {
            testApi(this.query).then((res) => {
                console.log(res);
            });
        },
        LonginFun() {
            Login(this.param).then((res) => {
                console.log(res);
            });
        },
        submitForm() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    Login(this.param).then((res) => {
                        console.log(res);
                        this.$message.success('登录成功');
                        localStorage.setItem('user_token', this.param.UserName);
                        this.$router.push('/');
                    });
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login_box {
    width: 30%;
    /* height: 50vh; */
    padding: 20px;
    box-shadow: beige;
    box-shadow: 2px 2px 2px 2px #fff;
    background: #fff;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #333;
    border-bottom: 1px solid #ddd;
    margin-bottom: 25px;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>