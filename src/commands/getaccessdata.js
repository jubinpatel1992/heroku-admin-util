const {cli} =  require('cli-ux')
const {Command} = require('@heroku-cli/command')
const excel = require('excel4node')

class GetHerokuAccessData extends Command {
  async run() {
    cli.action.start('Processing User Access data from Heroku')

    // Get all teams
    let getApps = (await this.heroku.get('/apps')).body

    // Create a new instance of a Workbook class
    var workbook = new excel.Workbook()

    // Add Worksheets to the workbook
    var worksheet = workbook.addWorksheet('Access Details')

    // Create a reusable style
    var headingstyle = workbook.createStyle({
      fill: {
        type: 'pattern',
        patternType: 'solid',
        bgColor: '#0072ce',
        fgColor: '#0072ce',
      },
      font: {
        bold: true,
        size: 12,
        name: 'Calibri',
        color: '#FFFFFF',
      },
    })
    var defaultStyle = workbook.createStyle({
      font: {
        size: 12,
        name: 'Calibri',
        color: '#000000',
      },
    })

    worksheet.cell(1, 1).string('Heroku App Name').style(headingstyle)
    worksheet.cell(1, 2).string('Email').style(headingstyle)
    worksheet.cell(1, 3).string('Role').style(headingstyle)
    worksheet.cell(1, 4).string('Permissions').style(headingstyle)
    this.log('App Name')
    this.log('--------------------------------------------------------')

    let rowCount = 0
    for (let i = 0; rowCount < getApps.length; i++) {
      let getMembers = (await this.heroku.get('/apps/' + getApps[rowCount].name + '/collaborators')).body

      if (getMembers.length > 1) {
        let cellLength = i + getMembers.length + 1

        this.log(`${getApps[rowCount].name}  \u2713`)

        worksheet.cell(i + 2, 1, cellLength, 1, true).string(getApps[rowCount].name).style(defaultStyle)

        let tempcount = 0
        for (let j = 0; j < getMembers.length; j++) {
          worksheet.cell(i + tempcount + 2, 2).string(getMembers[j].user.email).style(defaultStyle)
          worksheet.cell(i + tempcount + 2, 3).string(getMembers[j].role).style(defaultStyle)
          let permissions = ''
          for (let k = 0; k < getMembers[j].permissions.length; k++) {
            permissions += getMembers[j].permissions[k].name + ','
          }
          worksheet.cell(i + tempcount + 2, 4).string(permissions).style(defaultStyle)
          tempcount++
        }

        i += getMembers.length - 1
        rowCount++
      } else {
        worksheet.cell(i + 2, 1).string(getApps[rowCount].name).style(defaultStyle)
        worksheet.cell(i + 2, 2).string(getMembers[0].user.email).style(defaultStyle)
        worksheet.cell(i + 2, 3).string(getMembers[0].role).style(defaultStyle)
        let permissions = ''
        for (let k = 0; k < getMembers[0].permissions.length; k++) {
          permissions += getMembers[0].permissions[k] + ','
        }
        worksheet.cell(i + 2, 4).string(permissions).style(defaultStyle)

        rowCount++
      }
    }

    workbook.write('Access Roster.xlsx')
    cli.action.stop('Completed')
  }
}

module.exports = GetHerokuAccessData
