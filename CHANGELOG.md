# Plumes - Changelog

<a name="1.6.5"></a>
# 1.6.5 (2016-10-18)

[Release 1.6.5](https://github.com/CodeCorico/plumes/releases/tag/1.6.5)

### Fixes

- **Layout Platform**
  - Fix bug when open/close contexts too quickly.
- **Plumes**
  - Replace all $.each() by Array.forEach().

<a name="1.6.4"></a>
# 1.6.4 (2016-09-30)

[Release 1.6.4](https://github.com/CodeCorico/plumes/releases/tag/1.6.4)

### Breaking changes

- **Context Panel**
  - Add isGroupOpened() and groupOpened() methods.

### Fixes

- **Plumes**
  - Copy the resources subdirectories to /public.

<a name="1.6.3"></a>
# 1.6.3 (2016-09-27)

[Release 1.6.3](https://github.com/CodeCorico/plumes/releases/tag/1.6.3)

### Breaking changes

- **Layout Platform**
  - Add closeOnNotDesktop generic method
- **Context Panel**
  - Don't display context title cross to close on desktop and tablets anymore.
- **Dropdown Title**
  - Re-fire "selected" when selecting the title already selected.

<a name="1.6.2"></a>
# 1.6.2 (2016-09-26)

[Release 1.6.2](https://github.com/CodeCorico/plumes/releases/tag/1.6.2)

### Breaking changes

- **Layout Platform**
  - Re-Click on a gouped button linked to a context closes it.
- **Plumes**
  - Don't publish "inject-*.html" files to public anymore.

### Fixes

- **Plumes**
  - Tiny CSS fine-tuning.

<a name="1.6.1"></a>
# 1.6.1 (2016-09-07)

[Release 1.6.1](https://github.com/CodeCorico/plumes/releases/tag/1.6.1)

### Breaking changes

- **Plumes**
  - "public" option can be a gulp plugin.

### Fixes

- **Grouped buttons**
  - Hide right oriented buttons on no-buttons mode.

<a name="1.6.0"></a>
# 1.6.0 (2016-08-29)

[Release 1.6.0](https://github.com/CodeCorico/plumes/releases/tag/1.6.0)

### Breaking changes

- **Plumes**
  - Update the node modules

<a name="1.5.11"></a>
# 1.5.11 (2016-08-29)

[Release 1.5.11](https://github.com/CodeCorico/plumes/releases/tag/1.5.11)

### Breaking changes

- **Plumes**
  - Add the possibility to set array paths in config.

- **Common**
  - Add grayscale function.

<a name="1.5.10"></a>
# 1.5.10 (2016-08-26)

[Release 1.5.10](https://github.com/CodeCorico/plumes/releases/tag/1.5.10)

### Breaking changes

- **Plumes**
  - Add "lessPaths" config attribute to support less paths.

<a name="1.5.9"></a>
# 1.5.9 (2016-08-26)

[Release 1.5.9](https://github.com/CodeCorico/plumes/releases/tag/1.5.9)

### Breaking changes

- **Plumes**
  - Add "lessPlugins" config attribute to support less plugins.

<a name="1.5.8"></a>
# 1.5.8 (2016-08-12)

[Release 1.5.8](https://github.com/CodeCorico/plumes/releases/tag/1.5.8)

### Breaking changes

- **Plumes**
  - Add "else" logic in inject tag.

### Fixes

- **Plumes**
  - remove check last "inject-" from "inject-*.html" regexp.

<a name="1.5.7"></a>
# 1.5.7 (2016-08-09)

[Release 1.5.7](https://github.com/CodeCorico/plumes/releases/tag/1.5.7)

### Breaking changes

- **Common**
  - Add the "warning" color.

### Fixes

- **Notifications Panel**
  - Use the common accent-highlight color instead of internal highlight color.

<a name="1.5.6"></a>
# 1.5.6 (2016-08-09)

[Release 1.5.6](https://github.com/CodeCorico/plumes/releases/tag/1.5.6)

### Breaking changes

- **Common**
  - Set the new Plumes main color to #00BCD4.
- **Plumes**
  - Add the possibility to inject resources from a feature to an other one with "inject-*" at the beginning of the file's name.

### Fixes

- **Plumes**
  - Rename "import-*" to "inject-*" files.
  - Watch for resources files instead of HTML files to fire "resources" task.

<a name="1.5.5"></a>
# 1.5.5 (2016-08-08)

[Release 1.5.5](https://github.com/CodeCorico/plumes/releases/tag/1.5.5)

### Breaking changes

- **Plumes**
  - Add the possibility to use glob format in less @import

<a name="1.5.4"></a>
# 1.5.4 (2016-08-05)

[Release 1.5.4](https://github.com/CodeCorico/plumes/releases/tag/1.5.4)

### Fixes

- **Plumes**
  - Fix multiple imports injection in the same page.

<a name="1.5.3"></a>
# 1.5.3 (2016-08-05)

[Release 1.5.3](https://github.com/CodeCorico/plumes/releases/tag/1.5.3)

### Fixes

- **Plumes**
  - Fix imports injection.

<a name="1.5.2"></a>
# 1.5.2 (2016-08-05)

[Release 1.5.2](https://github.com/CodeCorico/plumes/releases/tag/1.5.2)

### Breaking changes

- **Plumes**
  - Inject code of "import-*.html" files inside {{#import *}} tags insides HTML files.

<a name="1.5.1"></a>
# 1.5.1 (2016-06-14)

[Release 1.5.1](https://github.com/CodeCorico/plumes/releases/tag/1.5.1)

### Fixes

- **Plumes**
  - Don't process less imports

<a name="1.5.0"></a>
# 1.5.0 (2016-06-10)

[Release 1.5.0](https://github.com/CodeCorico/plumes/releases/tag/1.5.0)

### Breaking changes

- **Autocomplete**
  - Add options to disable the auto selection and to fix the list position.

- **Notifications panel**
  - Add possibility to add buttons in a notification.

<a name="1.4.0"></a>
# 1.4.0 (2016-05-20)

[Release 1.4.0](https://github.com/CodeCorico/plumes/releases/tag/1.4.0)

### Breaking changes

- **Notifications panel**
  - Add highlight state on notifications.

<a name="1.3.3"></a>
# 1.3.3 (2016-05-16)

[Release 1.3.3](https://github.com/CodeCorico/plumes/releases/tag/1.3.3)

### Fixes

- **Button onoff**
  - Refine the styles.

<a name="1.3.2"></a>
# 1.3.2 (2016-05-09)

[Release 1.3.2](https://github.com/CodeCorico/plumes/releases/tag/1.3.2)

### Fixes

- **Scrolls**
  - Don't use custom scrolls in mobile views

<a name="1.3.1"></a>
# 1.3.1 (2016-05-09)

[Release 1.3.1](https://github.com/CodeCorico/plumes/releases/tag/1.3.1)

### Fixes

- **Layout Platform**
  - Missing arguments for direct callbacks

<a name="1.3.0"></a>
# 1.3.0 (2016-05-03)

[Release 1.3.0](https://github.com/CodeCorico/plumes/releases/tag/1.3.0)

### Breaking changes

- **Layout Platform**
  - Add a userBehavior status when the user perform the action.

<a name="1.2.1"></a>
# 1.2.1 (2016-04-27)

[Release 1.2.1](https://github.com/CodeCorico/plumes/releases/tag/1.2.1)

### Fixes

- **Layout Platform**
  - Refine and fix behaviors

<a name="1.2.0"></a>
# 1.2.0 (2016-04-27)

[Release 1.2.0](https://github.com/CodeCorico/plumes/releases/tag/1.2.0)

### Breaking changes

- **Layout Platform**
  - Add a "fullscreen" button on mobile view!

<a name="1.1.4"></a>
# 1.1.4 (2016-04-26)

[Release 1.1.4](https://github.com/CodeCorico/plumes/releases/tag/1.1.4)

### Fixes

- **Autocomplete**
  - Refine and fix behaviors

<a name="1.1.3"></a>
# 1.1.3 (2016-04-26)

[Release 1.1.3](https://github.com/CodeCorico/plumes/releases/tag/1.1.3)

### Fixes

- **Autocomplete**
  - Improve behaviors

<a name="1.1.2"></a>
# 1.1.2 (2016-04-25)

[Release 1.1.2](https://github.com/CodeCorico/plumes/releases/tag/1.1.2)

### Breaking changes

- **Plumes**
  - Rename "base" feature to Plumes feature to scope Plumes inside Ractive

### Fixes

- **Autocomplete**
  - The mouse hover the list doesn't create a second focus

<a name="1.1.1"></a>
# 1.1.1 (2016-04-21)

[Release 1.1.1](https://github.com/CodeCorico/plumes/releases/tag/1.1.1)

### Fixes

- **Autocomplete**
  - Tiny fixes to work

<a name="1.1.0"></a>
# 1.1.0 (2016-04-21)

[Release 1.1.0](https://github.com/CodeCorico/plumes/releases/tag/1.1.0)

### Breaking changes

- **Autocomplete**
  - New component!

### Fixes

- **Notifications panel**
  - Bad scrolls require path

<a name="1.0.16"></a>
# 1.0.16 (2016-04-12)

[Release 1.0.16](https://github.com/CodeCorico/plumes/releases/tag/1.0.16)

### Fixes

- **Button Indicator**
  - Update missing cls

<a name="1.0.15"></a>
# 1.0.15 (2016-04-12)

[Release 1.0.15](https://github.com/CodeCorico/plumes/releases/tag/1.0.15)

### Fixes

- **Button Indicator**
  - Re-style notification picture

<a name="1.0.14"></a>
# 1.0.14 (2016-04-12)

[Release 1.0.14](https://github.com/CodeCorico/plumes/releases/tag/1.0.14)

### Fixes

- **Layout Platform**
  - Better text-shadow
- **Grouped Buttons**
  - Better text-shadow

<a name="1.0.13"></a>
# 1.0.13 (2016-04-11)

[Release 1.0.13](https://github.com/CodeCorico/plumes/releases/tag/1.0.13)

### Breaking changes

- **Grouped buttons**
  - Better styles
- **Layout Platform**
  - Hide compact button when no button
  - Better styles
  - Send more objects in events

### Fixes

- **Screen-Message**
  - Layout fixed on the top of others
- **Scrolls**
  - Support Firefox

<a name="1.0.12"></a>
# 1.0.12 (2016-04-05)

[Release 1.0.12](https://github.com/CodeCorico/plumes/releases/tag/1.0.12)

### Breaking changes

- **Scrolls**
  - Add transitions for cursor behaviors
- **Layout Platform**
  - Add new events

### Fixes

- **Base Plumes**
  - Min .pl-title font-size

<a name="1.0.11"></a>
# 1.0.11 (2016-03-29)

[Release 1.0.11](https://github.com/CodeCorico/plumes/releases/tag/1.0.11)

### Breaking changes

- **Base Plumes**
  - Add .pl-title CSS class

### Fixes

- **Layout Platform**
  - Center the title to the content view
- **Scrolls**
  - Add bigger z-index to the require tag

<a name="1.0.10"></a>
# 1.0.10 (2016-03-29)

[Release 1.0.10](https://github.com/CodeCorico/plumes/releases/tag/1.0.10)

### Breaking changes

- **Base Plumes**
  - Use .media-* instead of @media and create tablet styles
- **Layout Platform**
  - Apply "media-mobile" class to the context panels

<a name="1.0.9"></a>
# 1.0.9 (2016-03-29)

[Release 1.0.9](https://github.com/CodeCorico/plumes/releases/tag/1.0.9)

### Breaking changes

- **Layout Platform**
  - Add possibility to hide the title

- **Scrolls**
  - Bigger width
  - Animate scroll on click on the vertical bar

### Fixes

- **Scrolls**
  - Disable scroll when don't needed
  - Update scroll size on mouse enter

<a name="1.0.8"></a>
# 1.0.8 (2016-03-27)

[Release 1.0.8](https://github.com/CodeCorico/plumes/releases/tag/1.0.8)

### Fixes

- **Scrolls**
  - Disable scroll when don't needed
  - Update scroll size on mouse enter

<a name="1.0.7"></a>
# 1.0.7 (2016-03-27)

[Release 1.0.7](https://github.com/CodeCorico/plumes/releases/tag/1.0.7)

### Fixes

- **Context panel**
  - Remove default scrollbar
- **Notifications panel**
  - Use pl-scrolls as scrollbar
- **Layout Platform**
  - Add more screen resize events

<a name="1.0.6"></a>
# 1.0.6 (2016-03-27)

[Release 1.0.6](https://github.com/CodeCorico/plumes/releases/tag/1.0.6)

### Breaking changes

- **Scrolls**
  - New custom scrolls for all browsers

### Fixes

- **Base**
  - The Segoe UI wasn't displayed correctly

<a name="1.0.5"></a>
# 1.0.5 (2016-03-24)

[Release 1.0.5](https://github.com/CodeCorico/plumes/releases/tag/1.0.5)

### Fixes

- **Button Indicator**
  - Cover image instead of resize it

<a name="1.0.4"></a>
# 1.0.4 (2016-03-24)

[Release 1.0.4](https://github.com/CodeCorico/plumes/releases/tag/1.0.4)

### Fixes

- **Grouped button**
  - Indicator buttons have better margins in the right orientation

<a name="1.0.3"></a>
# 1.0.3 (2016-03-23)

[Release 1.0.3](https://github.com/CodeCorico/plumes/releases/tag/1.0.3)

### Fixes

- **Grouped button**
  - Some buttons don't move when an indicator button notification is displayed

<a name="1.0.2"></a>
# 1.0.2 (2016-03-22)

[Release 1.0.2](https://github.com/CodeCorico/plumes/releases/tag/1.0.2)

### Fixes

- **Context Panel**
  - Fix closeIfGroupOpened() method

<a name="1.0.1"></a>
# 1.0.1 (2016-03-22)

[Release 1.0.1](https://github.com/CodeCorico/plumes/releases/tag/1.0.1)

### Breaking changes

- **Grouped buttons**
  - Create the "compact" mode to give the user access to many buttons in mobile view

### Fixes

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

### Fixes

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

### Fixes

- **Plumes**
  - Build distribution files. My bad.

<a name="0.6.2"></a>
# 0.6.2 (2016-01-14>)

[Release 0.6.2](https://github.com/CodeCorico/plumes/releases/tag/0.6.2)

### Fixes

- **Layout Platform**
  - Remove too long loading page

<a name="0.6.1"></a>
# 0.6.1 (2016-01-06>)

[Release 0.6.1](https://github.com/CodeCorico/plumes/releases/tag/0.6.1)

### Fixes

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

### Fixes

- **Layout Sidebars**
  - Left align on the content area when no left-content.

<a name="0.5.2"></a>
# 0.5.2 (2015-10-21)

[Release 0.5.2](https://github.com/CodeCorico/plumes/releases/tag/0.5.2)

### Fixes

- **Layout Sidebars**
  - Search Layout Platform in all of its parents to detect the opened menu.

<a name="0.5.1"></a>
# 0.5.1 (2015-10-20)

[Release 0.5.1](https://github.com/CodeCorico/plumes/releases/tag/0.5.1)

### Fixes

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

### Fixes

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

### Fixes

- **Pagination**
  - Fix previous and next button navigation
  - Enable buttons if no attribute specified.

<a name="0.3.2"></a>
# 0.3.2 (2015-09-08)

[Release 0.3.2](https://github.com/CodeCorico/plumes/releases/tag/0.3.2)

### Fixes

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

### Fixes

- **Index**
  - Fix _resources_ subfolders copy

<a name="0.2.7"></a>
# 0.2.7 (2015-07-20)

[Release 0.2.7](https://github.com/CodeCorico/plumes/releases/tag/0.2.7)

### Fixes

- **Index**
  - Copy _resources_ subfolders

<a name="0.2.6"></a>
# 0.2.6 (2015-07-19)

[Release 0.2.6](https://github.com/CodeCorico/plumes/releases/tag/0.2.6)

### Fixes

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

### Fixes

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

### Fixes

- **Message**
  - Fix Message split words regex

<a name="0.2.2"></a>
# 0.2.2 (2015-06-30)

[Release 0.2.2](https://github.com/CodeCorico/plumes/releases/tag/0.2.2)

### Breaking changes

- **Layout**
  - Split the theme in a new layout-theme.less file. Used to overide the theme color variables.

### Fixes

- **Login**
  - Teardown properly the login layout
- **Message**
  - Split sentence tags properly

<a name="0.2.1"></a>
# 0.2.1 (2015-06-25)

[Release 0.2.1](https://github.com/CodeCorico/plumes/releases/tag/0.2.1)

### Fixes

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
