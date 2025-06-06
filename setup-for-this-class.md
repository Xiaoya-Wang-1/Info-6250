# Initial Setup for Info 6250: Web Dev Tools and Methods

## A Warning about Limited Support

I will offer what support I can, but you are expected to be able to manage your specific operating system and computer configuration.

## Accounts

### Github.com
You will need a (free of cost) account on github.com
* https://github.com/

Existing accounts are fine, there are no specific username requirements for this course

I recommend using only LOWERCASE letters in your username, to reduce complexity, but that is not a requirement.

Once you have a github account, you will need to create a personal copy of the class repository.  Do this by following this link:
- https://rebrand.ly/seainfo6250-github

### Slack.com
You will need a (free of cost) account on slack.com to join in the discussion there.  That account is specific to the class workspace (there is not a "general" account as on github).
- https://rebrand.ly/seainfo6250-slack

I recommend the desktop client and/or the mobile client over the web-based one.  Slack is where most info on the class is discussed, just like many programming shops. 

Please make sure you receive notifications from the #announce channel - I may announce changes to class sessions/times or assignments and you do not want to miss those.

## Required Software
### Git
You will need to install a git client (free of cost):
* https://git-scm.com/downloads

All instruction and examples in class use the **command-line client**, not a graphical one.  You are welcome to use a different git client, but you are responsible for fulfilling all the requirements:
- Regularly pulling in new information from the github repository to your local copy
- Creating your work in feature branches
- Commiting your work with informative and helpful commit messages that summarize the contents of the commit
- Creating a Pull Request (PR) for your work that contains only the changes for each assignment and no personal files

### NodeJS and npm
You will need to install a recent version of NodeJS (which will also install npm) (free of cost)
* https://nodejs.org/   (I recommend the LTS version, but Stable should also be fine)

All instruction and examples will use `npm` instead of `yarn`.
- Do *NOT* install anything for node/npm with 'sudo' or as administrator unless you know how to clean up the permissions mess it creates.  
  - e.g. Do NOT run commands that start with `sudo npm install`

### Chrome Web Browser
You will need to install and use the (free of cost) Chrome web browser if you do not already have it
* https://www.google.com/chrome/browser/desktop/index.html

Be sure to configure it as mentioned further down!

### Text Editor
You will need a text editor or IDE of your choice (note: A Text Editor is NOT a word processor).  Some popular (and free of cost) available ones include VSCode (Mac/windows) or Notepad++ (windows), while some commercial ones that allow limited free demos include SublimeText and WebStorm.  Those users familiar with more old-school editors such as vim or emacs are welcome to use them.
* NOTE: I highly recommend having a specific directory(folder) to hold material from the class.  Students that work directly out of "Documents" or "Downloads" quickly find their work lost among other files there.
* NOTE: Directory (folder) names ARE case sensitive.  This can be tricky if you mess it up.  Mac (for example) will pretend to be case insensitive, but once you start talking to git (which doesn't "pretend") it breaks.  So always be precise, which is a good practice for programming anyway.
* NOTE: I recommend AGAINST having spaces or special characters other than dashes/hyphens ("-") and underscores ("_") in directory(folder) names.  Spaces make command-line commands hard to run, and you WILL be running some commands on the command line.
  - Good: ~/class/info6250/
  - Good: ~/classes/info-6250/repo
  - Bad: ~/My Documents/
  - Bad: ~/Documents/

### Terminal Program of your choice (optional)
To my knowledge all common systems come with a command-line terminal, however some of the OS-provided ones are sub-par.  If you wish to install and use programs like iTerm2 (Mac) or Powershell (Windows) or any of a bazillion options (Linux) you may do so.  (Many free of cost)

VSCode and other IDEs have a built in terminal option, but I still recommend having a separate terminal available as well

Many, MANY examples in class will be done at the command line, as will documentation you find online

### Cloning the class repository

If you follow the below link, you will create a personal copy of the class repository on your Github account.
- https://rebrand.ly/seainfo6250-github

You only have to do so once. After you've created this copy on github, you will want to "clone" this repository to your personal computer. 

To do this:
- At the command line, make sure you are "in" the directory that will hold the directory for the class repository. When you run the command, it will create a subdirectory in the "current" directory by default, so you don't need to create a new directory just for this repository. I suggest either having a directory for everything related to this class, or a directory for all sorts of different repositories.
- Run the command below. The `VALUE-FROM-CODE-BUTTON-ON-GITHUB` is an instruction, you should replace that value with the value you can copy when you click the "code" button on the repo in github.  
  - Note that "VALUE-FROM-CODE-BUTTON-ON-GITHUB" is an instruction to you, not that literal collection of characters.  Copy the value from the code button on the github repo page
- `git clone VALUE-FROM-THE-CODE-BUTTON-ON-GITHUB`
- Whenever you run git commands for this repository, make sure you are in the root directory of this repository. In other words, make sure your current PATH is the directory that this command created, something like `student-6250--iamaverycoolcat`
- If you do not understand what I mean by "in the directory" or "PATH", ask!  The current directory a terminal program is in will matter many times over this semester.

## Configuration

I recommend changes from the defaults that will help with both general programming and web development - don't skip this section!

### Chrome Dev Tools Console

You should make the configuration changes below.  The exact means to get to these options can differ slightly between OS and Chrome version
* View -> Developer -> Javascript Console
* Gear icon on upper right (There may be two gear icons - you want the one BELOW the bar that says "Console")
* Check 'LogXMLHttpRequests'
* Network subtab -> Check 'Disable Cache'

### Operating System

Your life as a programmer will be improved if you disable so-called "Smart Quotes". These are the curly single and double quotation marks that are not valid in most programming languages.  Leaving this option enabled may make it impossible to run any code typed outside of your editor (such as when asking Instructor, TA, or a peer in chat).
- Mac OSX: 
  - System Settings -> Keyboard -> Input Sources (Edit) -> Uncheck "Use smart quotes and dashes"
- Windows:
  - I'm unable to find a general solution, if you find one, let me know!

### git configuration

After cloning your class repository, make sure your default git configuration has your information. (run `git config --list` and look at the information listed).  I've had students using the system of a significant other/roommate/friend and had the other person's name attached to their submissions!

### Shell configuration

#### Path

The program that runs in your terminal program to communicate with your operating system is known as your shell. By default, Mac OSX defaults to only showing the name of the current directory in your shell prompt. I recommend changing this to show the full path (or show it elsewhere on your terminal).  

#### Git branch

Working in git you will be switching between "branches", which will alter what versions of files and directories are shown.  (Important concept: A "branch" is not the same as a "directory/folder") It is easy to make a confusing mess if you run commands or make changes while in a different branch than you intend. There are various shell scripts and terminal extensions that show what branch you are currently in. I recommend using something like this to make sure you always know what branch you are in when running commands.

## I'm a bit confused

Here are some resources you can use to get started if you feel particularly lost.
* https://guides.github.com/activities/hello-world/ (fully web-based to focus on the concepts)
* https://www.youtube.com/githubguides

You don't need to be strong with git/github at this point, so long as you are able to navigate the steps above, but I highly recommend improving your git skills as git is used in many, MANY workplaces, and even in those that don't you will often work with open-source libraries that use git.

You SHOULD ask questions on Slack - if you're having an issue, someone else probably is too.  You should not be afraid to admit you don't know something - if you knew it all already, you wouldn't be taking the class.
