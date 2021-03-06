<template>
  <page-header-wrapper>
    <template v-slot:content>
      <div class="page-header-content">
        <div class="avatar">
          <a-avatar size="large" :src="avatar"/>
        </div>
        <div class="content">
          <div class="content-title">
            {{ timeFix }}，{{ nickname }}<span class="welcome-text"></span>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:extraContent>
    </template>
  </page-header-wrapper>
</template>

<script>
import { timeFix } from '@/utils/util'
import { mapGetters } from 'vuex'
import { PageHeaderWrapper } from '@/components/ProLayout'
import ruoyiLogo from '@/assets/projects/ruoyi.png'
import antdvLogo from '@/assets/projects/antdv.png'
import { getUserProfile } from '@/api/system/user'

export default {
  name: 'Index',
  components: {
    PageHeaderWrapper
  },
  data () {
    return {
      // 贡献者
      contributors: [
        {
          name: 'wangze',
          avatar: 'https://portrait.gitee.com/uploads/avatars/user/1662/4988475_fuzui_1586973704.png!avatar60',
          email: '73400@163.com'
        }
      ],
      // 赞助
      sponsorList: [
        {
          key: 'RuoYi',
          tab: 'RuoYi'
        },
        {
          key: 'Antdv',
          tab: 'Antdv'
        }
      ],
      noTitleKey: 'RuoYi',
      timeFix: timeFix(),
      // 用户信息
      user: {
        dept: {
          deptName: ''
        }
      },
      roleGroup: {},
      postGroup: {},
      // 致谢项目
      projects: [
        {
          logo: ruoyiLogo,
          name: 'RuoYi-Vue',
          description: '基于SpringBoot，Spring Security，JWT，Vue & Element 的前后端分离权限管理系统。',
          website: 'http://ruoyi.vip',
          downloadUrl: 'https://gitee.com/y_project/RuoYi-Vue'
        },
        {
          logo: antdvLogo,
          name: 'Ant Design Vue',
          description: 'An enterprise-class UI components based on Ant Design and Vue. ',
          website: 'https://antdv.com',
          downloadUrl: 'https://github.com/vueComponent/ant-design-vue/'
        },
        {
          logo: antdvLogo,
          name: 'Antd Pro Vue',
          description: 'An out-of-box UI solution for enterprise applications as a Vue boilerplate. based on Ant Design of Vue.',
          website: 'https://pro.antdv.com',
          downloadUrl: 'https://github.com/vueComponent/ant-design-vue/'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'avatar',
      'nickname'
    ])
  },
  created () {
    this.getUser()
  },
  mounted () {
  },
  methods: {
    // 获取用户信息
    getUser () {
      getUserProfile().then(response => {
        this.user = response.data
        this.roleGroup = response.roleGroup
        this.postGroup = response.postGroup
      })
    },
    onSponsorTabChange (key, type) {
      this[type] = key
    }
  }
}
</script>

<style lang="less" scoped>
  @import "./index.less";
  blockquote {
    padding: 0 1em;
    color: #6a737d;
    border-left: 0.25em solid #dfe2e5;
  }
  .project-list {

    .card-title {
      font-size: 0;

      a {
        color: rgba(0, 0, 0, 0.85);
        margin-left: 12px;
        line-height: 24px;
        height: 24px;
        display: inline-block;
        vertical-align: top;
        font-size: 14px;

        &:hover {
          color: #1890ff;
        }
      }
    }

    .card-description {
      color: rgba(0, 0, 0, 0.45);
      height: 66px;
      line-height: 22px;
      overflow: hidden;
    }

    .project-item {
      display: flex;
      margin-top: 8px;
      overflow: hidden;
      font-size: 12px;
      height: 20px;
      line-height: 20px;

      a {
        color: rgba(0, 0, 0, 0.45);
        display: inline-block;
        flex: 1 1 0;

        &:hover {
          color: #1890ff;
        }
      }

      .download {
        color: rgba(0, 0, 0, 0.25);
        flex: 0 0 auto;
        float: right;
      }
    }

    .ant-card-meta-description {
      color: rgba(0, 0, 0, 0.45);
      height: 44px;
      line-height: 22px;
      overflow: hidden;
    }
  }

  .item-group {
    padding: 20px 0 8px 24px;
    font-size: 0;

    a {
      color: rgba(0, 0, 0, 0.65);
      display: inline-block;
      font-size: 14px;
      margin-bottom: 13px;
      width: 25%;
    }
  }

  .members {
    a {
      display: block;
      margin: 12px 0;
      line-height: 24px;
      height: 24px;

      .member {
        font-size: 14px;
        color: rgba(0, 0, 0, .65);
        line-height: 24px;
        max-width: 100px;
        vertical-align: top;
        margin-left: 12px;
        transition: all 0.3s;
        display: inline-block;
      }

      &:hover {
        span {
          color: #1890ff;
        }
      }
    }
  }

  .mobile {

    .project-list {

      .project-card-grid {
        width: 100%;
      }
    }

    .more-info {
      border: 0;
      padding-top: 16px;
      margin: 16px 0 16px;
    }

    .headerContent .title .welcome-text {
      display: none;
    }
  }

</style>
