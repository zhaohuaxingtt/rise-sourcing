<template>
  <div class="imageList" ref="imageList">
    <div class="image" v-for="(image, $index) in images" :key="$index">
      <div v-if="image.filePath" v-loading="image.loading" class="imageWrapper">
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
  created() {
    this.imageLoad()
  },
  watch: {
    images() {
      this.imageLoad()
    }
  },
  methods: {
    imageLoad() {
      this.images.forEach((item, index) => {
        this.$set(item, "loading", true)
        this.$nextTick(() => {
          const imgDom = this.$refs.imageList.querySelector(`#image_${ index }`)
          imgDom.addEventListener("load", () => {
            this.$set(item, "loading", false)
          })
          imgDom.addEventListener("error", () => {
            this.$set(item, "loading", false)
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
  }
}
</style>