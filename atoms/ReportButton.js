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

    const report = '<h1>' + Strings.report + '</h1>'
                   + '<table> <tr>'
                   + '<th>' + Strings.date + '</th>'
                   + '<th>' + Strings.distance + '</th>'
                   + '</tr> <tr>'
                   + '<td>' + '21. Mai 2021' + '</td>'
                   + '<td>' + '322' + '</td>'
                   + '</tr> </table>';

    let options = {
      html: report,
      fileName: Strings.report,
      directory: 'Documents',
    };
    let file = await RNHTMLtoPDF.convert(options);
    // console.log(file.filePath);
    alert(file.filePath);
  }

};
