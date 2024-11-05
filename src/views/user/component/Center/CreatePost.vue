<template>
    <div>
        <div class="create-post bg-slate-50 p-4 mb-4 shadow-md rounded">
              <div class="flex items-center mb-2">
                <el-avatar
                  src="https://scontent.fhan5-8.fna.fbcdn.net/v/t39.30808-1/387170140_3580604612187484_8307147231547720618_n.jpg?stp=dst-jpg_s200x200&_nc_cat=106&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=eAh7WAZoSmUQ7kNvgFo6EAZ&_nc_zt=24&_nc_ht=scontent.fhan5-8.fna&_nc_gid=A0p_b-DxjA2mE9LI5ILEjxj&oh=00_AYBBzUeh5HKdA2Pr1TBCvveWkmpNp02BOQWDzKz54qUs7A&oe=67231860"
                  size="large"
                />
                <input
                  type="text"
                  placeholder="What's on your mind?"
                  class="ml-2 w-full p-2 border rounded"
                />
              </div>
              <div class="flex space-x-4 mb-2">
                <el-upload action="/upload" list-type="picture">
                  <el-button size="small" type="primary">Upload Image</el-button>
                </el-upload>
                <el-upload action="/upload" list-type="picture">
                  <el-button size="small" type="primary">Upload Video</el-button>
                </el-upload>
              </div>
              <el-button type="primary">Post</el-button>
            </div>
    </div>
</template>
<script setup lang="ts">

</script>
<style lang="scss">
    
</style>