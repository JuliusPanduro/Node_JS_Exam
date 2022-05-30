<script>
    import Button from "../../components/Buttons/Button.svelte"
    import ConfirmButton from "../../components/Buttons/ConfirmButton.svelte"
    import CancelButton from "../../components/Buttons/CancelButton.svelte"
    import Input from "../../components/Inputs/Input.svelte"
    import RadioGender from "../../components/Inputs/RadioGender.svelte"

    import { Link, navigate } from 'svelte-routing';
    import { notifications } from "../../../scripts/Notification/notification";
    import Toast from "../../components/Toast/Toast.svelte";


    let firstName,lastName,email,password;
	let gender;
	
	const options = [{
		value: 'male',
		label: 'Male',
	}, {
		value: 'female',
		label: 'Female',
	}]

   async function signUp() {
    if(firstName == undefined || lastName == undefined || email == undefined || password == undefined|| gender == undefined){
        notifications.danger("All fields are required to be filled out",3000);
    }else{
        const res = await fetch('http://localhost:3000/api/registeruser' ,{
        method: 'POST',
			body: JSON.stringify({firstName,lastName,email,password,gender}),
            headers:{
                'Content-Type': 'application/json'
            },
		});

      if(res.status === 201){
          const content = await res.json();
          console.log(content);
          //notifications.success("You are now signed up!",100);
          navigate('/',{replace: true});
      }else{
          notifications.danger("User does already exist!",3000);
      }
    }
        
      //USE THE CONTENT TO SOMETHING ?
      //ALSO REDIRECT TO A LOGIN PAGE.
}




function cancel(){
   navigate('/',{replace: true})
 }
</script>

<div id="registerForm" class="h-screen bg-gray-50 flex justify-center items-center">
	<div class="lg:w-2/5 md:w-1/2 w-2/3">
		<div class="bg-white p-10 rounded-lg shadow-lg min-w-full">
			<h1 class="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">Register</h1>
		        <Input id="firstNameInput" label="First Name" bind:value={firstName} type="text" required/>
    	        <Input id="lastNameInput" label="Last Name" bind:value={lastName} type="text" required/>
                <Input id="emailInput" label="E-Mail" bind:value={email} type="text" required/>
                <Input id="passwordInput" label="Password" bind:value={password} type="password" required/>
                <RadioGender id="genderInput" label="Gender" {options} bind:userSelected={gender}/>
			    <ConfirmButton on:click={signUp}>Confirm</ConfirmButton>
                <CancelButton on:click={cancel}>Cancel</CancelButton>
                <Toast/>
    </div>
	</div>
</div>



<!-- 
## FORM FOR PRODUCTION USE: 
<div id="registerForm">
    <div class="container flex justify-center items-center w-screen h-screen mx-auto">
        <div class="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-10 rounded-lg p-8 flex flex-col  w-full mt-10 md:mt-0">
        <h2 class="text-black text-lg font-medium title-font mb-5">Register</h2>
        <Input label="First Name" bind:value={firstName} type="text" required/>
        <Input label="Last Name" bind:value={lastName} type="text" required/>
        <Input label="E-Mail" bind:value={email} type="text" required/>
        <Input label="Password" bind:value={password} type="password" required/>
        <RadioGender {options} bind:userSelected={gender}/>
        <p class="text-xs text-black mt-3">Any Text here ?</p>
    </div>
    </div> 
    <Button on:click={signUp}>Confirm</Button>
    <Button on:click={cancel}>Cancel</Button>
</div>
-->
