# Heroku Admin Utils

A Heroku plugin extending the Heroku CLI powered by OCLIF to get/set data related to access, addons and apps which can we used by Heroku Admins of large teams/enterprsies to manage and roster their Heroku applications.

##  Usage

In order to utitlize this Heroku plugin, download and install Heroku CLI from [here](https://devcenter.heroku.com/articles/heroku-cli#download-and-install). 

If you already have Heroku CLI setup in you machine follow below steps to configure the plugin in your machine using Heroku CLI:

```sh-session
$ heroku login
$ heroku plugins:install heroku-admin-util
```

## Commands

```
$ heroku getappdata
```

Above heroku command will generate an Excel with name "HerokuAppData.xlsx" which will provide the following details of all the Heroku apps to which the user has access to:


|   Heroku App Name   |   Heroku App Url   |   In Maintenance Mode    |   Build Pack Used   |   Hostname   |  DNS Target  |   Heroku ACM Status |
|---------------------|--------------------|--------------------------|---------------------|--------------|--------------|---------------------|


```
$ heroku getaccessdata
```

Above heroku command will generate an Excel with name "Access Roster.xlsx" which will provide the following details of all the Heroku apps to which the user has access to:


|   Heroku App Name   |   Email   |   Role    |   Permissions   |
|---------------------|-----------|-----------|-----------------|


```
$ heroku getaddondata
```

Above heroku command will generate an Excel with name "HerokuAddonDetails.xlsx" which will provide the following details of all the Heroku apps to which the user has access to:


|   Heroku App Name   |   Addon Service Name   |   Addon Plan Name    |   Billing Entity   |    Costing (in cents)   |    Plan Duration |  
|---------------------|------------------------|----------------------|--------------------|-------------------------|------------------| 
