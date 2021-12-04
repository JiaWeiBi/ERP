<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.keyword"
        placeholder="关键字"
        style="width: 200px"
        class="filter-item"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="getList"
      >
        查询
      </el-button>
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
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column
        label="名称"
        prop="name"
        align="center"
      />
      <el-table-column
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
      />
      <el-table-column
        label="描述"
        prop="desc"
        align="center"
      />
      <el-table-column
        label="供应商"
        prop="company"
        align="center"
        :formatter="companyFormater"
      />

      <el-table-column
        label="操作"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(row, $index)"
          >
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(row, $index)"
          >
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
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="temp.desc" type="textarea" />
        </el-form-item>
        <el-form-item label="供应商">
          <el-select
            v-model="temp.companyIds"
            class="filter-item"
            placeholder="选择供应商"
            filterable
            multiple
          >
            <el-option
              v-for="item in companyOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="createData()"> 确定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { commonRequest } from '@/api/common'
import { mapGetters } from 'vuex'

export default {
  name: 'Project',
  components: { Pagination },
  data() {
    return {
      actionUrl: 'v1/project',
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
        create: '添加'
      },
      dataForm: [],
      rules: {
        name: [{ required: true, message: '名称为必填项' }]
      },
      temp: {},
      companyOptions: []
    }
  },

  computed: {
    ...mapGetters([])
  },
  created() {
    this.getOptions()
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      commonRequest('get', this.actionUrl, this.listQuery).then((res) => {
        this.list = res.data.rows
        this.count = res.data.count
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
          const url =
            this.dialogStatus === 'create'
              ? this.actionUrl
              : this.actionUrl + '/' + this.temp.id
          commonRequest(
            this.dialogStatus === 'create' ? 'post' : 'put',
            url,
            {},
            this.temp
          ).then(() => {
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
    handleEdit(row) {
      this.dialogStatus = 'edit'
      this.temp = row
      this.temp.companyIds = []
      row.company.forEach((c) => {
        this.temp.companyIds.push(c.companyId)
      })

      this.temp = { ...this.temp }
      this.dialogFormVisible = true
    },
    handleDelete(row, index) {
      commonRequest('delete', this.actionUrl + '/' + row.id, null, {
        ids: [row.id]
      }).then((res) => {
        this.getList()
      })
    },
    sortChange(column) {
      let order
      if (column.order === 'descending') {
        order = 'desc'
      }
      if (column.order === 'ascending') {
        order = 'asc'
      }
      this.listQuery.sort = column.prop + ',' + order
      this.getList()
    },
    getOptions(params) {
      // 供应商数据
      const compOpt = {}
      commonRequest('get', 'v1/searchAll/company', compOpt).then((res) => {
        this.companyOptions = res.data
      })
    },
    companyFormater(row) {
      const company = row.company || []
      const l1 = []
      company.forEach((o) => {
        l1.push(o.companyId)
      })
      let cl = this.companyOptions.filter((c) => {
        return l1.includes(c.id)
      })

      cl = cl.map((o) => {
        return o.name
      })
      return cl.join('|')
    }
  }
}
</script>
