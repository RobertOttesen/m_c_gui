<script>
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import { solaceContextKey } from "../solace/client";
  import { selectedWidget } from "../stores";
  import WidgetsPanel from "./WidgetsPanel.svelte";
  import WidgetContainer from "./WidgetContainer.svelte";
  import Content from "./Content.svelte";

  // makes solace client available in context
  let solaceClient = writable(null);
  setContext(solaceContextKey, {
    getSolaceClient: () => solaceClient,
  });
</script>

<div class="w-screen h-screen grid grid-cols-[auto,1fr]">
  <!-- nav sidebar -->
  <WidgetsPanel />
  <!-- content -->
  <div class="flex">
    <!-- optional second sidebar -->
    {#if $selectedWidget}
      <WidgetContainer />
    {/if}
    <!-- content -->
    <Content />
  </div>
</div>
