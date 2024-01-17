---
title: 'Azure Functions Cheatsheets'
date: '2022-11-07 14:10:00'
summary: ''
authors: ['saeed-salehi']
theme: 'blue'
series: 'az-204-cheatsheets'
hideInArticleList: true
---

Azure Functions lets you develop serverless applications on Microsoft Azure requires general Azure Storage Account

- Azure Blob
- Queue
- Files and Table storage.

## Difference with Azure Logic Apps

For Azure Functions, you develop orchestrations **by writing code** and using the Durable Functions extension.
For Logic Apps, you create orchestrations by using a **GUI or editing configuration files** (workflow).

### Logic Apps

- **Logic App code View**: extend definitions you use Logic App code View
- **Integrate the workflow**: Enterprise Integration Pack (_EIP_)
-

## Hosting Plans

- **Consumption plan**: Default, only pay for compute resources when your functions are running (1.5 GB or memory / 1 CPU )
- **Premium plan**: pre-warmed workers
- **Dedicated plan**: run your function within a AppService - price can be _predictive_, Best for long-running (Always on should be enabled!)

## Deployment

- AppService Environment (ASE)
- Kubernetes (KEDA)

## Scaling

**_scale controller_** to monitor the rate of events (scale out / in)
latency of scaling from zero to one - cold start

### Scaling behaviors

- **Maximum instances: 200**
- **New instance rate:** new instances allocated HTTP: once per second / Non-Http: once on every 30 seconds

limit scale out by setting `functionAppScaleLimit` parameter to 0 / null or a valid number

Each function contains:

- Code
- Config (function.json)

Code should be placed in Root and root folder should contains a
host.json file contains runtime-specific configuration

### triggers and bindings

- **Trigger**: what cause a function to run. **must have** exactly 1 trigger!
- **Binding**: way of connecting another resource (input bindings, output bindings, or both)

  Sample

```json
{
  "bindings": [
    {
      "type": "queueTrigger",
      "direction": "in",
      "name": "order",
      "queueName": "myqueue-items",
      "connection": "MY_STORAGE_ACCT_APP_SETTING"
    },
    {
      "type": "table",
      "direction": "out",
      "name": "$return",
      "tableName": "outTable",
      "connection": "MY_TABLE_STORAGE_ACCT_APP_SETTING"
    }
  ]
}
```

Types of binding expressions (`path` parameter in `function.json`)

- app settings (`% sign`)
  - The `connection` property of triggers and bindings is a special case and **automatically resolves values as app settings**, without percent signs.
- filename `{filename}`
- Trigger metadata
- JSON payloads
- Dot notation
- Create GUIDs `{rand-guid}`
- Current time `{DateTime}`

Return Value using `$return` in `function.json`

### Connect functions to Azure services

Environment variables default configuration provider

- Application Settings in azure function service
- local setting file

**_Identity-based connections are not supported with Durable Functions._**

### Authorization Levels

- **Anonymous** - No Api Key required.
- **function** - a function-specific API key is required (default)
- **Admin** - the _master key_ is required

## Durable Functions

a.k.a **stateful functions**

### Application patterns

- **Function chaining**:

  a **_sequence of functions_** executes in a specific orde

  the output of one function is applied to the input of another function

- **Fan-out/fan-in**:

  execute multiple functions in **_parallel_** and then wait for all functions to finish

- **Async HTTP APIs**:

  HTTP endpoint trigger the long-running action. Then, redirect the client to a status endpoint that the **_client polls_** to learn when the operation is
  finished

  Function must include `DurableClient` input binding

- **Monitor**:

  recurring process in a **_workflow_**. An example is polling until specific conditions are met

- **Human interaction**:

  Involving humans in an automated process

  timeouts and compensation logic

### Durable Functions types and features

- **Orchestrator functions** describe how actions are executed and the order in which actions are executed

  - different types of actions, including **activity functions**, **sub-orchestrations**, **waiting for external events**, **HTTP**, and **timers**.

- **Activity Function**: basic unit of work in a durable function. `DurableActivityContext` as a parameter
  Activity functions can only have a single value passed to them (Array / Tuple supported!).
  activity functions only guarantee _at least once execution_.
  You can trigger an activity function only from an **orchestrator function**.

- **Entity functions**: reading and updating state . Entities are accessed via a unique identifier Operations on entities require that you specify the `Entity ID` of the target entity, and the `Operation name`,

- **Client functions**: The primary way to deliver these messages is by using an orchestrator client binding, or an entity client binding.
  Any **non-orchestrator function** can be a **client function**.
  What makes a function a client function is its use of the `durable client output binding`
  **Orchestrator** and **entity** functions **cannot be triggered directly using the buttons** in Azure Portal

### Task hubs

logical container for durable storage resources

Task Hub in Azure Storage resources:

- 1 or more control queue
- 1 work-item queue
- 1 history table
- 1 instance table
- 1 storage container (1 or more lease BLOB)

### Durable orchestrations

- define function workflows using procedural code
- call other durable functions synchronously and asynchronously
- Execution progress is automatically checkpointed

### Features and patterns

- Sub-orchestrations
- Durable timers
- External events
- Error handling
- Critical sections (LockAsync)
- Calling HTTP endpoints
- Passing multiple parameters (Array / Tuple)

### Durable Timers

implement delays or to set up timeouts with
`context.CreateTimer`

### Send and wait for events

wait and listen for external events.

handling human interaction or other external triggers

`context.WaitForExternalEvent`

`RaiseEventAsync` method takes `eventName` and `eventData` as parameters. The event data must be **JSON-serializable**.
