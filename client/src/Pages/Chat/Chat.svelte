<div class="bod">
<div id="message-container"></div>
<form id="send-container">
    <input type="text" id="message-input" style="border solid black 1px">
    <button type="submit" id="send-button">Send</button>
</form>
</div>

<style>
    #bod{
        padding:0;
        margin:0;
        display:flex;
        justify-content:center;
    }
    #message-container{
        width:80%;
        max-width:1200px;
    }
    #message-container div{
        background-color: #CCC;
        padding: 5px;
    }

    #message-container div:nth-child(2n){
        background-color: #FFF;
    }
</style>