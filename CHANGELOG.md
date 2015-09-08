# Plumes - Changelog

Versions details history. For each version you can find:
* Name an version number
* Date published
* Link to the release tag
* Link to the release branch
* All of the modifications details

<a name="0.3.1"></a>
# 0.3.1 (2015-09-08)

[Release 0.3.1](https://github.com/CodeCorico/plumes/releases/tag/0.3.1) -
[Branch release/0.3.1](https://github.com/CodeCorico/plumes/tree/0.3.1)

### Breaking changes

- **Layout**
  - Support extra content partial

<a name="0.3.0"></a>
# 0.3.0 (2015-09-08)

[Release 0.3.0](https://github.com/CodeCorico/plumes/releases/tag/0.3.0) -
[Branch release/0.3.0](https://github.com/CodeCorico/plumes/tree/0.3.0)

### Breaking changes

- **Layout**
  - Support CSS classes to <body>
  - Support left and right sidebars

- **Pagination**
  - Create the component

- **CSS Mixins**
  - Add no-tap-effect() function

- **Chore**
  - Update Ractive-Require to 0.3.0

<a name="0.2.8"></a>
# 0.2.8 (2015-07-20)

[Release 0.2.8](https://github.com/CodeCorico/plumes/releases/tag/0.2.8) -
[Branch release/0.2.8](https://github.com/CodeCorico/plumes/tree/0.2.8)

### Hotfixes

- **Index**
  - Fix _resources_ subfolders copy

<a name="0.2.7"></a>
# 0.2.7 (2015-07-20)

[Release 0.2.7](https://github.com/CodeCorico/plumes/releases/tag/0.2.7) -
[Branch release/0.2.7](https://github.com/CodeCorico/plumes/tree/0.2.7)

### Hotfixes

- **Index**
  - Copy _resources_ subfolders

<a name="0.2.6"></a>
# 0.2.6 (2015-07-19)

[Release 0.2.6](https://github.com/CodeCorico/plumes/releases/tag/0.2.6) -
[Branch release/0.2.6](https://github.com/CodeCorico/plumes/tree/0.2.6)

### Hotfixes

- **Common**
  - Use !important for theme colors

- **Login**
  - Use a "password" input for creating new password

### Breaking changes

- **Login**
  - Add the support of an help description for making password

<a name="0.2.5"></a>
# 0.2.5 (2015-07-15)

[Release 0.2.5](https://github.com/CodeCorico/plumes/releases/tag/0.2.5) -
[Branch release/0.2.5](https://github.com/CodeCorico/plumes/tree/0.2.5)

### Breaking changes

- **Login**
  - Create the "Foget password" feature

<a name="0.2.4"></a>
# 0.2.4 (2015-07-06)

[Release 0.2.4](https://github.com/CodeCorico/plumes/releases/tag/0.2.4) -
[Branch release/0.2.4](https://github.com/CodeCorico/plumes/tree/0.2.4)

### Hotfixes

- **Grouped-list**
  - Fix last item (of each index) position that doesn't fix.

### Breaking changes

- **Dropdown-title**
  - Add possibility to select, add, and remove a title from the component object.
  - Close the opened list when the user click on the screen.

- **Grouped-list**
  - Add "fixed" and "lastFixed" events.

<a name="0.2.3"></a>
# 0.2.3 (2015-06-30)

[Release 0.2.3](https://github.com/CodeCorico/plumes/releases/tag/0.2.3) -
[Branch release/0.2.3](https://github.com/CodeCorico/plumes/tree/0.2.3)

### Hotfixes

- **Message**
  - Fix Message split words regex

<a name="0.2.2"></a>
# 0.2.2 (2015-06-30)

[Release 0.2.2](https://github.com/CodeCorico/plumes/releases/tag/0.2.2) -
[Branch release/0.2.2](https://github.com/CodeCorico/plumes/tree/0.2.2)

### Breaking changes

- **Layout**
  - Split the theme in a new layout-theme.less file. Used to overide the theme color variables.

### Hotfixes

- **Login**
  - Teardown properly the login layout
- **Message**
  - Split sentence tags properly

<a name="0.2.1"></a>
# 0.2.1 (2015-06-25)

[Release 0.2.1](https://github.com/CodeCorico/plumes/releases/tag/0.2.1) -
[Branch release/0.2.1](https://github.com/CodeCorico/plumes/tree/0.2.1)

### Hotfixes

- **Login**
  - Fix default avatar loads error
- **Example login**
  - Preload avatar

<a name="0.2.0"></a>
# 0.2.0 (2015-06-23)

[Release 0.2.0](https://github.com/CodeCorico/plumes/releases/tag/0.2.0) -
[Branch release/0.2.0](https://github.com/CodeCorico/plumes/tree/0.2.0)

### Breaking changes

- **Build**
  - Copy every files in each ```/features/\*\*/resources``` folder to the ```/public/\*\*/``` folder
  - The folder ```/public``` is cleaned each time the ```gulp``` is started
- **Example layout**
  - Add a cookie to prevent the Screen message display every start.
- **Login**
  - Create the new component
- **Grouped-list**
  - Create the new component

### Fixes

- **Buttons**
  - Move "help/help-button" to "button/button-help".
- **Help**
  - Remove this unconventional feature.
- **Conventions**
  - Remove the legacy #quality pattern.
  - Define the release publishing.

<a name="0.1.0"></a>
# 0.1.0 (2015-06-10)

[Release 0.1.0](https://github.com/CodeCorico/plumes/releases/tag/0.1.0) -
[Branch release/0.1.0](https://github.com/CodeCorico/plumes/tree/0.1.0)

### Breaking changes

- **Plumes**
  - Migration from the internal private project.
