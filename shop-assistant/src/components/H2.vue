<template>
 <h2><slot></slot></h2>
</template>

<script>
export default {
  name: 'H2A'
}
</script>

<style scoped>
h2 {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  font-weight: 500;
  text-align: left;
  border-bottom: 1px solid #d3d9e1;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
}
</style>
