Heroku Admin Utils
========================

A Heroku plugin extending the Heroku CLI powered by OCLIF to get data related to access, addons and apps which can we used by Heroku Admins of large teams/enterprsies to manage and roster their Heroku applications.

* [Usage](#usage)

In order to utitlize this Heroku plugin, download and install Heroku CLI from [here](https://devcenter.heroku.com/articles/heroku-cli#download-and-install). 

If you already have Heroku CLI setup in you machine follow below steps to configure the plugin in your machine using Heroku CLI:

```sh-session
$ heroku login
$ heroku plugins:install heroku-admin-util

USAGE
  $ heroku getappdata
  $ heroku getaccessdata
  $ heroku getaddondata
```