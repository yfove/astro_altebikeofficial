<script>
  export let slug;
  const fetchImage = (async () => {
    const response = await fetch("/api/views?" + new URLSearchParams({ slug }));
    return await response.json();
  })();
</script>

{#await fetchImage then data}
  <span>{data.count}</span>
  console.log{data.count}
{:catch}
  <span></span>
{/await}