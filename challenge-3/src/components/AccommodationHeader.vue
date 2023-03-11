<template>
  <div class="block flex flex-col md:flex-row md:space-x-2 px-2 lg:p-0">
    <span
      class="mb-4 md:mb-0 w-full md:w-2/3 relative rounded inline-block"
      style="height: 24em"
    >
      <div
        class="absolute left-0 bottom-0 w-full h-full z-10 image-shadow"
      ></div>
      <img
        src="https://static.onecms.io/wp-content/uploads/sites/28/2017/07/4-four-seasons-bali-jimbaran-bay-WBRESINDO0517.jpg"
        class="absolute left-0 top-0 w-full h-full rounded z-0 object-cover"
      />
      <div class="p-4 absolute bottom-0 left-0 z-20">
        <span
          class="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2"
          >Hotel</span
        >
        <h2 class="text-4xl font-semibold text-gray-100 leading-tight">
          Pellentesque a consectetur velit, ac molestie ipsum. Donec sodales,
          massa et auctor.
        </h2>
        <div class="flex mt-3">
          <img
            src="https://media.licdn.com/dms/image/C5103AQEWhtap6HtYNg/profile-displayphoto-shrink_800_800/0/1549250666346?e=2147483647&v=beta&t=URl8b_rIbutLXWoGvqQIDqy6_zysZ71A7klWmGBfDRc"
            class="h-10 w-10 rounded-full mr-2 object-cover"
          />
          <div>
            <p class="font-semibold text-gray-200 text-sm">Chrishell Staus</p>
            <p class="font-semibold text-gray-400 text-xs">15 Aug</p>
          </div>
        </div>
      </div>
    </span>

    <span class="w-full md:w-1/3 relative rounded" style="height: 24em">
      <div class="absolute left-0 top-0 w-full h-full z-10 image-shadow"></div>
      <img
        src="https://santorinidave.com/wp-content/uploads/2017/03/best-hotel-in-sanur-bali-segara-village.jpg"
        class="absolute left-0 top-0 w-full h-full rounded z-0 object-cover"
      />
      <div class="p-4 absolute bottom-0 left-0 z-20">
        <span
          class="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2"
          >Apartment</span
        >
        <h2 class="text-3xl font-semibold text-gray-100 leading-tight">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </h2>
        <div class="flex mt-3">
          <img
            src="https://media.licdn.com/dms/image/C5103AQEWhtap6HtYNg/profile-displayphoto-shrink_800_800/0/1549250666346?e=2147483647&v=beta&t=URl8b_rIbutLXWoGvqQIDqy6_zysZ71A7klWmGBfDRc"
            class="h-10 w-10 rounded-full mr-2 object-cover"
          />
          <div>
            <p class="font-semibold text-gray-200 text-sm">Chrishell Staus</p>
            <p class="font-semibold text-gray-400 text-xs">15 Aug</p>
          </div>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  name: 'AccommodationHeader',
};
</script>

<style scoped>
.image-shadow {
  background-image: linear-gradient(
    180deg,
    transparent,
    rgba(0, 0, 0, 0.7)
  ) !important;
}
</style>
