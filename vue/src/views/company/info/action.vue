<template>
  <div>
    <el-dialog :title="title" :visible.sync="visible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="供应商名称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="法人代表" prop="representative">
          <el-input v-model="temp.representative" />
        </el-form-item>
        <el-form-item label="联系人" prop="contact">
          <el-input v-model="temp.contact" />
        </el-form-item>
        <el-form-item label="联系方式" prop="contact_info">
          <el-input v-model="temp.contact_info" />
        </el-form-item>
        <el-form-item label="备注" prop="comment">
          <el-input v-model="temp.comment" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" />
        </el-form-item>
        <el-form-item v-if="roleCheck(levelMap.SuperAdmin)" label="评级" prop="grade">
          <el-input v-model="temp.grade" />
        </el-form-item>
        <el-form-item v-if="roleCheck(levelMap.SuperAdmin)" label="评分" prop="score">
          <el-input v-model="temp.score" type="number" min="0" max="100" />
        </el-form-item>
        <el-form-item v-if="roleCheck(levelMap.SuperAdmin)" label="考察时间" prop="inspect_time">
          <el-date-picker v-model="temp.inspect_time" type="datetime" />
        </el-form-item>
        <el-form-item label="生产周期(天)" prop="leadtime">
          <el-input v-model="temp.leadtime" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel"> 取消 </el-button>
        <el-button type="primary" @click="success"> 确定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { commonRequest } from '@/api/common'
import { roleCheck } from '@/common/rolePermission'
import { levelMap } from '@/common/options'

export default {
  name: 'CompanyInfoAction',
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: 'create'
    },
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    selectItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      actionUrl: 'v1/company/info',
      dataForm: [],
      rules: {
        name: [{ required: true, message: '账号为必填项' }],
        representative: [{ required: true, message: '法人代表为必填项' }]
      },
      temp: {},
      levelMap: levelMap
    }
  },
  computed: {
    visible: {
      get() {
        return this.dialogFormVisible
      },
      set(value) {
        this.$emit('dialogCallback')
      }
    }
  },
  mounted() {
    this.temp = { ...this.selectItem }
  },
  methods: {
    cancel() {
      this.temp = {}
      this.visible = false
    },
    success() {
      let method = 'post'
      let url = this.actionUrl
      if (this.status === 'edit') {
        method = 'put'
        url = url + '/' + this.temp.id
      }
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          commonRequest(method, url, {}, this.temp).then(() => {
            this.temp = {}
            this.$notify({
              title: '操作成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
            this.$emit('dialogCallback', true)
          })
        }
      })
    },
    roleCheck(params) {
      return roleCheck(params)
    }
  }
}
</script>
