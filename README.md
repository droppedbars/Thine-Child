Thine-Child
===========

Child theme that modifies the Thine theme by UXbarn by placing the logo and main menu above the banner.  It attempts to keep all other aspects the same.  

Upgrading Thine
===============
The child theme has a number of dependencies on the Thine theme that must be maintained or accommodated if the Thine theme is upgraded:

* the logo is in a div with id logo-wrapper
* the tag line is in a div with id tagline
* the menu is in a div with id menu-wrapper
* all the header items are contained within one div
* thine.js is copied into the child theme and modified, modifications are:
** function recalculateLayouts(), member variable extraHeight has 23 pixels added to it
* the only other stylesheets that must be loaded prior to the Thine's style.css are listed in functions.php, thine_parent_styles().  IF they change after upgrade, the function must be modified.


