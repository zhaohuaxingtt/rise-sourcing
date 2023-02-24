<template>
  <div class="imageList" ref="imageList">
    <div class="image" v-for="(image, $index) in images" :key="$index">
      <div v-if="image.filePath" v-loading="loadingObj[image.uploadId]" class="imageWrapper">
        <img :id="`image_${ $index }`" :src="image.filePath" :alt="image.fileName" @click="jumpImg(image.filePath)">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      loadingObj: {}
    }
  },
  created() {
    this.imageLoad()
  },
  watch: {
    images() {
      this.imageLoad()
    },
    loadingObj: {
      handler() {
        Object.keys(this.loadingObj).forEach(key => {
          this.$set(this.loadingObj, key, false)
        })
      },
      deep: true
    }
  },
  methods: {
    imageLoad() {
      this.images.forEach((item, index) => {
        this.$set(this.loadingObj, item.uploadId, true)
        this.$nextTick(() => {
          const imgDom = this.$refs.imageList.querySelector(`#image_${ index }`)
          imgDom.addEventListener("load", () => {
            this.$set(this.loadingObj, item.uploadId, false)
          })
          imgDom.addEventListener("error", () => {
            this.$set(this.loadingObj, item.uploadId, false)
          })
        })
      })
    },
    jumpImg(path) {
      window.open(path, "_blank")
    }
  }
}
</script>

<style lang="scss" scoped>
.imageList {
  .image + .image {
    margin-top: 20px;
  }

  .imageWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
    border: 1px solid #333;
  }

  img {
    text-decoration: underline;
    color: #1763f7;
    cursor: pointer;
    max-width: 100%;
  }
}
</style>