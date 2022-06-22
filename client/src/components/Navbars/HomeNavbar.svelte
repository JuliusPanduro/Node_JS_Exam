<script>
    import  Button  from "../Buttons/Button.svelte";

    import { navigate } from 'svelte-routing';

    import Toast from "../../components/Toast/Toast.svelte";
    import { notifications } from "../../../scripts/Notification/notification";

    function logout() {
        localStorage.clear();
        notifications.danger("You are now logged off",3000);
        navigate('/',{replace: true})
        window.location.reload();
    }
</script>

<header>
    <nav class="bg-slate shadow">
        <div class="container mx-auto px-6 py-3 ">
            <div class="md:flex md:items-center md:justify-between">
                <div class="flex justify-between items-center">
                    <div class="text-xl font-semibold text-gray-700">
                        <h1 class="text-gray-700 text-xl font-bold hover:text-fuchsia-500 md:text-2xl">Uperform Coaching</h1>
                    </div>
                </div>
                <Button on:click={logout}>Logout</Button>
                <Toast/>
            </div>
        </div>
    </nav>
</header>
