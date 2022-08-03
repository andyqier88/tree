<template>
  <div>a peach tree's life</div>
  <div class="flex">
    <span v-for="item in seasonArr" 
    :key="item.id" 
    class="flex-1 text-center"
    @click="changeSeason(item)"
    :class="activeTab == item.id ? 'active' : ''"
    >{{ item.name }}</span>
    
    <!-- <span class="flex-1">Summer</span> -->
    
  </div>
  <Spring v-if="activeTab == 1"></Spring>
  <Summer v-if="activeTab == 2"></Summer>
  <Autumn v-if="activeTab == 3"></Autumn>
  <Winter v-if="activeTab == 4"></Winter>
</template>

<script setup lang="ts">
import Spring from './compontents/Spring.vue'
import Summer from './compontents/Summer.vue'
import Autumn from './compontents/Autumn.vue'
import Winter from './compontents/Winter.vue'
interface Item {
  id: number;
  name: string;
}
let activeTab = ref(1);
let seasonArr = [{
  id: 1,
  name: 'Spring'
},{
  id: 2,
  name: 'Summer'
},{
  id: 3,
  name: 'Autumn'
},{
  id: 4,
  name: 'Winter'
}]
function changeSeason(item: Item) {
  activeTab.value = item.id;
}
onMounted(() => {
  // init()
})
</script>

<style>
.active{
  color: green;
  border-bottom: 2px solid green;
}
</style>