<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-05-06 11:32:30
 * @LastEditTime: 2021-05-06 14:20:40
 * @LastEditors: @Xin (834529118@qq.com)
-->
<script>
import { ElLoading, ElMessageBox } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import useStoreAuxiliary from '@/plugins/useStoreAuxiliary'
// 登录页面路径
const loginPath = process.env.VUE_APP_LOGINPATH
const origin = window.location

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const route = useRoute()

    const { dispatchActions } = useStoreAuxiliary()

    const loadingInstance = ElLoading.service({
      text: 'Loading...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
      fullscreen: true,
    })

    const params = { ak: route.query.ak }

    dispatchActions('user/Login', params)
      .then(() => {
        loadingInstance.close()
        router.replace('/home')
        dispatchActions('user/GetUserInfo')
      })
      .catch(err => {
        console.dir(err)
        ElMessageBox.alert(`${err.message}`, '登录异常', {
          confirmButtonText: '确定',
          callback: () => {
            window.location = `${loginPath}?callbackUrl=${encodeURIComponent(origin)}`
          },
        })
      })
  },
  render() {
    return null
  },
}
</script>

<style></style>
