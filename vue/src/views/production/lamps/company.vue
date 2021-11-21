<template>
  <div>
    <company-bind :type="type" />
  </div>
</template>
<script>
import CompanyBind from '../common/companyBind'
import { productionMap } from '@/common/options'

export default {
  components: {
    CompanyBind
  },
  data() {
    return {
      type: productionMap.Lamps
    }
  }
}
</script>
