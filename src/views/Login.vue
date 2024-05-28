<template>
    <h1>Login</h1>
    <div>
    <p>Sign in with google to continue</p>
    <button class="login-with-google-btn"> 
        Sign in with google (does nothing)
    </button>


</div>
</template>

<script>
import {auth, provider} from '../main';
//import {signInWithPopup} from 'firebase/auth';



export default {
  name: 'LoginWorld',
  components: {
    
  }
}
</script>