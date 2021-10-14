const pdfGenerator = require('pdfkit');
const fs = require('fs');

function genPDF(apptData, apptID) {
    let doc = new pdfGenerator();

    const { name, email, birthdate, gender, mobile, address, vaxstation, vaxdate } = apptData;

    const fromEdge = 5;
    doc.rect(fromEdge, fromEdge, doc.page.width - fromEdge * 2, doc.page.height - fromEdge * 2).stroke()

    doc.fontSize(36).font('Times-Bold').text('Vaccine Appointment', {
        align: 'center'
    });
    doc.moveDown();

    doc.fontSize(20).text(apptID, {
        align: 'center',
        characterSpacing: 2
    });
    doc.moveDown();

    doc.fontSize(14).font('Times-Roman')
        .text('Name:', 100, 200)
        .text(name, 250, 200)
        .text('Gender:', 100, 214)
        .text(gender, 250, 214)
        .text('Date of Birth:', 100, 228)
        .text(birthdate, 250, 228)
        .text('Address:', 100, 242)
        .text(address, 250, 242)
        .text('Email:', 100, 256)
        .text(email, 250, 256)
        .text('Mobile Number:', 100, 270)
        .text(mobile, 250, 270)
        .text('Vaccine Station:', 100, 284)
        .text(vaxstation, 250, 284)
        .text('Vaccine Date:', 100, 298)
        .text(vaxdate, 250, 298)
        .moveDown()
        .moveDown()
        .moveDown()
        .moveDown();

    doc.font('Times-Bold').text('Notes: Please show this document to get the vaccine. Both digital and hard copies are acceptable.', 100);

    doc.end();

    doc.pipe(fs.createWriteStream(`pdfstorage/${name.split(' ').join('').toLowerCase()}.pdf`));
};

module.exports = { genPDF };