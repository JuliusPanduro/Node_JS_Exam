<script>
    import { onMount } from 'svelte';
    import { authenticated } from '../../stores/auth.js';

    import HomeNavbar from "../../components/Navbars/HomeNavbar.svelte";
    import Chat from "../../components/Chat/Chat.svelte";
    import { navigate } from 'svelte-routing';
    
    onMount(async () =>{
        const userinfo = window.localStorage.getItem('userinfo');
        const user = JSON.parse(userinfo);
        const jwtToken = user.token;
        const res = await fetch('http://localhost:3000/api/auth', { 
        method: 'get', 
        headers: {'Authorization': `Bearer ${jwtToken}`}
        });

       if(res.status === 200){
        const content = await res.json();
        authenticated.set(true);
        }
        else {
            authenticated.set(false)
            navigate('/error',{replace: true})
        };
    })
</script>
<HomeNavbar/>
<Chat/>


