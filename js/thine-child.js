logo = document.getElementById( 'logo-wrapper' );
menu = document.getElementById( 'menu-wrapper' );
container = document.createElement( 'div' );
container.id = 'logo-menu-container';
menu.parentNode.insertBefore( container, logo );
menu.parentNode.removeChild( menu );
logo.parentNode.removeChild( logo );
container.insertBefore( menu, null );
container.insertBefore( logo, menu);