// Menú hamburguesa mejorado
document.addEventListener('DOMContentLoaded', function() {
  const toggleMenu = document.getElementById('toggle-menu');
  const navbarLinks = document.getElementById('navbar-links');
  const body = document.body;
  const html = document.documentElement;

  // Toggle del menú móvil
  toggleMenu.addEventListener('click', function() {
      navbarLinks.classList.toggle('active');
      this.classList.toggle('active');
      
      // Alternar el scroll del body
      if (navbarLinks.classList.contains('active')) {
          body.style.overflow = 'hidden';
          html.style.overflow = 'hidden';
      } else {
          body.style.removeProperty('overflow');
          html.style.removeProperty('overflow');
      }
  });

  // Cerrar menú al hacer clic en un enlace (para móviles)
  document.querySelectorAll('.navbar-links a:not(.dropdown > a)').forEach(link => {
      link.addEventListener('click', function(e) {
          if (window.innerWidth <= 768) {
              // Solo cerrar si no es un enlace de dropdown
              if (!this.parentElement.classList.contains('dropdown')) {
                  navbarLinks.classList.remove('active');
                  toggleMenu.classList.remove('active');
                  body.style.removeProperty('overflow');
                  html.style.removeProperty('overflow');
              }
          }
      });
  });

  // Manejar clics en el dropdown en móviles
  document.querySelectorAll('.dropdown > a').forEach(dropdownLink => {
      dropdownLink.addEventListener('click', function(e) {
          if (window.innerWidth <= 768) {
              e.preventDefault();
              const dropdown = this.parentElement;
              const dropdownContent = dropdown.querySelector('.dropdown-content');
              
              // Alternar la visibilidad del dropdown
              dropdownContent.style.display = 
                  dropdownContent.style.display === 'block' ? 'none' : 'block';
          }
      });
  });

  // Carrusel automático
  const carruselItems = document.querySelectorAll('.carrusel-item');
  if (carruselItems.length > 0) {
      let currentIndex = 0;
      carruselItems[0].classList.add('active');
      
      function rotateCarousel() {
          carruselItems[currentIndex].classList.remove('active');
          currentIndex = (currentIndex + 1) % carruselItems.length;
          carruselItems[currentIndex].classList.add('active');
      }
      
      // Cambiar cada 5 segundos
      setInterval(rotateCarousel, 5000);
  }

  // Resaltar elemento activo del menú
  function highlightActiveMenu() {
      const currentPage = location.pathname.split('/').pop() || 'index.html';
      const menuLinks = document.querySelectorAll('.navbar-links a');
      
      menuLinks.forEach(link => {
          const linkPage = link.getAttribute('href');
          if (currentPage === linkPage || 
              (currentPage === '' && linkPage === 'index.html')) {
              link.classList.add('active');
          } else {
              link.classList.remove('active');
          }
      });
  }
  
  highlightActiveMenu();
});

// Resto del código del reloj y fecha permanece igual...