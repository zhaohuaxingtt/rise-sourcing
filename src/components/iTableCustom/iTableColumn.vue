<script>
import { Icon } from 'rise'
export default {
  name: 'TableColumn',
  functional: true,
  components: { Icon },
  props: {
    scope: {
      type: Object,
      required: true,
    },
    column: {
      type: Object,
    },
    customRender: {
      type: Function,
    },
    extraData: {
      type: Object,
      default: function() {
        return {}
      },
    },
    prop: {
      type: String,
    },
    childNumVisible: {
      type: Boolean,
      default: false,
    },
  },
  render(h, context) {
    const { props } = context
    const {
      scope,
      customRender,
      column,
      extraData,
      prop,
      childNumVisible,
    } = props
    if (column.type && column.type === 'expanded') {
      const { uniqueId, expanded, childNum, isLeaf } = scope.row
      const paddingLeft = uniqueId.split('-').length * 20
      const iconClass = expanded
        ? 'arrow-icon el-icon-caret-top'
        : 'arrow-icon el-icon-caret-bottom'

      const showChildNum = childNumVisible && childNum > 0
      return (
        <span
          class='cursor-pointer'
          style={{ paddingLeft: paddingLeft + 'px' }}
        >
          {showChildNum && <div class='child-nums'>{childNum}</div>}
          {customRender
            ? customRender(h, scope, column, extraData)
            : scope.row[prop]}
          {!isLeaf && <i class={iconClass}></i>}
        </span>
      )
    }
    return (
      <span class='custom-render'>
        {customRender
          ? customRender(h, scope, column, extraData)
          : scope.row[prop]}
      </span>
    )
  },
}
</script>

<style lang="scss" scoped>
.link-text,
.open-link-text {
  color: $color-blue;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
.arrow-icon {
  color: $color-blue;
  margin-left: 5px;
}
.cursor-pointer {
  cursor: pointer;
}
.child-nums {
  display: inline-block;
  width: 20px;
  height: 24px;
  background: url(~@/assets/images/file-nums-bg.png) center center no-repeat;
  background-size: contain;
  color: #fff;
  text-align: center;
  font-size: 12px;
  margin-right: 5px;
}
</style>
