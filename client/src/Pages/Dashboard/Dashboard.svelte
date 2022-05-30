<script>
    import { Link } from 'svelte-routing';

    import { onMount } from 'svelte';
    import { authenticated } from '../../stores/auth.js';

    import HomeNavbar from "../../components/Navbars/HomeNavbar.svelte";

    let tmp = ''; //TODO remove

    onMount(async () =>{
        const jwtToken = window.localStorage.getItem('token');
        
        const res = await fetch('http://localhost:3000/api/auth', { 
        method: 'get', 
        headers: {'Authorization': `Bearer ${jwtToken}`}
        });

       if(res.status === 200){
           authenticated.set(true);
            tmp = 'yes' //TODO remove
        }
        else {
            authenticated.set(false)
            tmp = 'no' //TODO remove
        };
    })
   
</script>
<HomeNavbar/>
<h1>
    Welcome to the dashboard
</h1>
<h2>
    Go to <Link to="/">Home</Link>
</h2>