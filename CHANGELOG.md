# Plumes - Changelog

Versions details history. For each version you can find:
* Name an version number
* Date published
* Link to the release tag
* Link to the release branch
* All of the modifications details

<a name="0.2.2"></a>
# 0.2.2 (2015-06-30)

[Release 0.2.2](https://github.com/CodeCorico/plumes/releases/tag/0.2.2) - [Branch release/0.2.2](https://github.com/CodeCorico/plumes/tree/0.2.2)

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

[Release 0.2.1](https://github.com/CodeCorico/plumes/releases/tag/0.2.1) - [Branch release/0.2.1](https://github.com/CodeCorico/plumes/tree/0.2.1)

### Hotfixes

- **Login**
  - Fix default avatar loads error
- **Example login**
  - Preload avatar

<a name="0.2.0"></a>
# 0.2.0 (2015-06-23)

[Release 0.2.0](https://github.com/CodeCorico/plumes/releases/tag/0.2.0) - [Branch release/0.2.0](https://github.com/CodeCorico/plumes/tree/0.2.0)

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

[Release 0.1.0](https://github.com/CodeCorico/plumes/releases/tag/0.1.0) - [Branch release/0.1.0](https://github.com/CodeCorico/plumes/tree/0.1.0)

### Breaking changes

- **Plumes**
  - Migration from the internal private project.
