<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
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
      <el-table-column
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
      />
      <el-table-column
        label="名称"
        prop="name"
        sortable="custom"
        align="center"
      />
      <el-table-column
        label="分数"
        prop="score"
        sortable="custom"
        align="center"
      />
      <el-table-column
        label="描述"
        prop="desc"
        sortable="custom"
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
        <el-form-item label="分数" prop="score">
          <el-input v-model="temp.score" />
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

export default {
  name: 'Grade',
  components: { Pagination },
  data() {
    return {
      actionUrl: 'v1/company/grade',
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        keyword: null,
        level: null
      },
      dialogFormVisible: false,
      dialogStatus: '',
      downloadLoading: false,
      textMap: {
        'create': '添加评级'
      },
      dataForm: [],
      rules: {
        name: [{ required: true, message: '账号为必填项' }],
        score: [{ required: true, message: '评分为必填项' }]
      },
      temp: {}
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
      commonRequest('get', this.actionUrl, this.listQuery).then((res) => {
        this.list = res.data
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
    sortChange() {}
  }
}
</script>
