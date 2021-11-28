<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.keyword"
        placeholder="关键字"
        style="width: 200px"
        class="filter-item"
      />
      <el-input
        v-model="listQuery.grade"
        placeholder="评级"
        style="width: 100px"
        class="filter-item"
      />
      <el-input
        v-model="listQuery.score"
        placeholder="评分"
        style="width: 100px"
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
      <el-table-column
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
      />
      <el-table-column
        label="供应商名称"
        prop="name"
        align="center"
      />
      <el-table-column
        v-if="roleCheck(levelMap.Admin)"
        label="法人代表"
        prop="representative"
        align="center"
      />
      <el-table-column
        v-if="roleCheck(levelMap.Admin)"
        label="联系人"
        prop="contact"
        align="center"
      />
      <el-table-column
        v-if="roleCheck(levelMap.Admin)"
        label="联系方式"
        prop="contact_info"
        align="center"
      />
      <el-table-column
        v-if="roleCheck(levelMap.Admin)"
        label="备注"
        prop="comment"
        align="center"
      />
      <el-table-column
        v-if="roleCheck(levelMap.SuperAdmin)"
        label="评级"
        prop="grade"
        sortable="custom"
        align="center"
        width="80"
      />
      <el-table-column
        v-if="roleCheck(levelMap.SuperAdmin)"
        label="评分(100)"
        prop="score"
        sortable="custom"
        align="center"
        width="120"
      />
      <el-table-column
        v-if="roleCheck(levelMap.SuperAdmin)"
        label="考察时间"
        prop="inspect_time"
        sortable="custom"
        align="center"
        width="120"
        :formatter="timezoneFormatter"
      />
      <el-table-column
        label="生产周期(天)"
        prop="leadtime"
        sortable="custom"
        align="center"
        width="140"
      />
      <el-table-column
        label="合作方式"
        prop="cooporateType"
        align="center"
        :formatter="cooporateTypeFormatter"
      />
      <el-table-column
        label="已签合同"
        prop="contract"
        align="center"
      />
      <el-table-column v-if="roleCheck(levelMap.SuperAdmin)" label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="primary" @click="handleEdit(row,$index)">
            编辑
          </el-button>
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
    <action v-if="dialogFormVisible" :dialog-form-visible="dialogFormVisible" :select-item="selectItem" :title="textMap[dialogStatus]" :status="dialogStatus" @dialogCallback="dialogCallback" />
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { timezoneFormatter } from '@/common/formatter'
import { commonRequest } from '@/api/common'
import { levelMap, cooporateTypeOptions } from '@/common/options'
import { roleCheck } from '@/common/rolePermission'
import { mapGetters } from 'vuex'
import Action from './action.vue'

export default {
  name: 'CompanyInfo',
  components: {
    Pagination,
    Action
  },
  data() {
    return {
      actionUrl: 'v1/company/info',
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        keyword: null,
        grade: null,
        score: null
      },
      dialogFormVisible: false,
      dialogStatus: '',
      downloadLoading: false,
      textMap: {
        'create': '添加',
        'edit': '编辑'
      },
      selectItem: null,
      levelMap: levelMap
    }
  },

  computed: {
    ...mapGetters([
      'roleLevel'
    ])
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      commonRequest('get', this.actionUrl, this.listQuery).then((res) => {
        this.list = res.data.rows
        this.total = res.data.count
        this.listLoading = false
      })
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.selectItem = null
      this.dialogFormVisible = true
    },
    handleEdit(row) {
      this.dialogStatus = 'edit'
      this.selectItem = row
      this.dialogFormVisible = true
    },
    handleDelete(row, index) {
      commonRequest('delete', this.actionUrl + '/' + row.id, null, { ids: [row.id] }).then((res) => {
        this.getList()
      })
    },
    dialogCallback(fresh) {
      this.selectItem = null
      this.dialogFormVisible = false

      if (fresh) {
        this.getList()
      }
    },
    sortChange() {},
    timezoneFormatter(row, column) {
      return timezoneFormatter(row[column.property])
    },
    roleCheck(params) {
      return roleCheck(params)
    },
    cooporateTypeFormatter(row) {
      let res = ''
      cooporateTypeOptions.forEach(op => {
        if (op.id === parseInt(row.cooporateType)) {
          res = op.name
        }
      })
      return res
    }
  }
}
</script>
