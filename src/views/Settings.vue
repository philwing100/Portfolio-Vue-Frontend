<template>
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Settings Page</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Settings</h1>
        <div class="settings-section">
            <h2>General</h2>
            <div class="setting">
                <label for="username">Username</label>
                <input type="text" id="username" name="username">
            </div>
            <div class="setting">
                <label for="email">Email</label>
                <input type="email" id="email" name="email">
            </div>
        </div>
        <div class="settings-section">
            <h2>Appearance</h2>
            <div class="setting">
                <label for="theme">Theme</label>
                <select id="theme" name="theme">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>
        </div>
        <div class="settings-section">
            <h2>Notifications</h2>
            <div class="setting">
                <label for="email-notifications">Email Notifications</label>
                <input type="checkbox" id="email-notifications" name="email-notifications">
            </div>
        </div>
    </div>
</body>
</html>

  </template>
  
  <script>
  
  
  export default {
    name: 'SettingsWorld',
    components: {
      
    }
  }
  </script>
  
  <style>
  /* styles.css */

body {
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
    color: #333;
    margin: 0;
    padding: 0;
}

.container {
    width: 60%;
    margin: 50px auto;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

h1 {
    text-align: center;
    margin-bottom: 40px;
}

.settings-section {
    margin-bottom: 30px;
}

h2 {
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    margin-bottom: 20px;
}

.setting {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

label {
    flex: 1;
}

input[type="text"],
input[type="email"],
select {
    flex: 2;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

input[type="checkbox"] {
    margin-left: 20px;
}

  </style>
  