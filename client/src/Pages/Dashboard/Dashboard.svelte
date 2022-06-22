<script>
    import { onMount } from 'svelte';
    import { authenticated } from '../../stores/auth.js';

    import HomeNavbar from "../../components/Navbars/HomeNavbar.svelte";
    import Chat from "../../components/Chat/Chat.svelte";
    
    onMount(async () =>{
      //TODO  prompt("We use cookies") //TODO: Make a better banner for allow cookies / or maybe delete since we are using localstorage ?
      //TODO IF AUTH === FALSE REDIRECT UNAUTH PAGE
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
        };
    })
</script>
<HomeNavbar/>
<Chat/>


