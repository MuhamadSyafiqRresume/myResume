// import jsPDF from 'jspdf';
import * as jsPDF from "jspdf";
import "jspdf-autotable";
import "dateformat";
import "numeral";

class generatePO {
  static printPDF(poObj) {
    var dateFormat = require("dateformat");
    var numeral = require("numeral");
    var totalPrice = 0;
    var height = 0;
    var doc = new jsPDF();
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
      "Total Price(RM)"
    ];

    /* The following array of object as response from the API req  */

    var itemNew = [
      { index: "1", id: "Case Number", name: "101111111" },
      { index: "2", id: "Patient Name", name: "UAT DR" },
      { index: "3", id: "Hospital Name", name: "Dr Abcd" }
    ];
    
    itemNew.forEach(element => {
      var temp = [element.index, element.id];
      var temp1 = [element.index, element.name];
      rows.push(temp);
      rows1.push(temp1);
    });
    poObj.po_desc.forEach(element => {
      var unitPriceFormat = numeral(element.unitPrice).format('0,0.00');
      var totalFormat = numeral(element.quantity * element.unitPrice).format('0,0.00');
      totalPrice += totalFormat;
      
      var temp3 = [
        element.index,
        element.description,
        unitPriceFormat,
        element.quantity,
        totalFormat
      ];
      rows3.push(temp3);
    });
    doc.text(75, 10, "DINASTIA JATI SDN BHD");
    doc.setFontSize(8);
    doc.text(70, 15, "Co. Registration No. : 255157-U / GST No. 001263861760");

    doc.setFontSize(10);
    doc.text(
      100,
      20,
      "3A-6A, Jalan PJU 8/3A, Perdana Business Centre, Damansara Perdana. 47820 Petaling Jaya,",
      "center"
    );
    doc.text(100, 25, "Selangor Darul Ehsan. MALAYSIA.", "center");
    doc.text(100, 30, "Tel : +603-7722 3842   Fax : +603-7727 2601", "center");

    doc.setFontSize(15);
    doc.setFontType("bold");
    doc.text(100, 50, "PURCHASE ORDER", "center");

    doc.setFontSize(10);
    doc.setFontType("normal");
    // if(poObj.cl_neme)
    //     doc.cell(10, 70, 100, 15, poObj.cl_name);
    // else
    //     doc.cell(10, 70, 100, 15, "Client Name");
    // doc.cell(110, 70, 45, 15, "Purchase Order No.", "right");
    // // doc.cell(40, 40, 50, 20, "cell", 'top');
    // doc.cell(160, 70, 45, 15, poObj.po_no);

    doc.line(10, 60, 200, 60);
    doc.line(10, 60, 10, 140);
    doc.line(200, 60, 200, 140);
    doc.line(10, 140, 200, 140);

    doc.line(105, 60, 105, 140);
    doc.line(155, 60, 155, 140);

    // doc.line(105, 68, 200, 68);
    doc.line(105, 68, 200, 68);
    doc.line(105, 76, 200, 76);
    doc.line(105, 84, 200, 84);
    doc.line(105, 92, 200, 92);
    doc.line(105, 100, 200, 100);
    doc.line(105, 108, 200, 108);
    doc.line(105, 116, 200, 116);
    doc.line(105, 124, 200, 124);
    doc.line(105, 132, 200, 132);
    doc.line(105, 140, 200, 140);

    doc.setFontType("bold");
    if(poObj.cl_company)
        doc.text(13, 65, poObj.cl_company);
    doc.setFontType("normal");
    if(poObj.address_1)
        doc.text(13, 73, poObj.address_1);
    if(poObj.address_2)    
        doc.text(13, 81, poObj.address_2);
    if(poObj.address_3) 
        doc.text(13, 89, poObj.address_3);
    if(poObj.address_4) 
        doc.text(13, 97, poObj.address_4);
    if(poObj.cl_name) 
        doc.text(13, 129, "ATTN: "+poObj.cl_name);
    
    doc.text(108, 65, "Purchase Order");
    doc.text(108, 73, "Date");
    doc.text(108, 81, "Page Number");
    doc.text(108, 89, "Our Reference");
    doc.text(108, 97, "Your Quotation");
    doc.text(108, 105, "Delivery Due Date");
    doc.text(108, 113, "Mode of Shipment");
    doc.text(108, 121, "PSR No.");
    doc.text(108, 129, "CCA No.");
    doc.text(108, 137, "Mode of Payment");

    doc.text(158, 65, poObj.po_no.toString());
    doc.text(158, 73, dateFormat(poObj.createdAt, "d mmm, yyyy"));
    doc.text(158, 81, doc.internal.getNumberOfPages().toString());
    doc.text(158, 89, poObj.po_ref);
    doc.text(158, 97, poObj.quotation);
    doc.text(158, 105, dateFormat(poObj.delv_due, "d mmm, yyyy"));
    doc.text(158, 113, poObj.ship_mode);
    doc.text(158, 121, poObj.psr.no);
    doc.text(158, 129, poObj.cca_no);
    doc.text(158, 137, poObj.pay_mode);

    doc.autoTable(col3, rows3, {
      startY: 155,
      columnStyles: {
        0: { columnWidth: 10 },
        1: { columnWidth: 100 },
        2: { columnWidth: 25, halign: "right" },
        3: { columnWidth: 20, halign: "right" },
        4: { columnWidth: 25, halign: "right" }
      }
    });
    height = doc.autoTableEndPosY();

    doc.setFontType("bold");
    numeral(totalPrice).format('0,0.00');
    totalPrice = numeral(totalPrice).format('0,0.00');
    doc.text(130, height + 5, "Net Total");
    doc.text(170, height + 5, "RM " + totalPrice);

    // doc.autoTable(col3, rows3, { startY: 40 });
    // doc.autoTable(col1, rows1);
    doc.save(poObj.po_no + ".pdf");
  }
}

export default generatePO;
