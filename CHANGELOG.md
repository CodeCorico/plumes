# Plumes - Changelog

<a name="1.0.5"></a>
# 1.0.5 (2016-03-24)

[Release 1.0.5](https://github.com/CodeCorico/plumes/releases/tag/1.0.5)

### Hotfixes

- **Button Indicator**
  - Cover image instead of resize it

<a name="1.0.4"></a>
# 1.0.4 (2016-03-24)

[Release 1.0.4](https://github.com/CodeCorico/plumes/releases/tag/1.0.4)

### Hotfixes

- **Grouped button**
  - Indicator buttons have better margins in the right orientation

<a name="1.0.3"></a>
# 1.0.3 (2016-03-23)

[Release 1.0.3](https://github.com/CodeCorico/plumes/releases/tag/1.0.3)

### Hotfixes

- **Grouped button**
  - Some buttons don't move when an indicator button notification is displayed

<a name="1.0.2"></a>
# 1.0.2 (2016-03-22)

[Release 1.0.2](https://github.com/CodeCorico/plumes/releases/tag/1.0.2)

### Hotfixes

- **Context Panel**
  - Fix closeIfGroupOpened() method

<a name="1.0.1"></a>
# 1.0.1 (2016-03-22)

[Release 1.0.1](https://github.com/CodeCorico/plumes/releases/tag/1.0.1)

### Breaking changes

- **Grouped buttons**
  - Create the "compact" mode to give the user access to many buttons in mobile view

### Hotfixes

- **Plumes**
  - Fix some tiny bugs of the release 1.0

<a name="1.0.0"></a>
# 1.0.0 (2016-03-20)

[Release 1.0.0](https://github.com/CodeCorico/plumes/releases/tag/1.0.0)

### Breaking changes

- **Layout Platform**
  - This layout was redrawn with a new idea: the context panels. Its view manages 1, 2 or 3 independent columns that can be opened/closed easily from header buttons. It manages responsiveness, without media queries.
- **Context Panel**
  - This new feature can display blocks of content with a title. You can place it everywhere, its container is adaptive.
- **Button Rounded**
  - New feature to display a picture or an icon.
- **Grouped buttons**
  - This new feature arrange and displays Buttons Rounded and Buttons Indicator in an horizontal view.
- **Notifications panel**
  - The previous Layout Notifications gave way to the new Notifications panel. It can be placed in any other component instead of beeing independent. It contains two theme, light and dark.
- **Layout Sidebars**
  - This layout is removed. The Layout Platform is a better way to split a view in 2/3 columns.

<a name="0.6.5"></a>
# 0.6.5 (2016-02-04)

[Release 0.6.5](https://github.com/CodeCorico/plumes/releases/tag/0.6.5)

### Hotfixes

- **Login**
  - Remove useless animation on hide

<a name="0.6.4"></a>
# 0.6.4 (2016-02-02)

[Release 0.6.4](https://github.com/CodeCorico/plumes/releases/tag/0.6.4)

### Breaking changes

- **Login**
  - Make the login responsive

<a name="0.6.3"></a>
# 0.6.3 (2016-01-14)

[Release 0.6.3](https://github.com/CodeCorico/plumes/releases/tag/0.6.3)

### Hotfixes

- **Plumes**
  - Build distribution files. My bad.

<a name="0.6.2"></a>
# 0.6.2 (2016-01-14>)

[Release 0.6.2](https://github.com/CodeCorico/plumes/releases/tag/0.6.2)

### Hotfixes

- **Layout Platform**
  - Remove too long loading page

<a name="0.6.1"></a>
# 0.6.1 (2016-01-06>)

[Release 0.6.1](https://github.com/CodeCorico/plumes/releases/tag/0.6.1)

### Hotfixes

- **Layout Notifications**
  - Restyle the component.
- **Layout Sidebars**
  - Don't expend sidebars when they are disabled.

<a name="0.6.0"></a>
# 0.6.0 (2016-01-05)

[Release 0.6.0](https://github.com/CodeCorico/plumes/releases/tag/0.6.0)

### Breaking changes

- **Button Profile**
  - Create a subfeature that displays a notification message.
- **Layout Notifications**
  - Create a new component that displays a notifications list.
- **Layout Platfom**
  - Inject the Notifications layout.
- **Example Layout**
  - Add a button to display notifications.

### Hotfixes

- **Layout Sidebars**
  - Left align on the content area when no left-content.

<a name="0.5.2"></a>
# 0.5.2 (2015-10-21)

[Release 0.5.2](https://github.com/CodeCorico/plumes/releases/tag/0.5.2)

### Hotfixes

- **Layout Sidebars**
  - Search Layout Platform in all of its parents to detect the opened menu.

<a name="0.5.1"></a>
# 0.5.1 (2015-10-20)

[Release 0.5.1](https://github.com/CodeCorico/plumes/releases/tag/0.5.1)

### Hotfixes

- **Layout Platfom**
  - Display the missing apps dropdown

<a name="0.5.0"></a>
# 0.5.0 (2015-10-05)

[Release 0.5.0](https://github.com/CodeCorico/plumes/releases/tag/0.5.0)

### Breaking changes

- **Base**
  - Hide rv-require and rv-partial not loaded

- **Components**
  - Use "pl-" prefix for all components

<a name="0.4.0"></a>
# 0.4.0 (2015-10-02)

[Release 0.4.0](https://github.com/CodeCorico/plumes/releases/tag/0.4.0)

### Breaking changes

- **Base**
  - Create the base feature from the generic main layout code.
  - Rename "theme" CSS keyword by "accent".

- **Layouts**
  - Split main layout to "layout-platform" and "layout-sidebars".

### Hotfixes

- **Layout Sidebars**
  - Fix start animation for collapsed sidebars

<a name="0.3.4"></a>
# 0.3.4 (2015-09-09)

[Release 0.3.4](https://github.com/CodeCorico/plumes/releases/tag/0.3.4)

### Breaking changes

- **Pagination**
  - Remove action buttons when the total pages displayes is equal or less than the max pages.

<a name="0.3.3"></a>
# 0.3.3 (2015-09-09)

[Release 0.3.3](https://github.com/CodeCorico/plumes/releases/tag/0.3.3)

### Breaking changes

- **Layout**
  - Double bind the left and right content options.

### Hotfixes

- **Pagination**
  - Fix previous and next button navigation
  - Enable buttons if no attribute specified.

<a name="0.3.2"></a>
# 0.3.2 (2015-09-08)

[Release 0.3.2](https://github.com/CodeCorico/plumes/releases/tag/0.3.2)

### Hotfixes

- **Layout**
  - Build distribution files. My bad.

<a name="0.3.1"></a>
# 0.3.1 (2015-09-08)

[Release 0.3.1](https://github.com/CodeCorico/plumes/releases/tag/0.3.1)

### Breaking changes

- **Layout**
  - Support extra content partial

<a name="0.3.0"></a>
# 0.3.0 (2015-09-08)

[Release 0.3.0](https://github.com/CodeCorico/plumes/releases/tag/0.3.0)

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

[Release 0.2.8](https://github.com/CodeCorico/plumes/releases/tag/0.2.8)

### Hotfixes

- **Index**
  - Fix _resources_ subfolders copy

<a name="0.2.7"></a>
# 0.2.7 (2015-07-20)

[Release 0.2.7](https://github.com/CodeCorico/plumes/releases/tag/0.2.7)

### Hotfixes

- **Index**
  - Copy _resources_ subfolders

<a name="0.2.6"></a>
# 0.2.6 (2015-07-19)

[Release 0.2.6](https://github.com/CodeCorico/plumes/releases/tag/0.2.6)

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

[Release 0.2.5](https://github.com/CodeCorico/plumes/releases/tag/0.2.5)

### Breaking changes

- **Login**
  - Create the "Foget password" feature

<a name="0.2.4"></a>
# 0.2.4 (2015-07-06)

[Release 0.2.4](https://github.com/CodeCorico/plumes/releases/tag/0.2.4)

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

[Release 0.2.3](https://github.com/CodeCorico/plumes/releases/tag/0.2.3)

### Hotfixes

- **Message**
  - Fix Message split words regex

<a name="0.2.2"></a>
# 0.2.2 (2015-06-30)

[Release 0.2.2](https://github.com/CodeCorico/plumes/releases/tag/0.2.2)

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

[Release 0.2.1](https://github.com/CodeCorico/plumes/releases/tag/0.2.1)

### Hotfixes

- **Login**
  - Fix default avatar loads error
- **Example login**
  - Preload avatar

<a name="0.2.0"></a>
# 0.2.0 (2015-06-23)

[Release 0.2.0](https://github.com/CodeCorico/plumes/releases/tag/0.2.0)

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

[Release 0.1.0](https://github.com/CodeCorico/plumes/releases/tag/0.1.0)

### Breaking changes

- **Plumes**
  - Migration from the internal private project.
