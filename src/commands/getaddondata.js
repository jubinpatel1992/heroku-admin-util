const {cli} =  require('cli-ux')
const {Command} = require('@heroku-cli/command')
const excel = require('excel4node')

class GetAddonData extends Command {
  async run() {
    cli.action.start('Processing addon data from Heroku')

    let getAddons = (await this.heroku.get('/addons')).body
    let workbook = new excel.Workbook()
    let worksheet = workbook.addWorksheet('Addons Data')
    let headingstyle = workbook.createStyle({
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
    let defaultStyle = workbook.createStyle({
      font: {
        size: 12,
        name: 'Calibri',
        color: '#000000',
      },
    })

    worksheet.cell(1, 1).string('Heroku App Name').style(headingstyle)
    worksheet.cell(1, 2).string('Addon Service Name').style(headingstyle)
    worksheet.cell(1, 3).string('Addon Plan Name').style(headingstyle)
    worksheet.cell(1, 4).string('Billing Entity').style(headingstyle)
    worksheet.cell(1, 5).string('Costing (in cents)').style(headingstyle)
    worksheet.cell(1, 6).string('Plan Duration').style(headingstyle)
    this.log('App Name')
    this.log('--------------------------------------------------------')

    getAddons.sort(function (a, b) {
      let nameA = a.app.name
      let nameB = b.app.name
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }

      return 0
    })

    let tempCount = 0
    for (let i = 0; i < getAddons.length; i++) {
      worksheet.cell(i + 2, 2).string(getAddons[i].addon_service.name).style(defaultStyle)
      worksheet.cell(i + 2, 3).string(getAddons[i].plan.name).style(defaultStyle)
      worksheet.cell(i + 2, 4).string(getAddons[i].billing_entity.name).style(defaultStyle)
      worksheet.cell(i + 2, 5).number(getAddons[i].billed_price.cents).style(defaultStyle)
      worksheet.cell(i + 2, 6).string(getAddons[i].billed_price.unit).style(defaultStyle)

      if (getAddons[i + 1] === undefined) {
        worksheet.cell(tempCount + 2, 1, i + 2, 1, true).string(getAddons[i].app.name).style(defaultStyle)
      } else if (getAddons[i].app.name !== getAddons[i + 1].app.name) {
        if (tempCount === i) {
          worksheet.cell(tempCount + 2, 1).string(getAddons[i].app.name).style(defaultStyle)
          this.log(`${getAddons[i].app.name}  \u2713`)
        } else {
          this.log(`${getAddons[i].app.name}  \u2713`)
          worksheet.cell(tempCount + 2, 1, i + 2, 1, true).string(getAddons[i].app.name).style(defaultStyle)
        }

        tempCount = i + 1
      }
    }

    workbook.write('HerokuAddonDetails.xlsx')

    cli.action.stop('Completed')
  }
}

module.exports = GetAddonData
