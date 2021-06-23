<script>
  import { getContext } from "svelte";
  import { solaceContextKey } from "../solace/client";

  const { getSolaceClient } = getContext(solaceContextKey);
  let solaceClient = getSolaceClient();

  let enRouteMetric = "";
  let onGroundMetric = "";

  //let data_table = {
  //  AAL1111: { horizontal: "foo", vertical: "bar", speed: "baz", time: "current time" },
  //  UAL102: { horizontal: "foo", vertical: "bar", speed: "baz", time: "current time" },
  //  DAL224: { horizontal: "foo", vertical: "bar", speed: "baz", time: "current time" },
  //};
  

  let data_table = {};

  const handler_enRouteMetrics = (message) => updateEnRouteMetrics(parse(message));
  const handler_onGroundMetrics = (message) => updateOnGroundMetrics(parse(message));
  const handler_eventC = (message) => updateData_tableC(parse(message));
  const handler_horizontalProfile = (message) => updateData_horizontalProfile(message);
  const handler_verticalProfile = (message) => updateData_verticalProfile(message);
  const handler_speedProfile = (message) => updateData_speedProfile(message);
  const handler_timeProfile = (message) => updateData_timeProfile(message);

  function updateEnRouteMetrics(value) {
    enRouteMetric = value;
  }

  function updateOnGroundMetrics(value) {
    // this mock example would update eventObj's key to the new eventObj value
    onGroundMetric = value;
  }

  function updateData_tableC(eventObj) {
    // this mock example would update eventObj's key to the new eventObj value
    //data_tableA = { ...data_tableA, [eventObj[id]]:  };
  }

  function updateData_horizontalProfile(eventObj) {
    let acid = eventObj.getUserPropertyMap().getField("acid").getValue();
    let profileValue = parse(eventObj);

    let profileObj = data_table[acid];
    profileObj = { ...profileObj, horizontal: profileValue};

    data_table = { ...data_table, [acid]: profileObj};
  }

  function updateData_verticalProfile(eventObj) {
    let acid = eventObj.getUserPropertyMap().getField("acid").getValue();
    let profileValue = parse(eventObj);

    let profileObj = data_table[acid];
    profileObj = { ...profileObj, vertical: profileValue};

    data_table = { ...data_table, [acid]: profileObj};
  }

  function updateData_speedProfile(eventObj) {
    let acid = eventObj.getUserPropertyMap().getField("acid").getValue();
    let profileValue = parse(eventObj);

    let profileObj = data_table[acid];
    profileObj = { ...profileObj, speed: profileValue};

    data_table = { ...data_table, [acid]: profileObj};
  }

  function updateData_timeProfile(eventObj) {
    let acid = eventObj.getUserPropertyMap().getField("acid").getValue();
    let profileValue = parse(eventObj);

    let profileObj = data_table[acid];
    profileObj = { ...profileObj, time: profileValue};

    data_table = { ...data_table, [acid]: profileObj};
  }

  function parse(message) {
    let container = message.getSdtContainer();
    if (container != null) {
      return container.getValue();
    } else {
      return JSON.parse(message.getBinaryAttachment());
    }
  }

  function getAcid(message) {
    return message.getUserPropertyMap().getField("acid");
  }

  // runs when either  solaceClient or exchangeFeedStates updates
  $: if ($solaceClient) {
    $solaceClient.subscribe(`fmds/metrics/enRoute`, handler_enRouteMetrics);
    $solaceClient.subscribe(`fmds/metrics/onGround`, handler_onGroundMetrics);
    $solaceClient.subscribe(`fmds/service/horzprofile/>`, handler_horizontalProfile);
    $solaceClient.subscribe(`fmds/service/vertprofile/>`, handler_verticalProfile);
    $solaceClient.subscribe(`fmds/service/speedprofile/>`, handler_speedProfile);
    $solaceClient.subscribe(`fmds/service/timeprofile/>`, handler_timeProfile);
  }
</script>

<div class="w-full h-full p-4">
  <div class="grid grid-cols-2 gap-5">
    <table>
      <tbody>
        <tr>
          <td>
            <p>En-Route Aircraft Metrics</p>
            <p>{enRouteMetric}</p>
          </td>
        </tr>
        <tr>
          <td>
            <button>Reset En-Route Metrics</button>
          </td>
        </tr>
      </tbody>
    </table> 
    <table>
      <tbody>
        <tr>
          <td>
            <p>On Ground Aircraft Metrics</p>
            <p>{onGroundMetric}</p>
          </td>
        </tr>
        <tr>
          <td>
            <button>Reset On Ground Metrics</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="mt-4 overflow-y-auto max-h-32" >
    <table>
      <thead>
        <tr>
          <th>ACID</th>
          <th>Horizontal Profile</th>
          <th>Vertical Profile</th>
          <th>Speed Profile</th>
          <th>Time Profile</th>
        </tr>
      </thead>
      <tbody>
        {#each Object.keys(data_table) as key}
          <tr>
            <td>
              {key}
            </td>
            <td>
              {data_table[key]["horizontal"]}
            </td>
            <td>
              {data_table[key]["vertical"]}
            </td>
            <td>
              {data_table[key]["speed"]}
            </td>
            <td>
              {data_table[key]["time"]}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  
</div>

<style>
  table {
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }
</style>
