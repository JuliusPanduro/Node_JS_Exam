<script>
    export let label
    export let options;
    export let userSelected = options[0].value;
    export let flexDirection = 'column'
      
    const uniqueID = Math.floor(Math.random() * 100)
    
  </script>
  
  <label for={label} class="text-fuchsia-500 font-semibold block my-3 text-md">{label}</label>

  <div role="radiogroup" 
                   class="group-container text-fuchsia-500"
                   aria-labelledby={`label-${uniqueID}`}
                   style="flex-direction:{flexDirection}" 
                   id={`group-${uniqueID}`}>
                   

    {#each options as { value, label }}
      <input
        class="sr-only"
        type="radio"
        id={(label)}
        bind:group={userSelected}
        value={value} />
      <label for={(label)}> {label} </label>
    {/each}
  </div>
  
  <style>
              :root {
          --accent-color: rgb(229, 0, 255);
          --gray: #ccc;
      }
      
     .group-container {
        border-radius: 2px;
        display: flex;
        flex-direction: row;
      }
  
    label {
      user-select: none;
      line-height: 1.2em;
    }
  
    .sr-only {
      position: absolute;
      clip: rect(1px, 1px, 1px, 1px);
      padding: 0;
      border: 0;
      height: 1px;
      width: 1px;
      overflow: hidden;
    }
  
    input[type="radio"] {
      position: absolute;
    }
  
    input[type="radio"] + label {
      display: block;
      position: relative;
      text-align: left;
    }
  
    input[type="radio"] + label::before {
        content: "";
        position: relative;
        display: inline-block;
        margin-right: 0.5em;
        width: 1em;
        height: 1em;
        background: transparent;
        border: 1px solid var(--gray, #ccc);
        border-radius: 50%;
        top: 0.2em;
    }
  
    input[type="radio"]:checked + label::before {
      border: 1px solid var(--gray, #ccc);
      border-radius: 50%;
    }
  
    input[type="radio"] + label::after {
      content: "";
      position: absolute;
      display: inline-block;
      width: 0.5em;
      height: 0.5em;
      top: 0.45em;
      left: 0.25em;
      background: var(--accent-color, #282828);
      border: 1px solid var(--accent-color, #282828);
      border-radius: 50%;
      transform: scale(0);
    }
  
    input[type="radio"]:checked + label::after {
      opacity: 1;
      transform: scale(1);
    }
  
    input[type="radio"]:focus + label::before {
      box-shadow: 0 0 0 1px var(--accent-color, #282828);
      border-radius: 50%;
    }  
    
    input[type="radio"]:disabled + label {
      color: darken(var(--gray, #ccc), 10);
    }
  
    input[type="radio"]:disabled + label::before {
      background: var(--gray, #ccc);
    } 
  </style>