<template>
<div class="sidebar">
        <button class="toggle-btn" id="myToggleButton">☰ Toggle Sidebar</button>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
    </div>

    <div class="content">
        <!-- Your main content goes here -->
        <h1>Main Content</h1>
        <p>This is the main content area.</p>
    </div>

</template>

<script>
function toggleSidebar() {
    var sidebar = document.querySelector('.sidebar');
    var content = document.querySelector('.content');
    sidebar.style.width = sidebar.style.width === '250px' ? '0' : '250px';
    content.style.marginLeft = content.style.marginLeft === '250px' ? '0' : '250px';
}

export default {
  mounted() {
    var toggleButton = document.getElementById('myToggleButton');
    if (toggleButton) {
      toggleButton.addEventListener('click', toggleSidebar);
    } else {
      console.error('Element with ID "myToggleButton" not found.');
    }
  }
}


</script>

<style>

.sidebar {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
}

.sidebar ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.sidebar li {
    padding: 8px;
    text-align: center;
    border-bottom: 1px solid #2c2c2c;
}

.sidebar a {
    text-decoration: none;
    color: white;
    display: block;
}

.sidebar a:hover {
    background-color: #ddd;
    color: black;
}

.toggle-btn {
    font-size: 20px;
    position: fixed;
    left: 20px;
    top: 20px;
    cursor: pointer;
    border: none;
    background: none;
    color: white;
}

.content {
    transition: margin-left 0.5s;
    padding: 16px;
}

@media screen and (max-height: 450px) {
  .sidebar {padding-top: 15px;}
  .sidebar a {font-size: 18px;}
}

</style>