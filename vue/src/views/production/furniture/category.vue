<template>
  <div>
    <category :type="type" />
  </div>
</template>
<script>
import Category from '../common/category'
import { productionMap } from '@/common/options'

export default {
  components: {
    Category
  },
  data() {
    return {
      type: productionMap.Furniture
    }
  }
}
</script>
