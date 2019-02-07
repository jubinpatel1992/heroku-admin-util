const {cli} =  require('cli-ux')
const {Command} = require('@heroku-cli/command')
const excel = require('excel4node')

class GetHerokuAppData extends Command {
  async run() {
    cli.action.start('Processing app data from Heroku')

    // Get all teams
    let getApps = (await this.heroku.get('/apps')).body

    // Create a new instance of a Workbook class
    var workbook = new excel.Workbook()

    // Add Worksheets to the workbook
    var worksheet = workbook.addWorksheet('Apps Data')

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
    worksheet.cell(1, 2).string('Heroku App Url').style(headingstyle)
    worksheet.cell(1, 3).string('In Maintenance Mode').style(headingstyle)
    worksheet.cell(1, 4).string('Build Pack Used').style(headingstyle)
    worksheet.cell(1, 5).string('Hostname').style(headingstyle)
    worksheet.cell(1, 6).string('DNS Target').style(headingstyle)
    worksheet.cell(1, 7).string('Heroku ACM Status').style(headingstyle)
    this.log('App Name')
    this.log('--------------------------------------------------------')

    let rowCount = 0
    for (let i = 0; rowCount < getApps.length; i++) {
      let getDomians = (await this.heroku.get('/apps/' + getApps[rowCount].name + '/domains')).body
      this.log(`${getApps[rowCount].name}  \u2713`)

      if (getDomians.length > 1) {
        let cellLength = i + getDomians.length

        worksheet.cell(i + 2, 1, cellLength, 1, true).string(getApps[rowCount].name).style(defaultStyle)
        worksheet.cell(i + 2, 2, cellLength, 2, true).string(getApps[rowCount].web_url).style(defaultStyle)

        if (getApps[rowCount].maintenance)
          worksheet.cell(i + 2, 3, cellLength, 3, true).string('Yes').style(defaultStyle)

        if (getApps[rowCount].buildpack_provided_description === null) {
          worksheet.cell(i + 2, 4, cellLength, 4, true).string('').style(defaultStyle)
        } else {
          worksheet.cell(i + 2, 4, cellLength, 4, true).string(getApps[rowCount].buildpack_provided_description).style(defaultStyle)
        }

        let k = 0
        for (let j = 0; j < getDomians.length; j++) {
          if (getDomians[j].kind === 'custom') {
            worksheet.cell(i + k + 2, 5).string(getDomians[j].hostname).style(defaultStyle)
            worksheet.cell(i + k + 2, 6).string(getDomians[j].cname).style(defaultStyle)
            worksheet.cell(i + k + 2, 7).string((getDomians[j].acm_status === null) ? 'null' : getDomians[j].acm_status).style(defaultStyle)
            k++
          }
        }

        i += getDomians.length - 2
        rowCount++
      } else {
        worksheet.cell(i + 2, 1).string(getApps[rowCount].name).style(defaultStyle)
        worksheet.cell(i + 2, 2).string(getApps[rowCount].web_url).style(defaultStyle)

        if (getApps[rowCount].maintenance)
          worksheet.cell(i + 2, 3).string('Yes').style(defaultStyle)

        if (getApps[rowCount].buildpack_provided_description !== null) {
          worksheet.cell(i + 2, 4).string(getApps[rowCount].buildpack_provided_description).style(defaultStyle)
        }
        rowCount++
      }
    }

    workbook.write('HerokuAppData.xlsx')
    cli.action.stop('Completed')
  }
}

module.exports = GetHerokuAppData
