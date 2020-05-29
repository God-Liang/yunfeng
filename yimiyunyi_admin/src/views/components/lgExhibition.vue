<template lang="pug">
  .lgExhibition
    el-row.row(:gutter="20")
      el-col.col(:span="item.ratio" :xs="24" v-for="(item, index) in exhibitionData" :key="index")
        .exhibitionBox(:class="item.ratio === 24 ? 'ratio24' : ''" @click="click(item, index)")
          img.img_l(:src="item.img")
          .con_r
            .con_r_num(v-if="item.nums && item.nums.length > 0")
              CountTo(v-for="(num, i) in item.nums" :key="i" :startVal='0' :endVal='Number(num)' :suffix="i===item.nums.length-1?item.unit:'/'")
            .con_r_num(v-else)
              CountTo(:startVal='0' :endVal='item.num' :suffix="item.unit")
            .con_r_title(v-if="item.titles && item.titles.length > 0")
              span(v-for="(title, i) in item.titles" :key="i")
                template(v-if="i===item.titles.length-1") {{title}}
                template(v-else) {{title}}/
            .con_r_title(v-else) {{item.title}}
</template>
<script>
import CountTo from 'vue-count-to'
export default {
  name: 'LgExhibition',
  components: {
    CountTo
  },
  props: {
    exhibitionData: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  watch: {
    exhibitionData: {
      handler(newVal, oldVal) {
        const reg = RegExp(/\//)
        if (newVal) {
          newVal.map(e => {
            if (e.nums) return
            e.nums = reg.test(e.num) ? e.num.split('/') : null
            e.titles = reg.test(e.title) ? e.title.split('/') : null
          })
        }
      },
      deep: true
    }
  },
  methods: {
    click(item, index) {
      const data = {
        data: item,
        index: index
      }
      this.$emit('click', data)
    }
  }
}
</script>
<style lang="scss">
  .lgExhibition {
    .row {
      .col {
        .exhibitionBox {
          background: #fff;
          height: 120px;
          border-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          &.ratio24 {
            justify-content: flex-start;
            padding-left: 20px;
            .con_r {
              padding-left: 30px !important;
            }
          }
          .img_l {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: block;
          }
          .con_r {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding-left: 30px;
            &_num {
              font-size: 30px;
              font-weight: bold;
              color: #333;
              display: inline-flex;
            }
            &_title {
              font-size: 16px;
              color: #888;
              margin-top: 15px;
            }
          }
        }
      }
    }
  }
  @media screen and (min-width: 1100px) and (max-width: 1200px) {
    .con_r {
      padding-left: 10px !important;
    }
  }
  @media screen and (min-width: 993px) and (max-width: 1100px) {
    .con_r {
      padding-left: 0px !important;
    }
  }
  @media screen and (min-width: 960px) and (max-width: 993px) {
    .con_r {
      padding-left: 10px !important;
    }
  }
  @media screen and (max-width: 960px) {
    .con_r {
      padding-left: 0px !important;
    }
  }
  @media screen and (max-width: 768px) {
    .col {
      .exhibitionBox {
        justify-content: space-between !important;
        padding: 0 20px;
        margin-bottom: 20px;
      }
      &:last-child {
        .exhibitionBox {
           margin-bottom: 0px;
        }
      }
    }
    .con_r {
      justify-content: flex-start !important;
      align-items: flex-end !important;
    }
  }
</style>
