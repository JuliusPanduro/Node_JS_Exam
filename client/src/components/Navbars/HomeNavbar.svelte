<script>
    import  Button  from "../Buttons/Button.svelte";

    import { Link, navigate } from 'svelte-routing';

    function logout() {
        localStorage.clear();
        navigate('/',{replace: true})
    }
</script>

<header>
    <nav class="bg-slate shadow">
        <div class="container mx-auto px-6 py-3 ">
            <div class="md:flex md:items-center md:justify-between">
                <div class="flex justify-between items-center">
                    <div class="text-xl font-semibold text-gray-700">
                        <a href="#" class="text-gray-700 text-xl font-bold hover:text-fuchsia-500 md:text-2xl">Uperform Coaching</a>
                    </div>

                    <!-- Mobile menu button -->
                    <div class="flex md:hidden">
                        <button type="button" class="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600" aria-label="toggle menu">
                            <svg viewBox="0 0 24 24" class="h-6 w-6 fill-current">
                                <path fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
                <div class="hidden -mx-4 md:flex md:items-center">
                    <a href="#" class="block mx-4 mt-2 md:mt-0 text-sm text-gray-700 capitalize hover:text-fuchsia-500">Something</a>
                    <a href="#" class="block mx-4 mt-2 md:mt-0 text-sm text-gray-700 capitalize hover:text-fuchsia-500">Something</a>
                    <a href="#" class="block mx-4 mt-2 md:mt-0 text-sm text-gray-700 capitalize hover:text-fuchsia-500">Something</a>
                </div>
                <Button on:click={logout}>Logout</Button>
            </div>
        </div>
    </nav>

    <div class="w-full bg-cover bg-center" style="height:32rem; background-image: url('img/Bike.jpg');">
        <div class="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50">
            <div class="text-center">
                <h1 class="text-white text-2xl font-semibold uppercase md:text-3xl">Uperform Intranet </h1>
                <Button class="mt-4 px-4 py-2 text-white text-sm uppercase font-medium rounded">Show Challenge of the week</Button>
            </div>
        </div>
    </div>
</header>