<script>
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
}


function cancel(){
   navigate('/',{replace: true})
 }
 
</script>

<div id="registerForm" class="h-screen  bg-cover bg-center flex justify-center items-center" style="background-image: url('img/Bike.jpg');">
	<div class="lg:w-2/5 md:w-1/2 w-2/3">
		<div class="bg-black p-10 rounded-lg shadow-lg min-w-full opacity-70">
			<h1 class="text-center text-2xl mb-6 text-fuchsia-500 font-bold font-sans">Register</h1>
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

