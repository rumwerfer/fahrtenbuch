import React, { Component } from 'react';
import { IconButton } from 'react-native-paper';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import Icons from '../res/Icons';
import Colors from '../res/Colors';
import Strings from '../res/Strings';

export default class ReportButton extends Component {


  render() {
    return (
      <IconButton
        onPress={this.createPDF}
        icon={Icons.report}
        color={Colors.white}
      />
    );
  }


  async createPDF() {

    const report = '<h1>' + Strings.appName + '</h1>'
                   + `<style>
                        table, th, td {
                          border: 1px solid black;
                          border-collapse: collapse
                        }
                        th, td {
                          padding: 10px;
                          font-size: 15px;
                        }
                      </style>`
                   + '<table> <tr>'
                   + '<th rowspan="2">' + Strings.date + '</th>'
                   + '<th rowspan="2">' + Strings.distance + '</th>'
                   + '<th colspan="2">' + Strings.mileage + '</th>'
                   + '<th rowspan="2">' + Strings.numberPlate + '</th>'
                   + '<th rowspan="2">' + Strings.dayTime + '</th>'
                   + '<th rowspan="2">' + Strings.route + '</th>'
                   + '<th rowspan="2">' + Strings.weather + '</th>'
                   + '<th rowspan="2">' + Strings.tutor + '</th>'
                   + '<th colspan="2">' + Strings.signature + '</th>'
                   + '</tr> <tr>'
                   + '<th>' + 'von' + '</th>'
                   + '<th>' + 'bis' + '</th>'
                   + '<th>' + Strings.tutor + '</th>'
                   + '<th>' + Strings.candidate + '</th>'
                   + '</tr> <tr>'
                   + '<td>' + '21. Mai 2021' + '</td>'
                   + '<td>' + '322' + '</td>'
                   + '<td>' + '167000' + '</td>'
                   + '<td>' + '167322' + '</td>'
                   + '<td>' + 'SL-673RT' + '</td>'
                   + '<td>' + 'Nacht' + '</td>'
                   + '<td>' + 'Salzburg - Linz - retour' + '</td>'
                   + '<td>' + 'Schnee' + '</td>'
                   + '<td>' + '' + '</td>'
                   + '<td>' + '' + '</td>'
                   + '<td>' + '' + '</td>'
                   + '</tr> </table>';

    let options = {
      html: report,
      fileName: Strings.appName,
      directory: 'Documents',
      height: 595,
      width: 842,
    };
    let file = await RNHTMLtoPDF.convert(options);
    // console.log(file.filePath);
    alert(file.filePath);
  }

};
