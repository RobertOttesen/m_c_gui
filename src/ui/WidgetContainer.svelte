<script>
  import { selectedWidget } from "../stores";
  import SolaceConnectionWidget from "./widgets/SolaceConnectionWidget.svelte";
</script>

<div class="h-full p-4 bg-gray-100 border-r border-gray-300 w-[600px]">
  {#if $selectedWidget == "solace-connection"}
    <SolaceConnectionWidget />
  {/if}
</div>
