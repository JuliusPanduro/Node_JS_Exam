<script>
    export let label
    export let value
</script>

<div class="relative mb-4">
    <label for={label} class="text-fuchsia-500 font-semibold block my-3 text-md">{label}</label>
    <input bind:value id={label} name={label} {...$$restProps} 
    class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 border-gray-120 focus:border-blue-400 text-base outline-none text-black-100 leading-8 transition-colors duration-200 ease-in-out">
  </div>