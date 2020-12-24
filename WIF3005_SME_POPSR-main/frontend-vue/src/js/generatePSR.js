// import jsPDF from 'jspdf';
import * as jsPDF from "jspdf";
import "jspdf-autotable";
import "dateformat";
import "numeral";

class generatePSR {
  static printPDF(psrObj) {
    var dateFormat = require("dateformat");
    var numeral = require("numeral");
    var totalPrice = 0;
    var height = 0;
    var doc = new jsPDF("l", "mm", "a4");
    var col = ["Sr. No.", "Details"];
    var col1 = ["Details", "Values"];
    var rows = [];
    var rows1 = [];
    var rows3 = [];
    var col3 = [
      "No.",
      "Description",
      "Price(RM)",
      "Quantity",
      "Cost Code",
      "Remarks",
      "Total Price(RM)"
    ];

    /* The following array of object as response from the API req  */

    psrObj.psr_desc.forEach(element => {
      var unitPriceFormat = numeral(element.unitPrice).format("0,0.00");
      var totalFormat = numeral(element.quantity * element.unitPrice).format(
        "0,0.00"
      );
      totalPrice += totalFormat;

      var temp3 = [
        element.index,
        element.description,
        unitPriceFormat,
        element.quantity,
        element.costCode,
        element.remarks,
        totalFormat
      ];
      rows3.push(temp3);
    });
    doc.setFontType("bold");
    doc.text(148, 10, "DINASTIA JATI SDN BHD", "center");
    doc.setFontType("normal");
    doc.setFontSize(8);
    doc.text(
      148,
      15,
      "Co. Registration No. : 255157-U / GST No. 001263861760",
      "center"
    );

    doc.setFontSize(10);
    doc.text(
      148,
      20,
      "3A-6A, Jalan PJU 8/3A, Perdana Business Centre, Damansara Perdana. 47820 Petaling Jaya,",
      "center"
    );
    doc.text(148, 25, "Selangor Darul Ehsan. MALAYSIA.", "center");
    doc.text(148, 30, "Tel : +603-7722 3842   Fax : +603-7727 2601", "center");

    doc.line(15, 60, 282, 60);
    doc.line(15, 60, 15, 92);
    doc.line(282, 60, 282, 92);
    doc.line(15, 92, 282, 92);

    doc.line(81, 60, 81, 92);
    doc.line(148, 60, 148, 92);
    doc.line(214, 60, 214, 92);

    doc.line(15, 68, 282, 68);
    doc.line(15, 76, 282, 76);
    doc.line(15, 84, 282, 84);

    doc.setFontSize(10);

    // first row
    doc.setFontType("bold");
    doc.text(18, 65, "Purchase Classification");
    doc.setFontType("normal");
    doc.text(84, 65, psrObj.purchase_class);
    doc.setFontType("bold");
    doc.text(151, 65, "Purchase Type");
    doc.setFontType("normal");
    doc.text(217, 65, psrObj.purchase_typ);

    // second row
    doc.setFontType("bold");
    doc.text(18, 73, "Purchase Justification");
    doc.setFontType("normal");
    doc.text(84, 73, psrObj.purchase_just);
    doc.setFontType("bold");
    doc.text(151, 73, "PSR No.");
    doc.setFontType("normal");
    doc.text(217, 73, psrObj.psr_no.toString());

    // third row
    doc.setFontType("bold");
    doc.text(18, 81, "PSR Date");
    doc.setFontType("normal");
    doc.text(84, 81, dateFormat(psrObj.createdAt, "d mmm, yyyy"));
    doc.setFontType("bold");
    doc.text(151, 81, "Date Required");
    doc.setFontType("normal");
    doc.text(217, 81, dateFormat(psrObj.date_req, "d mmm, yyyy"));

    // fourth row
    doc.setFontType("bold");
    doc.text(18, 89, "Delivery");
    doc.setFontType("normal");
    doc.text(84, 89, psrObj.delv);
    doc.setFontType("bold");
    doc.text(151, 89, "Cost Type");
    doc.setFontType("normal");
    doc.text(217, 89, psrObj.cost_typ);

    doc.setFontSize(15);
    doc.setFontType("bold");
    doc.text(148, 50, "PURCHASE & SERVICE REQUISITION (PSR) FORM", "center");

    if (psrObj.project_title) {
      doc.line(15, 92, 15, 100);
      doc.line(15, 100, 282, 100);
      doc.line(282, 100, 282, 92);

      doc.line(81, 92, 81, 100);
      doc.line(148, 92, 148, 100);
      doc.line(214, 92, 214, 100);

      // fifth row
      doc.setFontSize(10);
      doc.setFontType("bold");
      doc.text(18, 97, "Project Tile");
      doc.setFontType("normal");
      doc.text(84, 97, psrObj.project_title);
      doc.setFontType("bold");
      doc.text(151, 97, "Vessel Code");
      doc.setFontType("normal");
      doc.text(217, 97, psrObj.vessel_code);

      doc.autoTable(col3, rows3, {
        startY: 110,
        columnStyles: {
          0: { columnWidth: 10 },
          1: { columnWidth: 100 },
          2: { columnWidth: 25, halign: "right" },
          3: { columnWidth: 20, halign: "center" },
          4: { columnWidth: 25, halign: "center" },
          5: { columnWidth: 70 },
          6: { columnWidth: 20, halign: "right" }
        }
      });
    }

    doc.setFontSize(10);
    doc.setFontType("normal");
    doc.save(psrObj.psr_no + ".pdf");
  }
}

export default generatePSR;
