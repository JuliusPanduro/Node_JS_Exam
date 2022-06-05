<script>
	import Tailwindcss from './Tailwindcss.svelte';

	import { Router, Route, Link } from 'svelte-routing';
	import ProtectedRoute from './Routes/ProtectedRoute.svelte';

	import UserRegistration from "./Pages/UserRegistration/UserRegistration.svelte";
	import UserLogin from "./Pages/UserLogin/UserLogin.svelte";

	import Chat from "./Pages/Chat/Chat.svelte";

	import Dashboard from "./Pages/Dashboard/Dashboard.svelte";

	import { onMount } from "svelte";

	//import authenicated from './stores/auth.js';

	import { Shadow } from "svelte-loading-spinners";

</script>

<Tailwindcss/>



<main>
		<Router>
		<Route path="/" component={UserLogin}/>
		<Route path="/dashboard" component={Dashboard}/>
		<Route path="/register" component={UserRegistration}/>
	</Router>
	
		<!--
			##ORIGINAL FOR USEAGE
				<Router>
		<Route path="/" component={UserLogin}/>
		<Route path="/dashboard" component={Dashboard}/>
		<Route path="/register" component={UserRegistration}/>
	</Router>
	
			
			
			{#if authenicated === true }
		<Router>
			<Route path="/dashboard" component={Dashboard}/>
		</Router>
		{:else}
		<Router>
			<Route path="/" component={UserLogin}/>
			<Route path="/register" component={UserRegistration}/>
		</Router>
	{/if}
	
		
	
		
		<UserRegistration />
	{#if username === false}
	<UserLogin/>
	{:else if username}
	<div id="loading"><Shadow color="#ff0062"/></div>
	{:else}
	<div>You are now registered {username}</div>
	{/if}-->
</main>


<style>
	main {
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;

	}

	#loading{
        color: #ff0062;
		min-width: 100vw;
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>