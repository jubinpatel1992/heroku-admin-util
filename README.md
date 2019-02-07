Heroku Admin Utils
========================

A Heroku plugin extending the Heroku CLI powered by OCLIF to get data related to access, addons and apps which can we used by Heroku Admins of large teams/enterprsies to manage and roster their Heroku applications.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/heroku-admin-util.svg)](https://npmjs.org/package/heroku-admin-util)
[![Downloads/week](https://img.shields.io/npm/dw/heroku-admin-util.svg)](https://npmjs.org/package/heroku-admin-util)
[![License](https://img.shields.io/npm/l/heroku-admin-util.svg)](https://github.com/https://github.com/jubinpatel1992/heroku-admin-util/heroku-admin-util/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
<!-- tocstop -->
* [Usage](#usage)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g heroku-admin-util
$ oclif-example COMMAND
running command...
$ oclif-example (-v|--version|version)
heroku-admin-util/1.0.1 win32-x64 node-v10.15.0
$ oclif-example --help [COMMAND]
USAGE
  $ oclif-example COMMAND
...
```
<!-- usagestop -->
In order to utitlize this Heroku plugin, download and install Heroku CLI from [here](https://devcenter.heroku.com/articles/heroku-cli#download-and-install). 

If you already have Heroku CLI setup in you machine follow below steps to configure the plugin in your machine using Heroku CLI:

```sh-session
$ heroku login
$ heroku plugins:install heroku-admin-util

USAGE
  $ heroku getappdata
  $ heroku getaccessdata
  $ heroku getaddondata
