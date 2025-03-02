<template> 
    <div class="profile-container">
      <img src="@/assets/Images/Me.jpg" alt="Profile Picture" class="profile-image" />
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.profile-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px; /* Adjust size as needed */
    height: 150px;
    border-radius: 50%;
    border: 4px solid white; /* Black ring around the image */
    background: #111; /* Dark background matching black theme */
    box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
    overflow: hidden;
}

.profile-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
}
</style>
