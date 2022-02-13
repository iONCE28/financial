<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <span>底部</span>
    </template>
    <template v-slot:copyright>
      <a href="#" target="_blank">ProGlobalFooter</a>
    </template>
  </global-footer>
</template>

<script>
import {GlobalFooter} from '@/components/ProLayout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>
