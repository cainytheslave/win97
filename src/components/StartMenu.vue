<script setup>
</script>

<template>
  <div class="window absolute origin-bottom-left bottom-full left-0 min-h-80 min-w-48 flex items-stretch">
    <div class="relative bg-blue-900 w-7">
      <span class="absolute text-white text-lg -rotate-90 origin-top-left left-0 -bottom-5">
        <span class="font-bold">Windows</span><span>97</span>
      </span>
    </div>
    <div class="window-body flex grow p-0 m-0 flex-col">
        <button class="flex hover:bg-blue-900 shadow-none px-2 py-1 border-none gap-1 hover:text-white w-full items-center">
          <img alt='' class="h-8" src='../assets/icons/windows_update.png'>
          <p>Windows Update</p>
        </button>
      <hr class="my-1 border-t-0 mx-1 shadow h-[2px] border-b-white border-b bg-gray-500">
      <button class="flex hover:bg-blue-900 shadow-none px-2 py-1 border-none gap-2 hover:text-white w-full items-center">
        <img alt='' class="h-8" src='../assets/icons/programs.png'>
        <p>Programme</p>
        <span class='arrow-right border-gray-400 ml-auto'></span>
      </button>
      <button class="flex hover:bg-blue-900 shadow-none px-2 py-1 border-none gap-2 hover:text-white w-full items-center">
        <img alt='' class="h-8" src='../assets/icons/favourites.png'>
        <p>Favoriten</p>
        <span class='arrow-right border-gray-400 ml-auto'></span>
      </button>
      <button class="flex hover:bg-blue-900 shadow-none px-2 py-1 border-none gap-2 hover:text-white w-full items-center">
        <img alt='' class="h-8" src='../assets/icons/documents.png'>
        <p>Dokumente</p>
        <span class='arrow-right border-gray-400 ml-auto'></span>
      </button>
    </div>
  </div>
</template>

<style scoped>

.arrow-right {
  width: 0;
  height: 0;
  border-top: 0.3rem solid transparent;
  border-bottom: 0.3rem solid transparent;
  border-left: 0.3rem solid;
}


</style>