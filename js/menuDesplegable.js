document.addEventListener('DOMContentLoaded', function() {
    const userIcon = document.getElementById('user-icon');
    const userDropdown = document.querySelector('.user-dropdown');
  
    userIcon.addEventListener('click', function(e) {
      e.stopPropagation();
      userDropdown.style.display = userDropdown.style.display === 'block' ? 'none' : 'block';
    });
  
    document.addEventListener('click', function(e) {
      if (!userDropdown.contains(e.target) && e.target !== userIcon) {
        userDropdown.style.display = 'none';
      }
    });
  });
  