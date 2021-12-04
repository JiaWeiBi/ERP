<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="listQuery.categoryId"
        placeholder="分类"
        clearable
        style="width: 90px"
        filterable
        class="filter-item"
      >
        <el-option
          v-for="item in categoryOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-select
        v-model="listQuery.companyId"
        placeholder="供应商"
        clearable
        filterable
        style="width: 90px"
        class="filter-item"
      >
        <el-option
          v-for="item in companyOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
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
      <el-table-column label="分类" prop="categoryName" align="center" />
      <el-table-column label="供应商名称" prop="companyName" align="center" />
      <!-- <el-table-column
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
      /> -->
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
        align="center"
      />
      <el-table-column
        v-if="roleCheck(levelMap.SuperAdmin)"
        label="评分(100)"
        prop="score"
        align="center"
      />
      <el-table-column
        v-if="roleCheck(levelMap.SuperAdmin)"
        label="考察时间"
        prop="inspect_time"
        align="center"
        :formatter="timezoneFormatter"
      />
      <el-table-column label="生产周期(天)" prop="leadtime" align="center" />

      <el-table-column
        v-if="roleCheck(levelMap.SuperAdmin)"
        label="操作"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
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
        <el-form-item label="分类">
          <el-select
            v-model="temp.categoryId"
            class="filter-item"
            placeholder="选择分类"
          >
            <el-option
              v-for="item in categoryOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="供应商">
          <el-select
            v-model="temp.companyId"
            class="filter-item"
            placeholder="选择供应商"
            filterable
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
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { commonRequest } from '@/api/common'
import { timezoneFormatter } from '@/common/formatter'
import { roleCheck } from '@/common/rolePermission'
import { levelMap } from '@/common/options'
import { mapGetters } from 'vuex'

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
      actionUrl: 'v1/production/company',
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {},
      dialogFormVisible: false,
      dialogStatus: '',
      downloadLoading: false,
      textMap: {
        create: '添加'
      },
      dataForm: [],
      rules: {
        type: [{ required: true, message: '分类为必选项' }],
        companyId: [{ required: true, message: '供应商为必选项' }]
      },
      temp: {},
      levelMap: levelMap,
      categoryOptions: [],
      companyOptions: []
    }
  },

  computed: {
    ...mapGetters([])
  },
  mounted() {
    this.getOptions({})
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      commonRequest('get', this.actionUrl, {
        ...this.listQuery,
        type: this.type
      }).then((res) => {
        const rows = res.data.rows
        this.list = rows.map((o) => {
          return {
            ...o,
            ...o.category,
            ...o.companyInfo,
            categoryName: o.category.name,
            companyName: o.companyInfo.name,
            id: o.id
          }
        })
        this.total = res.data.count
        this.listLoading = false
      })
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.temp = {}
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
      commonRequest('delete', this.actionUrl + '/' + row.id, null, {
        ids: [row.id]
      }).then((res) => {
        this.getList()
      })
    },
    sortChange() {},
    getOptions(params) {
      // 分类数据
      const cateOpt = { type: this.type }
      if (params.categoryKeyword) {
        cateOpt.keyword = params.categoryKeyword
      }
      commonRequest('get', 'v1/searchAll/category', cateOpt).then((res) => {
        this.categoryOptions = res.data
      })
      // 供应商数据
      const compOpt = {}
      if (params.companyKeyword) {
        compOpt.keyword = params.companyKeyword
      }
      compOpt.productType = this.type
      commonRequest('get', 'v1/searchAll/company', compOpt).then((res) => {
        this.companyOptions = res.data
      })
    },
    // ======formatter
    timezoneFormatter(row, column) {
      return timezoneFormatter(row[column.property])
    },
    roleCheck(params) {
      return roleCheck(params)
    }
  }
}
</script>
