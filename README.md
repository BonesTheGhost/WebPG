# WebPG
An attempt to make a web-based, text-styled, adventure rpg. The goal is to practice 'vanilla' web-development technologies (Javascript, HTML, CSS) and avoid using libraries that do 'heavy-lifting' inside of a black-box. SO, JQuery may be utuilized in some of the core engine, and things like icon fonts, but 3D animation libraries or WebGL have been avoided on purpose.

The Master branch of this project was used simply to see if the project was viable, and thus no effort was made to manage feature branches or versions. Documentation essentially was only relegated to the commit messages, instead of into a centralized document like this README.

Going forward, I have now created a new branch to handle the re-basing of the 'engine' code. This will neccesitate a rebuild of the layout, since in an application like this, the layout is heavily responsible for transforming simple JS logic into something resembling a game. The longevity of this branch is yet undetermined, as my experience with GIT version control is somewhat unrefined at present. However, I will do my best to create seperate branches for features and milestones that I would like to add.

Finally, at some point I hope to get the engineRebase branch to the same 'point' of refinement as the current build of the master branch (0.4.5). When that day comes, I will merge the engineRebase branch into the master branch, effectively deprecating the other 'current' build of the game. 

Changes and updates to the project will be kept here as well in the 'changelog' section. There will also be a 'buglist' section where I will store current issues with the game. If you would like to play with my build or any of the code contained in this repository, feel free to fork the repository! By doing so you simply agree to credit me with any inspirations you might have as a result of my project, and agree not to pass of the project as your own. Any spaghetti code nightmares you gain as a result of viewing my code are souvenirs of your tour, and I'm not responsible for any anxiety or other negative feelings you may experience, now or in the future! You have been warned!

In all seriousness, thanks for viewing my stuff, I hope you find something redeemable in it, and any feedback you have for this project or other works of mine, feel free to send to bonestheghost@gmail.com! Thanks for reading! Cheers!

============================ CHANGELOG ===============================

July 29th, 2020:
- Created the engineRebase branch, commited clean slate, pushed the branch to remote, and updated the README.

July 30th, 2020:
- Re-added the base CSS files and the Index.html code. Will work on modifying the layout next, and will attempt to make @media queries respond more precisely from the get-go (since styling will be overhauled anyway).

July 31st, 2020:
- Removed much of the previous styling code to work with the most foundational components first. Will now add in the necessary subdivisions and make sure that the media queries are working properly once the overall look has been achieved on desktop.
======================================================================
