<script>
    import ConfirmButton from "../../components/Buttons/ConfirmButton.svelte"
    import Input from "../../components/Inputs/Input.svelte"
     
    import { Link, navigate } from 'svelte-routing';
    import { notifications } from "../../../scripts/Notification/notification";
    import Toast from "../../components/Toast/Toast.svelte";

    import { authenticated } from '../../stores/auth.js';

        let email,password;
        let user;
       
        async function login(){
            if (email == undefined || password == undefined) {
                notifications.danger("All fields are required to be filled out",3000);
            }else{
                const res = await fetch('http://localhost:3000/api/login', {
			method: 'POST',
			body: JSON.stringify({email,password}),
            headers:{
                'Content-Type': 'application/json'
            },
		});
		authenticated.set(false);
        if(res.status === 200){
            alert("We Use cookies");
            authenticated.set(true);
            const content = await res.json();
            notifications.success("You are now logged in!",3000);
           user = {
                'email':content.email,
                'firstname':content.firstname,
                'lastname':content.lastName,
                'token':content.my_token
            }
            window.localStorage.setItem('userinfo',JSON.stringify(user));
            navigate('/dashboard',{replace: true})
            window.location.reload();
        }else if(res.status === 401){
            authenticated.set(false);
            notifications.danger("Wrong Password",3000);
            navigate('/',{replace: true})
        }else if(res.status === 400){
            authenticated.set(false);
            notifications.danger("Wrong Username",3000);
            navigate('/',{replace: true})
        } else{
            authenticated.set(false);
            navigate('/error',{replace: true})
        }   
     }        
}       
</script>

<div id="registerForm" class="h-screen  bg-cover bg-center flex justify-center items-center" style="background-image: url('img/Bike.jpg');">
	<div class="lg:w-2/5 md:w-1/2 w-2/3">
		<div class="bg-black p-10 rounded-lg shadow-lg min-w-full opacity-70">
			<h1 class="text-center text-2xl mb-6 text-fuchsia-500 font-bold font-sans">Login</h1>
                <Input label="E-Mail" bind:value={email} type="text" required/>
                <Input label="Password" bind:value={password} type="password" required/>
			    <ConfirmButton on:click={login}>Confirm</ConfirmButton>
                <Toast/>
                <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered? <Link to="/register" class="text-fuchsia-500 hover:underline dark:text-blue-500">Create
                        account</Link>
            </div>
        </div>
	</div>
</div>