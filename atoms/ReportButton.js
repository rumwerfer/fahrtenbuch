import React from 'react';
import { IconButton } from 'react-native-paper';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { connect } from 'react-redux';
import Share from 'react-native-share';

import Icons from '../res/Icons';
import Colors from '../res/Colors';
import Strings from '../res/Strings';
import Constants from '../res/Constants';
import { mapStateToProps } from '../redux/Mappers';


function ReportButton(props) {
  return (
    <IconButton
      onPress={() => createPDF(props.journeys.saved, props.vehicles.vehicles)}
      icon={Icons.report}
      color={Colors.white}
    />
  );
}

createPDF = async (savedJourneys, vehicles) => {

  const sumDistance = savedJourneys.reduce((sum, journey) =>
    sum + (journey.endMileage - journey.startMileage)
  , 0);

  const reportHead = '<h1>' + Strings.appName + '</h1>'
                   + `<style>
                        table, th, td {
                          border: 1px solid black;
                          border-collapse: collapse
                        }
                        th, td {
                          padding: 5px;
                          font-size: 10px;
                        }
                        p {
                          padding-top: 10px;
                          font-size: 10px;
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
                   + '<th>' + Strings.from + '</th>'
                   + '<th>' + Strings.to + '</th>'
                   + '<th>' + Strings.tutor + '</th>'
                   + '<th>' + Strings.candidate + '</th>'
                   + '</tr>';

  const reportRow = (journey) => {

    const time = new Date(journey.startTime);
    const date = time.toLocaleDateString(
      undefined, // use device locale
      {day: 'numeric', month: 'long', year: 'numeric'}
    );
    const hours = time.getHours();
    const dayTime = hours < 6 ? Strings.night
                  : hours < 9 ? Strings.morning
                  : hours < 12 ? Strings.forenoon
                  : hours < 18 ? Strings.afternoon
                  : hours < 22 ? Strings.evening
                  : Strings.night;
    const distance = journey.endMileage - journey.startMileage;
    const vehicle = vehicles.find(vehicle => vehicle.id === journey.vehicleID);

    return '<tr> <td>' + date
        + '</td> <td>' + distance
        + '</td> <td>' + journey.startMileage
        + '</td> <td>' + journey.endMileage
        + '</td> <td>' + vehicle.numberPlate
        + '</td> <td>' + dayTime
        + '</td> <td>' + journey.route
        + '</td> <td>' + journey.weather
        + '</td> <td/> <td/> <td/> </tr>';
  };

  const reportFoot =
    '<tr> <td> <b>' + Strings.total
    + ' </b> </td> <td> <b>' + sumDistance
    + '</b> </td> </tr> </table>'
    + '<p>' + Strings.createdWith + '</p>';

  const report = reportHead
    + savedJourneys.reduce((rows, journey) => rows + reportRow(journey), '')
    + reportFoot;

  const options = {
    html: report,
    fileName: Strings.appName,
    directory: 'Documents',
    height: 842,
    width: 595,
  };
  const file = await RNHTMLtoPDF.convert(options);

  Share.open({
    url: 'file:///' + file.filePath,
    title: Strings.sendTo,
    subject: Strings.appName,
    message: sumDistance >= Constants.distanceGoal
             ? Strings.madeItMessage
             : Strings.kmToGoMessage(Constants.distanceGoal - sumDistance),
  })
  .catch(err => console.log(err)); // error if user did not share
}

export default connect(mapStateToProps)(ReportButton);
