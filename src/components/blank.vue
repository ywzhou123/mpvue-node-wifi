<template>
  <div class="blank" :style="{height}"></div>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: '10px'
    }
  }
}
</script>

<style scoped>
.blank{
  width: 100%;
}
</style>
