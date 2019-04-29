
## Working with Git and GitHub

### Pull requests and PHPCS
The VIP bot runs when a pull request is opened. To obtain the benefits of automated reviews, always open a pull request against master, never push code directly to master.

### What should go in a pull request?
Pull requests can all be merged at the same time, but should be kept separate, on different branches based off master, so that each piece of functionality can be reviewed separately.

Points to remember:
- when adding a plugin, create a pull request for only the added files, and put the plugin loading code and any customizatiomns you need for the plugin (e.g., filters in the them's functions.php) in a different branch / pull request.
- when refactoring code, keep that work separate from any work to add functionality.
- the same applies when reformatting code - if your changes have only whitespace and comment changes, it's easier to review when no new code is being introduced.
- avoid creating a pull request that contains several different changes. The longer the pull request, the more difficult it is to review.
- avoid adding changes to a branch after the pull request is approved.

### Submodules
If you prefer to use a plugin from a public repo as a submodule rather than copying it into your repository:

add a reference in .gitmodules:

[submodule "path_to_submodule"] 
  path = path_to_submodule 
  url = git://url-of-source/

This also applies if you copy a plugin that internally uses a submodule; for that, you'll need to put the 
submodule reference in the top-level .gitmodules file.

If you copy a plugin or repo that includes submodules and you do not want to use them, 
you need to remove the submodule using git rm path/to/directory.