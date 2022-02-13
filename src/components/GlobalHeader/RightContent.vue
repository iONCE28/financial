<template>
  <div :class="wrpCls">
    <a-space size="middle">
      <screenfull/>
      <avatar-dropdown :menu="showMenu" :current-user="currentUser" :class="prefixCls"/>
      <!-- 暂只支持中文，国际化可自行扩展 -->
    </a-space>
  </div>
</template>

<script>
import AvatarDropdown from './AvatarDropdown'
import Screenfull from '@/components/Screenfull'
import SelectLang from '@/components/SelectLang'

export default {
  name: 'RightContent',
  components: {
    AvatarDropdown,
    Screenfull,
    SelectLang
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-global-header-index-action'
    },
    isMobile: {
      type: Boolean,
      default: () => false
    },
    topMenu: {
      type: Boolean,
      required: true
    },
    theme: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showMenu: true,
      currentUser: {},
    }
  },
  computed: {
    wrpCls() {
      return {
        'ant-pro-global-header-index-right': true,
        [`ant-pro-global-header-index-${(this.isMobile || !this.topMenu) ? 'light' : this.theme}`]: true
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.currentUser = {
        name: 'RuoYi'
      }
    }, 1500)
  },
  methods: {}
}
</script>
