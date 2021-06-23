<script>
  import { selectedWidget, solaceConnectionWidgetMachine } from "../stores";
  const { state } = $solaceConnectionWidgetMachine;
  import SvgSolace from "./icons/SvgSolace.svelte";

  function handleSelection(widget) {
    if ($selectedWidget == widget) {
      selectedWidget.set("");
    } else {
      selectedWidget.set(widget);
    }
  }
</script>

<div class="flex flex-col items-center bg-gray-500">
  <div class="h-12 p-2">
    <SvgSolace />
  </div>
  <button
    class="flex flex-col items-center w-full p-2 text-lg mt-2"
    class:unselected={$selectedWidget != "solace-connection"}
    class:selected={$selectedWidget == "solace-connection"}
    on:click={() => handleSelection("solace-connection")}
  >
    <div class="h-8 mr-1">
      <svg class="h-full" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
          clip-rule="evenodd"
        /></svg
      >
    </div>
    Connection
  </button>
</div>

<style lang="postcss">
  .unselected {
    @apply text-gray-300 hover:text-gray-50 focus:text-gray-50 active:text-gray-50;
  }

  .unselected:active {
    box-shadow: 4px 0 0 rgba(156, 163, 175, var(--tw-text-opacity)) inset;
  }

  .selected {
    box-shadow: 4px 0 0 rgba(5, 150, 105, var(--tw-bg-opacity)) inset;
    @apply text-gray-50 bg-[rgba(5,150,105,0.2)];
  }
</style>
