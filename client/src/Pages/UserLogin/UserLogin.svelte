<script>
    import ConfirmButton from "../../components/Buttons/ConfirmButton.svelte"
    import CancelButton from "../../components/Buttons/CancelButton.svelte"
    import Input from "../../components/Inputs/Input.svelte"
     

    import { Link, navigate } from 'svelte-routing';
    import { notifications } from "../../../scripts/Notification/notification";
    import Toast from "../../components/Toast/Toast.svelte";

        let email,password;
        
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
		
        if(res.status === 200){
            const content = await res.json();
            console.log(content) //TODO AUTH IN FRONTEND USING TOKEN. LOCALSTORAGE OR COOKIES?
            window.localStorage.setItem('token',content.my_token);
            navigate('/dashboard',{replace: true})
        }else if(res.status === 401){
            console.log("Wrong password")
        }else{
            console.log("Access denied")
        }    
     }
            
    }       


        

        //## TODO HREF using ROUTER look at: https://www.youtube.com/watch?v=LOZs0fpr4K4&t=134st
        </script>

<div id="registerForm" class="h-screen bg-gray-50 flex justify-center items-center">
	<div class="lg:w-2/5 md:w-1/2 w-2/3">
		<div class="bg-white p-10 rounded-lg shadow-lg min-w-full">
			<h1 class="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">Login</h1>
                <Input label="E-Mail" bind:value={email} type="text" required/>
                <Input label="Password" bind:value={password} type="password" required/>
			    <ConfirmButton on:click={login}>Confirm</ConfirmButton>
                <Toast/>
                <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered? <Link to="/register" class="text-blue-700 hover:underline dark:text-blue-500">Create
                        account</Link>
                </div>

    </div>
	</div>
</div>

<!--
    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered? <Link to="/register" class="text-blue-700 hover:underline dark:text-blue-500">Create
                        account</Link>
                </div>
-->