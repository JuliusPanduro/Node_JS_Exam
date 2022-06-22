<script>
	import Tailwindcss from './Tailwindcss.svelte';

	import { Router, Route } from 'svelte-routing';

	import UserRegistration from "./Pages/UserRegistration/UserRegistration.svelte";
	import UserLogin from "./Pages/UserLogin/UserLogin.svelte";
	import Dashboard from "./Pages/Dashboard/Dashboard.svelte";
</script>

<Tailwindcss/>

<main>

	<Router>
		<Route path="/" component={UserLogin}/>
		<Route path="/dashboard" component={Dashboard}/>
		<Route path="/register" component={UserRegistration}/>
	</Router>
</main>


<style>
	main {
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;

	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>