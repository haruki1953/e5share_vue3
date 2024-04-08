<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { User, Lock, Message } from '@element-plus/icons-vue'
import {
  authRegisterService,
  authLoginByUsernameService,
  authLoginByEmailService
} from '@/api/auth.js'
import { useAuthStore } from '@/stores'
import { adminContact, loginImage } from '@/config'
import { userRules } from '@/config/rules'

const isRegister = ref(false)

// 表单组件
const form = ref()

// 整个的用于提交的form数据对象
const formModel = ref({
  username: '',
  email: '',
  password: '',
  repassword: '',
  // 选择是否为邮箱登录
  isLoginByEmail: false
})

const rules = {
  ...userRules,
  repassword: [
    {
      validator: (rule, value, callback) => {
        // 判断 value 和 当前 form 中收集的 password 是否一致
        if (value !== formModel.value.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback() // 就算校验成功，也需要callback
        }
      },
      trigger: 'blur'
    }
  ]
}

// 注册
const isRegistering = ref(false) // 标记状态
const register = async () => {
  // 设置为注册中状态
  isRegistering.value = true
  try {
    // 注册成功之前，先进行校验，校验成功 → 请求，校验失败 → 自动提示
    await form.value.validate()
    await authRegisterService(formModel.value)
    ElMessage.success('注册成功')
    isRegister.value = false
  } finally {
    // 无论注册成功或失败，都要解除注册中状态
    isRegistering.value = false
  }
}

const authStore = useAuthStore()
const router = useRouter()

// 登录
const isLogingIn = ref(false) // 标记状态
const login = async () => {
  isLogingIn.value = true
  try {
    await form.value.validate()
    let res
    // 根据 isLoginByEmail 选择调用的登陆方式
    if (formModel.value.isLoginByEmail) {
      res = await authLoginByEmailService(formModel.value)
    } else {
      // eslint-disable-next-line no-unused-vars
      res = await authLoginByUsernameService(formModel.value)
    }
    // 保存token
    authStore.setToken(res.data.token)
    // 跳转至首页
    await router.push('/home')
    ElMessage.success('登录成功')
  } finally {
    // 无论成功或失败，都要解除状态
    isLogingIn.value = false
  }
}

// 点击忘记密码时弹出的消息
const forgotPasswordMessage = () => {
  ElMessage(`请联系管理员 ${adminContact}`)
}

watch(isRegister, () => {
  formModel.value = {
    username: '',
    email: '',
    password: '',
    repassword: ''
  }
})
</script>

<template>
  <el-row class="login-page">
    <el-col
      :span="12"
      class="bg"
      :style="{ backgroundImage: `url(${loginImage})` }"
    ></el-col>
    <el-col :span="6" :offset="3" class="form">
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            v-model="formModel.email"
            :prefix-icon="Message"
            type="email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="register"
            :loading="isRegistering"
            class="button"
            type="primary"
            auto-insert-space
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-else
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="email" v-if="formModel.isLoginByEmail">
          <el-input
            v-model="formModel.email"
            :prefix-icon="Message"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item prop="username" v-else>
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox v-model="formModel.isLoginByEmail">
              邮箱登录
            </el-checkbox>
            <el-link
              @click="forgotPasswordMessage"
              type="primary"
              :underline="false"
            >
              忘记密码？
            </el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="login"
            :loading="isLogingIn"
            class="button --el-color-primary-light-3"
            type="primary"
            auto-insert-space
          >
            登录
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  // background-color: #fff;
  .bg {
    // background: url('@/assets/login_bg.jpg') no-repeat center / cover;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    border-radius: 0 30px 30px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
