<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        v-if="roleCheck(levelMap.Admin)"
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        添加
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChange"
    >
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column
        label="名称"
        prop="name"
        align="center"
      />
      <el-table-column
        label="ID"
        prop="id"
        align="center"
        width="80"
      />
      <el-table-column
        label="描述"
        prop="desc"
        align="center"
      />

      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="名称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="temp.desc" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { commonRequest } from '@/api/common'
import { mapGetters } from 'vuex'
import { roleCheck } from '@/common/rolePermission'
import { levelMap } from '@/common/options'

export default {
  name: 'Grade',
  components: {
    Pagination
  },
  props: {
    type: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      actionUrl: 'v1/production/category',
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {},
      dialogFormVisible: false,
      dialogStatus: '',
      downloadLoading: false,
      textMap: {
        'create': '添加'
      },
      dataForm: [],
      rules: {
        name: [{ required: true, message: '名称为必填项' }]
      },
      temp: {},
      levelMap: levelMap
    }
  },

  computed: {
    ...mapGetters([])
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      commonRequest('get', this.actionUrl, { type: this.type }).then((res) => {
        this.list = res.data.rows
        this.total = res.data.count
        this.listLoading = false
      })
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.type = this.type
          commonRequest('post', this.actionUrl, {}, this.temp).then(() => {
            this.temp = {}
            this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: '操作成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      commonRequest('delete', this.actionUrl + '/' + row.id, null, { ids: [row.id] }).then((res) => {
        this.getList()
      })
    },
    sortChange() {},
    roleCheck(params) {
      return roleCheck(params)
    }
  }
}
</script>
