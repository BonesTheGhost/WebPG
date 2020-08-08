# WebPG
An attempt to make a web-based, text-styled, adventure rpg. The goal is to practice 'vanilla' web-development technologies (Javascript, HTML, CSS) and avoid using libraries that do 'heavy-lifting' inside of a black-box. SO, JQuery may be utuilized in some of the core engine, and things like icon fonts, but 3D animation libraries or WebGL have been avoided on purpose.

The Master branch of this project was used simply to see if the project was viable, and thus no effort was made to manage feature branches or versions. Documentation essentially was only relegated to the commit messages, instead of into a centralized document like this README.

Going forward, I have now created a new branch to handle the re-basing of the 'engine' code. This will neccesitate a rebuild of the layout, since in an application like this, the layout is heavily responsible for transforming simple JS logic into something resembling a game. The longevity of this branch is yet undetermined, as my experience with GIT version control is somewhat unrefined at present. However, I will do my best to create seperate branches for features and milestones that I would like to add. If the progress of the engineRebase branch is not going as smoothly as planned, I may attempt to rebuild the layout from the mobile version first, and then scale it up to the desktop version after, to make sure that the more tedious layouts scale correctly before building the layout that should be most familiar.

Finally, at some point I hope to get the engineRebase branch (or mobileFocus branch if it comes to fruition) to the same 'point' of refinement as the current build of the master branch (0.4.5). When that day comes, I will merge the engineRebase/mobileFocus branch into the master branch, effectively deprecating the other 'current' build of the game. 

Changes and updates to the project will be kept here as well in the 'changelog' section. There will also be an 'issues' section where I will store current issues with the game. If you would like to play with my build or any of the code contained in this repository, feel free to fork the repository! By doing so you simply agree to credit me with any inspirations you might have as a result of my project, and agree not to pass of the project as your own. Any spaghetti code nightmares you gain as a result of viewing my code are souvenirs of your tour, and I'm not responsible for any anxiety or other negative feelings you may experience, now or in the future! You have been warned! The master branch is the current working build.

In all seriousness, thanks for viewing my stuff, I hope you find something redeemable in it, and any feedback you have for this project or other works of mine, feel free to send to bonestheghost@gmail.com! Thanks for reading! Cheers!

============================ GLOBAL CHANGELOG ===============================

July 29th, 2020:
- Created the engineRebase branch, commited clean slate, pushed the branch to remote, and updated the README.

July 30th, 2020:
- Re-added the base CSS files and the Index.html code. Will work on modifying the layout next, and will attempt to make @media queries respond more precisely from the get-go (since styling will be overhauled anyway).

July 31st, 2020:
- Removed much of the previous styling code to work with the most foundational components first. Will now add in the necessary subdivisions and make sure that the media queries are working properly once the overall look has been achieved on desktop.
- Re-added the sidebar functionality and script.
- Made progress with confining the 'global-grid' to the screen width in mobile view 'ipad'.
- Modified the control buttons properties, control button grid, and overall size of controls area to fit mobiel view of 'ipad' better in landscape.
- Made the exposition section of the console window scrollable in the Y direction when the text goes outside of the console.
- Removed the @media query madness that I implemented while trying to get a handle on how they work.
- Added stepping @media queries based on width and height, where width adjusts margins of grid components and the height adjusts font size and element sizing.
- Added a rework of the touch control area for iPads in landscape mode that aren't high resolution.
- Managed to allow for window resizing to more ideally scale buttons and UI.
- MOBILE VIEW!! Woot!

August 1st, 2020:
- Added the in-between view to the site. It seems to work normally, but the transition from the in-between view to the mobile view is simply not transitioning properly.

August 2nd, 2020:
- Updated the master readme with a more accurate description of my approach for building the mobile layout of the app.

August 3rd, 2020:
- Created the 'mobileFocus' branch and created mirror in online repo.
- Got the basic mobile global container styling to mock up. Pushed the changes and set the github pages build to mobileFOcus for testing!

August 4th, 2020:
- Added tablet support for main containers; will test.
- Tablet @media queries are backawards. Will test again.
- @Media queries work in chroome responsive view simulator, but not on the iPad itself. Trying with specific query for iPad.
- Trying another query method since none of the methods seem to work on mobile devices.

August 5th, 2020:
- Learned how to display the app on iOS properly after simulating it on a test Mac.
- Also learned that the 100vh bug in iOS Safari browser was fixed with iOS-8, so have since set the vertical height to 100vh.
- Learned how to display the app in 'fullscreen' on mobile iOS via toggling the 'search' and 'toolbar' sections with the 'Aa'.
- Added the buttons to the control section.
- Added the button styling from the engineRebase branch. Working on getting the buttons to display correctly in mobile portrait view first.
- Buttons spaced correctly in Chrome mobile viewer. Styling applied. Spacing and font look good. Testing on pages now!

August 6th, 2020:
- Tried to fix the buttons not aligning correctly in the mobile layout, no good results to push for today.

August 7th, 2020:
- Didn't have any good changes for today.
======================================================================



========================== ISSUES To FIX - engineRebase =========================
[X]: Modify the navbar in mobile view so that it is confined to current screen width.
[X]: Modify the footer in mobile view so it is confined to screen width.
[X]: Change the button properties and control-grid so that the buttons arrange and size correctly for mobile devices (ipad).
[X]: Changed exposition area to overflow-y auto, so that the text can be scrolled on smaller displays (ipad).
[X]: Remove bad @media queries.
[X]: Implement functional media queries for smaller display sizes and mobile that don't warp the games look too much.
[X]: Fix the dang mobile view to be functional AT ALL.
[ ]: Implement a settings button that can change the font-size, spacing, etc. for accessibility on mobile and smaller screen sizes.
[X]: Need to fix the 'in-between' weirdness of the @media queries.
[ ]: Need to fix the in-between TO mobile weirdness of the @media queries.
==================================================================================



========================== ISSUES To FIX - mobileFocus =========================
[ ]: Build basic core of mobile build scaling to tablet and desktop size correctly.
==================================================================================
