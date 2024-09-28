
const xlsx = require('xlsx');
const Certificate = require('../models/Certificate');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const uploadExcel = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    const workbook = xlsx.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    // Validate and process data
    const certificates = data.map(item => {
      if (!item['Certificate ID'] || !item['Student Name'] || !item['Internship Domain'] || !item['Start Date'] || !item['End Date']) {
        throw new Error('Missing required fields in the Excel file.');
      }
      return {
        certificateId: item['Certificate ID'],
        studentName: item['Student Name'],
        internshipDomain: item['Internship Domain'],
        startDate: new Date(item['Start Date']),
        endDate: new Date(item['End Date']),
      };
    });

    // Save to MongoDB
    console.log('Certificates to Insert:', certificates);
    try {
      await Certificate.insertMany(certificates);
      console.log('Insertion Successful');
    } catch (error) {
      console.error('Insertion Error:', error);
    }
    console.log('Insertion Successful');

    res.status(200).send('File uploaded and data processed successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while processing the file.');
  }
};

const generatePDF = (certificate, res) => {
  const doc = new PDFDocument();
  const filePath = `./uploads/${certificate.certificateId}.pdf`;

  doc.pipe(fs.createWriteStream(filePath));
  doc.pipe(res);

  doc.fontSize(25).text('Certificate of Internship', { align: 'center' });
  doc.moveDown();
  doc.fontSize(18).text(`Student Name: ${certificate.studentName}`);
  doc.fontSize(18).text(`Internship Domain: ${certificate.internshipDomain}`);
  doc.fontSize(18).text(`Start Date: ${new Date(certificate.startDate).toLocaleDateString()}`);
  doc.fontSize(18).text(`End Date: ${new Date(certificate.endDate).toLocaleDateString()}`);

  doc.end();
};

const getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ certificateId: req.params.id });
    if (!certificate) {
      return res.status(404).send('Certificate not found');
    }
    const doc = new PDFDocument();
    const filePath = `./uploads/${certificate.certificateId}.pdf`;

    doc.pipe(fs.createWriteStream(filePath));
    doc.pipe(res);

    doc.fontSize(25).text('Certificate of Internship', { align: 'center' });
    doc.moveDown();
    doc.fontSize(18).text(`Student Name: ${certificate.studentName}`);
    doc.fontSize(18).text(`Internship Domain: ${certificate.internshipDomain}`);
    doc.fontSize(18).text(`Start Date: ${new Date(certificate.startDate).toLocaleDateString()}`);
    doc.fontSize(18).text(`End Date: ${new Date(certificate.endDate).toLocaleDateString()}`);

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while retrieving the certificate');
  }
};

const addManualCertificate = async (req, res) => {
  try {
    const { certificateId, studentName, internshipDomain, startDate, endDate } = req.body;

    // Validate input
    if (!certificateId || !studentName || !internshipDomain || !startDate || !endDate) {
      return res.status(400).send('All fields are required.');
    }

    // Create new certificate
    const newCertificate = new Certificate({
      certificateId,
      studentName,
      internshipDomain,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });

    // Save to database
    await newCertificate.save();

    res.status(201).send('Certificate added successfully.');
  } catch (error) {
    console.error(error);
    if (error.code === 11000) { // Duplicate key error
      res.status(400).send('A certificate with this ID already exists.');
    } else {
      res.status(500).send('An error occurred while adding the certificate.');
    }
  }
};


module.exports = {
  uploadExcel,
  getCertificateById,
  addManualCertificate,
};