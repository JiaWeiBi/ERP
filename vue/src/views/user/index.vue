<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.keyword"
        placeholder="关键字"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="getList"
      />
      <el-select
        v-model="listQuery.level"
        placeholder="等级"
        clearable
        style="width: 90px"
        class="filter-item"
      >
        <el-option
          v-for="item in roleLevelOptions"
          :key="item.key"
          :label="item.display_name"
          :value="item.value || item.key"
        />
      </el-select>
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
      <el-table-column
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
      />
      <el-table-column
        label="账号"
        prop="acc"
        sortable="custom"
        align="center"
      />
      <el-table-column
        label="电话"
        prop="phone"
        sortable="custom"
        align="center"
      />
      <el-table-column
        label="邮箱"
        prop="email"
        sortable="custom"
        align="center"
      />
      <el-table-column
        label="等级"
        prop="level"
        sortable="custom"
        align="center"
        :formatter="levelFormatter"
      />
      <el-table-column
        label="创建时间"
        prop="createdAt"
        sortable="custom"
        align="center"
        :formatter="dateFormatter"
      />
      <el-table-column
        label="创建者Id"
        prop="creater"
        sortable="custom"
        align="center"
        width="80"
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
        <el-form-item label="账号" prop="acc">
          <el-input v-model="temp.acc" />
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="temp.pwd" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="temp.phone" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="temp.email" />
        </el-form-item>
        <el-form-item label="等级">
          <el-select v-model="temp.level" class="filter-item" placeholder="选择权限等级">
            <el-option v-for="item in roleLevelOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
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
import { levelOptions } from '@/common/options'
import { dateFormatter } from '@/common/formatter'
import { commonRequest } from '@/api/common'
import { createUser } from '@/api/user'
import { mapGetters } from 'vuex'

export default {
  name: 'User',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        keyword: null,
        level: null
      },
      levelOptions: levelOptions,
      dialogFormVisible: false,
      dialogStatus: '',
      downloadLoading: false,
      textMap: {
        'create': '添加账号'
      },
      dataForm: [],
      rules: {
        acc: [{ required: true, message: '账号为必填项' }],
        pwd: [{ required: true, message: '密码为必填项' }],
        phone: [{ required: true, message: '手机为必填项' }],
        level: [{ required: true, message: '等级为必选项' }]
      },
      temp: {}
    }
  },

  computed: {
    ...mapGetters([
      'roleLevel'
    ]),
    roleLevelOptions: function() {
      const res = levelOptions.filter((op) => {
        return op.key > this.roleLevel
      })
      return res
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      // alert(this.roleLevel)
      this.listLoading = true
      commonRequest('get', 'v1/user', this.listQuery).then((res) => {
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
          createUser(this.temp).then(() => {
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
      commonRequest('delete', 'v1/user/' + row.id, null, { ids: [row.id] }).then((res) => {
        this.getList()
      })
    },
    sortChange() {},
    levelFormatter(row, column) {
      for (let i = 0; i < levelOptions.length; i++) {
        if (levelOptions[i].key === row.level) {
          return levelOptions[i].display_name
        }
      }
    },
    dateFormatter(row, column) {
      return dateFormatter(row[column.property])
    }
  }
}
</script>
