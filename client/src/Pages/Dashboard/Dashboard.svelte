<script>
    import { Link } from 'svelte-routing';

    import { onMount } from 'svelte';
    import { authenticated } from '../../stores/auth.js';

    import HomeNavbar from "../../components/Navbars/HomeNavbar.svelte";

    onMount(async () =>{
        prompt("We use cookies") //TODO: Make a better banner for allow cookies / or maybe delete since we are using localstorage ?
        const jwtToken = window.localStorage.getItem('token');
        
        const res = await fetch('http://localhost:3000/api/auth', { 
        method: 'get', 
        headers: {'Authorization': `Bearer ${jwtToken}`}
        });

       if(res.status === 200){
           authenticated.set(true);
        }
        else {
            authenticated.set(false)
        };
    })
   
</script>
<HomeNavbar/>

